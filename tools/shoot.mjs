// Takes the 4 screenshots in screenshots/ from real renders of app/ in headless Chrome (tools/cdp.mjs): a 1024x640
// CSS viewport at device scale 1.25, captured as 1280x800 JPEG, lowering the quality until each is under 250 KiB.
// Demo progress comes from ?demo=1, which never touches saved progress. Fails on any off-app request or console error.
// Usage: node tools/shoot.mjs [--only 1]
import { writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { root, startBrowser } from './cdp.mjs';

const MAX_BYTES = 250 * 1024;
const SHOTS = [
  { file: '1-cover.jpg', path: '/?demo=1&view=tracker&trophy=28&top=1' },
  { file: '2-roadmap.jpg', path: '/?demo=1&view=roadmap&spoilers=0' },
  { file: '3-missables.jpg', path: '/?demo=1&view=missables&spoilers=0' },
  { file: '4-sources.jpg', path: '/?demo=1&view=sources' },
];
const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : null;

const browser = await startBrowser();
const { width, height } = browser.viewport;
try {
  for (const shot of SHOTS) {
    if (only && !shot.file.startsWith(only)) continue;
    await browser.open(shot.path);
    let quality = 92;
    let bytes;
    for (;;) {
      const { data } = await browser.send('Page.captureScreenshot', { format: 'jpeg', quality, clip: { x: 0, y: 0, width, height, scale: 1 } });
      bytes = Buffer.from(data, 'base64');
      if (bytes.length <= MAX_BYTES || quality <= 50) break;
      quality -= 3;
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
