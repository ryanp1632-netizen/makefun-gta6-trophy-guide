// The missables view: a timeline of points of no return by chapter, one card per missable, possibly missable or
// at-risk trophy (why, point of no return, what to do first, all cited), then the trophies checked and found safe and
// the save plan that protects every window. Loaded on demand by import().
import { h } from './dom.js';
import { displayName, displayDescription } from './spoilers.js';
import { renderCiteMarks, renderMedal } from './citations.js';
import { MISSABLE_LEVELS } from './data.js';

// Index = chapter number; the Prologue (0) has no window of its own, so the timeline starts at Chapter 1.
const TIMELINE = ['Prologue', 'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5', 'After credits'];
const LEVEL_ORDER = { missable: 0, possible: 1, risk: 2 };

export function renderMissablesView(root, ctx) {
  const { data } = ctx;
  const flagged = data.trophies.filter((t) => t.missable)
    .sort((a, b) => (a.missable.ponrChapter ?? 9) - (b.missable.ponrChapter ?? 9) || LEVEL_ORDER[a.missable.level] - LEVEL_ORDER[b.missable.level]);
  const count = (l) => flagged.filter((t) => t.missable.level === l).length;
  const intro = data.roadmap.missablesIntro;
  root.replaceChildren(
    h('header', { class: 'view-head' },
      h('h2', null, 'Missables & points of no return'),
      h('p', null, `${flagged.length} flagged: ${count('missable')} missable, ${count('possible')} possibly missable, ${count('risk')} at risk; the other ${data.trophies.length - flagged.length} checked and none. `,
        intro.text, ' ', renderCiteMarks(intro.cite, ctx))),
    renderMissableTimeline(flagged, ctx),
    h('div', { class: 'missable-grid' }, flagged.map((t) => renderMissableCard(t, ctx))),
    h('div', { class: 'missable-foot' },
      renderSafeList(ctx),
      h('section', { class: 'save-plan' },
        h('h3', null, 'Save plan', h('small', null, 'no mission replay, no New Game+')),
        h('ol', null, (data.roadmap.savePlan ?? []).map((p) => h('li', null, p.text, ' ', renderCiteMarks(p.cite, ctx)))))),
  );
}

function renderMissableTimeline(flagged, ctx) {
  const { groups, otherMissables = [] } = ctx.data.roadmap;
  return h('ol', { class: 'timeline', 'aria-label': 'Points of no return by chapter' }, TIMELINE.map((label, i) => {
    if (i === 0) return null;
    // A window with no known point of no return gets a card but no pin on the timeline.
    const here = flagged.filter((t) => t.missable.ponrChapter != null && Math.max(1, t.missable.ponrChapter) === i);
    const group = i > 0 && i < 6 ? groups.find((g) => g.chapters?.includes(i)) : null;
    return h('li', { class: here.length ? 'has' : '' },
      h('b', null, label),
      here.map((t) => h('span', { class: `pin ${t.missable.level}` }, displayName(t, ctx.store))),
      otherMissables.filter((m) => m.ch === i).map((m) => h('span', { class: 'pin other', title: 'Time-limited; no trophy needs it' }, m.name, ' ', renderCiteMarks(m.cite, ctx))),
      group?.ponr && h('small', { class: 'ponr-note' }, 'No return: ', group.ponr.text),
      i === 6 && h('small', { class: 'ponr-note safe' }, 'Free roam resumes before the finale; everything else stays open.'));
  }).filter(Boolean));
}

function renderMissableCard(trophy, ctx) {
  const m = trophy.missable;
  return h('article', { class: `missable-card ${m.level}`, onclick: () => ctx.selectTrophy(trophy.id, 'tracker') },
    h('header', null,
      renderMedal(trophy.grade),
      h('div', null,
        h('h3', null, displayName(trophy, ctx.store), h('em', { class: `badge ${m.level}` }, MISSABLE_LEVELS[m.level].label)),
        h('p', { class: 'official' }, displayDescription(trophy, ctx.store)))),
    h('dl', null,
      h('dt', null, 'Why'), h('dd', null, m.why, ' ', renderCiteMarks(m.cite, ctx)),
      h('dt', null, 'No return'), h('dd', { class: 'ponr' }, m.ponr),
      m.before && [h('dt', null, 'Do first'), h('dd', null, m.before)]));
}

function renderSafeList(ctx) {
  const items = ctx.data.roadmap.notMissable ?? [];
  return h('section', { class: 'safe-list' },
    h('h3', null, 'Checked: not missable', h('small', null, 'often asked, safe after the story')),
    h('ul', null, items.map((item) => {
      const t = ctx.data.byId.get(item.id);
      return h('li', { onclick: () => ctx.selectTrophy(t.id, 'tracker') },
        renderMedal(t.grade), h('b', null, displayName(t, ctx.store)), ' ', item.text, ' ', renderCiteMarks(item.cite, ctx));
    })));
}
