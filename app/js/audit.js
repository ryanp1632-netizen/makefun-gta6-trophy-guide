// The audit strip: facts the app computes from its own data each time it loads, nothing typed in by hand. A claim is
// one numbered step of a guide; it is "backed by 2+ sites" when its citations come from two independent websites.
import { h } from './dom.js';
import { GRADES } from './data.js';

export function computeAuditStats(data) {
  const { trophies, sources } = data;
  const grades = Object.fromEntries(Object.keys(GRADES).map((g) => [g, trophies.filter((t) => t.grade === g).length]));
  const steps = trophies.flatMap((t) => t.steps);
  const known = (id) => data.sourceById.has(id);
  const cited = steps.filter((s) => s.cite.length && s.cite.every(known));
  const used = sources.filter((s) => data.sourceUse.get(s.id).guides > 0);
  const level = (l) => trophies.filter((t) => t.missable?.level === l).length;
  return {
    total: trophies.length,
    official: trophies.filter((t) => t.name && t.description && GRADES[t.grade]).length,
    grades,
    hidden: trophies.filter((t) => t.hidden).length,
    claims: steps.length,
    claimsCited: cited.length,
    claimsMulti: steps.filter((s) => data.sitesOf(s.cite).length >= 2).length,
    guidesCited: trophies.filter((t) => t.steps.length && t.steps.every((s) => s.cite.length && s.cite.every(known))).length,
    pages: used.length,
    sites: new Set(used.map((s) => s.site)).size,
    readOn: data.readOn,
    missable: level('missable'),
    possible: level('possible'),
    risk: level('risk'),
    disputes: trophies.reduce((n, t) => n + t.disputes.length, 0),
    disputedTrophies: trophies.filter((t) => t.disputes.length).length,
    unconfirmed: trophies.reduce((n, t) => n + t.unconfirmed.length, 0),
    online: trophies.filter((t) => t.kinds.includes('online')).length,
  };
}

export function renderAuditStrip(root, data) {
  const s = computeAuditStats(data);
  const g = s.grades;
  const fact = (strong, rest, tone) => h('span', { class: `fact${tone ? ` ${tone}` : ''}` }, h('b', null, strong), rest);
  root.replaceChildren(
    h('span', { class: 'audit-label', title: 'Computed from the guide data at load' }, 'Audit'),
    fact(`${s.official}/${s.total}`, ' official name, description & grade', s.official === 55 ? 'good' : 'bad'),
    fact(`${g.platinum}P ${g.gold}G ${g.silver}S ${g.bronze}B`, ''),
    fact(s.hidden, ' PSN-hidden'),
    fact(`${s.claimsCited}/${s.claims}`, ' claims cited', s.claimsCited === s.claims ? 'good' : 'bad'),
    fact(s.claimsMulti, ' backed by 2+ sites', 'good'),
    fact(`${s.guidesCited}/${s.total}`, ' guides cite sources', s.guidesCited === s.total ? 'good' : 'bad'),
    fact(`${s.pages} pages · ${s.sites} sites`, ` read ${s.readOn}`),
    fact(`${s.missable} missable · ${s.possible} possibly missable · ${s.risk} at risk`, ` · ${s.total - s.missable - s.possible - s.risk} none`, 'warn'),
    fact(s.disputes, ' disputes shown both ways', 'dispute'),
    fact(s.unconfirmed, ' unconfirmed, marked'),
    fact(`Online ${s.online}`, ''),
  );
}
