// The roadmap to the platinum: six stages in play order, split into ten steps (groups). Stage 1 is the story, one
// group per chapter, each with its key missions, its point of no return and the trophies to earn there; stages 2-6
// are the clean-up after the credits. The tracker list, the roadmap view and "Next up" all follow this order, and
// every trophy is placed exactly once (build-data.mjs checks it).
export const STAGES = [
  { id: 1, title: 'Story: Prologue to Chapter 5', hours: '60-80 h', cite: ['pp', 'pp-length', 'kg'],
    text: '91 missions in 5 chapters; no replay, so beat each window before it shuts.' },
  { id: 2, title: 'Side quests', hours: '15-25 h', cite: ['pp-sf', 'gt-sf', 'gl'],
    text: '14 givers; timed ones first.' },
  { id: 3, title: 'Collectibles', hours: '25-40 h', cite: ['pp-100', 'gg-coll', 'gt-coll'],
    text: 'WAiNK, vehicle scans, map fog; all free roam.' },
  { id: 4, title: 'Activities', hours: '20-30 h', cite: ['pp', 'pp-range', 'pp-chal'],
    text: 'Stunts, ranges, drones, races, challenges.' },
  { id: 5, title: 'Crime & free roam', hours: '10-15 h', cite: ['pp', 'pp-banks', 'pp-gangs'],
    text: 'Partner robberies, 8 vaults, 39 gang operations, money and one-off stunts.' },
  { id: 6, title: '100% & platinum', hours: '~100 h', cite: ['pp', 'gfz', 'ps-100'],
    text: '100% list shows after the credits.' },
];

const STORY = ['dx', 'gr-story', 'gtw'];

export const GROUPS = [
  { id: 'ch1', stage: 1, chapters: [0, 1], title: 'Prologue & Chapter 1', short: 'Prologue + Ch 1', lead: 'Lucia, then Jason · 22',
    missions: ['Prologue', 'Gone Fishing', 'Island Dreams', 'Down to Earth', 'Tourist Trap'], missionCite: STORY,
    ponr: { text: 'Tourist Trap. First: Lucia\'s meditation, Shirley\'s errands.', cite: ['vgc-ch1', 'ol-miss', 'griv'] },
    trophies: [2, 20, 28, 3] },
  { id: 'ch2', stage: 1, chapters: [2], title: 'Chapter 2', short: 'Chapter 2', lead: 'Lucia · 11',
    missions: ['What\'s in the Bag?', 'Moses', 'Breakfast Run', 'Coffee Break', 'Checking Out'], missionCite: STORY,
    ponr: { text: 'Checking Out. First: the two Starlet Motel cards.', cite: ['pp-delights', 'pp-corkers', 'fxc'] },
    trophies: [8, 30, 4] },
  { id: 'ch3', stage: 1, chapters: [3], title: 'Chapter 3', short: 'Chapter 3', lead: 'Both, switching · 26',
    missions: ['Welcome to Vice City', 'Here, Kitty Kitty', 'Credit Check', 'The Cartel Heist'], missionCite: STORY,
    ponr: { text: 'Race Against Yago\'s hourglass: race it at once.', cite: ['pp-yago', 'gb-yago', 'pp-sf'] },
    trophies: [9, 25, 5] },
  { id: 'ch4', stage: 1, chapters: [4], title: 'Chapter 4', short: 'Chapter 4', lead: 'Both · 25',
    missions: ['Ocean Beach', 'Child\'s Play', 'Headliners', 'VCIA Takedown', 'Starting From Zero'], missionCite: STORY,
    trophies: [10, 11, 12, 6] },
  { id: 'ch5', stage: 1, chapters: [5], title: 'Chapter 5 & credits', short: 'Chapter 5', lead: 'Both · 7',
    missions: ['Bird in the Hand', 'Operation Savage Glory', 'The End of the Road'], missionCite: STORY,
    ponr: { text: 'the finale. Keep a save from just before it.', cite: ['kotaku', 'ol-miss'] },
    trophies: [13, 7] },
  { id: 'side', stage: 2, title: 'Side characters & strangers', short: 'Stage 2 · Side',
    trophies: [23, 24, 22, 26, 27, 29] },
  { id: 'coll', stage: 3, title: 'Collectibles & exploration', short: 'Stage 3 · Collectibles',
    trophies: [31, 35, 42] },
  { id: 'act', stage: 4, title: 'Activities', short: 'Stage 4 · Activities',
    trophies: [16, 21, 19, 18, 17, 15, 47, 32] },
  { id: 'crime', stage: 5, title: 'Crime & free roam', short: 'Stage 5 · Crime',
    trophies: [54, 55, 33, 34, 39, 46, 36, 43, 41, 40, 52, 38, 37, 45, 44, 51, 50, 49, 53, 48] },
  { id: 'plat', stage: 6, title: '100% & platinum', short: 'Stage 6 · Platinum',
    trophies: [14, 1] },
];

// Time-limited content no trophy needs (shown grey on the missables timeline).
export const OTHER_MISSABLES = [
  { name: 'Shirley\'s errands', ch: 1, cite: ['pp-sf', 'ol-miss', 'egm'] },
  { name: 'Jason\'s cash stash & Ganado', ch: 1, cite: ['ol-miss'] },
  { name: 'This Is a Free Call From…', kind: 'optional call', ch: 4, cite: ['tn', 'gbm'] },
];

// Trophies a guide might suspect, checked and found safe: each says why, with its sources.
export const NOT_MISSABLE = [
  { id: 23, text: 'Kenton returns in Chapters 2-3; all 7 sets stay open after the story.', cite: ['pp', 'gt-kenton'] },
  { id: 46, text: 'Kingpin Bowling respawns in Chapter 3.', cite: ['gb-bowl', 'pp'] },
  { id: 27, text: 'Labs can be destroyed after the story.', cite: ['pp-labs'] },
  { id: 14, text: 'Nothing on the 100% list is missable.', cite: ['pp-100', 'gfz'] },
  { id: 7, text: 'Free roam resumes before the finale after the credits.', cite: ['kotaku', 'sr-ngp'] },
];

// The save plan that protects every window above, each line cited.
export const SAVE_PLAN = [
  { beforeNoReturn: true, text: '15 manual save slots plus one autosave; manual saves only in free roam.', cite: ['boom-save', 'ig-replay', 'ps'] },
  { beforeNoReturn: true, text: 'Save at the start of each chapter and keep those saves.', cite: ['gg', 'ol', 'ps-story'] },
  { beforeNoReturn: true, text: 'Hey Arnold! (Chapter 1) has a permanent choice: save before it.', cite: ['ol-miss'] },
  { beforeNoReturn: true, text: 'Keep an untouched save from just before the finale.', cite: ['ol-miss', 'ol'] },
  { text: 'Cheats unlock after the story and switch trophies off: keep a clean save.', cite: ['tt-cheats', 'kg', 'fx'] },
];

export const MISSABLES_INTRO = {
  text: 'No mission can be replayed, so keep a manual save at each chapter start.',
  cite: ['ig-replay', 'boom-save', 'bb-replay'],
};
