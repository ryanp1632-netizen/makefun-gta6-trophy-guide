// Export progress to a self-describing .json file and import it back: every entry is checked against the official
// list, a summary is shown before anything changes, and the last import can be undone in one step.
const FORMAT = 'leonida55-progress';
const VERSION = 1;
const APP = 'Leonida 55';
const GRADE_ORDER = ['platinum', 'gold', 'silver', 'bronze'];
let lastImport = null;

const gradeTotals = (trophies) => Object.fromEntries(GRADE_ORDER.map((g) => [g, trophies.filter((t) => t.grade === g).length]));

export function buildProgressFile(store, data) {
  const p = store.get();
  const earned = p.earned.map((id) => data.byId.get(id)).filter(Boolean);
  return {
    format: FORMAT,
    version: VERSION,
    app: APP,
    game: data.meta.game,
    exportedAt: new Date().toISOString(),
    totals: { trophies: data.trophies.length, ...gradeTotals(data.trophies) },
    earnedTotals: { trophies: earned.length, ...gradeTotals(earned) },
    earned: earned.map((t) => ({ id: t.id, name: t.name })),
    counters: p.counters,
    revealed: p.revealed,
    settings: p.settings,
  };
}

export function exportProgressFile(store, data) {
  const blob = new Blob([JSON.stringify(buildProgressFile(store, data), null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `gta6-trophies-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

// Returns { ok: true, progress, skipped, summary } or { ok: false, error }. Accepts this app's file (version 1), or a
// bare array of trophy ids or names. The file's shape must be right; single entries that do not match the official
// list (unknown ids, a name that disagrees with its id, a counter past its trophy's count) are skipped and listed.
export function validateProgressPayload(payload, data) {
  const fail = (error) => ({ ok: false, error });
  const bare = Array.isArray(payload);
  if (!bare) {
    if (payload?.format !== FORMAT) return fail('Not a Leonida 55 progress file.');
    if (payload.version !== VERSION) return fail(`File version ${JSON.stringify(payload.version)} is not supported (expected ${VERSION}).`);
    if (payload.totals && payload.totals.trophies !== data.trophies.length) return fail(`The file was made for a ${payload.totals.trophies}-trophy list, not this ${data.trophies.length}-trophy one.`);
  }
  const entries = bare ? payload : payload.earned;
  if (!Array.isArray(entries)) return fail('The file has no list of earned trophies.');
  for (const key of ['counters', 'settings']) {
    if (!bare && payload[key] != null && (typeof payload[key] !== 'object' || Array.isArray(payload[key]))) return fail(`"${key}" must be an object.`);
  }
  if (!bare && payload.revealed != null && !Array.isArray(payload.revealed)) return fail('"revealed" must be a list.');

  const skipped = { ids: [], names: [], counters: [] };
  const byName = new Map(data.trophies.map((t) => [t.name.toLowerCase(), t.id]));
  const earned = [];
  for (const entry of entries) {
    const id = typeof entry === 'string' ? byName.get(entry.toLowerCase()) : entry?.id ?? entry;
    const trophy = data.byId.get(id);
    if (!trophy) skipped.ids.push(typeof entry === 'string' ? entry : String(entry?.id ?? JSON.stringify(entry)).slice(0, 40));
    else if (entry?.name && entry.name !== trophy.name) skipped.names.push(`#${id} "${String(entry.name).slice(0, 40)}"`);
    else if (!earned.includes(id)) earned.push(id);
  }
  const counters = {};
  for (const [key, value] of Object.entries(bare ? {} : payload.counters ?? {})) {
    const trophy = data.byId.get(Number(key));
    if (trophy?.count > 1 && Number.isInteger(value) && value >= 0 && value <= trophy.count) counters[trophy.id] = value;
    else skipped.counters.push(`#${key}=${String(value).slice(0, 12)}`);
  }
  const revealed = [];
  for (const id of bare ? [] : payload.revealed ?? []) {
    if (!data.byId.has(id)) skipped.ids.push(String(id).slice(0, 40));
    else if (!revealed.includes(id)) revealed.push(id);
  }
  const skippedAny = skipped.ids.length + skipped.names.length + skipped.counters.length > 0;
  if (!earned.length && !Object.keys(counters).length && !revealed.length && skippedAny) return fail(`Nothing in the file matches the official list (${describeSkipped(skipped)}).`);
  const settings = typeof payload?.settings?.spoilers === 'boolean' ? { spoilers: payload.settings.spoilers } : undefined;
  const counts = `${earned.length} earned, ${Object.keys(counters).length} counters, ${revealed.length} revealed`;
  const extra = describeSkipped(skipped);
  return { ok: true, progress: { earned, counters, revealed, settings }, skipped, summary: extra ? `${counts}. ${extra}` : counts };
}

function describeSkipped({ ids, names, counters }) {
  const list = (label, items) => items.length && `${label}: ${items.slice(0, 6).join(', ')}${items.length > 6 ? ` and ${items.length - 6} more` : ''}`;
  return [list('Unknown ids skipped', ids), list('Names not matching their id skipped', names), list('Counters out of range skipped', counters)].filter(Boolean).join('. ');
}

// Reads, checks and (once confirm(summary) says yes) applies a file, keeping the progress it replaced for undo.
export async function importProgressFile(file, store, data, confirm = () => true) {
  let payload;
  try {
    payload = JSON.parse(await file.text());
  } catch {
    return { ok: false, error: 'That file is not valid JSON.' };
  }
  const result = validateProgressPayload(payload, data);
  if (!result.ok) return result;
  const replacing = store.get().earned.length;
  if (!confirm(`Import ${result.summary}?\nThis replaces your current progress (${replacing} earned); you can undo it once.`)) return { ok: false, cancelled: true, error: 'Import cancelled.' };
  applyImport(store, result.progress);
  return result;
}

export function applyImport(store, progress) {
  lastImport = structuredClone(store.get());
  store.replaceProgress(progress);
}

export const canUndoImport = () => lastImport !== null;

export function undoLastImport(store) {
  if (!lastImport) return false;
  store.replaceProgress(lastImport);
  lastImport = null;
  return true;
}
