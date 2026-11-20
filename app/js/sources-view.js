// The sources view: a matrix of which trophy's guide cites which source, each source's "cited by N guides" count,
// and the pages read but not cited. Loaded on demand by import().
import { h } from './dom.js';
import { shortUrl } from './sources-panel.js';
import { displayName } from './spoilers.js';

export function renderSourceMatrix(root, ctx) {
  const { data } = ctx;
  const steps = data.trophies.flatMap((t) => t.steps);
  const citing = data.trophies.flatMap((t) => [...t.steps, ...t.disagree, { cite: t.missableCite }]);
  const citeCount = (id) => citing.filter((s) => s.cite.includes(id)).length;
  const maxCited = Math.max(...data.sources.map((s) => data.citedBy.get(s.id)));
  root.replaceChildren(
    h('header', { class: 'view-head' },
      h('h2', null, 'Sources & citation matrix'),
      h('p', null, `${data.sources.length} pages read on ${data.readOn}, cited ${citing.reduce((n, s) => n + s.cite.length, 0)} times in ${steps.length} steps, missable notes and disagreements. A dot means that trophy's guide cites that source. Click a dot to open the guide.`)),
    h('div', { class: 'matrix-wrap' },
      h('table', { class: 'matrix' },
        h('thead', null, h('tr', null,
          h('th', { class: 'src-col' }, 'Source'),
          h('th', { class: 'num-col' }, 'Guides'),
          data.trophies.map((t) => h('th', { class: `tcol ${t.grade}`, title: `#${t.id} ${displayName(t, ctx.store)}` }, t.id)))),
        h('tbody', null, data.sources.map((s) => h('tr', null,
          h('th', { class: 'src-col', scope: 'row' }, h('div', { class: 'src-cell' },
            h('span', { class: 'source-num' }, data.sourceNumber.get(s.id)),
            h('span', null, h('b', null, s.site), h('small', null, s.title)))),
          h('td', { class: 'num-col' },
            h('span', { class: 'cited-bar', style: `width:${Math.round((data.citedBy.get(s.id) / maxCited) * 100)}%` }),
            h('b', null, data.citedBy.get(s.id)), h('small', null, ` · ${citeCount(s.id)} cite${citeCount(s.id) === 1 ? '' : 's'}`)),
          data.trophies.map((t) => h('td', { class: 'cell' }, t.sources.includes(s.id) &&
            h('button', { type: 'button', class: 'dot', title: `#${t.id} cites [${data.sourceNumber.get(s.id)}]`, onclick: () => ctx.selectTrophy(t.id, 'checklist') })))))),
        h('tfoot', null, h('tr', null,
          h('th', { class: 'src-col', scope: 'row' }, 'Sources per guide'),
          h('td', { class: 'num-col' }, h('small', null, `min ${Math.min(...data.trophies.map((t) => t.sources.length))}`)),
          data.trophies.map((t) => h('td', { class: 'per-guide' }, t.sources.length)))))),
    h('div', { class: 'source-foot' },
      h('section', null, h('h3', null, 'Every source'),
        h('ol', { class: 'source-index' }, data.sources.map((s) => h('li', null,
          h('span', { class: 'source-num' }, data.sourceNumber.get(s.id)),
          h('b', null, s.site), ` — ${s.kind}, ${s.published}. ${s.note} `,
          h('a', { href: s.url, target: '_blank', rel: 'noopener noreferrer' }, shortUrl(s.url)))))),
      h('section', null, h('h3', null, 'Read or tried, not cited'),
        h('ul', { class: 'not-cited' }, data.notCited.map((n) => h('li', null, h('b', null, n.site), ` — ${n.reason}`))))),
  );
}
