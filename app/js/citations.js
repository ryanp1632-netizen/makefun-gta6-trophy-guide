// Numbered citation marks [n] that point at the global source list, and the grade medal.
import { h } from './dom.js';
import { GRADES } from './data.js';

export function renderCiteMarks(ids, ctx) {
  return h('span', { class: 'cites' }, ids.map((id) => {
    const n = ctx.data.sourceNumber.get(id);
    const source = ctx.data.sourceById.get(id);
    return h('button', {
      type: 'button', class: 'cite', title: `${source.site}: ${source.title}`,
      onclick: () => ctx.highlightSource?.(id),
    }, `[${n}]`);
  }));
}

export const renderMedal = (grade) => h('i', { class: `medal ${grade}`, title: GRADES[grade].label }, GRADES[grade].letter);
