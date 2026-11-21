// The roadmap strip above the tracker: the 6 roadmap stages in play order (story, side quests, collectibles,
// activities, crime & free roam, 100% & platinum), each with earned/total and a bar, the current stage (the first
// with an unearned trophy) lit. Computed from roadmap.json and saved progress; a click opens that stage's roadmap.
import { h } from './dom.js';

// Earned and total trophies per roadmap stage, in play order. Totals add up to every trophy placed in the roadmap.
export function computeStageProgress(data, store) {
  return data.roadmap.stages.map((stage) => {
    const groups = new Set(data.roadmap.groups.filter((g) => g.stage === stage.id).map((g) => g.id));
    const list = data.trophies.filter((t) => groups.has(t.group));
    return { stage, total: list.length, earned: list.filter((t) => store.isEarned(t.id)).length };
  });
}

// "Story: Prologue to Chapter 5" reads "Story · Prologue–Ch 5" in the strip.
export const shortStageTitle = (title) => title.replace(/^Story: /, 'Story · ').replace(' to ', '–').replace(/Chapter /g, 'Ch ');

export function renderRoadmapStrip(root, ctx) {
  const stages = computeStageProgress(ctx.data, ctx.store);
  const current = stages.find((s) => s.earned < s.total)?.stage.id;
  root.replaceChildren(
    h('span', { class: 'strip-label', title: 'Roadmap to the platinum, in play order' }, 'Roadmap'),
    h('ol', null, stages.map(({ stage, earned, total }) => h('li', null,
      h('button', {
        type: 'button',
        class: `strip-stage${stage.id === current ? ' current' : ''}${earned === total ? ' done' : ''}`,
        title: `Stage ${stage.id}: ${stage.title} (${stage.hours}). ${stage.text}`,
        'aria-current': stage.id === current ? 'step' : null,
        dataset: { stage: stage.id },
        onclick: () => ctx.openRoadmapStage?.(stage.id),
      },
      h('span', { class: 'strip-num' }, stage.id),
      h('span', { class: 'strip-title' }, shortStageTitle(stage.title)),
      h('b', { class: 'strip-count' }, `${earned}/${total}`),
      h('i', { class: 'strip-bar' }, h('b', { style: `width:${total ? Math.round((earned / total) * 100) : 0}%` })))))),
  );
}
