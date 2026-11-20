// Loads the trophy list, the sources and the roadmap (fetched after first paint, all files of app/) and indexes them.
export const GRADES = {
  platinum: { letter: 'P', label: 'Platinum', points: 300 },
  gold: { letter: 'G', label: 'Gold', points: 90 },
  silver: { letter: 'S', label: 'Silver', points: 30 },
  bronze: { letter: 'B', label: 'Bronze', points: 15 },
};

export const KINDS = {
  story: 'Story',
  side: 'Side quests',
  collectible: 'Collectibles',
  activity: 'Activities',
  crime: 'Crime',
  world: 'Free roam',
  completion: 'Completion',
  online: 'Online',
};

export async function loadGuideData() {
  const [trophyDoc, sourceDoc, roadmap] = await Promise.all(
    ['data/trophies.json', 'data/sources.json', 'data/roadmap.json'].map((path) => fetch(path).then((r) => r.json())),
  );
  return indexGuideData(trophyDoc, sourceDoc, roadmap);
}

export function indexGuideData(trophyDoc, sourceDoc, roadmap) {
  // Optional keys are left out of the file when empty: fill them in so every trophy has the same shape.
  const trophies = trophyDoc.trophies.map((t) => ({
    chapter: null, count: null, missableLevel: null, missableCite: [], disagree: [], unconfirmed: [], ...t,
  }));
  const sources = sourceDoc.sources;
  const sourceNumber = new Map(sources.map((s, i) => [s.id, i + 1]));
  const citedBy = new Map(sources.map((s) => [s.id, trophies.filter((t) => t.sources.includes(s.id)).length]));
  return {
    meta: trophyDoc,
    trophies,
    byId: new Map(trophies.map((t) => [t.id, t])),
    sources,
    sourceById: new Map(sources.map((s) => [s.id, s])),
    sourceNumber,
    citedBy,
    notCited: sourceDoc.notCited ?? [],
    readOn: sourceDoc.readOn,
    roadmap,
  };
}

export const formatCount = (n) => (n >= 1000 ? `$${n.toLocaleString('en-US')}` : String(n));
