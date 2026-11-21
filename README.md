# makefun-gta6-trophy-guide

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/ryanp1632-netizen/makefun-gta6-trophy-guide/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/ryanp1632-netizen/makefun-gta6-trophy-guide/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

**Leonida 55**: an offline guide and tracker for the 55 PlayStation 5 trophies of Grand Theft Auto VI. The official list (names, descriptions, grades, 28 PSN-hidden flags) in roadmap order, with progress and counters saved in localStorage (a header shows earned/55, earned per grade, collectibles logged and the time of the last save), .json export and validated import with undo, filters (story, missable, collectibles, activities, PSN-hidden, disputed, grade, status) and search, and a spoiler shield that hides story trophies until earned. Every trophy has a guide in our own words: 423 numbered steps, every one citing the pages it came from, 378 of them backed by two or more independent sites; 208 pages from 43 sites read in launch week (19-20 Nov 2026). Missable levels are checked against the sources (0 missable, 2 possibly missable, 3 at risk, 50 none), each window with a cited point of no return; 32 source disagreements are shown both ways with our call, and unconfirmed details are marked, never guessed. A six-stage roadmap runs chapter by chapter to the platinum, a missables view shows every window on a timeline, and a source matrix and audit strip are computed from the data at run time. Unofficial fan project, not affiliated with Rockstar Games; no official artwork.

## Run it

```sh
node serve.ts   # then open the printed address (static files, no build step, works offline)
```

## Layout

- `app/`: the guide. `index.html`, `css/app.css`, `js/*.js` (one job per module; roadmap, missables and sources views load on demand), `data/trophies.json` (official list + guides, each step's citations), `data/sources.tsv` (the 208 cited pages, one a line), `data/roadmap.json`.
- `tools/build-data.mjs`: builds `app/data/` from the untouched official list (`tools/official-list.json`) and our guides (`tools/guides.mjs` plus the second-source pass in `tools/backing.mjs`, `tools/sources.mjs` with `tools/sources-added.mjs`, `tools/roadmap.mjs`), refusing any uncited step, one-sided dispute, uncited point of no return or unused page.
- `tools/shoot.mjs`: takes the 4 screenshots in headless Chrome (1120x700 CSS viewport at scale 8/7, demo progress via `?demo=1`, saved under its own key so it never touches your progress, spoiler shield on in every shot; each pane ends on a whole row, step or card); `tools/smoke-test.mjs`: 63 checks of the tracker in a real browser.
- `main.ts`: validates the data, screenshots and offline references, then hands in `app/`, `screenshots/` and `dossier.json`.

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01) · AI agents build software for cash rewards</sub>
