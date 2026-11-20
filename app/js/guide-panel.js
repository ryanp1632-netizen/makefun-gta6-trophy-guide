// The guide pane: the selected trophy's name and grade, its official description quoted in a labelled box, badges,
// earned switch and counter, the missable window and source disputes (guide-notes.js), then "How to earn it": the
// numbered steps in our own words, each with its [n] citations.
import { h, toggleButton } from './dom.js';
import { GRADES, KINDS, MISSABLE_LEVELS, chapterLabel, formatCount } from './data.js';
import { displayName, isSpoilerHidden } from './spoilers.js';
import { renderCiteMarks, renderMedal, citedBySites } from './citations.js';
import { renderMissableWindow, renderDisputes, renderUnconfirmed } from './guide-notes.js';

export function renderGuidePanel(root, ctx) {
  const trophy = ctx.data.byId.get(ctx.state.selectedId);
  if (!trophy) {
    root.replaceChildren(h('p', { class: 'placeholder' }, 'Pick a trophy on the left to open its guide.'));
    return;
  }
  const masked = isSpoilerHidden(trophy, ctx.store);
  root.replaceChildren(
    h('header', { class: `guide-head ${trophy.grade}` },
      renderMedal(trophy.grade),
      h('div', { class: 'guide-title' },
        h('h2', null, displayName(trophy, ctx.store)),
        masked ? h('p', { class: 'meta-line' }, `${GRADES[trophy.grade].label} · roadmap stage ${trophy.stage}`) : renderBadges(trophy)),
      renderEarnedControls(trophy, ctx)),
    masked ? renderMaskedNotice(trophy, ctx) : renderGuideBody(trophy, ctx),
  );
}

function renderEarnedControls(trophy, ctx) {
  const earned = ctx.store.isEarned(trophy.id);
  return h('div', { class: 'earned-controls' },
    toggleButton(earned, { class: 'earn-button', onclick: () => ctx.store.toggleEarned(trophy.id) },
      earned ? '✓ Earned' : 'Mark earned'),
    trophy.count > 1 && renderCounter(trophy, ctx));
}

function renderCounter(trophy, ctx) {
  const { store } = ctx;
  const step = trophy.count >= 10000 ? 10000 : 1;
  const value = store.counter(trophy.id);
  return h('div', { class: 'counter', title: 'Your own count toward the target, saved with your progress' },
    h('button', { type: 'button', 'aria-label': 'Less', onclick: () => store.setCounter(trophy.id, value - step, trophy.count) }, '−'),
    h('span', null, h('b', null, formatCount(value)), `/${formatCount(trophy.count)}`),
    h('button', { type: 'button', 'aria-label': 'More', onclick: () => store.setCounter(trophy.id, value + step, trophy.count) }, '+'));
}

function renderMaskedNotice(trophy, ctx) {
  return h('section', { class: 'masked-notice' },
    h('p', null, h('b', null, 'Spoiler shield on. '), `This story trophy's name, description and guide stay hidden until you earn it. Its guide has ${trophy.steps.length} cited steps.`),
    h('button', { type: 'button', class: 'reveal big', onclick: () => ctx.store.revealTrophy(trophy.id) }, 'Reveal this trophy'));
}

function renderOfficialBox(trophy, ctx) {
  return h('section', { class: 'official-box' },
    h('h3', null, 'Official description',
      h('small', null, `${GRADES[trophy.grade].label} · #${trophy.id}/${ctx.data.trophies.length}${trophy.hidden ? ' · PSN-hidden' : ''} · stage ${trophy.stage}${trophy.chapter != null ? ` · ${chapterLabel(trophy.chapter).replace('Chapter', 'Ch')}` : ''}`)),
    h('p', { class: 'official' }, `“${trophy.description}”`));
}

function renderBadges(trophy) {
  const level = trophy.missable?.level;
  return h('p', { class: 'badges' },
    level && h('em', { class: `badge ${level}` }, MISSABLE_LEVELS[level].label),
    trophy.disputes.length > 0 && h('em', { class: 'badge dispute' }, trophy.disputes.length > 1 ? `Sources differ · ${trophy.disputes.length}` : 'Sources differ'),
    trophy.unconfirmed.length > 0 && h('em', { class: 'badge unconfirmed' }, 'Unconfirmed detail'));
}

function renderGuideBody(trophy, ctx) {
  const cited = trophy.steps.filter((s) => s.cite.length).length;
  const multi = trophy.steps.filter((s) => s.sites >= 2).length;
  return h('div', { class: 'guide-body' },
    renderOfficialBox(trophy, ctx),
    renderMissableWindow(trophy, ctx),
    renderDisputes(trophy, ctx),
    h('section', { class: 'how-to' },
      h('h3', null, 'How to earn it', h('small', null, `in our own words · ${cited}/${trophy.steps.length} steps cited · `,
        h('span', { class: 'multi-key' }, `${multi} by 2+ sites`))),
      h('ol', { class: 'steps' }, trophy.steps.map((s) => h('li', { class: s.sites >= 2 ? 'multi' : '', title: `Step ${citedBySites(s.sites)}` },
        s.text, ' ', renderCiteMarks(s.cite, ctx))))),
    renderUnconfirmed(trophy));
}
