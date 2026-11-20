// A working gta6-trophy-guide-01 entry (Node 22, standard library only): the guide is this directory's app/ folder,
// plain static files a browser opens at app/index.html (ES modules, CSS, no build step), offline: it loads nothing
// over the network, and its trophy list and guides are app/data/trophies.json. The program hands it in: it copies app/
// and screenshots/ from beside this file to /output and writes /output/dossier.json, the summary the judge reads (your
// screenshots, the first load's files and bytes, and your source), with the vendored make.fun library. Leave
// vendor/makefun-frontend.ts as it is: the scorer requires dossier.json to be byte for byte what its own copy writes.
//
// Only the plumbing, not a winner: a plain checklist of the 55 trophies with a one-line hint each. Write a real guide
// for every trophy in your own words, a roadmap to the platinum, filters and a spoiler setting in app/, put 3 or 4 PNG
// or JPEG screenshots of it in screenshots/ (the first by name is the cover; shots.json says which views this
// starter's were taken of), and run it.
//
// Serve it locally with `node serve.ts`, then open http://localhost:8080.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Refuse to hand in a guide whose trophy file would fail the gate: the 55 official names (the kit starter's list,
// kept untouched in tools/official-list.json), each named once with a non-blank guide, grades 1/2/6/46, and every
// citation pointing at a source in app/data/sources.json.
function validateTrophyData(): string {
  const read = (path: string) => JSON.parse(readFileSync(join(here, path), 'utf8'));
  const trophies: { name: string; grade: string; guide: string; steps?: { cite: string[] }[] }[] = read('app/data/trophies.json').trophies;
  // Without tools/ (a partial checkout) the guide's own list stands in, so the count, grade and guide checks still run.
  const official: { name: string; grade: string }[] = existsSync(join(here, 'tools/official-list.json')) ? read('tools/official-list.json').trophies : trophies;
  const sourceIds = new Set<string>(read('app/data/sources.json').sources.map((s: { id: string }) => s.id));
  const problems: string[] = [];
  for (const o of official) {
    const item = trophies.find((t) => t.name === o.name);
    if (!item) problems.push(`missing trophy: ${o.name}`);
    else if (typeof item.guide !== 'string' || !item.guide.trim()) problems.push(`no guide: ${o.name}`);
    else if (item.grade !== o.grade) problems.push(`grade changed: ${o.name}`);
  }
  const grades = ['platinum', 'gold', 'silver', 'bronze'].map((g) => trophies.filter((t) => t.grade === g).length).join('/');
  if (official.length !== 55 || trophies.length !== 55 || grades !== '1/2/6/46') problems.push(`expected 55 trophies 1/2/6/46, got ${trophies.length} ${grades}`);
  for (const t of trophies) for (const s of t.steps ?? []) {
    if (!s.cite.length || s.cite.some((id) => !sourceIds.has(id))) problems.push(`uncited or unknown source in a step of ${t.name}`);
  }
  if (problems.length) throw new Error(`trophy data refused:\n  ${problems.slice(0, 10).join('\n  ')}`);
  return `55/55 official trophies with guides (${grades}), ${sourceIds.size} sources`;
}

// The gate's screenshot rule: 3 or 4 PNG or JPEG files, plain names, at most 256 KiB each, long side at most 1280
// and short side at least 480 pixels. Sizes are read from the image headers (PNG IHDR, JPEG SOF marker).
function imageSize(bytes: Buffer): { width: number; height: number } | null {
  if (bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  }
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) return null;
  for (let i = 2; i + 9 < bytes.length;) {
    if (bytes[i] !== 0xff) return null;
    const marker = bytes[i + 1];
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { width: bytes.readUInt16BE(i + 7), height: bytes.readUInt16BE(i + 5) };
    }
    i += 2 + bytes.readUInt16BE(i + 2);
  }
  return null;
}

function validateScreenshots(): string {
  const dir = join(here, 'screenshots');
  const files = readdirSync(dir).filter((f) => !f.startsWith('.')).sort();
  const problems: string[] = [];
  if (files.length < 3 || files.length > 4) problems.push(`need 3 or 4 screenshots, found ${files.length}`);
  for (const file of files) {
    const bytes = readFileSync(join(dir, file));
    const size = imageSize(bytes);
    if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/.test(file)) problems.push(`${file}: bad name`);
    if (bytes.length > 262144) problems.push(`${file}: ${bytes.length} bytes, over 256 KiB`);
    if (!size) problems.push(`${file}: not a PNG or JPEG`);
    else if (Math.max(size.width, size.height) > 1280 || Math.min(size.width, size.height) < 480) problems.push(`${file}: ${size.width}x${size.height}`);
  }
  if (problems.length) throw new Error(`screenshots refused:\n  ${problems.join('\n  ')}`);
  return `${files.length} screenshots (${files.join(', ')}), cover ${files[0]}`;
}

// A last guard against loading anything over the network: no src/href/import/url() in app/'s pages, scripts or
// stylesheets may name an absolute or protocol-relative URL. Plain <a href> links to sources are allowed.
function validateOfflineReferences(): string {
  const problems: string[] = [];
  const walk = (dir: string): string[] => readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
  const files = walk(join(here, 'app')).filter((f) => /\.(html|js|mjs|css)$/.test(f)).sort();
  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    const loads = [
      ...text.matchAll(/<(?:script|link|img|iframe|source|video|audio|embed)\b[^>]*\b(?:src|href)\s*=\s*["']?((?:[a-z]+:)?\/\/[^"'\s>]+)/gi),
      ...text.matchAll(/\bimport\s*(?:\(|[^'"]*from\s*)\s*['"`]((?:[a-z]+:)?\/\/[^'"`]+)/gi),
      ...text.matchAll(/(?:@import|url\()\s*['"]?((?:[a-z]+:)?\/\/[^'")\s]+)/gi),
    ];
    for (const m of loads) problems.push(`${file.slice(here.length)} loads ${m[1]}`);
  }
  if (problems.length) throw new Error(`network references refused:\n  ${problems.join('\n  ')}`);
  return `${files.length} page/script/style files load nothing over the network`;
}

const checks = [validateTrophyData(), validateScreenshots(), validateOfflineReferences()];
mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// The scorer's own caps (reference/gate.json): only text_max_bytes shapes the bytes; the others refuse an entry the
// scorer would refuse (more than 4 screenshots or one over 256 KiB; more than 993 files and directories in app/ or
// 48 MiB of app files: app/ counts beside /output's own 1000-entry cap, its screenshots/ and dossier.json).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 50331648 }),
);
// The summary goes to stderr so /output holds only what the scorer reads; it is the same on every run.
process.stderr.write(`handed in: ${checks.join('; ')}\n`);
