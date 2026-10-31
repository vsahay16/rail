# RailKit pre-booking availability estimates

Implemented on `codex/availability-estimates`. Do not merge to production before authenticated Preview verification. Existing `/seat-availability` and `/hi/seat-availability` URLs and metadata remain intact. This feature does not predict an existing PNR or booked passenger.

## Behaviour and files

- `lib/seat-availability.ts`: explicit calendar/IST validation, supported codes, metadata constraints and strict normalization. False `canBook` wins; AVAILABLE shows a safely parsed count; only bookable WAITLIST receives a finite numeric 0–100 percentage. RAC remains distinct. Raw waitlist type is independent of quota.
- `lib/railkit-provider.ts`: availability calls the specified REST `/api/v1/seats/...` endpoint with server-only `x-api-key`, DD-MM-YYYY, a 15-second timeout and Retry-After propagation. PNR retains its existing transport and adapter. No automatic retries.
- `lib/rail-server.ts`, `app/api/rail/route.ts`: shared Supabase cache, six-part request key, fresh cached timetable constraints, existing durable rate/budget limits. New availability cache namespace prevents stale adapter formats. Original retrieval time survives cache hits. Best-effort in-flight coalescing is process-local, not a global serverless guarantee. Cache database calls have a 1.5-second timeout; other protection calls keep existing bounds. API duration ceiling is 45 seconds, browser availability timeout 35 seconds.
- `components/tool-engine.tsx`: explicit optional timetable lookup restricts known classes; known running days are validated when boarding-day metadata exists. Unknown metadata is explained; never invented. No polling or speculative class/date requests. Retry-After temporarily disables repeated submission.
- `components/availability-calendar.tsx`, `components/seat-availability.module.css`, `components/rail-provider-result.tsx`: bilingual mobile cards, requested versus additional dates, provider estimate disclaimer, original Last checked timestamp, keyboard-accessible raw status details and no booking button.
- `components/train-comparison.tsx`: seat check timestamp now comes from upstream retrieval metadata, including cached responses.
- `lib/rail-data.ts`: friendly invalid-combination messaging and cooldown handling.
- `lib/content-registry.ts`, `lib/journey-content.ts`, `lib/metadata-copy.ts`, `lib/guide-additions.ts`, `lib/topic-paths.ts`, `components/pnr-prediction.tsx`, connecting-train planner: removed former-provider website mentions and corrected stale prediction explanations. Historical migrations/setup documents are retained for operational history.
- `scripts/test-seat-availability.cjs`, `scripts/fixtures/seat-availability.json`, `package.json`: fixture regression suite; example dates and percentages exist only in tests.

## Environment

Keep these server-side; never prefix secrets with NEXT_PUBLIC:

- `RAILKIT_API_KEY`: required, existing secret.
- `RAILKIT_ENABLED=true`: enables supported live tools.
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`: existing shared cache/protection infrastructure.
- `RAILKIT_AVAILABILITY_CACHE_SECONDS=120`: optional, initial default120; bounded1–600.
- Existing `RAILKIT_MONTHLY_QUOTA=10000`, `RAILKIT_BURST_LIMIT=50`, budget safety/reset settings remain unchanged. The conservative per-minute limit is distinct from the provider's600/10-minute limit.
- Keep `RAILKIT_TRANSPORT=sdk` if currently used for working PNR and other tools. Availability explicitly uses REST regardless of this setting.

No new database migration or package dependency is required. Existing RailKit budget RPCs and shared-cache schema must already exist.

## Validation and remaining uncertainty

Fixture suites cover AVAILABLE/100, closed/zero, RLWL with GN, numeric zero, invalid percentages, RAC, explicit dates, requested/additional dates, provider failures, Retry-After, shared cache timestamps, in-flight coalescing and PNR isolation. No live API calls or passenger records are required by tests.

Authenticated live REST verification remains pending: confirm this account's endpoint entitlement, actual response fields, classes/run-day metadata and quota behaviour. Provider percentages have NOT been confirmed as CNF-only versus CNF+RAC. No accuracy claim or full-berth probability is made. Sparse running-day bitmask order is not assumed; only recognized explicit normalized days with boarding-day offsets are enforced. Missing metadata does not prove a class or running day is supported.

## Exact local preview

From the repository root:

```bash
cd RailSahayak_Complete_NextJS_Project
npm ci
npm run test:railkit
npm run test:availability
npm run build
npm run dev -- --hostname 127.0.0.1
```

Open http://127.0.0.1:3000/seat-availability and http://127.0.0.1:3000/hi/seat-availability. Fixture tests need no credentials. For authenticated local lookups, place the required server variables in an untracked `.env.local`; never commit it. Use a separate test cache/budget database where practical. All real lookups, including the optional timetable lookup, may consume provider quota.

## Preview and deployment

1. Check out the feature branch and review its pull request. Do not upload duplicate nested app folders.
2. In Vercel project `rail`, configure the required variables for **Preview**, including Supabase credentials and RAILKIT_ENABLED. Production-only variables are not inherited by Preview. Use an isolated database for Preview if available; otherwise test requests share production counters/cache.
3. Open the feature branch's Preview deployment. Test a real supported availability combination, an invalid class/date, an unavailable estimate, and a repeated identical lookup. Confirm the cached second result retains Last checked. Test EN/HI on mobile and desktop. Check PNR separately using your own PNR privately.
4. Confirm HTTP400 is shown as input/provider rejection, not assumed to be a bad key. Confirm429 cooldown. Do not intentionally exhaust production quota.
5. Only after approval, merge the pull request into main. Vercel's existing Git integration will build and deploy. Keep the existing server key and add optional cache TTL to Production if changing its default.
6. Check the deployed availability pages and existing PNR page. If an availability-specific entitlement problem remains, revert this feature commit rather than replacing the working PNR integration.

This implementation does not deploy production or change DNS, keys, database schema or monthly usage counters.

## Recorded verification

- `npm run test:availability`: PASS, fixture-only.
- `npm run test:railkit`: PASS, fixture-only PNR and provider regressions.
- Targeted ESLint: PASS.
- `npm run build`: PASS, including TypeScript and161 generated pages. Existing edge-runtime static-generation warning remains informational.
- Playwright with intercepted API fixtures: PASS English390px mobile and Hindi1280px desktop, form submission to cached84% estimate and no horizontal overflow. These were mocked browser checks, not live provider results.
- Authenticated upstream calls: NOT performed; no live quota consumed.
