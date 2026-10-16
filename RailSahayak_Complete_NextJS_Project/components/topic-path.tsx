"use client";
import { LocalizedLink as Link } from "@/components/localized-link";
import { useLanguage } from "@/components/language-provider";
import { topicData, topicPaths } from "@/lib/topic-paths";
import styles from "./topic-path.module.css";
export function TopicPath({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const { language } = useLanguage(); const i = language === "hi" ? 1 : 0;
  const group = topicPaths[slug]; if (!group) return null;
  const data = topicData[group];
  return <section className={styles.panel} aria-label={data.title[i]}>
    <h2>{data.title[i]}</h2><p>{data.summary[i]}</p>
    {!compact && <div className={styles.example}><h3>{i ? "एक उदाहरण से समझें" : "A worked example"}</h3><p>{data.example[i]}</p><small>{i ? "केवल समझाने के लिए; वास्तविक बुकिंग नहीं।" : "Illustrative only; not a real booking."}</small></div>}
    <nav aria-label={i ? "संबंधित अगले कदम" : "Related next steps"}><ul>{data.links.filter(link => link[0] !== `/${slug}`).map(link => <li key={link[0]}><Link href={link[0]}>{link[i + 1]}</Link></li>)}</ul></nav>
    {!compact && <p className={styles.source}>{i ? "संदर्भ:" : "Reference:"} <a href={data.source[1]} target="_blank" rel="noreferrer">{data.source[0]}</a> · <Link href="/methodology">{i ? "डेटा और अनुमान की प्रक्रिया" : "Data and estimation methodology"}</Link> · <Link href="/corrections">{i ? "सुधार बताएँ" : "Report a correction"}</Link></p>}
  </section>;
}
