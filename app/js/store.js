// Progress: earned trophies, counters toward counted trophies, per-trophy reveals and the spoiler setting, saved in
// localStorage. A ?demo=1 session works on an in-memory copy and never touches the saved progress.
const STORAGE_KEY = 'leonida55.progress.v1';

export const DEMO_PROGRESS = {
  earned: [2, 20, 16, 21, 35, 36, 42, 54, 55, 33, 47],
  counters: { 15: 142, 17: 19, 25: 3, 28: 9, 30: 1, 31: 64, 32: 22, 48: 310, 52: 120000, 53: 64000 },
};

export function emptyProgress() {
  return { earned: [], counters: {}, revealed: [], settings: { spoilers: true } };
}

export function createProgressStore({ demo = false } = {}) {
  let progress = demo ? { ...emptyProgress(), ...structuredClone(DEMO_PROGRESS) } : readSavedProgress();
  const listeners = new Set();
  const commit = () => {
    if (!demo) saveProgress(progress);
    listeners.forEach((fn) => fn(progress));
  };
  return {
    demo,
    get: () => progress,
    isEarned: (id) => progress.earned.includes(id),
    isRevealed: (id) => progress.revealed.includes(id),
    counter: (id) => progress.counters[id] ?? 0,
    onChange: (fn) => listeners.add(fn),
    toggleEarned(id) {
      progress.earned = progress.earned.includes(id) ? progress.earned.filter((x) => x !== id) : [...progress.earned, id];
      commit();
    },
    setCounter(id, value, max) {
      progress.counters[id] = Math.max(0, Math.min(max ?? Infinity, Math.round(value)));
      commit();
    },
    revealTrophy(id) {
      if (!progress.revealed.includes(id)) progress.revealed = [...progress.revealed, id];
      commit();
    },
    setSpoilers(on) {
      progress.settings = { ...progress.settings, spoilers: on };
      commit();
    },
    replaceProgress(next) {
      progress = { ...emptyProgress(), ...next, settings: { ...progress.settings, ...(next.settings ?? {}) } };
      commit();
    },
  };
}

function readSavedProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
    if (saved && Array.isArray(saved.earned)) return { ...emptyProgress(), ...saved };
  } catch { /* unreadable or blocked storage: start fresh */ }
  return emptyProgress();
}

function saveProgress(progress) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch { /* storage full or blocked */ }
}
