// The roadmap to the platinum, left to right: stage 1 is the story, one column per chapter (lead, key missions, the
// trophies to earn there and the point of no return to beat), then stages 2-6, each with its cited note, earned/total
// and trophies. Every trophy appears once, at its roadmap place. Loaded on demand by import().
import { h } from './dom.js';
import { displayName } from './spoilers.js';
import { renderCiteMarks, renderMedal } from './citations.js';
import { MISSABLE_LEVELS } from './data.js';

export function renderRoadmapView(root, ctx) {
  const { data, store } = ctx;
  const done = data.trophies.filter((t) => store.isEarned(t.id)).length;
  const groupsOf = (stage) => data.roadmap.groups.filter((g) => g.stage === stage);
  root.replaceChildren(
    h('header', { class: 'view-head' },
      h('h2', null, 'Roadmap to the platinum'),
      h('p', null, `${data.roadmap.stages.length} stages, ${data.roadmap.groups.length} steps in play order · ${done}/${data.trophies.length} earned · placed by the chapter or mission each official description names`)),
    h('section', { class: 'road-story' },
      renderStageBand(data.roadmap.stages[0], groupsOf(1), ctx),
      h('ol', { class: 'chapter-cols' }, groupsOf(1).map((g) => renderChapterColumn(g, ctx)))),
    h('ol', { class: 'stage-cols' }, data.roadmap.stages.slice(1).map((s) => renderStageColumn(s, groupsOf(s.id), ctx))),
    renderSaveChecklist(ctx),
  );
}

// The cited save routine that keeps every window open (the save plan's steps marked beforeNoReturn), as a strip
// under the stages.
function renderSaveChecklist(ctx) {
  return h('section', { class: 'road-checklist' },
    h('h3', null, 'Before each point of no return', h('small', null, 'no mission replay')),
    h('ol', null, (ctx.data.roadmap.savePlan ?? []).filter((p) => p.beforeNoReturn).map((p) => h('li', null, p.text, ' ', renderCiteMarks(p.cite, ctx)))));
}

function trophiesIn(groups, ctx) {
  const ids = new Set(groups.map((g) => g.id));
  return ctx.data.ordered.filter((t) => ids.has(t.group));
}

function renderProgress(list, ctx) {
  const earned = list.filter((t) => ctx.store.isEarned(t.id)).length;
  return h('span', { class: `stage-progress${earned === list.length ? ' done' : ''}` }, `${earned}/${list.length}`,
    h('i', { class: 'mini-bar' }, h('b', { style: `width:${Math.round((earned / list.length) * 100)}%` })));
}

function renderStageBand(stage, groups, ctx) {
  return h('header', { class: 'stage-band' },
    h('span', { class: 'stage-num' }, stage.id),
    h('h3', null, stage.title, h('small', null, stage.hours)),
    h('p', null, stage.text, ' ', renderCiteMarks(stage.cite, ctx)),
    renderProgress(trophiesIn(groups, ctx), ctx));
}

function renderChapterColumn(group, ctx) {
  const here = trophiesIn([group], ctx);
  return h('li', { class: 'chapter-col' },
    h('header', null, h('h4', null, group.short, h('small', null, group.lead)), renderProgress(here, ctx)),
    h('p', { class: 'missions' }, group.missions.join(' › '), ' ', renderCiteMarks(group.missionCite, ctx)),
    h('ul', { class: 'road-trophies' }, here.map((t) => renderRoadTrophy(t, ctx))),
    group.ponr && h('p', { class: 'chapter-warn' }, h('b', null, 'No return: '), group.ponr.text, ' ', renderCiteMarks(group.ponr.cite, ctx)));
}

function renderStageColumn(stage, groups, ctx) {
  const list = trophiesIn(groups, ctx);
  return h('li', { class: 'stage-col' },
    h('header', null,
      h('span', { class: 'stage-num' }, stage.id),
      h('h3', null, stage.title),
      renderProgress(list, ctx)),
    h('p', { class: 'stage-note' }, h('b', null, stage.hours), ' · ', stage.text, ' ', renderCiteMarks(stage.cite, ctx)),
    h('ul', { class: 'road-trophies' }, list.map((t) => renderRoadTrophy(t, ctx))));
}

function renderRoadTrophy(trophy, ctx) {
  const earned = ctx.store.isEarned(trophy.id);
  const level = trophy.missable?.level;
  return h('li', { class: earned ? 'earned' : '', onclick: () => ctx.selectTrophy(trophy.id, 'tracker') },
    h('span', { class: 'tick', 'aria-label': earned ? 'earned' : 'not earned' }, earned ? '✓' : ''),
    renderMedal(trophy.grade),
    h('span', { class: 'road-name' }, displayName(trophy, ctx.store)),
    level && h('em', { class: `badge ${level}` }, MISSABLE_LEVELS[level].short),
  );
}
