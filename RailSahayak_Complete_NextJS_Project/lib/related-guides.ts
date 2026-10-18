import type { GuideConfig } from "@/lib/guide-registry";

/** Keep editorial selections first; otherwise connect guides through shared topics. */
export function relatedGuides(current: GuideConfig, all: GuideConfig[]): GuideConfig[] {
  const tokens = (slug: string) => new Set(slug.split("-").filter(word => !["and", "the", "for", "with", "in", "of", "to"].includes(word)));
  const currentTokens = tokens(current.slug);
  return all.filter(item => item.slug !== current.slug).map((item, index) => {
    const selected = current.related?.indexOf(item.slug) ?? -1;
    const overlap = [...tokens(item.slug)].filter(word => currentTokens.has(word)).length;
    return { item, index, score: selected >= 0 ? 1000 - selected : overlap };
  }).filter(item => item.score > 0).sort((a, b) => b.score - a.score || a.index - b.index).slice(0, 6).map(({ item }) => item);
}
