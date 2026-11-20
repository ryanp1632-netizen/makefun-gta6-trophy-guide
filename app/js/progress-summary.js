// The progress meter in the top bar, all computed from the saved progress: "N / 55 earned" with a bar, earned of total
// per grade, the collectibles logged on the collectible counters, and where and when progress was last saved.
import { h } from './dom.js';
import { GRADES } from './data.js';

export function computeProgress(data, store) {
  const earned = data.trophies.filter((t) => store.isEarned(t.id));
  const byGrade = Object.fromEntries(Object.keys(GRADES).map((g) => [g, {
    earned: earned.filter((t) => t.grade === g).length,
    total: data.trophies.filter((t) => t.grade === g).length,
  }]));
  // A collectible trophy that is earned counts as complete, whatever its counter says.
  const logged = data.trophies.filter((t) => t.kinds.includes('collectible') && t.count > 1)
    .reduce((n, t) => n + (store.isEarned(t.id) ? t.count : Math.min(store.counter(t.id), t.count)), 0);
  return { earned: earned.length, total: data.trophies.length, byGrade, logged, savedAt: store.savedAt() };
}

// "21:14" for a save made today, "18 Nov 21:14" for an older one.
export function formatSaveTime(date, now = new Date()) {
  const time = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  if (date.toDateString() === now.toDateString()) return time;
  return `${date.getDate()} ${date.toLocaleString('en-GB', { month: 'short' })} ${time}`;
}

export function renderProgressSummary(root, data, store) {
  const p = computeProgress(data, store);
  const pct = Math.round((p.earned / p.total) * 100);
  root.replaceChildren(
    h('div', { class: 'big-count' }, h('b', null, p.earned), h('span', null, ` / ${p.total}`), h('small', null, 'earned')),
    h('div', { class: 'progress-detail' },
      h('div', { class: 'progress-line' },
        h('div', { class: 'progress-track', role: 'progressbar', 'aria-valuenow': pct, 'aria-valuemin': 0, 'aria-valuemax': 100, title: `${pct}% earned` },
          h('span', { style: `width:${pct}%` })),
        h('span', { class: 'grade-counts', 'aria-label': 'Earned of total by grade' },
          Object.entries(GRADES).map(([g, info]) => h('span', { class: `gc ${g}`, title: info.label },
            h('i', null, info.letter), `${p.byGrade[g].earned}/${p.byGrade[g].total}`)))),
      h('div', { class: 'progress-line small' },
        h('span', { class: 'logged' }, h('b', null, p.logged.toLocaleString('en-US')), ' collectibles logged'),
        h('span', { class: p.savedAt ? 'saved-note' : 'saved-note unsaved', title: store.demo ? 'Demo progress, saved under its own key: your own saved progress is untouched' : 'Progress is kept in this browser\'s localStorage' },
          p.savedAt ? `Saved in this browser ${formatSaveTime(p.savedAt)}` : 'Saves in this browser as you go'))),
  );
}
