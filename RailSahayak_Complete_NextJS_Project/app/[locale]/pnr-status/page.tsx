import { PnrStatusClient } from "./pnr-status-client";
import { pageMetadata } from "@/lib/request-seo";
import { absoluteUrl } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params;
  return pageMetadata({ locale,  path: "/pnr-status", title: "PNR Status Check Online", titleHi: "PNR स्थिति ऑनलाइन देखें", description: "Check your railway PNR, each passenger’s current status, coach, berth and chart information.", descriptionHi: "रेलवे PNR, हर यात्री की वर्तमान स्थिति, कोच, बर्थ और चार्ट की जानकारी देखें।" });
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const hi = locale === "hi";
  const url = absoluteUrl(hi ? "/hi/pnr-status" : "/pnr-status");
  const name = hi ? "पीएनआर स्टेटस चेक" : "PNR Status Check";
  return <><StructuredData data={[
    { "@context": "https://schema.org", "@type": "WebApplication", "@id": `${url}#application`, name, url, applicationCategory: "TravelApplication", operatingSystem: "Any", browserRequirements: "Requires JavaScript", inLanguage: hi ? "hi-IN" : "en-IN", description: hi ? "हर यात्री की वर्तमान स्थिति, कोच और बर्थ की जानकारी देखें।" : "Check each passenger’s current ticket status, coach and berth information.", offers: { "@type": "Offer", price: "0", priceCurrency: "INR" }, publisher: { "@type": "Organization", name: "RailQ", url: absoluteUrl("/") } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: hi ? "होम" : "Home", item: absoluteUrl(hi ? "/hi" : "/") },
      { "@type": "ListItem", position: 2, name, item: url },
    ] },
  ]} /><PnrStatusClient /></>;
}
