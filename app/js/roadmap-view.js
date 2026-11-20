// The roadmap to the platinum: six ordered stages, the story's chapters with their key missions, and every trophy
// placed by its stage and chapter, with its earned state. Loaded on demand by import().
import { h } from './dom.js';
import { displayName } from './spoilers.js';
import { renderCiteMarks, renderMedal } from './citations.js';

const SIDE_COLUMNS = [[2, 6], [3, 4], [5]];

export function renderRoadmapStages(root, ctx) {
  const { data, store } = ctx;
  const inStage = (id) => data.trophies.filter((t) => t.stage === id);
  const stage = (id) => data.roadmap.stages.find((s) => s.id === id);
  const story = stage(1);
  const done = data.trophies.filter((t) => store.isEarned(t.id)).length;
  root.replaceChildren(
    h('header', { class: 'view-head' },
      h('h2', null, 'Roadmap to the platinum'),
      h('p', null, `${data.roadmap.stages.length} stages in play order · ${done}/${data.trophies.length} earned · placed by the chapter, mission, character and count each official description names`)),
    h('div', { class: 'road-grid' },
      h('section', { class: 'stage story', id: 'stage-1' },
        renderStageHead(story, inStage(1), ctx),
        h('ol', { class: 'chapters' }, data.roadmap.chapters.map((ch) => renderChapterRow(ch, ctx)))),
      SIDE_COLUMNS.map((ids) => h('div', { class: 'road-col' },
        ids.map((id) => renderStageCard(stage(id), inStage(id), ctx))))),
  );
}

function renderStageHead(stage, trophies, ctx) {
  const earned = trophies.filter((t) => ctx.store.isEarned(t.id)).length;
  return h('header', { class: 'stage-head' },
    h('span', { class: 'stage-num' }, stage.id),
    h('div', null,
      h('h3', null, stage.title),
      h('p', null, h('b', null, stage.hours), ' · ', stage.text, ' ', renderCiteMarks(stage.cite, ctx))),
    h('span', { class: `stage-progress${earned === trophies.length ? ' done' : ''}` }, `${earned}/${trophies.length}`));
}

function renderStageCard(stage, trophies, ctx) {
  return h('section', { class: 'stage', id: `stage-${stage.id}` },
    renderStageHead(stage, trophies, ctx),
    h('ul', { class: 'road-trophies' }, trophies.map((t) => renderRoadTrophy(t, ctx))));
}

function renderChapterRow(chapter, ctx) {
  const here = ctx.data.trophies.filter((t) => (chapter.ns ?? [chapter.n]).includes(t.chapter));
  const story = here.filter((t) => t.stage === 1);
  const opens = here.filter((t) => t.stage !== 1);
  return h('li', { class: 'chapter' },
    h('h4', null, chapter.title, h('small', null, chapter.lead)),
    h('div', null,
      h('p', { class: 'missions' }, chapter.missions.join(' → '), ' ', renderCiteMarks(chapter.cite, ctx)),
      story.length > 0 && h('ul', { class: 'road-trophies inline' }, story.map((t) => renderRoadTrophy(t, ctx))),
      opens.length > 0 && h('p', { class: 'starts' }, h('b', null, 'Opens: '),
        opens.map((t, i) => [i ? ' · ' : '', h('a', {
          href: `?trophy=${t.id}`,
          onclick: (e) => { e.preventDefault(); ctx.selectTrophy(t.id, 'checklist'); },
        }, displayName(t, ctx.store))])),
      chapter.warn && h('p', { class: 'chapter-warn' }, '⚠ ', chapter.warn, ' ', renderCiteMarks(chapter.warnCite, ctx))));
}

function renderRoadTrophy(trophy, ctx) {
  const earned = ctx.store.isEarned(trophy.id);
  return h('li', { class: earned ? 'earned' : '', onclick: () => ctx.selectTrophy(trophy.id, 'checklist') },
    h('span', { class: 'tick', 'aria-label': earned ? 'earned' : 'not earned' }, earned ? '✓' : ''),
    renderMedal(trophy.grade),
    h('span', { class: 'road-name' }, displayName(trophy, ctx.store),
      trophy.missableLevel && h('em', { class: `badge ${trophy.missableLevel}` }, trophy.missableLevel === 'missable' ? 'Missable' : 'Watch')));
}
