// Builds app/data/{trophies,sources,roadmap}.json from the official list (tools/official-list.json, the kit
// starter's file, untouched) and our guides, sources and roadmap. Fails loudly if anything does not check out.
// Usage: node tools/build-data.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { GUIDES } from './guides.mjs';
import { SOURCES, NOT_CITED, READ_ON } from './sources.mjs';
import { STAGES, CHAPTERS, OTHER_MISSABLES } from './roadmap.mjs';

const root = new URL('../', import.meta.url);
const official = JSON.parse(readFileSync(new URL('tools/official-list.json', root), 'utf8'));

// Hidden on PlayStation until earned, as GTABase and GAMES.GG both list them (28).
const HIDDEN = new Set([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 22, 23, 24, 26, 27, 29, 37, 38, 44, 45, 46, 47, 48, 49, 50, 51]);
const HIDDEN_CITE = ['gb', 'gg'];

const sourceIndex = new Map(SOURCES.map((s, i) => [s.id, i + 1]));
const errors = [];
const cite = (ids, where) => {
  for (const id of ids) if (!sourceIndex.has(id)) errors.push(`${where}: unknown source "${id}"`);
  return [...ids].sort((a, b) => sourceIndex.get(a) - sourceIndex.get(b));
};
const marks = (ids) => ids.map((id) => `[${sourceIndex.get(id)}]`).join('');

const trophies = official.trophies.map((t) => {
  const g = GUIDES[t.id];
  if (!g) { errors.push(`no guide for #${t.id} ${t.name}`); return t; }
  const steps = g.steps.map(([text, ...ids]) => ({ text, cite: cite(ids, `#${t.id} step`) }));
  steps.forEach((s, i) => { if (!s.cite.length) errors.push(`#${t.id} step ${i + 1} has no citation`); });
  const disagree = (g.dis ?? []).map(([text, ...ids]) => ({ text, cite: cite(ids, `#${t.id} disagree`) }));
  const mis = g.mis ?? null;
  if (mis) mis.cite = cite(mis.cite, `#${t.id} missable`);
  const used = new Set([...steps, ...disagree].flatMap((s) => s.cite).concat(mis ? mis.cite : []));
  const sources = SOURCES.filter((s) => used.has(s.id)).map((s) => s.id);

  const lines = [`In short: ${g.sum}`];
  steps.forEach((s, i) => lines.push(`${i + 1}. ${s.text} ${marks(s.cite)}`));
  if (mis) lines.push(`${mis.level === 'missable' ? 'Missable' : 'Watch'}: ${mis.why} Point of no return: ${mis.ponr} ${marks(mis.cite)}`);
  for (const d of disagree) lines.push(`Sources disagree: ${d.text} ${marks(d.cite)}`);
  for (const u of g.unc ?? []) lines.push(`Unconfirmed: ${u}`);
  // Full titles, URLs and dates live once in sources.json; the guide text names each source by number and site.
  lines.push(`Sources (read ${READ_ON}, details in sources.json): ` + sources.map((id) => `[${sourceIndex.get(id)}] ${SOURCES[sourceIndex.get(id) - 1].site}`).join('; '));

  return dropEmptyKeys({
    id: t.id,
    name: t.name,
    description: t.description,
    grade: t.grade,
    hidden: HIDDEN.has(t.id),
    kinds: g.k,
    stage: g.st,
    chapter: g.ch,
    count: g.c ?? null,
    missable: mis?.level === 'missable',
    missableLevel: mis?.level ?? null,
    missableWhy: mis?.why ?? null,
    pointOfNoReturn: mis?.ponr ?? null,
    pointOfNoReturnChapter: mis?.ch ?? null,
    missableStep: mis?.step ?? (mis ? 0 : null),
    missableCite: mis?.cite ?? [],
    summary: g.sum,
    steps,
    disagree,
    unconfirmed: g.unc ?? [],
    sources,
    guide: lines.join('\n'),
  });
});

// Keys a trophy does not use (null, or an empty list) are left out; the app's data.js fills them back in.
function dropEmptyKeys(item) {
  return Object.fromEntries(Object.entries(item).filter(([, v]) => v !== null && !(Array.isArray(v) && !v.length)));
}

// Checks: the official names untouched, grades 1/2/6/46, 28 hidden, every guide non-empty and cited.
const grades = trophies.reduce((m, t) => ({ ...m, [t.grade]: (m[t.grade] ?? 0) + 1 }), {});
if (trophies.length !== 55) errors.push(`expected 55 trophies, got ${trophies.length}`);
if (grades.platinum !== 1 || grades.gold !== 2 || grades.silver !== 6 || grades.bronze !== 46) errors.push(`grades ${JSON.stringify(grades)}`);
if (trophies.filter((t) => t.hidden).length !== 28) errors.push('expected 28 hidden');
official.trophies.forEach((o, i) => {
  const t = trophies[i];
  if (t.name !== o.name || t.description !== o.description || t.grade !== o.grade) errors.push(`official fields changed for #${o.id}`);
  if (!t.guide?.trim() || !t.steps?.length) errors.push(`empty guide #${o.id}`);
});
if (!trophies.some((t) => t.name === 'T**s Ass Drug Money')) errors.push('T**s Ass Drug Money missing');
for (const st of STAGES) cite(st.cite, `stage ${st.id}`);
for (const ch of CHAPTERS) cite([...ch.cite, ...(ch.warnCite ?? [])], `chapter ${ch.n}`);
for (const m of OTHER_MISSABLES) cite(m.cite, m.name);
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }

// Compact JSON: the dossier's text holds every source file whole up to 160 KiB, data files included.
const out = (name, data) => writeFileSync(new URL(`app/data/${name}`, root), JSON.stringify(data) + '\n');
out('trophies.json', {
  game: official.game,
  platform: official.platform,
  list: official.list,
  officialFrom: 'Names, descriptions and grades exactly as the kit\'s starter list (Exophase and PSNProfiles, frozen 2026-11-18).',
  hiddenFrom: HIDDEN_CITE,
  readOn: READ_ON,
  trophies,
});
out('sources.json', { readOn: READ_ON, sources: SOURCES, notCited: NOT_CITED });
out('roadmap.json', { stages: STAGES, chapters: CHAPTERS, otherMissables: OTHER_MISSABLES });
const stepCount = trophies.reduce((n, t) => n + t.steps.length, 0);
console.log(`ok: 55 trophies, ${stepCount} steps (all cited), ${SOURCES.length} sources, grades ${JSON.stringify(grades)}`);
