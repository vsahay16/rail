import type { Metadata } from "next";
import { GuidesDirectory } from "./guides-directory";
import { localizedAlternates } from "@/lib/seo";

export const metadata: Metadata = { title: "Indian Railway Travel Guides | RailSahayak", description: "Practical bilingual guides for booking, Tatkal, refunds, PNR, coaches, charting, family and festival travel.", alternates: localizedAlternates("/guides") };
export default function GuidesPage() { return <GuidesDirectory />; }
