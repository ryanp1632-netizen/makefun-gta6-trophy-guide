// The spoiler shield: while it is on (the default), a story trophy's name, description and guide stay hidden until the
// trophy is earned or the reader reveals that one trophy. Other trophies, PSN-hidden ones included, stay readable.
import { chapterLabel } from './data.js';

export function isSpoilerHidden(trophy, store) {
  if (!store.get().settings.spoilers) return false;
  if (!trophy.kinds.includes('story')) return false;
  return !store.isEarned(trophy.id) && !store.isRevealed(trophy.id);
}

export function displayName(trophy, store) {
  if (!isSpoilerHidden(trophy, store)) return trophy.name;
  return trophy.chapter == null ? 'Story trophy' : `Story trophy · ${chapterLabel(trophy.chapter).replace('Chapter', 'Ch')}`;
}

export function displayDescription(trophy, store) {
  return isSpoilerHidden(trophy, store) ? 'Hidden by the spoiler shield until earned.' : trophy.description;
}

export function applySpoilerSetting(store, on) {
  store.setSpoilers(on);
  const toggle = document.getElementById('spoiler-toggle');
  toggle.checked = on;
  toggle.nextElementSibling.textContent = on ? 'Spoiler shield on' : 'Spoiler shield off';
}
