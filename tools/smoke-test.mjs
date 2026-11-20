// Drives the real app in headless Chrome and checks the tracker works: roadmap-ordered grouped list, saving and
// reloading progress and counters, the spoiler shield and per-trophy reveal, kind/missable/PSN-hidden/disputed/grade/
// status filters and search, the guide's official box, missable window, disputes and cited steps, the source cards,
// export-file validation on import (shape, version, unknown ids skipped, counters in range, summary, undo), every view rendering, and no request leaving app/. Usage: node tools/smoke-test.mjs
import { startBrowser } from './cdp.mjs';

const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok }); console.log(`${ok ? 'pass' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`); };
const rows = 'document.querySelectorAll("#trophy-list .trophy-row").length';
const text = (sel) => `(document.querySelector(${JSON.stringify(sel)})?.textContent ?? "")`;

const b = await startBrowser({ port: 8138, debugPort: 9338 });
try {
  await b.open('/?view=tracker&trophy=1');
  check('all 55 trophies listed', await b.evaluate(rows) === 55);
  const groups = await b.evaluate('document.querySelectorAll("#trophy-list .group-head").length');
  check('list grouped under 10 roadmap headers', groups === 10, String(groups));
  check('list starts with the Prologue & Chapter 1 group', (await b.evaluate(text('#trophy-list li'))).includes('Prologue & Chapter 1'));
  const audit = await b.evaluate(text('#audit-strip'));
  check('audit strip computed', /55\/55 official.*1P 2G 6S 46B.*28 PSN-hidden.*(\d+)\/\1 claims cited.*backed by 2\+ sites.*55\/55 guides cite.*pages · \d+ sites.*disputes shown/.test(audit), audit.slice(0, 160));
  const masked = await b.evaluate('document.querySelectorAll(".trophy-row.masked").length');
  check('spoiler shield on by default hides the 12 story trophies', masked === 12, `${masked} masked`);
  check('T**s Ass Drug Money not shown while shielded', !(await b.evaluate('document.getElementById("trophy-list").textContent.includes("Drug Money")')));

  await b.evaluate('document.querySelector(\'.trophy-row[data-id="4"] input\').click()');
  check('earning a story trophy reveals it', await b.evaluate('document.getElementById("trophy-list").textContent.includes("T**s Ass Drug Money")'));
  await b.evaluate('document.querySelector(\'.trophy-row[data-id="5"] .reveal\').click()');
  check('Reveal shows one story trophy', await b.evaluate('document.getElementById("trophy-list").textContent.includes("Vice City, Baby!")'));
  await b.evaluate('document.querySelector(\'.trophy-row[data-id="28"] input\').click()');

  await b.open('/?view=tracker&trophy=28');
  await b.evaluate('[...document.querySelectorAll(".counter button")][1].click()');
  await b.evaluate('[...document.querySelectorAll(".counter button")][1].click()');
  await b.open('/?view=tracker&trophy=28');
  const saved = await b.evaluate('JSON.parse(localStorage.getItem("leonida55.progress.v1"))');
  check('progress saved in localStorage and kept on reload', JSON.stringify(saved.earned) === '[4,28]', JSON.stringify(saved.earned));
  check('counter saved (2/18 meditations)', saved.counters['28'] === 2 && (await b.evaluate(text('.counter'))).includes('2/18'));
  check('progress meter counts it', (await b.evaluate(text('.big-count'))).startsWith('2/55'));

  check('guide shows the official description box', (await b.evaluate(text('.official-box'))).includes('Meditate at every spot across Leonida.'));
  check('guide shows a missable window with a point of no return', /Point of no return/.test(await b.evaluate(text('.note.window'))));
  check('guide shows a dispute with both sides and our call', await b.evaluate('(() => { const d = document.querySelector(".note.dispute"); return !!d && d.querySelectorAll(".side").length === 2 && d.querySelectorAll(".side .cite").length >= 2 && /Our call/.test(d.textContent); })()'));
  const stepCites = await b.evaluate('[...document.querySelectorAll(".steps li")].map((li) => li.querySelectorAll(".cite").length)');
  check('every step of the guide has [n] citations', stepCites.length >= 5 && stepCites.every((n) => n > 0), JSON.stringify(stepCites));
  check('source cards list each cited page with its use', await b.evaluate('document.querySelectorAll(".source-card").length') >= 3 && /claims? here · in \d+\/55 guides/.test(await b.evaluate(text('.source-card'))));
  check('next up lists unearned trophies in roadmap order', await b.evaluate('document.querySelectorAll(".next-up li").length') === 4);

  const chip = (label) => `[...document.querySelectorAll("#filters .chip")].find((c) => c.textContent.startsWith(${JSON.stringify(label)})).click()`;
  const counts = {};
  for (const label of ['Missable', 'Story', 'Collectibles', 'Activities', 'PSN-hidden', 'Disputed', 'Online']) {
    await b.evaluate(chip(label));
    counts[label] = await b.evaluate(rows);
  }
  check('Story filter shows 12', counts.Story === 12);
  check('Missable filter shows the flagged trophies', counts.Missable >= 1 && counts.Missable <= 10, String(counts.Missable));
  check('Collectibles and Activities filters', counts.Collectibles > 0 && counts.Activities > 0, `${counts.Collectibles}/${counts.Activities}`);
  check('PSN-hidden filter shows 28', counts['PSN-hidden'] === 28);
  check('Disputed filter', counts.Disputed > 0, String(counts.Disputed));
  check('Online filter shows 0', counts.Online === 0 && await b.evaluate('document.querySelector("#trophy-list .empty") !== null'));
  await b.evaluate(chip('All'));
  await b.evaluate(chip('Earned'));
  check('Earned filter', await b.evaluate(rows) === 2);
  await b.evaluate(chip('Earned'));
  await b.evaluate('document.querySelector(".grade-chip .medal.gold").parentElement.click()');
  check('Gold grade chip shows 2', await b.evaluate(rows) === 2);
  await b.evaluate('document.querySelector(".grade-chip .medal.gold").parentElement.click()');
  await b.evaluate(`{ const s = document.getElementById("search-box"); s.value = "Kenton"; s.dispatchEvent(new Event("input")); }`);
  check('search finds the Kenton guide', await b.evaluate(rows) >= 1 && await b.evaluate('document.getElementById("trophy-list").textContent.includes("This Was No Boat Accident")'));
  await b.evaluate(`{ const s = document.getElementById("search-box"); s.value = ""; s.dispatchEvent(new Event("input")); }`);

  const validation = await b.evaluate(`(async () => {
    const { validateProgressPayload } = await import('./js/export-import.js');
    const { loadGuideData } = await import('./js/data.js');
    const data = await loadGuideData();
    const good = validateProgressPayload({ format: 'leonida55-progress', version: 1, earned: [{ id: 1, name: 'Vice Got a Price!' }, 2], counters: { 28: 5 } }, data);
    const badName = validateProgressPayload({ format: 'leonida55-progress', version: 1, earned: [{ id: 1, name: 'Nope' }] }, data);
    const badId = validateProgressPayload({ format: 'leonida55-progress', version: 1, earned: [99] }, data);
    const badFormat = validateProgressPayload({ earned: [1] }, data);
    const badCounter = validateProgressPayload({ format: 'leonida55-progress', version: 1, earned: [], counters: { 2: 5 } }, data);
    return [good.ok, badName.ok, badId.ok, badFormat.ok, badCounter.ok];
  })()`);
  check('import validation accepts a good file and refuses bad ones', JSON.stringify(validation) === '[true,false,false,false,false]', JSON.stringify(validation));

  const strict = await b.evaluate(`(async () => {
    const { validateProgressPayload } = await import('./js/export-import.js');
    const { loadGuideData } = await import('./js/data.js');
    const data = await loadGuideData();
    const base = { format: 'leonida55-progress', version: 1 };
    const v = (extra) => validateProgressPayload({ ...base, ...extra }, data);
    const mixed = v({ earned: [1, 99, { id: 3, name: 'Wrong' }, 2, 2], counters: { 28: 5, 17: 43, 2: 1, 31: 1.5 }, revealed: [4, 77] });
    return {
      newerVersion: v({ version: 2, earned: [1] }).ok,
      noVersion: validateProgressPayload({ format: 'leonida55-progress', earned: [1] }, data).ok,
      otherList: v({ totals: { trophies: 60 }, earned: [1] }).ok,
      badShape: v({ earned: [1], counters: [5] }).ok || v({ earned: [1], revealed: 4 }).ok,
      onlyBadCounter: v({ earned: [], counters: { 28: 99 } }).ok,
      mixedOk: mixed.ok,
      earned: mixed.progress?.earned, counters: mixed.progress?.counters, revealed: mixed.progress?.revealed,
      summary: mixed.summary,
      bareNames: validateProgressPayload(['Vice Got a Price!', 'Trust'], data).progress?.earned,
    };
  })()`);
  check('import refuses a newer version, a missing version, another list and a bad shape',
    !strict.newerVersion && !strict.noVersion && !strict.otherList && !strict.badShape && !strict.onlyBadCounter, JSON.stringify(strict).slice(0, 120));
  check('import skips unknown ids, mismatched names and out-of-range counters, keeps the rest',
    JSON.stringify([strict.earned, strict.counters, strict.revealed]) === '[[1,2],{"28":5},[4]]', JSON.stringify([strict.earned, strict.counters, strict.revealed]));
  check('import summary counts what applies and names what it skipped',
    strict.summary.startsWith('2 earned, 1 counters, 1 revealed.') && /Unknown ids skipped: 99, 77/.test(strict.summary) && /#3 "Wrong"/.test(strict.summary) && /#2=1, #17=43, #31=1\.5/.test(strict.summary), strict.summary);
  check('bare list of official names imports', JSON.stringify(strict.bareNames) === '[1,8]', JSON.stringify(strict.bareNames));

  const undo = await b.evaluate(`(async () => {
    const { buildProgressFile, importProgressFile, undoLastImport, canUndoImport } = await import('./js/export-import.js');
    const { createProgressStore } = await import('./js/store.js');
    const { loadGuideData } = await import('./js/data.js');
    const data = await loadGuideData();
    const store = createProgressStore({ demo: true });
    const before = JSON.stringify(store.get().earned);
    const file = (obj) => new File([JSON.stringify(obj)], 'p.json');
    let asked = '';
    const declined = await importProgressFile(file({ format: 'leonida55-progress', version: 1, earned: [7] }), store, data, (s) => { asked = s; return false; });
    const unchanged = JSON.stringify(store.get().earned) === before;
    const done = await importProgressFile(file({ format: 'leonida55-progress', version: 1, earned: [7], counters: { 28: 3 } }), store, data);
    const applied = JSON.stringify(store.get().earned) === '[7]' && store.counter(28) === 3;
    const undone = canUndoImport() && undoLastImport(store) && JSON.stringify(store.get().earned) === before;
    const exported = buildProgressFile(store, data);
    return { asked, declined: declined.cancelled === true, unchanged, done: done.ok, applied, undone, secondUndo: undoLastImport(store),
      selfDescribing: exported.app === 'Leonida 55' && exported.version === 1 && !Number.isNaN(Date.parse(exported.exportedAt)) && exported.exportedAt.endsWith('Z')
        && JSON.stringify(exported.totals) === '{"trophies":55,"platinum":1,"gold":2,"silver":6,"bronze":46}' && exported.earnedTotals.trophies === exported.earned.length };
  })()`);
  check('import asks first with its summary, and a no changes nothing', undo.declined && undo.unchanged && /^Import 1 earned, 0 counters, 0 revealed\?/.test(undo.asked), undo.asked.split('\n')[0]);
  check('import applies, and Undo restores the progress it replaced (once)', undo.done && undo.applied && undo.undone && undo.secondUndo === false, JSON.stringify(undo));
  check('export file names its app, version, ISO time and the 55-trophy totals', undo.selfDescribing);

  const roundTrip = await b.evaluate(`(async () => {
    const { buildProgressFile, validateProgressPayload } = await import('./js/export-import.js');
    const { createProgressStore } = await import('./js/store.js');
    const { loadGuideData } = await import('./js/data.js');
    const data = await loadGuideData();
    const file = JSON.parse(JSON.stringify(buildProgressFile(createProgressStore(), data)));
    const back = validateProgressPayload(file, data);
    return back.ok && JSON.stringify([back.progress.earned, back.progress.counters[28]]);
  })()`);
  check('export file imports back with counters', roundTrip === '[[4,28],2]', String(roundTrip));

  for (const view of ['roadmap', 'missables', 'sources']) {
    await b.open(`/?view=${view}`);
    const id = { roadmap: 'roadmap', missables: 'missables', sources: 'sources-view' }[view];
    check(`${view} view renders`, await b.evaluate(`document.getElementById("${id}").children.length > 1`));
  }
  await b.open('/?view=roadmap');
  const placed = await b.evaluate('document.querySelectorAll("#roadmap .road-trophies li").length');
  check('roadmap places all 55 trophies', placed === 55, String(placed));
  check('roadmap shows points of no return', await b.evaluate('document.querySelectorAll("#roadmap .chapter-warn").length') >= 2);
  await b.open('/?view=missables');
  check('missables view: timeline and one card per flagged trophy', await b.evaluate('document.querySelectorAll(".timeline li").length') === 6 && await b.evaluate('document.querySelectorAll(".missable-card").length') === counts.Missable);
  await b.open('/?view=sources');
  const siteRows = await b.evaluate('document.querySelectorAll(".matrix tbody tr").length');
  check('sources view: one matrix row per site', siteRows >= 18, String(siteRows));

  await b.open('/?demo=1');
  await b.open('/?view=tracker');
  check('demo mode never overwrites saved progress', (await b.evaluate(text('.big-count'))).startsWith('2/55'));
  check('no request left app/, no console error', b.problems.length === 0, b.problems.join('; '));
} finally {
  await b.close();
}
const failed = results.filter((r) => !r.ok).length;
console.log(`${results.length - failed}/${results.length} passed`);
if (failed) process.exit(1);
