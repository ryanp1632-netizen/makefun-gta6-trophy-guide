// Loads the trophy list, the roadmap and the page table (fetched after first paint, all files of app/) and indexes
// them: each guide split into its cited steps, roadmap order, per-page claim counts and the distinct sites behind
// every claim. Nothing here is typed in by hand: every count the app shows is computed from these files.
export const GRADES = {
  platinum: { letter: 'P', label: 'Platinum', points: 300 },
  gold: { letter: 'G', label: 'Gold', points: 90 },
  silver: { letter: 'S', label: 'Silver', points: 30 },
  bronze: { letter: 'B', label: 'Bronze', points: 15 },
};

export const KINDS = {
  story: 'Story',
  side: 'Side',
  collectible: 'Collectibles',
  activity: 'Activities',
  crime: 'Crime',
  world: 'Free roam',
  completion: 'Completion',
  online: 'Online',
};

export const MISSABLE_LEVELS = {
  missable: { label: 'Missable', short: 'Missable' },
  possible: { label: 'Possibly missable', short: 'Possibly missable' },
  risk: { label: 'At risk', short: 'At risk' },
};

export async function loadGuideData() {
  const [trophyDoc, roadmap, table] = await Promise.all([
    fetch('data/trophies.json').then((r) => r.json()),
    fetch('data/roadmap.json').then((r) => r.json()),
    fetch('data/sources.tsv').then((r) => r.text()),
  ]);
  return indexGuideData(trophyDoc, roadmap, parseSourceTable(table));
}

// One page a line: id, site, title, url, published, read (tab-separated, header first). [n] is the line number.
export function parseSourceTable(text) {
  const [head, ...rows] = text.trim().split('\n').map((line) => line.split('\t'));
  return rows.map((cells) => {
    const page = Object.fromEntries(head.map((key, i) => [key, cells[i] ?? '']));
    return { ...page, domain: new URL(page.url).hostname.replace(/^www\./, '') };
  });
}

// The guide text holds the "In short" line, then one numbered line per step ending in its [n] marks; "cites" holds
// each step's page ids in the same order.
export function splitGuide(guide, cites) {
  const [first, ...lines] = guide.split('\n');
  return {
    summary: first.replace(/^In short: /, ''),
    steps: lines.map((line, i) => ({ text: line.replace(/^\d+\. /, '').replace(/ (\[\d+\])+$/, ''), cite: cites[i] ?? [] })),
  };
}

export function indexGuideData(trophyDoc, roadmap, sources) {
  const sourceById = new Map(sources.map((s) => [s.id, s]));
  const siteOf = (id) => sourceById.get(id)?.site;
  const groupOf = new Map(roadmap.groups.flatMap((g, gi) => g.trophies.map((id, order) => [id, { group: g.id, stage: g.stage, order: gi * 100 + order }])));
  // Optional keys are left out of the file when empty: fill them in so every trophy has the same shape.
  const trophies = trophyDoc.trophies.map((t) => {
    const { summary, steps } = splitGuide(t.guide, t.cites);
    for (const s of steps) s.sites = new Set(s.cite.map(siteOf)).size;
    const trophy = { chapter: null, count: null, missable: null, disputes: [], unconfirmed: [], ...t, ...groupOf.get(t.id), summary, steps };
    const used = new Set(citationsOf(trophy).flat());
    trophy.sources = sources.filter((s) => used.has(s.id)).map((s) => s.id);
    return trophy;
  });
  const ordered = [...trophies].sort((a, b) => a.order - b.order);
  return {
    meta: trophyDoc,
    trophies,
    ordered,
    byId: new Map(trophies.map((t) => [t.id, t])),
    sources,
    sourceById,
    sourceNumber: new Map(sources.map((s, i) => [s.id, i + 1])),
    sourceUse: countSourceUse(trophies, sources),
    sitesOf: (ids) => [...new Set(ids.map(siteOf).filter(Boolean))],
    notCited: roadmap.notCited ?? [],
    officialFrom: (trophyDoc.hiddenFrom ?? []).filter((id) => sourceById.has(id)),
    readOn: roadmap.readOn,
    roadmap,
    groupById: new Map(roadmap.groups.map((g) => [g.id, g])),
  };
}

// Every place a trophy's guide cites a page: its steps, its missable window and both sides of each dispute.
export function citationsOf(trophy) {
  return [
    ...trophy.steps.map((s) => s.cite),
    ...(trophy.missable ? [trophy.missable.cite] : []),
    ...trophy.disputes.flatMap((d) => [d.a.cite, d.b.cite]),
  ];
}

function countSourceUse(trophies, sources) {
  const use = new Map(sources.map((s) => [s.id, { guides: 0, claims: 0 }]));
  for (const t of trophies) {
    for (const id of t.sources) use.get(id).guides += 1;
    for (const s of t.steps) for (const id of s.cite) if (use.has(id)) use.get(id).claims += 1;
  }
  return use;
}

export const formatCount = (n) => (n >= 1000 ? `$${n.toLocaleString('en-US')}` : String(n));
export const chapterLabel = (ch) => (ch === 0 ? 'Prologue' : `Chapter ${ch}`);
