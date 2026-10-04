"use client";
import { LocalizedLink as Link } from "@/components/localized-link";
import { useLanguage } from "@/components/language-provider";
import { pageGuidance } from "@/lib/page-guidance";
import { editorialSources } from "@/lib/editorial-sources";
import { getToolConfig } from "@/lib/tool-registry";
import { getGuide } from "@/lib/guide-registry";
import { getContentPage } from "@/lib/content-registry";

export function PageGuidance({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const hi = language === "hi";
  const help = pageGuidance[slug];
  if (!help) return null;
  function label(path: string) {
    const guide = path.startsWith("guides/") ? getGuide(path.slice(7)) : undefined;
    const item = guide ?? getToolConfig(path) ?? getContentPage(path);
    return item ? hi ? item.titleHi : item.title : path;
  }
  const pageTitle = slug === "dashboard" ? (hi ? "यात्रा डैशबोर्ड" : "Journey dashboard") : label(slug);
  return <section className="journey-help" aria-labelledby={`help-${slug}`}>
    <h2 id={`help-${slug}`}>{hi ? `${pageTitle}: उपयोग की जानकारी` : `${pageTitle}: how to use the result`}</h2>
    <div className="journey-help-sections">{help.sections.map((section) => <section key={section.title}>
      <h3>{hi ? section.titleHi : section.title}</h3><p>{hi ? section.bodyHi : section.body}</p>
    </section>)}</div>
    {help.related.length > 0 && <nav aria-label={hi ? "संबंधित गाइड और टूल्स" : "Related guides and tools"}>
      <h3>{hi ? "अगला कदम" : "Next steps"}</h3><ul>{help.related.map(path => <li key={path}><Link href={`/${path}`}>{label(path)}</Link></li>)}</ul>
    </nav>}
    {help.sources.length > 0 && <div><h3>{hi ? "आधिकारिक संदर्भ" : "Official references"}</h3><ul>{help.sources.map(key => {
      const source = editorialSources[key];
      return source ? <li key={key}><a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li> : null;
    })}</ul></div>}
    <p className="journey-help-note">{hi ? "उदाहरण केवल समझाने के लिए हैं। किसी जानकारी में गलती मिले तो पेज का पता और सुधार का स्रोत भेजें।" : "Examples are illustrative. If you find an error, send the page address and a source for the correction."} <Link href="/corrections">{hi ? "सुधार प्रक्रिया" : "Corrections process"}</Link></p>
  </section>;
}
