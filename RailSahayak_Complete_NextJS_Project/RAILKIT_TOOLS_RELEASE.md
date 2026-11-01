# RailKit tools and responsive forms

Existing routes retained. Coach and platform derive from the same cached live-tracking response; only supplied coach positions and an exact halt's supplied platform appear. Train lists retain every returned row and identify nearby terminals; availability links use the row's real station codes. PNR flow is unchanged.

New bilingual tools: /station-timetable, /station-facilities, /cancelled-trains, /train-history, /train-search. Live status offers NTES or WIMT. Scheduled, historical and live information are labelled separately. No automatic polling and no invented platform, coach position or prediction.

Forms now grow with translated labels instead of fixed-height boxes. Labels use sentence case. Exact station selections no longer leave suggestions over the submit button. Dashboard labels also grow with their content.

## Verification
Run npm ci, npm run test:railkit, npm run test:availability, npm run build, npm run test:railkit-browser. Browser checks use mocked provider fixtures, including 132 route results, and scan registered tool pages at 360, 768 and 1440 pixels in English and Hindi. They do not consume live quota. The earlier 18 provider-fixture browser flows passed before the form changes; the final expanded responsive run is blocked in the current workspace by Chromium socket permissions. Do not treat the latest visual layout as browser-verified. Production route lookup previously returned 132 trains. New authenticated endpoint verification remains pending; local tests do not prove plan entitlement.

## Configuration and release
Keep server-only RAILKIT_API_KEY, RAILKIT_ENABLED=true, RAILKIT_TRANSPORT=sdk and existing Supabase protection credentials. Actual plan monthly quota is 10000; preserve configured burst protection. Do not put keys in NEXT_PUBLIC variables. SDK calls have a bounded response wait but cannot be cancelled upstream. No retry on authentication errors.

Shared database cache and rate limits remain. Public in-flight deduplication is only per process, not a global serverless lock. Cache retrieval timestamps are preserved. Live data TTL 45 seconds, history 3600, timetable 900, facilities 86400, cancellations 300, train search 3600; seat availability retains its configurable default 120 seconds.

Optional monitoring migration: supabase/migrations/20261031090000_railkit_tools_health.sql extends the health action allowlist. Not applied by this release. Without it new actions still use quota/rate protection but are omitted from the admin health action rollup.

For local preview run npm run dev and open localhost:3000. For Vercel Preview configure the server-only provider and Supabase variables in Preview; currently some protection variables exist only in Production. Verify authenticated results and error cases before merging this branch into main. The connected main branch deploys production automatically. This release has not been deployed to production.

RailKit seat-estimate percentages remain pre-booking estimates, not booked-passenger predictions; CNF-only versus CNF-plus-RAC semantics remain unconfirmed.
