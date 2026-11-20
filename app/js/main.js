// Boot: read the URL (?view, ?trophy, ?kind, ?grade, ?status, ?q, ?spoilers, ?demo), load the data, wire the top
// bar, and render the current view. The roadmap, missables and sources views load on demand.
import { byId, showToast } from './dom.js';
import { loadGuideData } from './data.js';
import { createProgressStore } from './store.js';
import { exportProgressFile, importProgressFile } from './export-import.js';
import { createFilterState, renderFilterControls } from './filters.js';
import { applySpoilerSetting } from './spoilers.js';
import { renderAuditStrip } from './audit.js';
import { renderProgressSummary } from './progress-summary.js';
import { renderTrophyList } from './checklist-view.js';
import { renderGuidePanel } from './guide-panel.js';
import { renderSourcesPanel } from './sources-panel.js';

const VIEWS = {
  checklist: { el: 'checklist-view' },
  roadmap: { el: 'roadmap', load: () => import('./roadmap-view.js').then((m) => m.renderRoadmapStages) },
  missables: { el: 'missables', load: () => import('./missables-view.js').then((m) => m.renderMissablesView) },
  sources: { el: 'sources-view', load: () => import('./sources-view.js').then((m) => m.renderSourceMatrix) },
};

async function startApp() {
  const params = new URLSearchParams(location.search);
  const store = createProgressStore({ demo: params.has('demo') });
  if (params.has('spoilers')) store.get().settings.spoilers = params.get('spoilers') !== '0';
  const data = await loadGuideData();
  const ctx = {
    data,
    store,
    filters: createFilterState(params),
    state: {
      view: VIEWS[params.get('view')] ? params.get('view') : 'checklist',
      selectedId: data.byId.has(Number(params.get('trophy'))) ? Number(params.get('trophy')) : 28,
      highlightedSource: null,
    },
  };
  ctx.refreshList = () => renderTrophyList(byId('trophy-list'), ctx);
  ctx.refresh = () => renderCurrentView(ctx);
  ctx.selectTrophy = (id, view) => {
    ctx.state.selectedId = id;
    ctx.state.highlightedSource = null;
    if (view) ctx.state.view = view;
    syncUrl(ctx);
    renderCurrentView(ctx);
    if (view) scrollSelectedIntoView();
  };
  ctx.highlightSource = (id) => {
    ctx.state.highlightedSource = id;
    renderSourcesPanel(byId('sources-panel'), ctx);
    document.querySelector(`[data-source="${id}"]`)?.scrollIntoView({ block: 'nearest' });
  };
  wireTopBar(ctx);
  store.onChange(() => renderCurrentView(ctx));
  renderAuditStrip(byId('audit-strip'), data);
  await renderCurrentView(ctx);
  scrollSelectedIntoView();
  document.documentElement.dataset.ready = 'true';
}

async function renderCurrentView(ctx) {
  const { view } = ctx.state;
  document.body.dataset.view = view;
  for (const [name, v] of Object.entries(VIEWS)) byId(v.el).hidden = name !== view;
  document.querySelectorAll('#view-tabs a').forEach((a) => a.classList.toggle('on', a.dataset.view === view));
  byId('spoiler-toggle').checked = ctx.store.get().settings.spoilers;
  renderProgressSummary(byId('progress-summary'), ctx.data, ctx.store);
  if (view === 'checklist') {
    renderFilterControls(byId('filters'), ctx);
    renderTrophyList(byId('trophy-list'), ctx);
    renderGuidePanel(byId('guide-panel'), ctx);
    renderSourcesPanel(byId('sources-panel'), ctx);
  } else {
    const render = await VIEWS[view].load();
    render(byId(VIEWS[view].el), ctx);
  }
}

function wireTopBar(ctx) {
  const { store, data } = ctx;
  applySpoilerSetting(store, store.get().settings.spoilers);
  byId('spoiler-toggle').addEventListener('change', (e) => applySpoilerSetting(store, e.target.checked));
  byId('export-button').addEventListener('click', () => {
    exportProgressFile(store, data);
    showToast('Progress exported as a .json file.');
  });
  byId('import-file').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const result = await importProgressFile(file, store, data);
    showToast(result.ok ? `Imported: ${result.summary}.` : `Import refused: ${result.error}`);
    e.target.value = '';
  });
  document.querySelectorAll('#view-tabs a').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    ctx.state.view = a.dataset.view;
    syncUrl(ctx);
    renderCurrentView(ctx);
  }));
  window.addEventListener('popstate', () => {
    const params = new URLSearchParams(location.search);
    ctx.state.view = VIEWS[params.get('view')] ? params.get('view') : 'checklist';
    if (ctx.data.byId.has(Number(params.get('trophy')))) ctx.state.selectedId = Number(params.get('trophy'));
    renderCurrentView(ctx);
  });
}

function syncUrl(ctx) {
  const params = new URLSearchParams(location.search);
  params.set('view', ctx.state.view);
  params.set('trophy', ctx.state.selectedId);
  history.pushState(null, '', `?${params}`);
}

function scrollSelectedIntoView() {
  document.querySelector('.trophy-row.selected')?.scrollIntoView({ block: 'center' });
}

startApp().catch((error) => {
  byId('audit-strip').textContent = `Could not load the guide data: ${error.message}`;
});
