"use client";

import { LocalizedLink as Link } from "@/components/localized-link";
import { Icon } from "@/components/icon";
import { useLanguage } from "@/components/language-provider";
import { categoryCopy, ToolCategory, toolConfigs } from "@/lib/tool-registry";

const categories: ToolCategory[] = ["live", "booking", "refund", "coach", "planning"];

export function ToolsDirectory() {
  const { language } = useLanguage();
  const hi = language === "hi";
  return <main className="directory-page">
    <section className="directory-hero"><span className="kicker">{hi ? "यात्रा का हर जरूरी टूल" : "Every essential journey tool"}</span><h1>{hi ? "रेलवे की जानकारी।" : "Railway answers."}<br /><em>{hi ? "एक सरल जगह पर।" : "One calm place."}</em></h1><p>{hi ? "ट्रेन देखने, बुकिंग की योजना, रिफंड अनुमान या कोच खोजने के लिए टूल चुनें। हर टूल बताता है कि क्या भरना है और परिणाम कैसे पढ़ना है।" : "Choose a tool to check your train, plan a booking, estimate a refund or find your coach. Each tool explains what to enter and how to read the result."}</p><div><span><Icon name="shield" size={17} />{hi ? "स्वतंत्र सेवा" : "Independent service"}</span><span><Icon name="globe" size={17} />{hi ? "हिंदी और English" : "English and हिंदी"}</span></div></section>
    {categories.map((category) => {
      const copy = categoryCopy[category];
      return <section className="directory-category" key={category}><div className="directory-heading"><div><span>{String(categories.indexOf(category) + 1).padStart(2, "0")}</span><h2>{hi ? copy.titleHi : copy.title}</h2></div><p>{hi ? copy.descriptionHi : copy.description}</p></div><div className="directory-grid">{toolConfigs.filter((tool) => tool.category === category).map((tool) => <Link href={`/${tool.slug}`} key={tool.slug}><span className={`directory-icon ${category}`}><Icon name={tool.icon} /></span><div><h3>{hi ? tool.titleHi : tool.title}</h3><p>{hi ? tool.descriptionHi : tool.description}</p><small>{tool.slug === "pnr-alerts" ? (hi ? "अभी उपलब्ध नहीं" : "Not yet available") : tool.live ? (hi ? "प्रदाता की उपलब्धता पर निर्भर" : "Depends on provider availability") : (hi ? "वेबसाइट पर गणना" : "Calculated on this website")}</small></div><Icon name="arrow" size={17} /></Link>)}</div></section>;
    })}
    <section className="directory-dashboard-cta"><div><span className="kicker light">{hi ? "एक यात्रा, एक डैशबोर्ड" : "One journey, one dashboard"}</span><h2>{hi ? "अपनी पूरी यात्रा एक स्क्रीन पर देखें।" : "Bring the whole journey onto one screen."}</h2><p>{hi ? "PNR या ट्रेन और रूट डालकर स्थिति, समय, चार्ट, रिफंड, कोच और जरूरी लिंक साथ देखें।" : "Enter a PNR or train and route to combine status, timing, chart, refund, coach and verification links."}</p></div><Link href="/dashboard">{hi ? "यात्रा डैशबोर्ड खोलें" : "Open journey dashboard"}<Icon name="arrow" size={18} /></Link></section>
  </main>;
}
