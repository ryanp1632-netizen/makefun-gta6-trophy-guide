// Takes the 4 screenshots in screenshots/ from real renders of app/ in headless Chrome (tools/cdp.mjs): a 1120x700
// CSS viewport at device scale 8/7, captured as 1280x800 JPEG, lowering the quality until each is under 250 KiB.
// Demo progress comes from ?demo=1, which never touches saved progress, and every shot keeps the spoiler shield on.
// Before each capture, fitToWholeItems ends every pane on a complete item: an item the window's bottom edge would cut
// (a list row, a guide step, a source card, a missables card, a matrix row) is left out of the shot with the ones after
// it, and the spare height is shared out between the items that remain. Fails on any off-app request or console error.
// Usage: node tools/shoot.mjs [--only 1]
import { writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { root, startBrowser } from './cdp.mjs';

const MAX_BYTES = 250 * 1024;
export const SHOTS = [
  { file: '1-cover.jpg', path: '/?demo=1&view=tracker&trophy=28&top=1&spoilers=1',
    fit: [['#trophy-list', ':scope > li', 'pad'], ['#guide-panel .steps', ':scope > li', 'pad'], ['#side-panel .source-cards ol', ':scope > li', 'gap']] },
  { file: '2-roadmap.jpg', path: '/?demo=1&view=roadmap&spoilers=1', fit: [['#roadmap .road-checklist ol', ':scope > li']] },
  { file: '3-missables.jpg', path: '/?demo=1&view=missables&spoilers=1',
    fit: [['#missables', ':scope > *'], ['#missables .missable-grid', ':scope > *', 'pad']] },
  { file: '4-sources.jpg', path: '/?demo=1&view=sources&spoilers=1', fit: [['#sources-view .matrix tbody', ':scope > tr', 'pad']] },
];

// Runs in the page. Hides any item cut by the bottom of the viewport (or of its scrolling pane) and the items after it,
// then, with 'pad' or 'gap', shares the freed height between the remaining items so the pane still ends flush.
function fitToWholeItems(rules) {
  const report = [];
  for (const [containerSel, itemSel, spread] of rules) {
    const box = document.querySelector(containerSel);
    if (!box) { report.push(`${containerSel}: missing`); continue; }
    let pane = box;
    while (pane && pane !== document.body && !/(auto|scroll)/.test(getComputedStyle(pane).overflowY)) pane = pane.parentElement;
    const paneRect = pane && pane !== document.body ? pane.getBoundingClientRect() : { bottom: innerHeight };
    const limit = Math.min(innerHeight, paneRect.bottom) - 5;
    const items = [...box.querySelectorAll(itemSel)].filter((el) => el.getClientRects().length);
    let firstCut = items.findIndex((el) => el.getBoundingClientRect().bottom > limit);
    if (firstCut < 0) firstCut = items.length;
    // A list never ends on a group heading with nothing under it.
    while (firstCut > 0 && items[firstCut - 1].classList.contains('group-head')) firstCut -= 1;
    items.slice(firstCut).forEach((el) => { el.style.display = 'none'; });
    const kept = items.slice(0, firstCut);
    report.push(`${containerSel}: ${kept.length} whole, ${items.length - kept.length} left out`);
    if (!spread || !kept.length) continue;
    const spare = limit - Math.max(...kept.map((el) => el.getBoundingClientRect().bottom));
    // Items side by side in a grid share a row: the spare height is split between rows, not items.
    const rows = new Set(kept.map((el) => Math.round(el.getBoundingClientRect().top))).size;
    const each = Math.max(0, Math.floor((spare / rows) * 10) / 10);
    for (const el of kept) {
      if (spread === 'gap') el.style.marginTop = `${each}px`;
      else if (el.tagName === 'TR') el.style.height = `${el.getBoundingClientRect().height + each}px`;
      else {
        const cs = getComputedStyle(el);
        el.style.paddingTop = `${parseFloat(cs.paddingTop) + each / 2}px`;
        el.style.paddingBottom = `${parseFloat(cs.paddingBottom) + each / 2}px`;
      }
    }
  }
  return report;
}

const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : null;
// Run directly, it takes the shots; imported (by the smoke test), it only shares SHOTS.
if (process.argv[1]?.replace(/\\/g, '/').endsWith('tools/shoot.mjs')) await takeShots();

async function takeShots() {
  const browser = await startBrowser();
  const { width, height } = browser.viewport;
  try {
    for (const shot of SHOTS) {
      if (only && !shot.file.startsWith(only)) continue;
      await browser.open(shot.path);
      if (!(await browser.evaluate('document.getElementById("spoiler-toggle").checked'))) throw new Error(`${shot.file}: spoiler shield is off`);
      const fitted = await browser.evaluate(`(${fitToWholeItems})(${JSON.stringify(shot.fit ?? [])})`);
      let quality = 92;
      let bytes;
      for (;;) {
        const { data } = await browser.send('Page.captureScreenshot', { format: 'jpeg', quality, clip: { x: 0, y: 0, width, height, scale: 1 } });
        bytes = Buffer.from(data, 'base64');
        if (bytes.length <= MAX_BYTES || quality <= 50) break;
        quality -= 3;
      }
      writeFileSync(join(root, 'screenshots', shot.file), bytes);
      console.log(`${shot.file}: ${(bytes.length / 1024).toFixed(1)} KiB at quality ${quality}; ${fitted.join('; ')}`);
    }
    console.log(`screenshots/: ${readdirSync(join(root, 'screenshots')).join(', ')}`);
  } finally {
    await browser.close();
  }
  if (browser.problems.length) {
    console.error(browser.problems.join('\n'));
    process.exit(1);
  }
}
