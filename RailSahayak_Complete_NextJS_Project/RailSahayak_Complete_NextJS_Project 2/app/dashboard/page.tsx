import type { Metadata } from "next";
import { DashboardClient } from "./dashboard-client";
import { localizedAlternates } from "@/lib/seo";

export const metadata: Metadata = { title: "My Journey Dashboard | RailSahayak", description: "Combine PNR, live train, departure, chart, refund, coach, berth, platform and official links on one journey dashboard.", alternates: localizedAlternates("/dashboard") };
export default function DashboardPage() { return <DashboardClient />; }
