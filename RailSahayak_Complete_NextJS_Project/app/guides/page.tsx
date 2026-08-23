import type { Metadata } from "next";
import { GuidesDirectory } from "./guides-directory";

export const metadata: Metadata = { title: "Indian Railway Travel Guides | RailSahayak", description: "Practical bilingual guides for booking, Tatkal, refunds, PNR, coaches, charting, family and festival travel." };
export default function GuidesPage() { return <GuidesDirectory />; }
