# RailQ readability, mobile and accessibility update

This is a complete source snapshot, including the prior October 22 and brand/navigation changes. It has not been published. The technical project/package name stays compatible with the existing deployment.

## Install

1. Keep a backup or commit of your existing repository.
2. Copy the ZIP contents into the directory containing `package.json`. Do not upload the ZIP itself as website source. Keep your hosting environment variables and deployment settings.
3. If merging into an existing checkout, delete these five obsolete files. They are absent from this snapshot:
   - `globals.css` (root only; keep `app/globals.css`)
   - `home-client.tsx` (root only; keep `app/[locale]/home-client.tsx`)
   - `pnr-status-client.tsx` (root only; keep `app/[locale]/pnr-status/pnr-status-client.tsx`)
   - `public/rail-hero.png` (the site uses `rail-hero.webp`)
   - `public/og.png` (the site uses `og.jpg`)
4. Run `npm ci`, `npm run build` and `npm run lint`, review the Git diff, then deploy using your existing host. No new packages, database migrations or environment variables are required by this update.

## What changed

- Shared text now uses a 16px body base, a 14px floor for the previous small UI declarations, and a 12px brand-label minimum. Inputs remain at least 16px. Mobile tabs wrap, forms stack, navigation controls have larger targets, and narrow footers wrap correctly.
- Orange text and primary buttons use a darker burnt-saffron shade. Muted and teal text are darker on light surfaces; footer links are lighter on navy. Measured contrast is 5.60:1 for white on the primary button and 5.41:1 for muted text on cream. Decorative imagery, gradients and every possible live result are not certified by these token measurements.
- Noto Sans Devanagari is bundled through `next/font/local` with `font-display: swap`, including its SIL Open Font License. Its compressed variable WOFF is approximately 192 KiB. Hindi headings use normal tracking and more line height; Hindi labels also work on English pages without a system Hindi font. English uses an honest system font stack rather than an unloaded Inter declaration. No runtime or build-time Google Fonts fetch is needed.
- Desktop tools close on outside click, focus leaving the dropdown, or Escape. Escape returns focus to its trigger. Mobile lists all six tools. Homepage tabs support Left/Right/Home/End keys, roving focus and a labelled panel.
- Only English and Hindi language pills remain. The illustrative hero route links to a prefilled real route search; the clearly labelled demonstration journey links to the real status tool. Illustrations do not become live results automatically.
- README/build-guide branding is RailQ. The language preference key is now `railq_language`; URLs remain authoritative for language, so existing language URLs are unaffected. Existing consent keys/events stay compatible so visitors' privacy choices are not lost. The technical package/folder names are unchanged.
- Unconfigured ads intentionally remain hidden. The README now states the actual behavior instead of promising house promotions. Public PNR alerts remain unavailable; README wording reflects that.
- Existing page schemas were preserved. Missing page descriptions were added as JSON-LD for Home, Tools, Guides, Dashboard and Connecting Trains. The validation parser now expands arrays and `@graph`; the old report's empty schema arrays were not evidence that 146 pages lacked schema. No fake reviews, credentials, predictions or verification dates were added.
- Unused duplicate source and unused PNG assets were removed, eliminating approximately 2.7 MiB of unused image files from the source. Because those images were not requested, this removal alone does not speed up page loading.

## Verification and limitations

Production build and lint passed. All 148 sitemap pages passed checks for unique titles/descriptions, meaningful server HTML, self-canonicals, reciprocal language alternates and page-level structured data. All 155 internal destinations responded successfully. The public-cache suite passed for 148 pages, preserving query isolation and private/API handling. Public pages were already prerendered in the prior release; APIs and parameterized runtime routes appropriately remain dynamic.

Local Chromium checked Home, PNR, Trains Between Stations, Guides, About and Connecting Trains in both languages at 360, 390, 768 and 1440 pixels (48 combinations): no horizontal page overflow and no visible text below 12px. Navigation, Escape/focus return, mobile tools and keyboard tabs passed without client runtime errors. Mobile English/Hindi screenshots were inspected during implementation. This is browser emulation, not a physical-device, screen-reader or complete WCAG certification.

No production Lighthouse/Core Web Vitals score or traffic increase is claimed. Check actual Android/iPhone devices and production PageSpeed Insights after deploying. Live provider reliability, operator identity/contact verification and contact delivery are outside this visual update. No real passenger lookup or message was sent.

See `READABILITY-CHANGED-FILES.md` for every changed file and `validation/README.md` for current reports. Public URLs, titles, language alternates and sitemap dates were preserved in this visual release.
