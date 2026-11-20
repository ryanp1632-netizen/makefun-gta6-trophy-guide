// Filter state (kind, grade, earned status, search) and the controls that set it.
import { h } from './dom.js';
import { GRADES, KINDS } from './data.js';
import { isSpoilerHidden } from './spoilers.js';

export const KIND_CHIPS = ['all', 'story', 'missable', 'collectible', 'activity', 'side', 'crime', 'world', 'online'];

export function createFilterState(params) {
  return {
    kind: KIND_CHIPS.includes(params.get('kind')) ? params.get('kind') : 'all',
    grade: GRADES[params.get('grade')] ? params.get('grade') : 'all',
    status: ['earned', 'todo'].includes(params.get('status')) ? params.get('status') : 'all',
    query: params.get('q') ?? '',
  };
}

export function matchesKind(trophy, kind) {
  if (kind === 'all') return true;
  if (kind === 'missable') return Boolean(trophy.missableLevel);
  return trophy.kinds.includes(kind);
}

export function matchesFilters(trophy, filters, store) {
  if (!matchesKind(trophy, filters.kind)) return false;
  if (filters.grade !== 'all' && trophy.grade !== filters.grade) return false;
  const earned = store.isEarned(trophy.id);
  if (filters.status === 'earned' && !earned) return false;
  if (filters.status === 'todo' && earned) return false;
  const q = filters.query.trim().toLowerCase();
  if (!q) return true;
  const masked = isSpoilerHidden(trophy, store);
  const text = masked ? trophy.summary : `${trophy.name} ${trophy.description} ${trophy.summary}`;
  return text.toLowerCase().includes(q) || String(trophy.id) === q;
}

export function renderFilterControls(root, ctx) {
  const { filters, data, store } = ctx;
  const chip = (group, value, label, count) => h('button', {
    type: 'button',
    class: `chip${filters[group] === value ? ' on' : ''}${value === 'missable' ? ' chip-warn' : ''}`,
    'aria-pressed': String(filters[group] === value),
    onclick: () => { filters[group] = group === 'status' && filters.status === value ? 'all' : value; ctx.refresh(); },
  }, label, count == null ? null : h('b', null, count));

  const kindLabel = (k) => (k === 'all' ? 'All' : k === 'missable' ? 'Missable' : KINDS[k]);
  const search = h('input', {
    id: 'search-box', type: 'search', placeholder: 'Search trophies…', value: filters.query,
    oninput: (e) => { filters.query = e.target.value; ctx.refreshList(); },
  });
  const earnedCount = data.trophies.filter((t) => store.isEarned(t.id)).length;
  const gradeCount = (g) => data.trophies.filter((t) => t.grade === g).length;
  root.replaceChildren(
    h('div', { class: 'chip-row' },
      search,
      h('span', { class: 'chip-group', role: 'group', 'aria-label': 'Grade' },
        chip('grade', 'all', 'Any'),
        Object.entries(GRADES).map(([g, info]) => chip('grade', g, h('i', { class: `medal ${g}`, title: info.label }, info.letter), gradeCount(g))))),
    h('div', { class: 'chip-row', role: 'group', 'aria-label': 'Kind and status' },
      KIND_CHIPS.map((k) => chip('kind', k, kindLabel(k), data.trophies.filter((t) => matchesKind(t, k)).length)),
      h('span', { class: 'chip-group status', role: 'group', 'aria-label': 'Status (press again to clear)' },
        chip('status', 'todo', 'To do', data.trophies.length - earnedCount),
        chip('status', 'earned', 'Earned', earnedCount))),
  );
}
