// The guide pane: the selected trophy's official text, its "In short" line, missable warning, numbered cited steps,
// where sources disagree, what is unconfirmed, plus its earned switch and counter.
import { h } from './dom.js';
import { GRADES, KINDS, formatCount } from './data.js';
import { displayName, displayDescription, isSpoilerHidden } from './spoilers.js';
import { renderCiteMarks, renderMedal } from './citations.js';

export function renderGuidePanel(root, ctx) {
  const trophy = ctx.data.byId.get(ctx.state.selectedId);
  if (!trophy) {
    root.replaceChildren(h('p', { class: 'placeholder' }, 'Pick a trophy on the left to open its guide.'));
    return;
  }
  const { store } = ctx;
  const masked = isSpoilerHidden(trophy, store);
  const stage = ctx.data.roadmap.stages.find((s) => s.id === trophy.stage);
  root.replaceChildren(
    h('header', { class: `guide-head ${trophy.grade}` },
      renderMedal(trophy.grade),
      h('div', null,
        h('h2', null, displayName(trophy, store)),
        h('p', { class: 'official' }, displayDescription(trophy, store)),
        h('p', { class: 'meta-line' },
          h('span', null, `#${trophy.id} · ${GRADES[trophy.grade].label}`),
          h('span', null, trophy.kinds.map((k) => KINDS[k]).join(' · ')),
          stage && h('a', { href: `?view=roadmap#stage-${stage.id}` }, `Stage ${stage.id}: ${stage.title}`),
          trophy.chapter != null && h('span', null, trophy.chapter === 0 ? 'Prologue' : `Chapter ${trophy.chapter}`),
          trophy.hidden && h('span', null, 'Hidden on PSN'))),
      renderEarnedControls(trophy, ctx)),
    masked ? renderMaskedNotice(trophy, ctx) : renderGuideBody(trophy, ctx),
  );
}

function renderEarnedControls(trophy, ctx) {
  const { store } = ctx;
  const earned = store.isEarned(trophy.id);
  return h('div', { class: 'earned-controls' },
    h('button', { type: 'button', class: `earn-button${earned ? ' on' : ''}`, onclick: () => store.toggleEarned(trophy.id) },
      earned ? '✓ Earned' : 'Mark earned'),
    trophy.count > 1 && renderCounter(trophy, ctx));
}

function renderCounter(trophy, ctx) {
  const { store } = ctx;
  const step = trophy.count >= 10000 ? 10000 : 1;
  const value = store.counter(trophy.id);
  return h('div', { class: 'counter', title: 'Your own count toward the target' },
    h('button', { type: 'button', 'aria-label': 'Less', onclick: () => store.setCounter(trophy.id, value - step, trophy.count) }, '−'),
    h('span', null, h('b', null, formatCount(value)), ` / ${formatCount(trophy.count)}`),
    h('button', { type: 'button', 'aria-label': 'More', onclick: () => store.setCounter(trophy.id, value + step, trophy.count) }, '+'));
}

function renderMaskedNotice(trophy, ctx) {
  return h('section', { class: 'masked-notice' },
    h('p', null, h('b', null, 'Spoiler-safe.'), ' This trophy\'s name, description and guide stay hidden until you earn it.'),
    h('button', { type: 'button', class: 'reveal big', onclick: () => ctx.store.revealTrophy(trophy.id) }, 'Reveal this trophy'));
}

function renderGuideBody(trophy, ctx) {
  return h('div', { class: 'guide-body' },
    trophy.missableLevel && renderMissableWarning(trophy, ctx),
    h('p', { class: 'in-short' }, h('b', null, 'In short '), trophy.summary),
    h('ol', { class: 'steps' }, trophy.steps.map((s) => h('li', null, s.text, ' ', renderCiteMarks(s.cite, ctx)))),
    trophy.disagree.length > 0 && h('section', { class: 'note disagree' },
      h('h3', null, 'Sources disagree'),
      trophy.disagree.map((d) => h('p', null, d.text, ' ', renderCiteMarks(d.cite, ctx)))),
    trophy.unconfirmed.length > 0 && h('section', { class: 'note unconfirmed' },
      h('h3', null, 'Unconfirmed'),
      trophy.unconfirmed.map((u) => h('p', null, u))));
}

export function renderMissableWarning(trophy, ctx) {
  const hard = trophy.missableLevel === 'missable';
  return h('section', { class: `note ${hard ? 'missable' : 'watch'}` },
    h('h3', null, hard ? 'Missable' : 'Watch out'),
    h('p', null, trophy.missableWhy, ' ', renderCiteMarks(trophy.missableCite, ctx)),
    h('p', null, h('b', null, 'Point of no return: '), trophy.pointOfNoReturn));
}
