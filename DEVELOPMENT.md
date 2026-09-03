# Development Guide

Written for someone who isn't a full-time frontend developer. If something here is unclear, that's a bug in the doc — simplify it further when you touch this file.

## Architecture, in one paragraph

There is no server-side code. The build step turns `src/` into static HTML/CSS/JS in `dist/`, which any static host (here, Cloudflare Pages) serves over a CDN. The "database" is `src/data/stations.json`, bundled into the build. Favourites live in the visitor's own browser (`localStorage`) — there is nothing to sync, back up, or lose on a server, because nothing is stored server-side.

## Why no backend

A backend would only be needed for things this site doesn't do: user accounts, server-side data that must be shared and mutated by many users concurrently, hiding a secret API key, or server-rendered pages for extreme SEO needs. None apply — station data is read-only and public, favourites are single-user and fine in the browser. Revisit this only if you add: visitor-submitted stations, listener accounts, or aggregate play-count analytics across all users.

## Data flow

```
src/data/stations.json
        │  (imported at build time, typed as Station[])
        ▼
   Home.tsx / Favorites.tsx / RadioDetails.tsx
        │  (filterStations / matchesQuery in src/utils/search.ts)
        ▼
   RadioGrid → RadioCard  (one card per station)
```

Search and category filtering both run in `src/utils/search.ts`, entirely client-side, against the in-memory array — no network request, so results update as you type.

## Audio player architecture

`src/hooks/PlayerContext.tsx` creates **one** `HTMLAudioElement` when the app first loads, and holds it in a React Context so it survives route navigation — that's how the sticky bottom player (`AudioPlayer.tsx`) keeps playing while you browse to another page. No audio connection is opened until a listener presses Play on a card or the details page; only one stream is ever open at a time (starting a new station stops the previous one, since they share the same `<audio>` element).

State machine (`PlayerStatus`): `idle → loading → playing`, with `paused` and `error` reachable from `playing`/`loading`. The UI (`RadioCard`, `AudioPlayer`) reads this status to show spinners, the Pause icon, or a Retry button.

## How favourites work

`src/hooks/useFavorites.ts` is a small hook wrapping `localStorage` under the key `kikifm.favorites` (an array of station ids). It fails soft — if storage is unavailable (e.g. strict private-browsing mode), favouriting simply won't persist across a reload, but nothing crashes.

## How routing works

Four routes, all in `src/App.tsx`:

| Path | Page | Notes |
|---|---|---|
| `/` | `Home.tsx` | Hero, search, category filter, grid. Category is a URL query param (`?category=Tamil`) so it's shareable/bookmarkable. |
| `/favorites` | `Favorites.tsx` | Filters `stations.json` down to saved ids. |
| `/radio/:id` | `RadioDetails.tsx` | Looks up the station by id; sets `document.title` for that station. |
| `/about` | `About.tsx` | Includes the `#disclaimer` anchor linked from the footer. |

## Streaming notes (read before adding real stations)

- **Format:** the native `<audio>` element plays MP3 and AAC streams (the vast majority of Icecast/Shoutcast radio streams) with zero extra code. If a station only offers an HLS (`.m3u8`) stream, you'll need to add `hls.js` for non-Safari browsers — not included by default, to keep the bundle small, since most radio streams aren't HLS.
- **HTTPS is mandatory.** The site is served over HTTPS, so browsers block loading an `http://` stream from it (mixed content). If a station's stream URL is `http://`, it will not play here — that's a browser security rule, not something this app can bypass, and there is no proxy in this project to work around it.
- **CORS does not apply to playback.** `<audio src="...">` doesn't trigger CORS checks (only `fetch`/`XHR` do), so you do not need the station's permission or a CORS header just to play their stream this way.
- **Autoplay is blocked by browsers** until a real click happens on the page — which is already how this app works (the Play button), so there's nothing extra to configure.
- **One stream at a time, by design.** Pressing Play on a new station stops whatever was playing — this keeps bandwidth and behaviour predictable.

## Deployment (Cloudflare Pages)

1. Push this repository to GitHub/GitLab.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**, select the repo.
3. Build settings: **Build command** `npm run build`, **Build output directory** `dist`.
4. Every push to `main` deploys to production automatically; every Pull Request gets its own preview URL automatically — nothing extra to configure.
5. **Rollback:** Pages keeps every previous deployment — open the deployment list and click "Rollback to this deployment" on any earlier one. No CLI needed.

No deploy step lives in `.github/workflows/ci.yml` on purpose — that file only lints/tests/builds on every PR as a safety check. Cloudflare's own Git integration handles the actual deploy, so no API tokens need to be stored as GitHub secrets.

## Where to make common changes

| I want to... | Edit... |
|---|---|
| Add/remove/edit a station | `src/data/stations.json` |
| Change colours/branding | `src/styles/tokens.css` |
| Change the logo/wordmark | `src/components/Header.tsx` |
| Change hero text | `src/pages/Home.tsx` |
| Add a new page | `src/pages/`, then register it in `src/App.tsx` |
| Change the sticky player | `src/components/AudioPlayer.tsx` / `.css` |

## Troubleshooting

- **"Unable to connect to this station."** — the stream URL is down, wrong, or `http://` on an `https://` site. Open the `streamUrl` directly in a browser tab to check it plays at all.
- **Build fails with a TypeScript error about `stations.json`** — check every entry matches the `Station` type in `src/types.ts` (e.g. `isActive` must be `true`/`false`, not a string).
- **A new station doesn't show up** — hard-refresh; Vite dev server should hot-reload `stations.json` automatically, but a stale browser cache can hide it.
- **Favourites disappeared** — they're per-browser/per-device (`localStorage`); clearing site data or using a different browser/device starts fresh.
