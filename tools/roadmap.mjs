// The roadmap to the platinum: six stages in play order, and the story's chapters with their key missions. Which
// trophies sit in each stage or chapter is not listed here: the app reads it from each trophy's stage and chapter.
export const STAGES = [
  { id: 1, title: 'Story: Prologue to Chapter 5', hours: '60-80 h', cite: ['pp', 'kg', 'gbm'],
    text: 'One run, no replay: save each chapter; start strands as they open.' },
  { id: 2, title: 'Side characters & strangers', hours: '15-25 h', cite: ['pp', 'gbs', 'gt'],
    text: 'Six character strands and 8 stranger strands.' },
  { id: 3, title: 'Collectibles & exploration', hours: '25-40 h', cite: ['pp', 'gb100', 'fxc'],
    text: 'Meditations, cards, WAiNK, scans, map fog.' },
  { id: 4, title: 'Activities', hours: '20-30 h', cite: ['pp', 'gb100', 'kg'],
    text: 'Stunts, ranges, drones, races, gym, challenges.' },
  { id: 5, title: 'Crime & free roam', hours: '10-15 h', cite: ['pp', 'gg', 'gt'],
    text: 'Partner robberies, vaults, gangs, money and one-off stunts.' },
  { id: 6, title: '100% & platinum', hours: '~100 h incl. 2-5', cite: ['pp', 'kg', 'gb100'],
    text: 'The checklist appears after the story.' },
];

// Optional missions GTABase's mission list marks missable or time-sensitive; none is tied to a trophy.
export const OTHER_MISSABLES = [
  { name: 'Get Shirley\'s Rum', ch: 1, cite: ['gbm'] },
  { name: 'Steal the Scooter', ch: 1, cite: ['gbm'] },
  { name: 'Race Against Yago', ch: 3, cite: ['gbm'] },
  { name: 'This Is a Free Call From…', ch: 4, cite: ['gbm'] },
];

// ns: the trophy chapters a row covers (0 is the Prologue, folded into Chapter 1's row).
export const CHAPTERS = [
  { n: 1, ns: [0, 1], title: 'Prologue + Ch 1', lead: 'Lucia, then Jason', missions: ['Prologue', 'Gone Fishing', 'Island Dreams', 'Feng Shui', 'Down to Earth', 'Tourist Trap', 'Discharge Time'], cite: ['gbm'],
    warn: 'Missable: Lucia\'s balcony meditation (morning after Down to Earth).', warnCite: ['pp', 'kg', 'gg'] },
  { n: 2, title: 'Chapter 2', lead: 'Lucia · 18', missions: ['What\'s in the Bag?', 'Moses', 'Daily Driver', 'Breakfast Run', 'Coffee Break', 'Prepare for Vice City', 'Checking Out'], cite: ['gbm'],
    warn: 'Take the 2 Starlet Motel cards before it ends.', warnCite: ['fxc'] },
  { n: 3, title: 'Chapter 3', lead: 'Both · 31', missions: ['Welcome to Vice City', 'Tyrone', 'Here, Kitty Kitty', 'Yasmani\'s Jewelry Jobs', 'Credit Check', 'Race Against Yago', 'The Cartel Heist'], cite: ['gbm'],
    warn: 'Race Against Yago is time-sensitive.', warnCite: ['gbm'] },
  { n: 4, title: 'Chapter 4', lead: 'Both · 35', missions: ['Ocean Beach', 'Another Life', 'Child\'s Play', 'Headliners', 'VCIA Takedown', 'That\'s Where the Money Is…', 'Starting From Zero'], cite: ['gbm'] },
  { n: 5, title: 'Chapter 5', lead: 'Both · 7-10', missions: ['Bird in the Hand', 'Operation Savage Glory', 'The End of the Road'], cite: ['gbm', 'ggs'] },
];
