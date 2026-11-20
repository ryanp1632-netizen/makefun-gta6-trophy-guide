// The guide's warning boxes: the missable window (why, point of no return, what to do first, all cited), each dispute
// between sources shown side by side with its citations and our call, and the details no source confirms yet.
import { h } from './dom.js';
import { MISSABLE_LEVELS } from './data.js';
import { renderCiteMarks } from './citations.js';

export function renderMissableWindow(trophy, ctx) {
  const m = trophy.missable;
  if (!m) return null;
  return h('section', { class: `note window ${m.level}` },
    h('h3', null, 'Missable window', h('small', null, MISSABLE_LEVELS[m.level].label)),
    h('p', null, m.why, ' ', renderCiteMarks(m.cite, ctx)),
    h('p', { class: 'ponr' }, h('b', null, 'Point of no return: '), m.ponr, m.before && [' ', h('b', null, 'Before it: '), m.before]));
}

export function renderDisputes(trophy, ctx) {
  if (!trophy.disputes.length) return null;
  return trophy.disputes.map((d) => h('section', { class: 'note dispute' },
    h('h3', null, 'Sources differ', h('small', null, d.topic)),
    h('div', { class: 'sides' },
      h('p', { class: 'side' }, h('i', null, 'A'), d.a.text, ' ', renderCiteMarks(d.a.cite, ctx)),
      h('p', { class: 'side' }, h('i', null, 'B'), d.b.text, ' ', renderCiteMarks(d.b.cite, ctx))),
    h('p', { class: 'call' }, h('b', null, 'Our call: '), d.call)));
}

export function renderUnconfirmed(trophy) {
  if (!trophy.unconfirmed.length) return null;
  return h('section', { class: 'note unconfirmed' },
    h('h3', null, 'Unconfirmed', h('small', null, 'no source read confirms it yet')),
    trophy.unconfirmed.map((u) => h('p', null, u)));
}
