// "Missables watch" beside the guide: every trophy with a missable window (missable, possibly missable or at risk),
// one line each: grade, name (behind the spoiler shield), level, its point of no return in a few words and a cited
// page. Computed from the trophies' missable windows; a click opens that trophy's guide.
import { h } from './dom.js';
import { displayName, isSpoilerHidden } from './spoilers.js';
import { renderCiteMarks, renderMedal } from './citations.js';

const LEVEL_ORDER = { missable: 0, possible: 1, risk: 2 };
const LEVEL_TAG = { missable: 'Missable', possible: 'Possibly', risk: 'At risk' };

// Flagged trophies, the earliest point of no return first (unknown ones last), the surest loss first within a chapter.
export function pickMissablesWatch(data) {
  return data.trophies.filter((t) => t.missable)
    .sort((a, b) => (a.missable.ponrChapter ?? 9) - (b.missable.ponrChapter ?? 9) || LEVEL_ORDER[a.missable.level] - LEVEL_ORDER[b.missable.level] || a.order - b.order);
}

// "starting Tourist Trap, Chapter 1." reads "starting Tourist Trap, Ch 1"; what follows a ";" or "(" is left to the guide.
export const shortPonr = (ponr) => ponr.split(/[;(]/)[0].replace(/Chapter /g, 'Ch ').replace(/[.,\s]+$/, '');

export function renderMissablesWatch(ctx) {
  const flagged = pickMissablesWatch(ctx.data);
  return h('section', { class: 'missables-watch', id: 'missables-watch', dataset: { count: flagged.length } },
    h('h2', null, `Missables watch · ${flagged.length}`, h('small', null, '⏳ = no return')),
    h('ol', null, flagged.map((t) => {
      const m = t.missable;
      const hidden = isSpoilerHidden(t, ctx.store);
      return h('li', { class: `${m.level}${hidden ? ' hidden-story' : ''}${ctx.store.isEarned(t.id) ? ' earned' : ''}`, dataset: { id: t.id }, onclick: () => ctx.selectTrophy(t.id) },
        renderMedal(t.grade),
        h('b', { class: 'watch-name' }, displayName(t, ctx.store)),
        h('em', { class: `badge ${m.level}` }, LEVEL_TAG[m.level]),
        h('span', { class: 'watch-ponr', title: `Point of no return: ${m.ponr}` }, h('i', null, '⏳'), shortPonr(m.ponr), ' ', renderCiteMarks(m.cite.slice(0, 1), ctx)));
    })));
}
