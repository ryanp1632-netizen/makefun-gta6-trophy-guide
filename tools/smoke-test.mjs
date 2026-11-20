// Drives the real app in headless Chrome and checks the tracker works: saving and reloading progress, the spoiler
// rule and per-trophy reveal, kind/grade/search filters, export-file validation on import, every view rendering, and
// no request leaving app/. Usage: node tools/smoke-test.mjs
import { startBrowser } from './cdp.mjs';

const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok }); console.log(`${ok ? 'pass' : 'FAIL'}  ${name}${detail ? `  (${detail})` : ''}`); };
const rows = 'document.querySelectorAll("#trophy-list .trophy-row").length';

const b = await startBrowser({ port: 8138, debugPort: 9338 });
try {
  await b.open('/?view=checklist&trophy=1');
  check('all 55 trophies listed', await b.evaluate(rows) === 55);
  check('audit strip computed', /55\/55 official.*1P 2G 6S 46B.*28 hidden on PSN/.test(await b.evaluate('document.getElementById("audit-strip").textContent')));
  const masked = await b.evaluate('[...document.querySelectorAll(".trophy-row.masked .row-name")].length');
  check('spoiler setting on by default hides story/hidden trophies', masked === 28, `${masked} masked`);
  check('T**s Ass Drug Money not shown while masked', !(await b.evaluate('document.getElementById("trophy-list").textContent.includes("Drug Money")')));

  await b.evaluate('document.querySelector(\'.trophy-row[data-id="4"] input\').click()');
  check('earning a story trophy reveals it', await b.evaluate('document.getElementById("trophy-list").textContent.includes("T**s Ass Drug Money")'));
  await b.evaluate('document.querySelector(\'.trophy-row[data-id="5"] .reveal\').click()');
  check('Reveal shows one hidden trophy', await b.evaluate('document.getElementById("trophy-list").textContent.includes("Vice City, Baby!")'));
  await b.evaluate('document.querySelector(\'.trophy-row[data-id="28"] input\').click()');

  await b.open('/?view=checklist&trophy=28');
  const saved = await b.evaluate('JSON.parse(localStorage.getItem("leonida55.progress.v1")).earned');
  check('progress saved in localStorage and kept on reload', JSON.stringify(saved) === '[4,28]', JSON.stringify(saved));
  check('progress bar counts it', (await b.evaluate('document.querySelector(".big-count").textContent')).startsWith('2/55'));

  const chip = (label) => `[...document.querySelectorAll("#filters .chip")].find((c) => c.textContent.startsWith(${JSON.stringify(label)})).click()`;
  await b.evaluate(chip('Missable'));
  check('Missable filter', await b.evaluate(rows) === 4);
  await b.evaluate(chip('Story'));
  check('Story filter', await b.evaluate(rows) === 12);
  await b.evaluate(chip('Online'));
  check('Online filter shows 0', await b.evaluate(rows) === 0 && await b.evaluate('document.querySelector("#trophy-list .empty") !== null'));
  await b.evaluate(chip('All'));
  await b.evaluate(chip('Earned'));
  check('Earned filter', await b.evaluate(rows) === 2);
  await b.evaluate(chip('Earned'));
  await b.evaluate(`{ const s = document.getElementById("search-box"); s.value = "Kenton"; s.dispatchEvent(new Event("input")); }`);
  check('search finds Kenton guides (masked names searched by summary)', await b.evaluate(rows) >= 1);
  await b.evaluate(`{ const s = document.getElementById("search-box"); s.value = ""; s.dispatchEvent(new Event("input")); }`);

  const validation = await b.evaluate(`(async () => {
    const { validateProgressPayload } = await import('./js/export-import.js');
    const { loadGuideData } = await import('./js/data.js');
    const data = await loadGuideData();
    const good = validateProgressPayload({ format: 'leonida55-progress', earned: [{ id: 1, name: 'Vice Got a Price!' }, 2], counters: { 28: 5 } }, data);
    const badName = validateProgressPayload({ format: 'leonida55-progress', earned: [{ id: 1, name: 'Nope' }] }, data);
    const badId = validateProgressPayload({ format: 'leonida55-progress', earned: [99] }, data);
    const badFormat = validateProgressPayload({ earned: [1] }, data);
    const badCounter = validateProgressPayload({ format: 'leonida55-progress', earned: [], counters: { 2: 5 } }, data);
    return [good.ok, badName.ok, badId.ok, badFormat.ok, badCounter.ok];
  })()`);
  check('import validation accepts a good file and refuses bad ones', JSON.stringify(validation) === '[true,false,false,false,false]', JSON.stringify(validation));

  const roundTrip = await b.evaluate(`(async () => {
    const { buildProgressFile, validateProgressPayload } = await import('./js/export-import.js');
    const { createProgressStore } = await import('./js/store.js');
    const { loadGuideData } = await import('./js/data.js');
    const data = await loadGuideData();
    const file = JSON.parse(JSON.stringify(buildProgressFile(createProgressStore(), data)));
    const back = validateProgressPayload(file, data);
    return back.ok && JSON.stringify(back.progress.earned);
  })()`);
  check('export file imports back', roundTrip === '[4,28]', String(roundTrip));

  for (const view of ['roadmap', 'missables', 'sources']) {
    await b.open(`/?view=${view}`);
    const id = { roadmap: 'roadmap', missables: 'missables', sources: 'sources-view' }[view];
    check(`${view} view renders`, await b.evaluate(`document.getElementById("${id}").children.length > 1`));
  }
  await b.open('/?view=roadmap');
  const placed = await b.evaluate('document.querySelectorAll("#roadmap .road-trophies li").length');
  check('roadmap places all 55 trophies', placed === 55, String(placed));

  await b.open('/?demo=1');
  await b.open('/?view=checklist');
  check('demo mode never overwrites saved progress', (await b.evaluate('document.querySelector(".big-count").textContent')).startsWith('2/55'));
  check('no request left app/, no console error', b.problems.length === 0, b.problems.join('; '));
} finally {
  await b.close();
}
const failed = results.filter((r) => !r.ok).length;
console.log(`${results.length - failed}/${results.length} passed`);
if (failed) process.exit(1);
