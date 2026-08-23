import type { Metadata } from "next";
import { DashboardClient } from "./dashboard-client";

export const metadata: Metadata = { title: "My Journey Dashboard | RailSahayak", description: "Combine PNR, live train, departure, chart, refund, coach, berth, platform and official links on one journey dashboard." };
export default function DashboardPage() { return <DashboardClient />; }
