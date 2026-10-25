# Full URL metadata rollout

The rollout covers 138 of the 148 existing sitemap URLs. Exact URL exclusions are recorded in seo-protected-top-ten.json, ranked from the supplied Search Console Pages.csv by clicks, then impressions for ties. English and Hindi exclusions are independent.

128 metadata pairs differ from the production baseline; ten eligible URLs already had the approved metadata from the earlier release. All 138 now use the completed per-URL copy, including utility pages and Hindi counterparts. 104 URLs have explicit H1 alignment; other headings retain their existing wording.

The ten protected URLs retain their titles, descriptions, headings, visible main content, canonical URLs and existing sitemap dates. No URLs are added. Guide review dates and article publication dates are unchanged. Metadata changes alone do not guarantee indexing or traffic.

Validation: production build, ESLint, all 148 HTTP metadata/canonical/social-tag checks, unique titles/descriptions, 148 sitemap entries, protected-page heading/content comparisons, representative English/Hindi layouts at 320/360/390px, and existing mobile journey/privacy regressions.

The versioned baseline and expected metadata files allow the release to be audited and tested with npm run test:seo. The library resolves copy on the server and passes only the current page's display fields into client components.
