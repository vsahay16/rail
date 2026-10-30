# RailKit migration

This branch replaces RailRadar for PNR, live status, schedule, direct trains, seat availability, fare and station boards. It does not change page URLs or SEO titles.

## Transport and plan

The pinned RailKit 6.0.2 SDK is the default server transport. RailKit's published docs require the Advance plan for direct REST; set RAILKIT_TRANSPORT=rest only if your plan includes it. REST uses https://api.railkit.in with x-api-key. No browser receives the key. Do not use a NEXT_PUBLIC_ prefix.

RailKit currently documents seat-availability forecasts but no dedicated booked-PNR prediction endpoint. PNR prediction remains disabled. Connecting journeys, coach-position and platform tools return an explicit unavailable response; do not re-enable their old RailRadar paths. Local calculators and coach-layout diagrams remain available.

## Database

Apply supabase/migrations/20261030194226_railkit_provider_budget.sql to the database used by the deployment. It adds three service-role-only functions, using independent railkit:month / railkit:minute counters. Existing RailRadar counters and functions are preserved. SQL was installed and verified on the connected RailQ Supabase project during preparation, including service-role access and rolled-back quota tests. Apply the same migration if Preview uses another database.

Before enabling, seed only RailKit's current cycle usage using:

```sql
select public.railkit_api_seed_usage(ACTUAL_RAILKIT_REQUESTS_USED, ACTUAL_RESET_DAY);
```

Replace both placeholders with numbers. This only increases the baseline; it never resets an existing counter. The reset-day setting supports 1–28 and UTC monthly cycles. If your plan uses daily limits or a different cycle, keep paused and adapt the budget before enabling. Also check all account-level daily/per-endpoint limits. Do not reuse the old RailRadar allowance or usage.

## Preview configuration

In Vercel -> rail -> Settings -> Environment Variables:

| Variable | Value |
|---|---|
| RAILKIT_API_KEY | Your existing RailKit secret key |
| RAILKIT_TRANSPORT | sdk (default), or rest for eligible Advance plans |
| RAILKIT_MONTHLY_QUOTA | Actual monthly request allowance from RailKit |
| RAILKIT_BURST_LIMIT | Actual allowed requests per minute |
| RAILKIT_QUOTA_RESET_DAY | Actual UTC monthly reset day, 1–28 |
| RAILKIT_ENABLED | true only after configuring and seeding the correct limits |
| SUPABASE_URL | Database URL for Preview |
| SUPABASE_SERVICE_ROLE_KEY | Server-only secret for the same database |

Preview currently has the RailKit key but needs database credentials and quota values. Use a separate Preview database where possible. Do not expose keys in screenshots, logs or chat. No quota amount is guessed; missing quota or missing enable flag keeps upstream calls off. The local safety stop remains 80% of configured monthly quota.

## Checks before Production

1. Build and run npm run test:railkit. These use synthetic fixtures, not live passenger records.
2. On Preview verify /api/rail/capabilities reports RailKit and prediction=false.
3. Check invalid PNR input and unsupported actions return clear errors without an upstream lookup.
4. Privately check your own PNR and compare each passenger, journey date, class, chart and route with the provider response. Never put a PNR in a public URL or test fixture.
5. Test one seat search, fare, schedule, direct-train search, live status and station board. Check quota consumption against the RailKit dashboard.
6. Provider 403/429/404/errors and quota exhaustion are covered with mock responses; do not intentionally exhaust the paid allowance.
7. After Preview succeeds, configure Production limits and enable flag, merge/deploy, and retest. Remove obsolete RAILRADAR_* and RAIL_API_* override variables only after the new deployment is verified. Rollback requires restoring the old provider's valid configuration and plan access.

## Data and operational limits

PNR requests remain POST-only from the browser and are never cached. Passenger response fields are mapped into RailQ's existing UI; PNR numbers are not returned by the normalized adapter. Public timetable/live cache keys use a new provider/version namespace. Anonymous operational health totals are site-wide; the budget shown by the migrated monitor is RailKit-only. Forecast accuracy is not claimed. Unsupported or incomplete responses are errors, never fabricated successful results.

## Sources checked

- https://railkit.in/docs/pnr-status
- https://railkit.in/docs/seat-availability
- https://railkit.in/docs/fare-lookup
- https://railkit.in/docs/live-tracking
- https://github.com/RAJIV81205/railkit (published documentation and SDK types, checked 31 October 2026 IST)

Validation: Next.js production build and TypeScript passed; mocked adapter/transport/privacy/error/quota tests passed. No live PNR result or paid-plan entitlement has yet been verified.
