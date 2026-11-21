// The right column beside a guide: "Next up" (the next unearned trophies in roadmap order), the missables watch and
// one card per page the guide cites: number, site, page title, domain, date read, claims in this guide and how many guides cite it.
import { h } from './dom.js';
import { displayName, isSpoilerHidden } from './spoilers.js';
import { renderMedal, plural } from './citations.js';
import { citationsOf, formatCount } from './data.js';
import { renderMissablesWatch } from './missables-watch.js';

export function renderSidePanel(root, ctx) {
  const trophy = ctx.data.byId.get(ctx.state.selectedId);
  root.replaceChildren(
    renderNextUp(ctx),
    renderMissablesWatch(ctx),
    trophy ? renderSourceCards(trophy, ctx) : null);
}

// The next unearned trophies in roadmap order. While the spoiler shield is on, only the first still-hidden story
// trophy is listed (as "Story trophy · Ch N (hidden)"), so the list stays useful instead of a column of placeholders.
export function pickNextUp(ctx, limit = 3) {
  const { data, store } = ctx;
  const picked = [];
  let hiddenShown = false;
  for (const t of data.ordered) {
    if (picked.length === limit) break;
    if (store.isEarned(t.id) || t.id === ctx.state.selectedId) continue;
    if (isSpoilerHidden(t, store)) {
      if (hiddenShown) continue;
      hiddenShown = true;
    }
    picked.push(t);
  }
  return picked;
}

export function renderNextUp(ctx) {
  const { data, store } = ctx;
  return h('section', { class: 'next-up' },
    h('h2', null, 'Next up', h('small', null, 'roadmap order')),
    h('ol', null, pickNextUp(ctx).map((t) => {
      const hidden = isSpoilerHidden(t, store);
      const where = data.groupById.get(t.group).short;
      return h('li', { class: hidden ? 'hidden-story' : '', onclick: () => ctx.selectTrophy(t.id) },
        renderMedal(t.grade),
        h('span', null, h('b', null, displayName(t, store), hidden ? ' (hidden)' : ''),
          h('small', null, t.count > 1 ? `${where} · ${formatCount(store.counter(t.id))}/${formatCount(t.count)}${t.unit && t.count < 1000 ? ` ${t.unit}` : ''}` : hidden ? where : `${where} · ${t.description}`)));
    })));
}

function renderSourceCards(trophy, ctx) {
  const masked = isSpoilerHidden(trophy, ctx.store);
  const sites = ctx.data.sitesOf(trophy.sources).length;
  return h('section', { class: 'source-cards' },
    h('h2', null, 'Sources', h('small', null, `${plural(trophy.sources.length, 'page')} · ${plural(sites, 'site')}`)),
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
