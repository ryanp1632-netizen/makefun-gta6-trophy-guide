// Filter state (kind, missable, PSN-hidden, disputed, grade, earned status, search) and the chips that set it, each
// chip showing how many trophies it would list.
import { h, toggleButton } from './dom.js';
import { GRADES, KINDS } from './data.js';
import { isSpoilerHidden } from './spoilers.js';

// The bounty's kinds: story, missable, collectibles, activities (side quests, crime and free roam included), online.
export const KIND_CHIPS = ['all', 'story', 'missable', 'collectible', 'activity', 'online', 'psn-hidden', 'disputed'];
const ACTIVITY_KINDS = ['activity', 'side', 'crime', 'world'];
const CHIP_LABELS = { all: 'All', missable: 'Missable', 'psn-hidden': 'PSN-hidden', disputed: 'Disputed' };

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
  if (kind === 'missable') return Boolean(trophy.missable);
  if (kind === 'psn-hidden') return trophy.hidden;
  if (kind === 'disputed') return trophy.disputes.length > 0;
  if (kind === 'activity') return trophy.kinds.some((k) => ACTIVITY_KINDS.includes(k));
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
  const text = isSpoilerHidden(trophy, store) ? trophy.summary : `${trophy.name} ${trophy.description} ${trophy.summary}`;
  return text.toLowerCase().includes(q) || String(trophy.id) === q;
}

export function renderFilterControls(root, ctx) {
  const { filters, data, store } = ctx;
  const chip = (group, value, label, count, extra = '') => toggleButton(filters[group] === value, {
    class: `chip${extra}`,
    onclick: () => {
      filters[group] = (group === 'status' || group === 'grade') && filters[group] === value ? 'all' : value;
      ctx.refresh();
    },
  }, label, count == null ? null : h('b', null, count));
  const earnedCount = data.trophies.filter((t) => store.isEarned(t.id)).length;
  const search = h('input', {
    id: 'search-box', type: 'search', placeholder: 'Search…', title: 'Search names, descriptions and guides', value: filters.query,
    'aria-label': 'Search trophies',
    oninput: (e) => { filters.query = e.target.value; ctx.refreshList(); },
  });
  const gradeCount = (g) => data.trophies.filter((t) => t.grade === g).length;
  // The game lists no online trophy, so the Online chip only appears if a list ever has one (or it is the active filter).
  const kinds = KIND_CHIPS.filter((k) => k !== 'online' || filters.kind === 'online' || data.trophies.some((t) => matchesKind(t, k)));
  root.replaceChildren(
    h('div', { class: 'chip-row', role: 'group', 'aria-label': 'Filter by kind, status and grade' },
      kinds.map((k) => chip('kind', k, CHIP_LABELS[k] ?? KINDS[k], data.trophies.filter((t) => matchesKind(t, k)).length,
        k === 'missable' ? ' chip-warn' : k === 'disputed' ? ' chip-dispute' : '')),
      chip('status', 'todo', 'To do', data.trophies.length - earnedCount),
      chip('status', 'earned', 'Earned', earnedCount),
      Object.entries(GRADES).map(([g, info]) => chip('grade', g,
        h('i', { class: `medal ${g}`, title: `${info.label}: ${gradeCount(g)} trophies` }, info.letter), null, ' grade-chip')),
      search),
  );
}
