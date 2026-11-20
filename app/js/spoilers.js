// The spoiler rule: with the setting on, a story trophy or one PlayStation hides stays masked until it is earned or
// the reader reveals it.
export function isSpoilerHidden(trophy, store) {
  const p = store.get();
  if (!p.settings.spoilers) return false;
  if (!trophy.kinds.includes('story') && !trophy.hidden) return false;
  return !store.isEarned(trophy.id) && !store.isRevealed(trophy.id);
}

export function displayName(trophy, store) {
  if (!isSpoilerHidden(trophy, store)) return trophy.name;
  return trophy.kinds.includes('story') ? 'Hidden story trophy' : 'Hidden trophy';
}

export function displayDescription(trophy, store) {
  return isSpoilerHidden(trophy, store) ? 'Earn to reveal.' : trophy.description;
}

export function applySpoilerSetting(store, on) {
  store.setSpoilers(on);
  const toggle = document.getElementById('spoiler-toggle');
  toggle.checked = on;
  toggle.nextElementSibling.textContent = on ? 'Spoilers hidden' : 'Spoilers shown';
}
