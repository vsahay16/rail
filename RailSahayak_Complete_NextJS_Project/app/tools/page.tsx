import type { Metadata } from "next";
import { ToolsDirectory } from "./tools-directory";

export const metadata: Metadata = {
  title: "All Indian Railway Tools | RailSahayak",
  description: "Explore live railway lookups, booking calculators, refund tools, coach guides and journey-planning utilities in English and Hindi.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() { return <ToolsDirectory />; }
