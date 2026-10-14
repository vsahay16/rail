import data from "@/lib/travel-articles.json";
export type BilingualCopy = { en: string; hi: string };
export type TravelArticle = {
  slug: string; title: BilingualCopy; description: BilingualCopy; answer: BilingualCopy;
  published: string; updated: string; visual: string;
  sections: { title: BilingualCopy; paragraphs: BilingualCopy[]; points: BilingualCopy[]; refs: number[] }[];
  sources: { label: string; url: string }[];
  related: { href: string; label: BilingualCopy }[];
  table: { caption: BilingualCopy; headers: BilingualCopy[]; rows: BilingualCopy[][] } | null;
  faq: { question: BilingualCopy; answer: BilingualCopy }[];
};
export const travelArticles = data as TravelArticle[];
export function getTravelArticle(slug: string) { return travelArticles.find(article => article.slug === slug); }
