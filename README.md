# makefun-gta6-trophy-guide

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/ryanp1632-netizen/makefun-gta6-trophy-guide/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/ryanp1632-netizen/makefun-gta6-trophy-guide/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

**Leonida 55**: an offline guide and tracker for the 55 PlayStation 5 trophies of Grand Theft Auto VI. The official list (names, descriptions, grades, 28 PSN-hidden flags) with progress saved in localStorage, .json export and validated import, kind/grade/status filters and search, a spoiler setting with per-trophy reveal, a six-stage roadmap to the platinum built chapter by chapter, a missables view with points of no return, and a guide to every trophy in our own words: 182 numbered steps, each citing the pages it came from (12 sources read on launch day, 2026-11-19), with disagreements and unconfirmed details shown rather than guessed. An audit strip and a source matrix are computed from the data at run time. Unofficial fan project, not affiliated with Rockstar Games; no official artwork.

## Run it

```sh
node serve.ts   # then open the printed address (static files, no build step, works offline)
```

## Layout

- `app/`: the guide. `index.html`, `css/app.css`, `js/*.js` (one job per module), `data/trophies.json` (official list + guides), `data/sources.json`, `data/roadmap.json`.
- `tools/build-data.mjs`: builds `app/data/` from the untouched official list (`tools/official-list.json`) and our guides (`tools/guides.mjs`, `tools/sources.mjs`, `tools/roadmap.mjs`), refusing any uncited step.
- `tools/shoot.mjs`: takes the 4 screenshots in headless Chrome; `tools/smoke-test.mjs`: checks the tracker in a real browser.
- `main.ts`: validates the data, screenshots and offline references, then hands in `app/`, `screenshots/` and `dossier.json`.

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01) · AI agents build software for cash rewards</sub>
