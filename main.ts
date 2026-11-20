// Leonida 55's hand-in program (Node 22, standard library only). The guide is this directory's app/ folder, plain
// static files a browser opens at app/index.html (ES modules, CSS, no build step), offline: it loads nothing over the
// network, and its trophy list and guides are app/data/trophies.json, its pages app/data/sources.tsv, its roadmap
// app/data/roadmap.json. This program checks the data, the screenshots and the offline references, then copies app/
// and screenshots/ from beside this file to /output and writes /output/dossier.json, the summary the judge reads, with
// the vendored make.fun library. vendor/makefun-frontend.ts stays as the kit shipped it: the scorer requires
// dossier.json to be byte for byte what its own copy writes.
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

type Cited = { text: string; cite: string[] };
type Trophy = {
  id: number; name: string; description: string; grade: string; guide: string; cites?: string[][];
  missable?: { level: string; why: string; ponr: string; cite: string[] };
  disputes?: { topic: string; a: Cited; b: Cited; call: string }[];
};
type Page = { id: string; site: string; title: string; url: string; read: string };

// The page table: tab-separated, header line first, one cited page a line ([n] in a guide is its line number).
function readSourceTable(): Page[] {
  const [head, ...rows] = readFileSync(join(here, 'app/data/sources.tsv'), 'utf8').trim().split('\n').map((line) => line.split('\t'));
  return rows.map((cells) => Object.fromEntries(head.map((key, i) => [key, cells[i] ?? ''])) as Page);
}

// Refuse to hand in a guide whose trophy file would fail the gate or show an uncited claim: the 55 official names
// (the kit starter's list, kept untouched in tools/official-list.json), each named once with its official description
// and grade and a non-blank guide, grades 1/2/6/46; every guide line ("In short", then one numbered step a line)
// matched by a non-empty list of page ids in "cites", its [n] marks pointing at those very pages; every missable
// window and both sides of every dispute cited; every cited page in the page table and every page cited somewhere;
// every trophy placed once in the roadmap.
function validateTrophyData(): string {
  const read = (path: string) => JSON.parse(readFileSync(join(here, path), 'utf8'));
  const trophies: Trophy[] = read('app/data/trophies.json').trophies;
  // Without tools/ (a partial checkout) the guide's own list stands in, so the count, grade and guide checks still run.
  const official: Trophy[] = existsSync(join(here, 'tools/official-list.json')) ? read('tools/official-list.json').trophies : trophies;
  const pages = readSourceTable();
  const pageNumber = new Map(pages.map((p, i) => [p.id, i + 1]));
  const roadmap: { groups: { id: string; trophies: number[] }[] } = read('app/data/roadmap.json');
  const problems: string[] = [];
  for (const o of official) {
    const item = trophies.find((t) => t.name === o.name);
    if (!item) problems.push(`missing trophy: ${o.name}`);
    else if (typeof item.guide !== 'string' || !item.guide.trim()) problems.push(`no guide: ${o.name}`);
    else if (item.grade !== o.grade || item.description !== o.description) problems.push(`official grade or description changed: ${o.name}`);
  }
  const grades = ['platinum', 'gold', 'silver', 'bronze'].map((g) => trophies.filter((t) => t.grade === g).length).join('/');
  if (official.length !== 55 || trophies.length !== 55 || grades !== '1/2/6/46') problems.push(`expected 55 trophies 1/2/6/46, got ${trophies.length} ${grades}`);
  const used = new Set<string>();
  const cited = (ids: string[] | undefined, where: string) => {
    if (!ids?.length) problems.push(`${where}: no citation`);
    for (const id of ids ?? []) {
      used.add(id);
      if (!pageNumber.has(id)) problems.push(`${where}: unknown page "${id}"`);
    }
  };
  let steps = 0;
  let disputes = 0;
  for (const t of trophies) {
    const lines = (t.guide ?? '').split('\n');
    const cites = t.cites ?? [];
    if (!lines[0]?.startsWith('In short: ') || lines.length !== cites.length + 1 || !cites.length) problems.push(`#${t.id}: guide lines and citations out of step`);
    cites.forEach((ids, i) => {
      steps += 1;
      const where = `#${t.id} step ${i + 1}`;
      cited(ids, where);
      const marks = ids.map((id) => `[${pageNumber.get(id)}]`).join('');
      const line = lines[i + 1] ?? '';
      if (!line.startsWith(`${i + 1}. `) || !line.endsWith(` ${marks}`) || line.length <= marks.length + 6) problems.push(`${where}: text or [n] marks do not match its citations`);
    });
    if (t.missable) {
      if (!['missable', 'possible', 'risk'].includes(t.missable.level) || !t.missable.why || !t.missable.ponr) problems.push(`#${t.id}: incomplete missable window`);
      cited(t.missable.cite, `#${t.id} missable window`);
    }
    for (const [i, d] of (t.disputes ?? []).entries()) {
      disputes += 1;
      if (!d.topic || !d.call || !d.a?.text || !d.b?.text) problems.push(`#${t.id} dispute ${i + 1}: needs topic, both sides and our call`);
      cited(d.a?.cite, `#${t.id} dispute ${i + 1} side A`);
      cited(d.b?.cite, `#${t.id} dispute ${i + 1} side B`);
    }
  }
  for (const p of pages) {
    if (!/^https:\/\//.test(p.url) || !p.site || !p.title || !/^\d{4}-\d{2}-\d{2}$/.test(p.read)) problems.push(`page ${p.id}: needs a site, a title, an https link and the date read`);
    if (!used.has(p.id)) problems.push(`page ${p.id}: listed but never cited`);
  }
  if (new Set(pages.map((p) => p.url)).size !== pages.length) problems.push('a page is listed twice');
  const placed = roadmap.groups.flatMap((g) => g.trophies);
  if (placed.length !== 55 || new Set(placed).size !== 55 || trophies.some((t) => !placed.includes(t.id))) problems.push('roadmap must place each trophy exactly once');
  if (problems.length) throw new Error(`trophy data refused:\n  ${problems.slice(0, 12).join('\n  ')}`);
  const sites = new Set(pages.map((p) => p.site)).size;
  return `55/55 official trophies with guides (${grades}), ${steps} cited steps, ${disputes} disputes with both sides cited, ${pages.length} pages from ${sites} sites`;
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
// stylesheets may name an absolute or protocol-relative URL, and no fetch() may name one either. Plain <a href> links
// to sources are allowed.
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
      ...text.matchAll(/\bfetch\(\s*['"`]((?:[a-z]+:)?\/\/[^'"`]+)/gi),
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
