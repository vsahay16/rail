# Instructions for maintaining RailSahayak with Claude

Use this document with the supplied codebase whenever you ask Claude to refine a page or connect another provider. The full route system, tools, dashboard, guides, policies, Hindi URLs, APIs and database schema already exist; extend them instead of recreating them.

## Non-negotiable design system

- Preserve `app/layout.tsx`, `components/site-header.tsx`, `components/site-footer.tsx`, `components/language-provider.tsx`, and the global design tokens.
- Every public page must work in English and Hindi through `useLanguage()`.
- Use the navy, saffron, teal, ivory and cream palette already defined in `app/globals.css`.
- Primary answers must appear before explanations and advertisements.
- Maintain large touch targets, keyboard focus states, clear loading states and mobile layouts.
- Use existing `Icon`, `AdSlot` and `trackEvent` utilities.
- Never send a PNR, passenger name, email address or phone number to analytics.
- Never expose a railway API key in a client component.
- Every rule or time-sensitive claim needs a source link and visible review date.
- Show that RailSahayak is independent and not affiliated with Indian Railways or IRCTC.

## Reusable prompt

> Build the next RailSahayak page at `[ROUTE]` using the existing Next.js codebase. Reuse the global header, footer, language provider, icons, analytics and ad component. Match the homepage visual system exactly. Implement the complete user flow in English and Hindi, including input, validation, loading, empty, success and error states. Put the primary answer above explanatory content and ads. Use a server-side route for external APIs and never expose secrets. Do not modify global components unless the page genuinely requires a reusable improvement. Add page-specific metadata and structured data where valid. Make it responsive and accessible. Update navigation links only if this page introduces a new permanent section.

For API work, also say:

> Inspect `app/api/rail/route.ts`, `.env.example` and `README.md` first. Do not invent a provider endpoint or show mock data as live. Keep PNR and live results uncached, do not log sensitive values, and add a visible provider/estimate/official confidence label. Run `npm run build` before returning the change.

## Page template

```tsx
"use client";

import { AdSlot } from "@/components/ad-slot";
import { useLanguage } from "@/components/language-provider";
import { trackEvent } from "@/lib/analytics";

export default function ToolPage() {
  const { language } = useLanguage();
  const hi = language === "hi";

  return (
    <main>
      <section className="tool-page-hero">
        <span className="kicker">{hi ? "हिंदी शीर्षक" : "English eyebrow"}</span>
        <h1>{hi ? "हिंदी पेज शीर्षक" : "English page title"}</h1>
        <p>{hi ? "हिंदी परिचय" : "English introduction"}</p>
      </section>
      <AdSlot placement="top" format="970 × 90 / responsive" />
    </main>
  );
}
```

Create metadata in a server `page.tsx` wrapper when the interactive tool needs a client component. Do not turn the root layout into a client component.
