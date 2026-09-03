# KiKi FM

A simple, fast website for browsing and listening to Tamil radio stations online. Search by name or city, filter by category, save favourites, and press play — no account required.

## 1. What is KiKi FM?

KiKi FM is a static website: a list of radio stations (in one JSON file) rendered as browsable, playable cards. There is no backend, no database, and no login. Everything the site needs ships as static files served from a CDN.

## 2. Technology used

- **React + TypeScript + Vite** — the UI and build tool
- **react-router-dom** — the 4 pages (`/`, `/favorites`, `/radio/:id`, `/about`)
- **Plain CSS** (CSS custom properties) — no UI framework
- **Native HTML5 `<audio>`** — stream playback, no custom player library
- **`localStorage`** — favourites, kept per-browser
- **Vitest + Testing Library** — tests
- **Cloudflare Pages** — hosting (see `DEVELOPMENT.md` for why)

## 3. How to install

You'll need [Node.js](https://nodejs.org) 20 or later (includes npm). Then:

```bash
git clone <repository>
cd kiki-fm
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

## 4. How to add a radio station

Edit **`src/data/stations.json`**. Copy an existing entry and change the values:

```json
{
  "id": "unique-id-no-spaces",
  "name": "Station Name",
  "description": "One sentence about the station.",
  "streamUrl": "https://station-server.example.com/stream",
  "logo": "/images/stations/unique-id-no-spaces.svg",
  "category": "Tamil",
  "city": "Chennai",
  "country": "India",
  "website": "https://station-website.example.com",
  "isActive": true
}
```

- `streamUrl` **must** start with `https://` (see "Streaming notes" in `DEVELOPMENT.md`).
- Drop a logo image into `public/images/stations/` matching the `logo` path (square image, any size — it's displayed at a fixed small size).
- Set `isActive: false` to keep a station listed but show it as "Offline" with the Play button disabled, instead of deleting it.
- The website picks up the new station automatically — no other code changes needed.
- You only have permission to list stations and use logos you're authorized to use — see `DISCLAIMER.md`.

## 5. How to change the logo / wordmark

The header logo is inline SVG + text in `src/components/Header.tsx` (`<svg>...KiKi FM`). Colours come from `src/styles/tokens.css` (`--marigold`, `--ink`, etc.) — change those variables to re-theme the whole site.

## 6. How to change website text

- Hero headline/tagline: `src/pages/Home.tsx`
- About page / disclaimer text: `src/pages/About.tsx`
- Footer text: `src/components/Footer.tsx`
- Page `<title>` / meta description: `index.html`

## 7. How to run tests

```bash
npm test
```

## 8. How to build

```bash
npm run build
```

Output goes to `dist/`. Preview the production build locally with `npm run preview`.

## 9. How to create a feature branch

```bash
git checkout -b feature/my-change
```

## 10. How to create a Pull Request

Push your branch and open a PR against `main` on GitHub. CI (lint, test, build) runs automatically. See `CONTRIBUTING.md` for the full workflow.

## 11. How production deployment works

Merging to `main` triggers an automatic deploy on Cloudflare Pages — nothing to run by hand. Full details, rollback steps, and architecture notes are in `DEVELOPMENT.md`.

## Documentation index

- `DEVELOPMENT.md` — architecture, streaming/CORS notes, deployment, troubleshooting
- `CONTRIBUTING.md` — git branching and PR rules
- `DISCLAIMER.md` — legal notes on third-party stream content
