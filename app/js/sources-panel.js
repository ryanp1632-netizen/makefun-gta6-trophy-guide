// The sources pane beside a guide: each page the guide cites, by its number, with title, date read and link.
import { h } from './dom.js';
import { isSpoilerHidden } from './spoilers.js';

export function renderSourcesPanel(root, ctx) {
  const trophy = ctx.data.byId.get(ctx.state.selectedId);
  if (!trophy) { root.replaceChildren(); return; }
  const masked = isSpoilerHidden(trophy, ctx.store);
  const ids = trophy.sources;
  root.replaceChildren(
    h('h2', null, 'Sources', h('small', null, `${ids.length} cited`)),
    masked ? h('p', { class: 'placeholder' }, 'Hidden with the guide.') :
      h('ol', { class: 'source-list' }, ids.map((id) => renderSourceCard(id, ctx))),
    h('p', { class: 'official-note' },
      h('b', null, 'Official text'), ' Name, description and grade exactly as the PS5 list (Exophase and PSNProfiles, frozen 2026-11-18). ',
      'Hidden flag as GTABase and GAMES.GG list it. Guides written in our own words; nothing copied.'),
  );
}

export function renderSourceCard(id, ctx) {
  const s = ctx.data.sourceById.get(id);
  const n = ctx.data.sourceNumber.get(id);
  return h('li', { class: `source-card${ctx.state.highlightedSource === id ? ' lit' : ''}`, dataset: { source: id } },
    h('span', { class: 'source-num' }, n),
    h('div', null,
      h('b', null, s.site),
      h('span', { class: 'source-title' }, s.title),
      h('span', { class: 'source-meta' }, `Read ${ctx.data.readOn} · cited by ${ctx.data.citedBy.get(id)} guides`),
      h('a', { href: s.url, target: '_blank', rel: 'noopener noreferrer' }, shortUrl(s.url))));
}

export const shortUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '').slice(0, 52);
