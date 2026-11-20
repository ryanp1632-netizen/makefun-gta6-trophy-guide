// The audit strip: facts the app computes from its own data each time it loads, nothing typed in by hand.
import { h } from './dom.js';
import { GRADES } from './data.js';

export function computeAuditStats(data) {
  const { trophies, sources } = data;
  const grades = Object.fromEntries(Object.keys(GRADES).map((g) => [g, trophies.filter((t) => t.grade === g).length]));
  const steps = trophies.flatMap((t) => t.steps);
  const knownSource = (id) => data.sourceById.has(id);
  const citedGuides = trophies.filter((t) => t.steps.length && t.steps.every((s) => s.cite.length && s.cite.every(knownSource)));
  return {
    total: trophies.length,
    official: trophies.filter((t) => t.name && t.description && GRADES[t.grade]).length,
    grades,
    hidden: trophies.filter((t) => t.hidden).length,
    guidesCited: citedGuides.length,
    steps: steps.length,
    stepsCited: steps.filter((s) => s.cite.length).length,
    sources: sources.length,
    sourcesUsed: sources.filter((s) => data.citedBy.get(s.id) > 0).length,
    missable: trophies.filter((t) => t.missableLevel === 'missable').length,
    watch: trophies.filter((t) => t.missableLevel === 'watch').length,
    online: trophies.filter((t) => t.kinds.includes('online')).length,
    disagreements: trophies.reduce((n, t) => n + t.disagree.length, 0),
    unconfirmed: trophies.reduce((n, t) => n + t.unconfirmed.length, 0),
  };
}

export function renderAuditStrip(root, data) {
  const s = computeAuditStats(data);
  const g = s.grades;
  const fact = (text, tone) => h('span', { class: `fact${tone ? ` ${tone}` : ''}` }, text);
  root.replaceChildren(
    h('b', { title: 'Computed from the guide data at load' }, 'Audit'),
    fact(`${s.official}/${s.total} official`, s.official === 55 ? 'good' : 'bad'),
    fact(`${g.platinum}P ${g.gold}G ${g.silver}S ${g.bronze}B`),
    fact(`${s.hidden} hidden on PSN`),
    fact(`${s.guidesCited}/${s.total} guides cited`, s.guidesCited === s.total ? 'good' : 'bad'),
    fact(`${s.stepsCited}/${s.steps} steps cited`, s.stepsCited === s.steps ? 'good' : 'bad'),
    fact(`${s.sourcesUsed} sources`),
    fact(`${s.missable} missable · ${s.watch} watch`, 'warn'),
    fact(`${s.disagreements} disagreements`),
    fact(`${s.unconfirmed} unconfirmed`),
    fact(`Online ${s.online}`),
  );
}
