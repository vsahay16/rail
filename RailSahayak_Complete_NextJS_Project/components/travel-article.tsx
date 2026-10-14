"use client";
import Image from "next/image";
import { LocalizedLink as Link } from "@/components/localized-link";
import { AdSlot } from "@/components/ad-slot";
import { useLanguage } from "@/components/language-provider";
import type { TravelArticle } from "@/lib/travel-articles";
import styles from "./travel-article.module.css";

export function TravelArticlePage({ article }: { article: TravelArticle }) {
  const { language } = useLanguage();
  const lang = language === "hi" ? "hi" : "en";
  const hi = lang === "hi";
  const date = new Intl.DateTimeFormat(hi ? "hi-IN" : "en-IN", {day:"numeric", month:"long",year:"numeric",timeZone:"Asia/Kolkata"}).format(new Date(`${article.updated}T00:00:00+05:30`));
  return <main className={styles.page} lang={hi ? "hi" : "en"}>
    <header className={styles.hero}>
      <nav className={styles.breadcrumbs} aria-label={hi ? "पृष्ठ का रास्ता" : "Breadcrumb"}><Link href="/">RailQ</Link><span aria-hidden="true">/</span><Link href="/guides">{hi ? "यात्रा गाइड" : "Travel guides"}</Link></nav>
      <p className={styles.eyebrow}>{hi ? "बेहतर तैयारी, आसान यात्रा" : "Better prepared. Easier journeys."}</p>
      <h1>{article.title[lang]}</h1><p className={styles.description}>{article.description[lang]}</p>
      <p className={styles.byline}>{hi ? "प्रकाशक: RailQ" : "Published by RailQ"} <span aria-hidden="true">·</span> <time dateTime={article.updated}>{hi ? "समीक्षा: " : "Reviewed: "}{date}</time></p>
    </header>
    <figure className={styles.figure}><Image src={`/images/travel-guides/${article.visual}-${lang}.svg`} width={1200} height={630} unoptimized priority alt={hi ? `${article.title.hi} — RailQ का मूल व्याख्यात्मक चित्र` : `${article.title.en} — original RailQ explanatory illustration`} sizes="(max-width: 1000px) 100vw, 1000px" /><figcaption>{hi ? "RailQ का मूल चित्र। यह ऐप का स्क्रीनशॉट या वास्तविक ऑर्डर नहीं है।" : "Original RailQ illustration. Not an app screenshot or a real order."}</figcaption></figure>
    <div className={styles.layout}>
      <aside className={styles.contents}><nav aria-label={hi ? "इस लेख में" : "On this page"}><h2>{hi ? "इस लेख में" : "On this page"}</h2><ol>{article.sections.map((s,i)=><li key={i}><a href={`#section-${i+1}`}>{s.title[lang]}</a></li>)}</ol><a href="#sources">{hi ? "स्रोत और जाँच का तरीका" : "Sources and method"}</a></nav></aside>
      <article className={styles.article}>
        <section className={styles.answer} aria-labelledby="quick-answer"><h2 id="quick-answer">{hi ? "सीधा जवाब" : "The short answer"}</h2><p>{article.answer[lang]}</p></section>
        {article.table && <div className={styles.tableScroll} tabIndex={0} role="region" aria-label={article.table.caption[lang]}><table><caption>{article.table.caption[lang]}</caption><thead><tr>{article.table.headers.map((h,i)=><th key={i} scope="col">{h[lang]}</th>)}</tr></thead><tbody>{article.table.rows.map((row,i)=><tr key={i}>{row.map((v,j)=>j===0?<th scope="row" key={j}>{v[lang]}</th>:<td key={j}>{v[lang]}</td>)}</tr>)}</tbody></table></div>}
        {article.sections.map((s,i)=><section className={styles.section} id={`section-${i+1}`} key={i}><h2>{s.title[lang]}</h2>{s.paragraphs.map((p,j)=><p key={j}>{p[lang]}</p>)}{s.points.length>0 && <ul>{s.points.map((p,j)=><li key={j}>{p[lang]}</li>)}</ul>}{s.refs.length>0 && <p className={styles.citations}>{hi ? "संदर्भ: " : "References: "}{s.refs.map(n=><a key={n} href={`#source-${n}`} aria-label={`${hi ? "स्रोत" : "Source"} ${n}`}>[{n}] </a>)}</p>}{i===3 && <div className={styles.ad}><AdSlot placement="bottom" format="Responsive" /></div>}</section>)}
        <section className={styles.related}><h2>{hi ? "अब यह मदद ले सकते हैं" : "Useful next steps"}</h2><ul>{article.related.map(l=><li key={l.href}><Link href={l.href}>{l.label[lang]} <span aria-hidden="true">→</span></Link></li>)}</ul></section>
        {article.faq.length>0 && <section className={styles.faq}><h2>{hi ? "आम सवाल" : "Common questions"}</h2>{article.faq.map((f,i)=><details key={i}><summary>{f.question[lang]}</summary><p>{f.answer[lang]}</p></details>)}</section>}
        <footer className={styles.sources} id="sources"><h2>{hi ? "स्रोत और जाँच का तरीका" : "Sources and method"}</h2><p>{hi ? "यह लेख नीचे दिए सार्वजनिक स्रोतों और RailQ की व्यावहारिक योजना संबंधी सलाह पर आधारित है। ऐप और सेवा विवरण दस्तावेज़ों से जाँचे गए हैं; भुगतान वाले डिलीवरी परीक्षण या होटल निरीक्षण नहीं किए गए। उदाहरणों को वास्तविक ऑफर न मानें।" : "This article combines the public sources below with RailQ’s practical planning advice. App and service details were checked against documentation; no paid delivery tests or hotel inspections were performed. Examples are not live offers."}</p><ol>{article.sources.map((s,i)=><li key={s.url} id={`source-${i+1}`}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}</ol><p>{hi ? "इस संस्करण के लिंक सामान्य संदर्भ लिंक हैं, कमीशन वाले लिंक नहीं। कीमत, उपलब्धता और शर्तें बदल सकती हैं; भुगतान से पहले प्रदाता पर जाँचें।" : "Links in this edition are ordinary reference links, not commission links. Prices, availability and terms can change; verify them with the provider before paying."}</p><Link href="/corrections">{hi ? "गलती मिली? पेज और स्रोत के साथ सुधार भेजें; टिकट विवरण न भेजें।" : "Found an error? Send the page and source for a correction; omit ticket details."}</Link></footer>
      </article>
    </div>
  </main>;
}
