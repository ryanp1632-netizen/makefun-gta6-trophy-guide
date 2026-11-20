// Numbered citation marks [n] that point at the global source list, the "cited by K sites" phrase, and the grade medal.
import { h } from './dom.js';
import { GRADES } from './data.js';

export const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
export const citedBySites = (n) => `cited by ${plural(n, 'site')}`;

// Each mark names its page in a tooltip and for screen readers ("[3] GTABase: Mission list, read 2026-11-18").
export function renderCiteMarks(ids, ctx) {
  return h('span', { class: 'cites' }, ids.map((id) => {
    const n = ctx.data.sourceNumber.get(id);
    const source = ctx.data.sourceById.get(id);
    if (!source) return h('span', { class: 'cite missing', title: `Unknown source "${id}"` }, '[?]');
    const label = `${source.site}: ${source.title}${source.read ? `, read ${source.read}` : ''}`;
    return h('button', {
      type: 'button', class: 'cite', title: `[${n}] ${label}`, 'aria-label': `Source ${n}, ${label}`,
      onclick: () => ctx.highlightSource?.(id),
    }, `[${n}]`);
  }));
}

export const renderMedal = (grade) => h('i', { class: `medal ${grade}`, title: GRADES[grade].label }, GRADES[grade].letter);
