// Export progress to a .json file and import it back, checking every entry against the official list first.
const FORMAT = 'leonida55-progress';

export function buildProgressFile(store, data) {
  const p = store.get();
  return {
    format: FORMAT,
    version: 1,
    game: data.meta.game,
    exportedAt: new Date().toISOString(),
    earned: p.earned.map((id) => ({ id, name: data.byId.get(id)?.name })),
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

// Returns { ok, progress, summary } or { ok: false, error }. Accepts this app's file, or a bare array of ids/names.
export function validateProgressPayload(payload, data) {
  const fail = (error) => ({ ok: false, error });
  const entries = Array.isArray(payload) ? payload : payload?.earned;
  if (!Array.isArray(payload) && payload?.format !== FORMAT) return fail('Not a Leonida 55 progress file.');
  if (!Array.isArray(entries)) return fail('The file has no list of earned trophies.');
  const byName = new Map(data.trophies.map((t) => [t.name.toLowerCase(), t.id]));
  const earned = [];
  for (const entry of entries) {
    const id = typeof entry === 'string' ? byName.get(entry.toLowerCase()) : entry?.id ?? entry;
    const trophy = data.byId.get(id);
    if (!trophy) return fail(`Unknown trophy: ${JSON.stringify(entry).slice(0, 60)}`);
    if (entry?.name && entry.name !== trophy.name) return fail(`Trophy #${id} is named "${entry.name}", expected "${trophy.name}".`);
    if (!earned.includes(id)) earned.push(id);
  }
  const counters = {};
  for (const [key, value] of Object.entries(payload?.counters ?? {})) {
    const trophy = data.byId.get(Number(key));
    if (!trophy?.count || !Number.isFinite(value) || value < 0) return fail(`Bad counter for trophy #${key}.`);
    counters[trophy.id] = Math.min(value, trophy.count);
  }
  const revealed = (payload?.revealed ?? []).filter((id) => data.byId.has(id));
  const settings = typeof payload?.settings?.spoilers === 'boolean' ? { spoilers: payload.settings.spoilers } : undefined;
  return { ok: true, progress: { earned, counters, revealed, settings }, summary: `${earned.length} earned, ${Object.keys(counters).length} counters` };
}

export async function importProgressFile(file, store, data) {
  let payload;
  try {
    payload = JSON.parse(await file.text());
  } catch {
    return { ok: false, error: 'That file is not valid JSON.' };
  }
  const result = validateProgressPayload(payload, data);
  if (result.ok) store.replaceProgress(result.progress);
  return result;
}
