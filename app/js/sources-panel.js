// The right column beside a guide: "Next up" (the next unearned trophies in roadmap order) and one card per page the
// guide cites: number, site, page title, domain, date read, claims in this guide and how many guides cite it.
import { h } from './dom.js';
import { displayName, isSpoilerHidden } from './spoilers.js';
import { renderMedal, plural } from './citations.js';
import { citationsOf } from './data.js';

export function renderSidePanel(root, ctx) {
  const trophy = ctx.data.byId.get(ctx.state.selectedId);
  root.replaceChildren(
    renderNextUp(ctx),
    trophy ? renderSourceCards(trophy, ctx) : null);
}

export function renderNextUp(ctx) {
  const { data, store } = ctx;
  const next = data.ordered.filter((t) => !store.isEarned(t.id) && t.id !== ctx.state.selectedId).slice(0, 4);
  return h('section', { class: 'next-up' },
    h('h2', null, 'Next up', h('small', null, 'roadmap order')),
    h('ol', null, next.map((t) => h('li', { onclick: () => ctx.selectTrophy(t.id) },
      renderMedal(t.grade),
      h('span', null, h('b', null, displayName(t, store)), h('small', null, `${data.groupById.get(t.group).short}${t.count > 1 ? ` · ${store.counter(t.id)}/${t.count}` : ''}`))))));
}

function renderSourceCards(trophy, ctx) {
  const masked = isSpoilerHidden(trophy, ctx.store);
  const sites = ctx.data.sitesOf(trophy.sources).length;
  return h('section', { class: 'source-cards' },
    h('h2', null, 'Sources for this guide', h('small', null, `${plural(trophy.sources.length, 'page')} · ${plural(sites, 'site')}`)),
    masked ? h('p', { class: 'placeholder' }, 'Hidden with the guide.') :
      h('ol', null, [...trophy.sources].sort((a, b) => citesHere(b, trophy) - citesHere(a, trophy)).map((id) => renderSourceCard(id, trophy, ctx))));
}

export function renderSourceCard(id, trophy, ctx) {
  const s = ctx.data.sourceById.get(id);
  const here = citesHere(id, trophy);
  const use = ctx.data.sourceUse.get(id);
  return h('li', { class: `source-card${ctx.state.highlightedSource === id ? ' lit' : ''}`, dataset: { source: id } },
    h('span', { class: 'source-num' }, ctx.data.sourceNumber.get(id)),
    h('div', null,
      h('b', null, s.site),
      h('a', { class: 'source-title', href: s.url, target: '_blank', rel: 'noopener noreferrer', title: s.url }, s.title),
      h('span', { class: 'source-meta' }, `${s.domain} · read ${s.read}`),
      h('span', { class: 'source-use' }, `${here} claim${here === 1 ? '' : 's'} here · in ${use.guides}/55 guides`)));
}

// How many of this guide's claims (steps, missable window, dispute sides) cite the page.
function citesHere(id, trophy) {
  return citationsOf(trophy).filter((ids) => ids.includes(id)).length;
}

export const shortUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
