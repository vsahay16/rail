# Validation reports

The current readability release is documented by `readability-pages.json`, `readability-browser.json`, `readability-contrast.json` and `readability-release.json`.

`rendered-pages.json` now has corrected schema types: the old parser missed JSON-LD graphs. Earlier build logs and brand/October release reports are historical checkpoints, not the current build status. Current build and lint evidence is in `readability-build.log` and `readability-lint.log`.

Run `npm run build`, `npm run lint`, `python3 scripts/verify-readable-pages.py` and `node scripts/verify-public-cache.mjs` from the project root. Browser layout evidence comes from local Chromium, not physical devices or a production performance audit.
