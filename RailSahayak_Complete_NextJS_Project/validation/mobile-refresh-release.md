# Mobile layout release — 26 October 2026

138 existing URLs opt in through a page-main attribute. The exact ten URL exclusions remain those in seo-protected-top-ten.json. The shared exclusion list is now in lib/protected-pages.ts, avoiding sending the full SEO copy map to client components.

## Changes

- Phone layouts use a system sans-serif English stack and the existing local Noto Sans Devanagari font for Hindi. Headings use a compact 28–32px scale; text fields remain 16px or larger with 48px touch controls.
- Tool introductions and breadcrumbs take less space. Result metrics, source times, errors and next-action links reflow for phones.
- Eligible multi-field forms advance focus on Enter before the last field, respecting station-picker selection and IME composition. Existing result focus, input retention, retry and consent-sensitive analytics remain intact.
- Guide contents are expandable. Travel articles show the short answer before an optional, lazy-loaded illustration. Tables, sources, original illustrations and existing guide text are retained.
- The Hindi homepage prioritises its tool and uses compact tool rows. Its decorative hero image is hidden on phones and lazy-loaded. The protected English homepage remains unchanged.
- Mobile advertising retains reserved space below the tool and results. Shared header/footer and protected-page styles are unchanged. No speculative bottom navigation, new font dependency or new URL is added.

## Validation

Production build and lint; all 148 titles, descriptions, canonicals and social tags; per-URL mobile opt-in/exclusion checks; English/Hindi layouts at 320/360/390px; protected-page computed typography, dimensions and text at 320/390/1280px; guide disclosure controls, text enlargement, error recovery and keyboard field progression; existing mobile PNR/tool/privacy/Web Vitals regressions.

The protected layout test uses a before-build snapshot on the same browser/font environment. Capture with CAPTURE_BASELINE=1 node scripts/test-mobile-refresh.cjs against the previous production build, rebuild the changed source, then run the script normally. MOBILE_BASELINE can select a snapshot path. PLAYWRIGHT_CHROMIUM_EXECUTABLE can select an installed Chromium executable.

These are automated browser checks, not physical Android/iPhone tests or a measured real-user speed improvement. Review consented mobile success/error rates and Web Vitals after release. SEO metadata and editorial/source-review dates stay unchanged.
