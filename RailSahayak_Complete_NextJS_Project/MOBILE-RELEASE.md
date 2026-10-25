# Mobile journey release

Focus: mobile PNR, live status, berth/layout, chart calculator and return visits.

## Behaviour
- Compact phone forms, numeric train keyboard, 44px+ controls and expanded Hindi field space.
- PNR examples and longer explanations remain in server-rendered details elements.
- Passenger-aware next actions use all returned passenger statuses.
- Existing train favourites are available at the point of use. Explicit routes save only station codes on this browser. Remove controls and blocked-storage messages are provided.
- Slow lookup progress, in-flight submission guards, retained inputs and immediate retry after completion. No automatic provider polling.
- Results receive focus after lookup. Changed form fields clear the previous result.
- Public share copies only the static tool path, excluding queries, fragments and ticket data.
- Booking-date results link to the existing calendar reminder workflow.
- Advertising stays outside the form/results; configured mobile slots reserve height. The privacy choice banner sits in document flow on phones.

## Measurement
Existing consent-gated analytics collect viewport group, bounded lookup duration, outcome, saved-shortcut actions and selected PNR next actions. Live tools classify incomplete/empty data separately. The dynamically loaded standard web-vitals library reports LCP/INP/CLS value and rating without DOM attribution. This measures consenting visitors, not all visitors. No PNR, train number, station pair or travel date is sent in these event properties.

Web Vitals are document-load measurements; samples are skipped after client navigation to avoid assigning an old document metric to a different page. Real-user values need traffic to accumulate. No speed threshold pass or traffic increase is claimed from local tests. Events use the existing analytics ingestion; no schema migration is required.

## Validation
`npm ci`, `npm run lint`, `npm run build`. For browser checks, install Chromium with `npx playwright install chromium`, then `npm run test:mobile`. Optionally set PLAYWRIGHT_CHROMIUM_EXECUTABLE to an available Chromium headless-shell binary. Tests start local production servers on 3010/3011, use synthetic API responses and write screenshots/results only under /tmp.

Checks cover English/Hindi at 320, 360 and 390px, task visibility and overflow, PNR status-specific next steps, error and estimate retry, saved train/route reuse without dates, chart calculation, last berth/unsupported layouts, duplicate-submit locks, consent gating, incomplete responses, storage failure and safe sharing. These are Chromium mobile emulations, not physical Android or iPhone tests. Real provider results require a passenger's own booking.

## Review after deployment
Keep existing titles stable. Compare equal complete periods for India/mobile. Review successful tool completions, submission-to-success rate, lookup duration percentiles, saved-shortcut reuse and next-step clicks alongside GSC clicks/impressions. Retain the pause on new PNR pages while evaluating the previous SEO changes.
