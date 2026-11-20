// The progress row: earned count, bar, per-grade counts and trophy points.
import { h } from './dom.js';
import { GRADES } from './data.js';

export function computeProgress(data, store) {
  const earned = data.trophies.filter((t) => store.isEarned(t.id));
  const byGrade = Object.fromEntries(Object.keys(GRADES).map((g) => [g, {
    earned: earned.filter((t) => t.grade === g).length,
    total: data.trophies.filter((t) => t.grade === g).length,
  }]));
  const points = (list) => list.reduce((n, t) => n + GRADES[t.grade].points, 0);
  return { earned: earned.length, total: data.trophies.length, byGrade, points: points(earned), maxPoints: points(data.trophies) };
}

export function renderProgressSummary(root, data, store) {
  const p = computeProgress(data, store);
  const pct = Math.round((p.earned / p.total) * 100);
  root.replaceChildren(
    h('div', { class: 'big-count' }, h('b', null, p.earned), `/${p.total}`, h('small', null, 'earned')),
    h('div', { class: 'progress-track', role: 'progressbar', 'aria-valuenow': pct, 'aria-valuemin': 0, 'aria-valuemax': 100 },
      h('span', { style: `width:${pct}%` }), h('em', null, `${pct}%`)),
    h('ul', { class: 'grade-counts' }, Object.entries(p.byGrade).map(([g, c]) =>
      h('li', null, h('i', { class: `medal ${g}` }, GRADES[g].letter), h('b', null, c.earned), `/${c.total}`))),
    h('div', { class: 'points' }, h('b', null, p.points.toLocaleString('en-US')), ` / ${p.maxPoints.toLocaleString('en-US')} pts`),
    store.demo ? h('span', { class: 'demo-pill', title: 'Opened with ?demo=1: sample progress shown; your saved progress is left untouched' }, 'Saves to localStorage · demo data shown') : h('span', { class: 'saved-pill' }, 'Saved in localStorage'),
  );
}
