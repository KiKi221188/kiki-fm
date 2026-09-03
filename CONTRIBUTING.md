# Contributing

## Branching

```
main
  |
  |--- feature/xxx   (new functionality, e.g. feature/add-hls-support)
  |
  |--- bugfix/xxx     (fixes, e.g. bugfix/volume-slider-mobile)
```

- `main` is production — every commit on `main` is deployed automatically.
- Never commit directly to `main`. Always branch, then open a Pull Request.
- Name branches descriptively: `feature/...` or `bugfix/...`.

## Workflow

```bash
git checkout main
git pull
git checkout -b feature/my-change

# make your changes
npm run lint
npm test
npm run build

git add .
git commit -m "Short, clear description of the change"
git push -u origin feature/my-change
```

Then open a Pull Request on GitHub against `main`.

## Pull Request rules

- CI must pass (lint, test, build) before merging — this runs automatically on every PR.
- Keep PRs focused: one station addition, one fix, or one feature per PR is easier to review than a mixed batch.
- Adding or editing a station? Just changing `src/data/stations.json` (plus a logo file) is a perfectly fine, small PR.
- Merging to `main` triggers automatic production deployment — no manual deploy step.
