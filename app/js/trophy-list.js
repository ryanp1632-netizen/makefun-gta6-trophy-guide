// The tracker list: every trophy in roadmap order, grouped under its stage/chapter header with an earned/total bar;
// each row shows the earned box, grade, official name and description, and tags (kind, chapter, count, PSN-hidden,
// number of sources, missable level, dispute).
import { h } from './dom.js';
import { KINDS, MISSABLE_LEVELS, formatCount } from './data.js';
import { matchesFilters } from './filters.js';
import { displayName, displayDescription, isSpoilerHidden } from './spoilers.js';
import { renderMedal } from './citations.js';

export function renderTrophyList(root, ctx) {
  const { data, store, filters } = ctx;
  const shown = data.ordered.filter((t) => matchesFilters(t, filters, store));
  const items = [];
  for (const group of data.roadmap.groups) {
    const all = data.ordered.filter((t) => t.group === group.id);
    const here = shown.filter((t) => t.group === group.id);
    if (!here.length) continue;
    items.push(renderGroupHeader(group, all, store));
    items.push(...here.map((t) => renderTrophyRow(t, ctx)));
  }
  root.replaceChildren(...items);
  if (!shown.length) root.append(h('li', { class: 'empty' }, 'No trophy matches these filters.'));
  root.dataset.count = `${shown.length} of ${data.trophies.length} shown`;
  const foot = document.getElementById('list-foot');
  if (foot) foot.replaceChildren(h('b', null, `${shown.length}/${data.trophies.length} shown`),
    store.demo ? ' · demo progress (your save untouched)' : ' · progress saved in localStorage');
}

function renderGroupHeader(group, trophies, store) {
  const earned = trophies.filter((t) => store.isEarned(t.id)).length;
  const pct = Math.round((earned / trophies.length) * 100);
  return h('li', { class: 'group-head', role: 'presentation' },
    h('span', { class: 'group-stage' }, `Stage ${group.stage}`),
    h('b', null, group.title),
    h('span', { class: 'group-bar', title: `${earned} of ${trophies.length} earned` }, h('i', { style: `width:${pct}%` })),
    h('small', null, `${earned}/${trophies.length}`));
}

export function renderTrophyRow(trophy, ctx) {
  const { store } = ctx;
  const earned = store.isEarned(trophy.id);
  const masked = isSpoilerHidden(trophy, store);
  const selected = ctx.state.selectedId === trophy.id;
  const level = trophy.missable?.level;
  return h('li', {
    class: `trophy-row ${trophy.grade}${earned ? ' earned' : ''}${masked ? ' masked' : ''}${selected ? ' selected' : ''}`,
    dataset: { id: trophy.id },
    onclick: () => ctx.selectTrophy(trophy.id),
  },
  h('input', {
    type: 'checkbox', checked: earned, 'aria-label': `Earned: ${displayName(trophy, store)}`,
    onclick: (e) => e.stopPropagation(),
    onchange: () => store.toggleEarned(trophy.id),
  }),
  renderMedal(trophy.grade),
  h('div', { class: 'row-text' },
    h('span', { class: 'row-line' },
      h('b', { class: 'row-name' }, displayName(trophy, store)),
      masked && h('button', {
        type: 'button', class: 'reveal',
        onclick: (e) => { e.stopPropagation(); store.revealTrophy(trophy.id); },
      }, 'Reveal')),
    h('span', { class: 'row-desc' }, displayDescription(trophy, store)),
    h('span', { class: 'row-tags' },
      level && h('em', { class: `badge ${level}` }, MISSABLE_LEVELS[level].short),
      trophy.disputes.length > 0 && !masked && h('em', { class: 'badge dispute' }, 'Sources differ'),
      !trophy.kinds.includes('story') && h('em', { class: 'tag' }, KINDS[trophy.kinds[0]]),
      trophy.count > 1 && h('em', { class: 'tag count' }, `${formatCount(store.counter(trophy.id))}/${formatCount(trophy.count)}`),
      trophy.hidden && h('em', { class: 'tag', title: 'Hidden on PlayStation until earned' }, 'PSN-hidden'),
      h('em', { class: 'tag src', title: 'Pages this guide cites' }, `${trophy.sources.length} src`))),
  );
}
