# RailQ brand, navigation and content update

Prepared 22 October 2026. This is a focused update to the current local repository, on top of the earlier October 22 release (`ac56a6a` locally). No remote GitHub repository is configured in this checkout. Nothing was pushed or published.

## Apply

Extract `RailQ-Brand-Navigation-Update.zip` and merge its files into the existing Next.js project root, retaining other files. This ZIP assumes the previous October 22 update is already present. No files need deleting, no dependencies change, and no SQL migration or new environment variable is needed for this focused update. Run `npm run build` and deploy through your existing workflow after review.

## Operator information still needs confirmation

Neither the supplied repository nor the public About/Contact pages identifies a verified legal operator, public business address, telephone number or support email. The updated About page uses the existing `/contact` form and does not invent a legal identity, credentials, affiliation or response-time promise. The public contact route and its implementation were checked; no message was sent and production delivery was not tested. Supply the operator's confirmed legal name and any contact details intended for publication before adding them.

## What changed, file by file

| File | Change and reason |
| --- | --- |
| `components/site-header.tsx` | Removes “by RailSahayak” from the shared header/footer Brand component. Uses the RailQ name, Indian Railway Tools tagline and complete accessible brand label in both locales. |
| `public/og.jpg` | Replaces the old RailSahayak social preview with a clean RailQ brand card at the same public URL; 1200 × 630. |
| `public/images/railq-social-card.svg` | Adds the editable vector source for that brand card, with descriptive title and text. |
| `app/[locale]/layout.tsx` | Aligns fallback Open Graph image alternative text with “RailQ — Indian Railway Tools”. |
| `lib/content-registry.ts` | Rewrites About concisely around tools, independence, third-party data, limitations and the existing contact route. Preserves the useful topics. Clarifies the blog as selected reading by journey stage, retaining its existing introductory sections and adding contextual, translated links. Supports explicit section links. |
| `components/content-page-client.tsx` | Renders descriptive section links and localized update dates. Suppresses the repeated generic About explanation because the revised About body already covers it. |
| `app/[locale]/guides/guides-directory.tsx` | Makes the guide hub's purpose explicit, preserves every guide card/summary and adds missing route-search, timetable and live-running links in the appropriate language. |
| `lib/metadata-copy.ts` | Gives About, Blog and Guides distinct natural titles/descriptions in English and Hindi. Homepage and PNR metadata are unchanged. |
| `components/tool-query-prefill.tsx` | New invisible query-prefill helper: only URL query reading sits inside Suspense. It does not perform a railway lookup. |
| `components/tool-engine.tsx` | Server-renders the primary form instead of showing only a loading placeholder. Keeps validated URL prefill, explicit submission, results and errors. Adds a clear route-search heading. Renames newly downloaded calendar files/UID domain to RailQ; technical storage keys remain compatible. |
| `components/tool-page-client.tsx` | Removes the whole-form loading boundary and applies the route-search layout class only where needed. |
| `app/audit-fixes.css` | Places the main trains-between-stations search in a full-width primary section before comparisons at mobile and desktop sizes. Styles the guide hub's contextual links. |
| `components/train-comparison.tsx` | Labels the comparison as a secondary step for users who have already shortlisted trains. Search and comparison request logic is unchanged. |
| `lib/page-guidance.ts` | Adds missing PNR → RAC-guide and status-code-decoder → waiting-list-tool links, with translated descriptions. |
| `components/page-guidance.tsx` | Displays those links next to the relevant explanation rather than adding another generic link directory. |
| `lib/guide-registry.ts` | Adds the missing booking-guide → failed-booking-guide link beside the ticket/payment explanation. Existing guide sections and review dates remain intact. |
| `app/sitemap.ts` | Updates modification dates only for substantially changed About, Blog, Guides and trains-between-stations pages, in both locales. Other page dates and public URLs remain unchanged. |
| `validation/brand-navigation-check.json` | Page-by-page title, description, canonical and rendered-content results, plus internal-link checks. |
| `validation/brand-browser-check.json` | Browser results for layouts, query prefill, searches, errors and unavailable alerts. |
| `validation/brand-link-audit.json` | Before/after evidence for the requested internal-link destinations. |
| `validation/public-cache-check.json` | Refreshed public cache verification results for the updated pages. |
| `validation/brand-release-check.json` | Build, lint, public caching and review summary. |
| `BRAND-NAVIGATION-REVIEW.md` | This changed-file explanation and deployment/verification record. |

The shared logo also keeps “RailQ” on one line after visual review.

## Why the loading placeholder appeared

`useSearchParams()` was inside ToolEngine, and the surrounding Suspense boundary covered the entire tool. On prerendered pages, that meant the initial HTML contained “Loading tool…” while the comparison form below it was already rendered. Moving query access into a tiny, null-fallback child preserves public caching and URL prefill while the main search inputs render on the server. Actual result lookups still require JavaScript and an explicit submission.

## Link audit decisions

The existing main-content audit found RAC links on 8 English pages, failed-booking links on 8, train-schedule links on 14, and the waiting-list tool on 3. Hindi live status and trains-between-stations already had many incoming links. Existing links were retained; only the missing relationships documented in the audit were added. Shared localized links automatically use `/hi/...` on Hindi pages. No English page was padded with an unrelated Hindi link list.

## Deliberately preserved

- Existing URLs, self-canonicals and reciprocal English/Hindi language alternates.
- Technical project folder names, package name and browser-storage keys; renaming them is unnecessary for the public brand correction.
- PNR alerts remain unavailable and collect no new subscriptions. No new prediction, testimonial, author credential or verification date was added.
- The festival-planning article already covers alternative dates/stations/classes, special-train checks, crowded-station movement, a family meeting point and a fallback plan. No repetitive checklist was appended, and its date was not bumped.
- The source and content of existing guide articles, except the missing contextual booking link.

## Validation scope

Production build and lint; 148 public pages checked for unique titles/descriptions, one H1, meaningful initial HTML, self-canonicals and reciprocal language alternates; 155 internal destinations checked for HTTP 200. The existing 148-page public-cache test also passes.

Browser checks cover 390px and 1440px layouts in English/Hindi, server-rendered form inputs with JavaScript disabled, valid query prefills, explicit successful searches and unavailable-result input retention using synthetic provider fixtures. PNR alerts remain labelled without a subscription form. No real ticket lookup or contact submission was made. Live provider availability and the production deployment itself are outside these local tests.
