// The checklist: every trophy with its official name, description, grade, earned box and badges.
import { h } from './dom.js';
import { GRADES, KINDS, formatCount } from './data.js';
import { matchesFilters } from './filters.js';
import { displayName, displayDescription, isSpoilerHidden } from './spoilers.js';
import { renderMedal } from './citations.js';

export function renderTrophyList(root, ctx) {
  const { data, store, filters } = ctx;
  const shown = data.trophies.filter((t) => matchesFilters(t, filters, store));
  root.replaceChildren(...shown.map((t) => renderTrophyRow(t, ctx)));
  if (!shown.length) root.append(h('li', { class: 'empty' }, 'No trophy matches these filters.'));
  root.dataset.count = `${shown.length} of ${data.trophies.length} shown`;
}

export function renderTrophyRow(trophy, ctx) {
  const { store } = ctx;
  const earned = store.isEarned(trophy.id);
  const masked = isSpoilerHidden(trophy, store);
  const selected = ctx.state.selectedId === trophy.id;
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
      trophy.missableLevel === 'missable' && h('em', { class: 'badge missable' }, 'Missable'),
      trophy.missableLevel === 'watch' && h('em', { class: 'badge watch' }, 'Watch'),
      masked && h('button', {
        type: 'button', class: 'reveal',
        onclick: (e) => { e.stopPropagation(); store.revealTrophy(trophy.id); },
      }, 'Reveal')),
    h('span', { class: 'row-desc' }, displayDescription(trophy, store),
      h('em', { class: 'tag' }, KINDS[trophy.kinds[0]]),
      trophy.chapter != null && h('em', { class: 'tag' }, trophy.chapter === 0 ? 'Prologue' : `Ch ${trophy.chapter}`),
      trophy.count > 1 && h('em', { class: 'tag count' }, `${formatCount(store.counter(trophy.id))}/${formatCount(trophy.count)}`),
      trophy.hidden && h('em', { class: 'tag', title: 'Hidden on PlayStation until earned' }, 'PSN hidden'))),
  h('span', { class: 'row-grade' }, GRADES[trophy.grade].label));
}
