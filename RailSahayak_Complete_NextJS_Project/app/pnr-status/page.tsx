import type { Metadata } from "next";
import { PnrStatusClient } from "./pnr-status-client";
import { localizedAlternates } from "@/lib/seo";

const title = "PNR Status Check Online | Live Indian Train PNR | RailSahayak";
const description = "Check your 10-digit railway PNR status, current passenger status, coach, berth and chart information in English or Hindi.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["PNR status", "PNR status check", "railway PNR status", "Indian Railways PNR", "train ticket status"],
  alternates: localizedAlternates("/pnr-status"),
  openGraph: { type: "website", url: "/pnr-status", title, description },
  twitter: { card: "summary_large_image", title, description },
};

export default function PnrStatusPage() {
  return <PnrStatusClient />;
}
