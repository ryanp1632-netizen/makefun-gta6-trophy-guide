// Takes the 4 screenshots in screenshots/ from real renders of app/ in headless Chrome (tools/cdp.mjs), 1280x800 JPEG,
// lowering the quality until each is under 250 KiB. Fails on any off-app request or console error.
// Usage: node tools/shoot.mjs [--only 1]
import { writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { root, startBrowser } from './cdp.mjs';

const MAX_BYTES = 250 * 1024;
const SHOTS = [
  { file: '1-cover.jpg', path: '/?demo=1&view=checklist&trophy=28' },
  { file: '2-roadmap.jpg', path: '/?demo=1&view=roadmap&spoilers=0' },
  { file: '3-missables.jpg', path: '/?demo=1&view=missables' },
  { file: '4-sources.jpg', path: '/?demo=1&view=sources' },
];
const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : null;

const browser = await startBrowser();
try {
  for (const shot of SHOTS) {
    if (only && !shot.file.startsWith(only)) continue;
    await browser.open(shot.path);
    let quality = 88;
    let bytes;
    for (;;) {
      const { data } = await browser.send('Page.captureScreenshot', { format: 'jpeg', quality, clip: { x: 0, y: 0, width: 1280, height: 800, scale: 1 } });
      bytes = Buffer.from(data, 'base64');
      if (bytes.length <= MAX_BYTES || quality <= 50) break;
      quality -= 4;
    }
    writeFileSync(join(root, 'screenshots', shot.file), bytes);
    console.log(`${shot.file}: ${(bytes.length / 1024).toFixed(1)} KiB at quality ${quality}`);
  }
  console.log(`screenshots/: ${readdirSync(join(root, 'screenshots')).join(', ')}`);
} finally {
  await browser.close();
}
if (browser.problems.length) {
  console.error(browser.problems.join('\n'));
  process.exit(1);
}
