# RailQ SEO release — 26 October 2026

## Scope
First metadata test: seat availability, coach position, train-class guide, missed-train guide and food-service comparison. Each has English and Hindi copy: 10 URLs. Other 138 sitemap titles and descriptions are preserved against validation/seo-metadata-baseline.json. The broader workbook proposals remain queued.

## Supporting changes
- Matching guide H1s, descriptions and WebPage/Article headlines. Open Graph and Twitter use the same selected metadata.
- Original common-class comparison and missed-train next-step guide, with ticket-specific rule limits retained. Content modification dates are separate from previous source-check dates.
- Route results link to seat availability with the selected train number, from/to codes and journey date. Missing/invalid provider train numbers do not generate broken seat-check links.
- Seat tool offers a station-first starting point through the existing route search. Status decoder and waitlist selector explain their respective tasks and link the right guides.
- Food comparison answer/table precede its optional illustration; the image is lazy loaded. The six service rows, source statements and review date remain intact.
- Editorial month names are deterministic in English/Hindi, avoiding server/browser ICU spelling differences and hydration errors.
- Sitemap lastmod updates only this release’s affected paths. No new URLs, noindex changes, canonicals to other pages or redirects.

## Validation
Run npm run lint, npm run build and npm run test:seo. Browser setup is the same as MOBILE-RELEASE.md. The SEO test checks all 148 metadata pairs, canonical/social tags, distinct titles/descriptions, changed sitemap dates, the route-to-seat journey, content aids and five page pairs at 320/360/390px. Mock railway responses are used; no passenger PNR is required.

## Measurement
Record the deployment date and compare equal complete India/mobile periods. Two weeks is an early checkpoint; sparse pages need longer. Do not attribute pre-release exports to this change or rotate the winning PNR/layout/chart/Ajmeri titles during the measurement period.

## Remaining external checks
Search Console URL Inspection is needed to establish the current exclusion reason and Google-selected canonical for reported unindexed pages. Public HTTP responses and metadata checks do not confirm indexing. Indexing requests, private GSC actions, publisher outreach and guarantees of traffic are not part of this source deployment.
