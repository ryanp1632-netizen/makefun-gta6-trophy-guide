// The progress meter in the top bar: earned count, a bar, per-grade counts and where progress is kept.
import { h } from './dom.js';
import { GRADES } from './data.js';

export function computeProgress(data, store) {
  const earned = data.trophies.filter((t) => store.isEarned(t.id));
  const byGrade = Object.fromEntries(Object.keys(GRADES).map((g) => [g, {
    earned: earned.filter((t) => t.grade === g).length,
    total: data.trophies.filter((t) => t.grade === g).length,
  }]));
  return { earned: earned.length, total: data.trophies.length, byGrade };
}

export function renderProgressSummary(root, data, store) {
  const p = computeProgress(data, store);
  const pct = Math.round((p.earned / p.total) * 100);
  root.replaceChildren(
    h('div', { class: 'big-count' }, h('b', null, p.earned), `/${p.total}`),
    h('div', { class: 'progress-track', role: 'progressbar', 'aria-valuenow': pct, 'aria-valuemin': 0, 'aria-valuemax': 100, title: `${pct}% earned` },
      h('span', { style: `width:${pct}%` })),
    h('small', { class: 'pct' }, `${pct}%`),
  );
}
