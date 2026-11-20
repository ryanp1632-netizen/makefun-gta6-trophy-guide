// A minimal headless-Chrome driver over the DevTools protocol (Node 22+ global WebSocket), with app/ served by
// serve.ts. It records every request that leaves the local server and every console error or uncaught exception.
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = fileURLToPath(new URL('../', import.meta.url));
const CHROME = process.env.CHROME ?? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

export const wait = (ms) => new Promise((r) => setTimeout(r, ms));
export async function until(fn, ms = 15000) {
  const end = Date.now() + ms;
  for (;;) {
    try { const v = await fn(); if (v) return v; } catch { /* not ready yet */ }
    if (Date.now() > end) throw new Error('timed out');
    await wait(100);
  }
}

export async function startBrowser({ port = 8137, debugPort = 9337 } = {}) {
  const server = spawn(process.execPath, ['serve.ts', '--port', String(port)], { cwd: root, stdio: 'ignore' });
  const profile = mkdtempSync(join(tmpdir(), 'leonida55-chrome-'));
  const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${debugPort}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', '--force-device-scale-factor=1', 'about:blank'], { stdio: 'ignore' });
  const close = async () => {
    chrome.kill();
    server.kill();
    await wait(500);
    try { rmSync(profile, { recursive: true, force: true }); } catch { /* Chrome may still hold files */ }
  };
  try {
    await until(() => fetch(`http://127.0.0.1:${port}/`).then((r) => r.ok));
    const target = await until(() => fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, { method: 'PUT' }).then((r) => r.json()));
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((r) => ws.addEventListener('open', r, { once: true }));
    let seq = 0;
    const pending = new Map();
    const problems = [];
    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); return; }
      if (msg.method === 'Network.requestWillBeSent') {
        const url = msg.params.request.url;
        if (!url.startsWith(`http://127.0.0.1:${port}/`) && !/^(data|blob):/.test(url)) problems.push(`off-app request: ${url}`);
      }
      if (msg.method === 'Runtime.exceptionThrown') problems.push(`exception: ${msg.params.exceptionDetails.exception?.description ?? msg.params.exceptionDetails.text}`);
      if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') problems.push(`console error: ${msg.params.args.map((a) => a.value ?? a.description).join(' ')}`);
    });
    const send = (method, params = {}) => new Promise((resolve, reject) => {
      const id = ++seq;
      pending.set(id, (msg) => (msg.error ? reject(new Error(`${method}: ${msg.error.message}`)) : resolve(msg.result)));
      ws.send(JSON.stringify({ id, method, params }));
    });
    await send('Page.enable');
    await send('Runtime.enable');
    await send('Network.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });
    const evaluate = async (expression) => {
      const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (r.exceptionDetails) throw new Error(`evaluate failed: ${r.exceptionDetails.exception?.description ?? expression}`);
      return r.result.value;
    };
    const open = async (path) => {
      await send('Page.navigate', { url: `http://127.0.0.1:${port}${path}` });
      await wait(150);
      await until(() => evaluate('document.documentElement.dataset.ready === "true"'));
      await wait(250);
    };
    return { send, evaluate, open, problems, close: async () => { ws.close(); await close(); } };
  } catch (error) {
    await close();
    throw error;
  }
}
