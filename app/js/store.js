// Progress: earned trophies, counters toward counted trophies, per-trophy reveals and the spoiler setting, saved in
// localStorage with the time of the last save. A ?demo=1 session starts from DEMO_PROGRESS and saves under its own
// key, so it never reads or touches the reader's saved progress.
const STORAGE_KEY = 'leonida55.progress.v1';
const DEMO_KEY = 'leonida55.demo.v1';

// A player part-way into Chapter 3: the Prologue to Chapter 2 story done, a few early side trophies, counters running.
// Break the Bank (#9) is left unearned so the spoiler shield still shows one hidden story trophy.
export const DEMO_PROGRESS = {
  earned: [2, 20, 3, 8, 4, 21, 33, 46, 47, 54, 55],
  counters: { 15: 142, 17: 19, 23: 4, 25: 3, 26: 6, 28: 9, 30: 1, 31: 64, 32: 22, 35: 48, 43: 4, 48: 310, 52: 120000, 53: 64000 },
};

export function emptyProgress() {
  return { earned: [], counters: {}, revealed: [], settings: { spoilers: true }, savedAt: null };
}

export function createProgressStore({ demo = false } = {}) {
  const key = demo ? DEMO_KEY : STORAGE_KEY;
  let progress = demo ? { ...emptyProgress(), ...structuredClone(DEMO_PROGRESS) } : readSavedProgress(key);
  const listeners = new Set();
  const commit = () => {
    const previous = progress.savedAt;
    progress.savedAt = new Date().toISOString();
    if (!writeProgress(key, progress)) progress.savedAt = previous;
    listeners.forEach((fn) => fn(progress));
  };
  if (demo) commit();
  return {
    demo,
    get: () => progress,
    isEarned: (id) => progress.earned.includes(id),
    isRevealed: (id) => progress.revealed.includes(id),
    counter: (id) => progress.counters[id] ?? 0,
    savedAt: () => (progress.savedAt ? new Date(progress.savedAt) : null),
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

function readSavedProgress(key) {
  try {
    const saved = JSON.parse(localStorage.getItem(key) ?? 'null');
    if (saved && Array.isArray(saved.earned)) return { ...emptyProgress(), ...saved };
  } catch { /* unreadable or blocked storage: start fresh */ }
  return emptyProgress();
}

// True when the browser kept it (storage can be full or blocked).
function writeProgress(key, progress) {
  try {
    localStorage.setItem(key, JSON.stringify(progress));
    return true;
  } catch {
    return false;
  }
}
