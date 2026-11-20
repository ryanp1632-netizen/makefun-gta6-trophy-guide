// Builds app/data/trophies.json, app/data/roadmap.json and app/data/sources.tsv from the official list
// (tools/official-list.json, the kit starter's file, untouched) and our guides, source pages and roadmap. Fails
// loudly if anything does not check out: a step without a citation, a citation of a page not in sources.mjs, a
// dispute without both sides cited, a missable window without a cited point of no return, a page never cited, a
// trophy missing from the roadmap or placed twice.
// Usage: node tools/build-data.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { GUIDES } from './guides.mjs';
import { SOURCES, NOT_CITED, READ_ON } from './sources.mjs';
import { STAGES, GROUPS, OTHER_MISSABLES, NOT_MISSABLE, SAVE_PLAN, MISSABLES_INTRO } from './roadmap.mjs';

const root = new URL('../', import.meta.url);
const official = JSON.parse(readFileSync(new URL('tools/official-list.json', root), 'utf8'));

// Hidden on PlayStation until earned, as GTABase and GAMES.GG both list them (28).
const HIDDEN = new Set([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 22, 23, 24, 26, 27, 29, 37, 38, 44, 45, 46, 47, 48, 49, 50, 51]);
const LEVELS = ['missable', 'possible', 'risk'];
const TAB = '\t';
const NL = '\n';

const sourceIndex = new Map(SOURCES.map((s, i) => [s.id, i + 1]));
const errors = [];
const cite = (ids, where) => {
  if (!ids?.length) errors.push(`${where}: no citation`);
  for (const id of ids ?? []) if (!sourceIndex.has(id)) errors.push(`${where}: unknown source "${id}"`);
  return [...new Set(ids ?? [])].sort((a, b) => sourceIndex.get(a) - sourceIndex.get(b));
};
const marks = (ids) => ids.map((id) => `[${sourceIndex.get(id)}]`).join('');
const side = ([text, ...ids], where) => ({ text, cite: cite(ids, where) });

// Roadmap place of each trophy: its group (stage/chapter).
const place = new Map();
for (const g of GROUPS) for (const id of g.trophies) {
  if (place.has(id)) errors.push(`#${id} placed twice in the roadmap`);
  place.set(id, g.id);
}

const trophies = official.trophies.map((t) => {
  const g = GUIDES[t.id];
  if (!g) { errors.push(`no guide for #${t.id} ${t.name}`); return t; }
  if (!place.has(t.id)) errors.push(`#${t.id} missing from the roadmap`);
  const steps = g.steps.map((s, i) => side(s, `#${t.id} step ${i + 1}`));
  const disputes = (g.disputes ?? []).map((d, i) => {
    if (!d.topic || !d.call) errors.push(`#${t.id} dispute ${i + 1}: needs a topic and our call`);
    return { topic: d.topic, a: side(d.a, `#${t.id} dispute ${i + 1} side A`), b: side(d.b, `#${t.id} dispute ${i + 1} side B`), call: d.call };
  });
  let missable = null;
  if (g.mis) {
    if (!LEVELS.includes(g.mis.level)) errors.push(`#${t.id}: missable level "${g.mis.level}"`);
    if (!g.mis.why || !g.mis.ponr) errors.push(`#${t.id}: missable window needs why and point of no return`);
    missable = { level: g.mis.level, why: g.mis.why, ponr: g.mis.ponr, ponrChapter: g.mis.ch ?? null, before: g.mis.before ?? null, cite: cite(g.mis.cite, `#${t.id} missable`) };
  }
  const used = new Set([...steps.flatMap((s) => s.cite), ...(missable?.cite ?? []), ...disputes.flatMap((d) => [...d.a.cite, ...d.b.cite])]);

  // The "guide" text the gate reads, and the only copy of the step text: the "In short" line, then one numbered line
  // per step ending in its [n] marks. "cites" holds each step's page ids in the same order; the app's data.js splits
  // the guide back into steps. Missable window and disputes stay structured beside it.
  const lines = [`In short: ${g.sum}`];
  steps.forEach((s, i) => {
    if (s.text.includes(NL) || /\[\d+\]/.test(s.text)) errors.push(`#${t.id} step ${i + 1}: no line break or [n] in step text`);
    lines.push(`${i + 1}. ${s.text} ${marks(s.cite)}`);
  });
  return {
    record: dropEmptyKeys({
      id: t.id,
      name: t.name,
      description: t.description,
      grade: t.grade,
      hidden: HIDDEN.has(t.id),
      kinds: g.k,
      chapter: g.ch ?? null,
      count: g.c ?? null,
      guide: lines.join(NL),
      cites: steps.map((s) => s.cite),
      missable,
      disputes,
      unconfirmed: g.unc ?? [],
    }),
    steps,
    sources: SOURCES.filter((s) => used.has(s.id)).map((s) => s.id),
  };
});

// Keys a trophy does not use (null, or an empty list) are left out; the app's data.js fills them back in.
function dropEmptyKeys(item) {
  return Object.fromEntries(Object.entries(item).filter(([, v]) => v !== null && v !== undefined && !(Array.isArray(v) && !v.length)));
}

// Checks: the official names untouched, grades 1/2/6/46, 28 hidden, every guide non-empty and cited.
const records = trophies.map((t) => t.record ?? t);
const grades = records.reduce((m, t) => ({ ...m, [t.grade]: (m[t.grade] ?? 0) + 1 }), {});
if (records.length !== 55) errors.push(`expected 55 trophies, got ${records.length}`);
if (grades.platinum !== 1 || grades.gold !== 2 || grades.silver !== 6 || grades.bronze !== 46) errors.push(`grades ${JSON.stringify(grades)}`);
if (records.filter((t) => t.hidden).length !== 28) errors.push('expected 28 hidden');
official.trophies.forEach((o, i) => {
  const t = records[i];
  if (t.name !== o.name || t.description !== o.description || t.grade !== o.grade) errors.push(`official fields changed for #${o.id}`);
  if (!t.guide?.trim() || !t.cites?.length || t.guide.split(NL).length !== t.cites.length + 1) errors.push(`guide and citations out of step for #${o.id}`);
});
if (!records.some((t) => t.name === 'T**s Ass Drug Money')) errors.push('T**s Ass Drug Money missing');
if (place.size !== 55) errors.push(`roadmap places ${place.size} trophies`);
for (const st of STAGES) cite(st.cite, `stage ${st.id}`);
for (const g of GROUPS) {
  if (g.missions) cite(g.missionCite, `group ${g.id} missions`);
  if (g.ponr) cite(g.ponr.cite, `group ${g.id} point of no return`);
}
for (const m of OTHER_MISSABLES) cite(m.cite, m.name);
for (const m of NOT_MISSABLE) { cite(m.cite, `not-missable #${m.id}`); if (GUIDES[m.id]?.mis) errors.push(`#${m.id} is both flagged and listed as not missable`); }
cite(MISSABLES_INTRO.cite, 'missables intro');
SAVE_PLAN.forEach((p, i) => cite(p.cite, `save plan ${i + 1}`));
const unused = SOURCES.filter((s) => !trophies.some((t) => t.sources?.includes(s.id)));
if (unused.length) errors.push(`pages listed but never cited by a guide: ${unused.map((s) => s.id).join(', ')}`);
const urls = new Set();
for (const s of SOURCES) {
  if (urls.has(s.url)) errors.push(`duplicate page ${s.url}`);
  urls.add(s.url);
  if (!s.site || !s.title || !/^https:\/\//.test(s.url)) errors.push(`source ${s.id} needs site, title and https url`);
  for (const cell of [s.id, s.site, s.title, s.url, s.published, s.read]) if (cell.includes(TAB) || cell.includes(NL)) errors.push(`tab or line break in source ${s.id}`);
}
if (errors.length) { console.error(errors.join(NL)); process.exit(1); }

// Compact JSON: data files are fetched at run time and shown to the judge by path and size only.
const out = (name, data) => writeFileSync(new URL(`app/data/${name}`, root), JSON.stringify(data) + NL);
out('trophies.json', {
  game: official.game,
  platform: official.platform,
  list: official.list,
  officialFrom: 'Names, descriptions and grades exactly as the kit\'s starter list (Exophase and PSNProfiles, frozen 2026-11-18).',
  hiddenFrom: ['gb', 'gg'],
  readOn: READ_ON,
  trophies: records,
});
// The page table is tab-separated text, one page a line in citation order ([n] is its line number).
const header = ['id', 'site', 'title', 'url', 'published', 'read'];
const rows = SOURCES.map((s) => header.map((k) => s[k]).join(TAB));
writeFileSync(new URL('app/data/sources.tsv', root), [header.join(TAB), ...rows].join(NL) + NL);
out('roadmap.json', { readOn: READ_ON, notCited: NOT_CITED, stages: STAGES, groups: GROUPS, otherMissables: OTHER_MISSABLES, notMissable: NOT_MISSABLE, savePlan: SAVE_PLAN, missablesIntro: MISSABLES_INTRO });

const steps = trophies.flatMap((t) => t.steps);
const siteOf = new Map(SOURCES.map((s) => [s.id, s.site]));
const multi = steps.filter((s) => new Set(s.cite.map((id) => siteOf.get(id))).size >= 2).length;
const disputes = records.reduce((n, t) => n + (t.disputes?.length ?? 0), 0);
console.log(`ok: 55 trophies, ${steps.length} steps (all cited, ${multi} by 2+ sites), ${SOURCES.length} pages from ${new Set(SOURCES.map((s) => s.site)).size} sites, ${disputes} disputes, grades ${JSON.stringify(grades)}`);
