# RailQ release — 22 October 2026

This update is based on the supplied `rail-main (1).zip`. Existing public URLs, English/Hindi routing, self-canonicals and public-page caching are preserved. Homepage and PNR titles are unchanged. No files need deleting.

## Upload and deploy

1. Back up your current GitHub branch. Extract the **changes ZIP** and upload its contents into the existing Next.js project root — the directory containing `package.json`. Merge the `app`, `components`, `lib`, `public`, `supabase` and `validation` folders. Do not upload the ZIP itself, or nest its contents inside another project folder.
2. In Supabase SQL Editor, run `supabase/railq-release-oct22.sql`. It requires the existing `railq-hotfix.sql` and `railq-service-quality.sql`; run those first only if they were not previously applied. The release migration is repeatable and preserves API quota counters. Do not reset the database or delete old tables.
3. In your hosting environment variables, add **RAILQ_ADMIN_TOKEN**, a randomly generated secret of at least 32 characters. Keep it server-only: do not use a `NEXT_PUBLIC_` prefix or commit its value. Keep existing Supabase and RailRadar credentials. Confirm `RAILRADAR_MONTHLY_QUOTA` and `RAILRADAR_QUOTA_RESET_DAY` match your actual account. Defaults remain 1,000 requests and reset day 1; the existing safety stop remains 80%.
4. Deploy using the existing project root and `npm run build`. No dependency upgrades, route deletions or caching migration are required. This is an update ZIP, not a replacement for the complete project; keep existing files that are not included.
5. Visit `/admin/service-health` and enter the owner token. Check a normal railway search, the successful/error counters and feedback. The monitor shows local reserved API attempts, not the provider's authoritative billing ledger: reconcile the two before increasing traffic.

## Implemented

- Compact bilingual coach-tool chooser with the current page identified; immediate distinctions between the coach interior, train order and berth number.
- Existing no-layout explanation retained, with the missing PNR and coach-position links added; no repeated explanation batch.
- NDLS guide: direct entrance answer, side-by-side comparison, clearly labelled Google Maps searches and practical arrival checks. Sources: DMRC interchange guidance and its dated skywalk announcement. No promise that a gate/lift is currently open.
- Waiting-list guide: GNWL/RLWL/PQWL/TQWL comparison, clearly fictional examples, current-versus-booking interpretation and no confirmation ranking. Both targeted guides have revised English/Hindi titles, descriptions and review dates.
- Contextual next steps on PNR, seat results, chart estimates and connecting routes. Existing chart-guide links retained.
- Private monitoring API restored, authenticated before reading data, no-store/noindex. Per-action requests, successes, errors, average latency, cache hits and quota reservations; separate voluntary-feedback totals. Aggregates contain no raw PNRs, passenger details or visitor identifiers.
- Client and server analytics now allow only known event names and fixed property values; nested values and numeric identifiers are excluded, and URL queries/referrers are not added to explicit events. Google Analytics automatic page history/form/search collection should remain disabled in your GA4 enhanced-measurement settings if enabled there.
- Existing result-report endpoint restored; bounded, validated, same-origin, rate-limited submissions. Helpful/not-helpful and issue category on tools and guides, including Hindi. No free-text input or URL query is accepted. Privacy explanation updated.
- Seven existing video files receive selectable English/Hindi WebVTT tracks (14 files), readable video text and a relevant tool link. Existing posters and `preload="none"` retained; MP4 files unchanged. Confirmation video still has English audio, with Hindi subtitles clearly available.
- Missing `/api/journey-plan` restored against the provider's documented two-stop `/v1/journeys/plan` contract. It uses the existing quota protection, short public timetable cache and strict route normalizer. It does not reserve seats or guarantee connections.

## Validation and remaining deployment checks

See `validation/release-oct22-check.json`, `validation/release-oct22-sql-check.json` and `validation/public-cache-check.json` for completed checks. Tests use synthetic data and an isolated database; they do not spend your provider quota or modify production.

After deployment, confirm Supabase migration privileges, the owner token, the actual provider account's journey-planner access and live responses. Caption text was transcribed from the supplied videos' existing visible narration captions; the English-only confirmation narration was translated to Hindi. Review playback with your preferred devices before replacing video/audio assets in future.

Railway factual references reviewed for this release:
- https://delhimetrorail.com/know-about-interchange-stations
- https://delhimetrorail.com/pages/en/pressrelease_details/dedicated-skywalk-connecting-new-delhi-railway-s-2
- https://indianrail.gov.in/enquiry/PNR/PnrEnquiry.html?locale=en
- API contract: https://railradar.in/docs/journey-plan

This release implements the requested usability, discovery and monitoring changes. Search Console indexing, CTR and traffic growth still need observation after deployment; no traffic level or recommendation placement is guaranteed.

## Rollback

Restore the previous application commit if necessary. Leave the additive database tables/functions in place: they preserve operational history and do not alter passenger records or quota counters. Keep all server secrets out of GitHub. The update ZIP contains no credentials, installed dependencies or generated Next.js build directory.
