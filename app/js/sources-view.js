// The sources view: the audit totals, then a matrix of sites (rows, each with its pages, claims and guides) against
// the 55 trophies (columns): a dot where that trophy's guide cites the site, darker for more claims. Below it, every
// page with its title, date read and use, and the pages tried but not cited. Loaded on demand by import().
import { h } from './dom.js';
import { computeAuditStats } from './audit.js';
import { shortUrl } from './sources-panel.js';
import { displayName } from './spoilers.js';

export function summarizeSites(data) {
  const sites = new Map();
  for (const s of data.sources) {
    const use = data.sourceUse.get(s.id);
    if (!use.guides) continue;
    const site = sites.get(s.site) ?? { site: s.site, pages: [], claims: 0, trophies: new Map() };
    site.pages.push(s);
    site.claims += use.claims;
    sites.set(s.site, site);
  }
  for (const t of data.trophies) {
    for (const step of t.steps) for (const name of data.sitesOf(step.cite)) {
      const site = sites.get(name);
      if (site) site.trophies.set(t.id, (site.trophies.get(t.id) ?? 0) + 1);
    }
    for (const name of data.sitesOf(t.sources)) {
      const site = sites.get(name);
      if (site && !site.trophies.has(t.id)) site.trophies.set(t.id, 0);
    }
  }
  return [...sites.values()].sort((a, b) => b.trophies.size - a.trophies.size || b.claims - a.claims);
}

export function renderSourceMatrix(root, ctx) {
  const { data } = ctx;
  const s = computeAuditStats(data);
  const sites = summarizeSites(data);
  const total = (label, value, sub) => h('div', { class: 'total' }, h('b', null, value), h('span', null, label), sub && h('small', null, sub));
  root.replaceChildren(
    h('header', { class: 'view-head' },
      h('h2', null, 'Sources & citation matrix'),
      h('p', null, `${s.pages} pages from ${s.sites} sites, each fetched and read ${data.readOn}; facts rewritten in our own words. A dot: that guide cites the site (brighter = more claims). Columns in roadmap order.`)),
    h('div', { class: 'totals' },
      total('claims cited', `${s.claimsCited}/${s.claims}`, 'every numbered step'),
      total('backed by 2+ sites', s.claimsMulti, `${Math.round((s.claimsMulti / s.claims) * 100)}% of claims`),
      total('pages read', s.pages, `${s.sites} distinct sites`),
      total('guides cite sources', `${s.guidesCited}/${s.total}`, 'none uncited'),
      total('disputes shown', s.disputes, `in ${s.disputedTrophies} guides, both sides`),
      total('unconfirmed', s.unconfirmed, 'marked, not guessed')),
    h('div', { class: 'matrix-wrap' },
      h('table', { class: 'matrix' },
        h('thead', null, h('tr', null,
          h('th', { class: 'src-col' }, 'Site'),
          h('th', { class: 'num-col', title: 'Pages cited · claims (steps) citing them · guides citing the site' }, 'Pages·claims·guides'),
          data.ordered.map((t) => h('th', { class: `tcol ${t.grade}`, title: `#${t.id} ${displayName(t, ctx.store)}` }, t.id)))),
        h('tbody', null, sites.map((site) => h('tr', null,
          h('th', { class: 'src-col', scope: 'row' }, site.site),
          h('td', { class: 'num-col' }, h('b', null, site.pages.length), ` · ${site.claims} · `, h('b', null, site.trophies.size)),
          data.ordered.map((t) => h('td', { class: 'cell' }, site.trophies.has(t.id) &&
            h('button', {
              type: 'button', class: `dot d${Math.min(3, site.trophies.get(t.id))}`,
              title: `#${t.id}: ${site.trophies.get(t.id)} claims from ${site.site}`,
              onclick: () => ctx.selectTrophy(t.id, 'tracker'),
            })))))),
        h('tfoot', null, h('tr', null,
          h('th', { class: 'src-col', scope: 'row' }, 'Sites per guide'),
          h('td', { class: 'num-col' }, `min ${Math.min(...data.trophies.map((t) => data.sitesOf(t.sources).length))}`),
          data.ordered.map((t) => h('td', { class: 'per-guide' }, data.sitesOf(t.sources).length)))))),
    h('div', { class: 'source-foot' },
      h('section', null, h('h3', null, `Every page · ${s.pages}`),
        h('ol', { class: 'source-index' }, data.sources.map((p) => h('li', null,
          h('span', { class: 'source-num' }, data.sourceNumber.get(p.id)),
          h('b', null, p.site), ` ${p.title} · ${data.sourceUse.get(p.id).claims} claims, ${data.sourceUse.get(p.id).guides} guides · `,
          h('a', { href: p.url, target: '_blank', rel: 'noopener noreferrer' }, shortUrl(p.url)))))),
      h('section', null, h('h3', null, 'Tried, not cited'),
        h('ul', { class: 'not-cited' }, data.notCited.map((n) => h('li', null, h('b', null, n.site), ` — ${n.reason}`))))),
  );
}
