// The missables view: every trophy that can be missed or needs watching, why, its point of no return on a chapter
// timeline, and what to do, all cited. Loaded on demand by import().
import { h } from './dom.js';
import { displayName, displayDescription } from './spoilers.js';
import { renderCiteMarks, renderMedal } from './citations.js';

const TIMELINE = ['Prologue', 'Ch 1', 'Ch 2', 'Ch 3', 'Ch 4', 'Ch 5', 'After credits'];

export function renderMissablesView(root, ctx) {
  const { data } = ctx;
  const flagged = data.trophies.filter((t) => t.missableLevel)
    .sort((a, b) => (a.pointOfNoReturnChapter ?? 9) - (b.pointOfNoReturnChapter ?? 9));
  const hard = flagged.filter((t) => t.missableLevel === 'missable').length;
  const safe = data.trophies.length - flagged.length;
  root.replaceChildren(
    h('header', { class: 'view-head' },
      h('h2', null, 'Missables & points of no return'),
      h('p', null, `${flagged.length} flagged: ${hard} missable, ${flagged.length - hard} to watch. The other ${safe} can be earned after the credits: free roam continues, chapters are never locked for them `,
        renderCiteMarks(['pp', 'gb'], ctx), '. No mission replay, so keep a manual save at each chapter start ', renderCiteMarks(['pp', 'gg'], ctx), '. Grey pins: optional missions marked missable, no trophy attached.')),
    renderMissableTimeline(flagged, data.roadmap.otherMissables ?? [], ctx),
    h('div', { class: 'missable-grid' }, flagged.map((t) => renderMissableCard(t, ctx))),
  );
}

function renderMissableTimeline(flagged, others, ctx) {
  return h('ol', { class: 'timeline', 'aria-label': 'Points of no return by chapter' }, TIMELINE.map((label, i) => {
    const here = flagged.filter((t) => (t.pointOfNoReturnChapter ?? 6) === i);
    return h('li', { class: here.length ? 'has' : '' },
      h('b', null, label),
      here.map((t) => h('span', { class: `pin ${t.missableLevel}` }, displayName(t, ctx.store))),
      others.filter((m) => m.ch === i).map((m) => h('span', { class: 'pin other', title: 'Optional mission marked missable; no trophy needs it' }, m.name, ' ', renderCiteMarks(m.cite, ctx))));
  }));
}

function renderMissableCard(trophy, ctx) {
  const hard = trophy.missableLevel === 'missable';
  const action = trophy.steps[trophy.missableStep ?? 0];
  return h('article', { class: `missable-card ${trophy.missableLevel}`, onclick: () => ctx.selectTrophy(trophy.id, 'checklist') },
    h('header', null,
      renderMedal(trophy.grade),
      h('div', null,
        h('h3', null, displayName(trophy, ctx.store), h('em', { class: `badge ${trophy.missableLevel}` }, hard ? 'Missable' : 'Watch')),
        h('p', { class: 'official' }, displayDescription(trophy, ctx.store)))),
    h('dl', null,
      h('dt', null, 'Why'), h('dd', null, trophy.missableWhy, ' ', renderCiteMarks(trophy.missableCite, ctx)),
      h('dt', null, 'Point of no return'), h('dd', { class: 'ponr' }, trophy.pointOfNoReturn),
      h('dt', null, 'Do this'), h('dd', null, action.text, ' ', renderCiteMarks(action.cite, ctx))));
}

