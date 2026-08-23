import type { Metadata } from "next";
import { headers } from "next/headers";
import { LanguageProvider } from "@/components/language-provider";
import { ConsentManager } from "@/components/consent-manager";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StructuredData } from "@/components/structured-data";
import { localizedAlternates, siteUrl } from "@/lib/seo";
import "./globals.css";

const siteTitle = "RailSahayak — Indian Railway Tools";
const siteDescription = "PNR status, live train tracking, booking dates, Tatkal timing, refunds and trusted Indian railway journey tools in one simple place.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: ["PNR status", "live train status", "Indian Railways tools", "Tatkal time", "train booking date"],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  alternates: localizedAlternates("/"),
  openGraph: {
    type: "website", title: siteTitle, description: siteDescription,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "RailSahayak — Every railway answer. One simple journey." }],
  },
  twitter: { card: "summary_large_image", title: siteTitle, description: siteDescription, images: ["/og.jpg"] },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const requestHeaders = await headers();
  const initialLanguage = requestHeaders.get("x-railsahayak-language") === "hi" ? "hi" : "en";
  return (
    <html lang={initialLanguage === "hi" ? "hi-IN" : "en-IN"}>
      <body>
        <StructuredData data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "RailSahayak", url: siteUrl, logo: `${siteUrl}/favicon.svg` },
            { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: "RailSahayak", inLanguage: ["en-IN", "hi-IN"], publisher: { "@id": `${siteUrl}/#organization` } },
          ],
        }} />
        <LanguageProvider initialLanguage={initialLanguage}><SiteHeader />{children}<SiteFooter /><ConsentManager gaId={gaId} adsenseClient={adsenseClient} /></LanguageProvider>
      </body>
    </html>
  );
}
