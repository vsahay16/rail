# RailSahayak

A complete bilingual Indian railway utility built with Next.js 16, React 19, TypeScript and plain CSS. It is a standalone project for Vercel, with Supabase for data. It does not depend on ChatGPT or Claude at runtime.

## Included

- Responsive English and Hindi UI, including real `/hi/...` URLs
- 23 railway tools with validation, loading, empty, success and provider-error states
- Dedicated PNR experience and a ten-part journey dashboard
- Dynamic train, station and route landing pages
- Ten bilingual guide clusters
- Privacy, terms, disclaimer, methodology, corrections, contact and advertising pages
- Secure server-side railway API proxy; the provider key never reaches the browser
- Encrypted PNR reminder storage, scheduled rechecks and optional email delivery
- Consent-gated GA4, Supabase product analytics and AdSense placements
- Responsive ad inventory, sitemap, robots, Open Graph metadata and mobile-first layouts

## Routes

Core and live tools:

```text
/
/tools
/dashboard
/pnr-status
/live-train-status
/trains-between-stations
/seat-availability
/train-schedule
/train-fare
/station-arrivals-departures
/coach-position
/platform-number
/pnr-alerts
```

Calculators and journey helpers:

```text
/booking-date-calculator
/tatkal-time-calculator
/chart-preparation-calculator
/booking-reminders
/cancellation-deadline-calculator
/refund-calculator
/seat-berth-finder
/coach-layout
/status-code-decoder
/waitlist-guide
/vikalp-eligibility
/connection-buffer-calculator
/luggage-allowance
```

SEO and information routes:

```text
/train/{train-number}
/station/{station-code}
/trains/{source}-to-{destination}
/guides
/guides/{topic}
/about
/contact
/methodology
/corrections
/privacy
/terms
/disclaimer
/advertise
/alerts
/railway-updates
/blog
/official-services
```

Every public route also works with `/hi` in front, such as `/hi/tools`, `/hi/privacy` and `/hi/guides/tatkal`.

## Start locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Before committing, run `npm run build`.

## Railway API

The connected server routes use:

```env
RAILRADAR_API_KEY=your_new_server_only_key
RAILRADAR_API_BASE_URL=https://api.railradar.in/v1
```

| Feature | Server mapping | Cache |
| --- | --- | --- |
| PNR | `/pnr/{pnr}` | No store |
| Live train | `/trains/{train}/live` | No store |
| Between stations | `/trains/between/{from}/{to}` | 15 minutes |
| Train schedule | `/trains/{train}` | 15 minutes |
| Seat availability | `/trains/{train}/seats` | No store |
| Train fare | `/trains/{train}/fare` | No store |
| Station board | `/stations/{station}/live` | No store |
| Coach position | `/trains/{train}/coaches` | No store |
| Platform/coach position | `/trains/{train}/coaches/{station}` | No store |

RailRadar v1 path defaults are built in. If an approved provider account or later API version uses different paths, override only the paths that differ:

```env
RAIL_API_AVAILABILITY_PATH=
RAIL_API_FARE_PATH=
RAIL_API_STATION_BOARD_PATH=
RAIL_API_COACH_POSITION_PATH=
RAIL_API_PLATFORM_PATH=
```

Templates can use `{train}`, `{from}`, `{to}`, `{date}`, `{class}`, `{quota}`, `{station}` and `{hours}`. Always confirm production access and use the exact path from your provider documentation.

Free or trial railway APIs are useful for development, but live PNR, reservation availability and commercial traffic generally require approved access, quotas and usage rights. Do not scrape IRCTC or bypass protected services.

## Supabase setup

1. Create a Supabase project.
2. Open SQL Editor and run `supabase/schema.sql`.
3. Add these Vercel environment variables:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

The schema creates `analytics_events`, encrypted `rail_reminders` and a server-only `contact_messages` inbox. Never expose `SUPABASE_SERVICE_ROLE_KEY` in a `NEXT_PUBLIC_` variable.

## PNR reminders and email

Generate encryption and cron secrets:

```bash
openssl rand -base64 32
openssl rand -hex 32
```

Add:

```env
REMINDER_ENCRYPTION_KEY=base64_32_byte_key
CRON_SECRET=random_cron_secret
RESEND_API_KEY=your_resend_key
REMINDER_FROM_EMAIL=RailSahayak Alerts <alerts@your-domain.in>
```

`vercel.json` uses a once-daily reminder schedule so the initial project can deploy on Vercel Hobby. The route decrypts PNRs only in server memory, rechecks due records, fingerprints the response and sends a privacy-safe email only after a later status change. For more frequent checks, use a Vercel plan that supports them or configure an approved external scheduler, then verify the sender domain in Resend.

## Analytics, consent and advertising

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_TOP_SLOT=0000000001
NEXT_PUBLIC_ADSENSE_SQUARE_SLOT=0000000002
NEXT_PUBLIC_ADSENSE_BOTTOM_SLOT=0000000003
```

Until valid AdSense values are added, the reserved inventory displays useful first-party house promotions for RailSahayak tools and a clearly labelled founding-partner invitation. It never pretends that a paid ad is running. GA4, Supabase analytics and AdSense activate only after the visitor allows them. Full PNRs, emails, names and passenger details are blocked from analytics on both client and server.

For AdSense approval, replace placeholder business details with the real legal entity and domain, verify `ads.txt` as instructed by AdSense, and complete the consent configuration required for the countries served.

## Deploy to Vercel

1. Upload this folder to a private GitHub repository.
2. Import it in Vercel as a Next.js project.
3. Add production environment variables.
4. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin without a trailing slash.
5. Deploy and test `/api/rail`, contact submission and cron logs.
6. Connect the custom domain and submit `/sitemap.xml` to Google Search Console.
7. Verify calculator rules and guide review dates against current official sources before launch.

## Production checklist

- Rotate any API key pasted into chat, email or a public issue.
- Confirm commercial data rights and production rate limits.
- The app includes a best-effort 20-lookups-per-minute API guard. Add durable Vercel Firewall or distributed rate limiting to `/api/rail`, `/api/contact` and reminder creation before significant traffic.
- Keep PNR and live responses out of CDN caches and logs.
- Review booking, Tatkal, charting, refund and luggage rules against current official sources.
- Test keyboard navigation, Hindi text, mobile forms, slow networks and provider outages.
- Do not describe RailSahayak as affiliated with Indian Railways or IRCTC.
- Replace estimates with an official result only when the source actually supports it.
