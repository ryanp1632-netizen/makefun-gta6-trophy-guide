// Tiny DOM helpers: build elements without innerHTML, so no guide text is ever parsed as markup. Data strings only
// ever become text nodes or attribute values; markup-setting keys are refused outright.
export const byId = (id) => document.getElementById(id);
const UNSAFE_KEYS = new Set(['innerHTML', 'outerHTML', 'srcdoc']);

export function h(tag, attrs, ...children) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs ?? {})) {
    if (value == null || value === false) continue;
    if (UNSAFE_KEYS.has(key)) throw new Error(`h(): "${key}" would parse markup`);
    if (key.startsWith('on')) {
      if (typeof value === 'function') el.addEventListener(key.slice(2), value);
    } else if (key === 'class') el.className = value;
    else if (key === 'dataset') Object.assign(el.dataset, value);
    else el.setAttribute(key, value === true ? '' : String(value));
  }
  appendChildren(el, children);
  return el;
}

// An on/off button: aria-pressed and the "on" class always agree, so screen readers hear what the eye sees.
export function toggleButton(pressed, attrs, ...children) {
  const cls = [attrs?.class, pressed && 'on'].filter(Boolean).join(' ');
  return h('button', { ...attrs, type: 'button', class: cls, 'aria-pressed': String(Boolean(pressed)) }, ...children);
}

function appendChildren(el, children) {
  for (const child of children.flat(Infinity)) {
    if (child == null || child === false) continue;
    el.append(child instanceof Node ? child : String(child));
  }
}

// One status line at the bottom; an optional action (such as Undo) is a real button inside it.
export function showToast(message, action) {
  const toast = byId('toast');
  toast.replaceChildren(message, action ? h('button', { type: 'button', class: 'toast-action', onclick: () => { toast.hidden = true; action.run(); } }, action.label) : '');
  toast.hidden = false;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => { toast.hidden = true; }, action ? 10000 : 4000);
}
