import type { Metadata } from "next";
import { ServiceHealth } from "./service-health";
export const metadata: Metadata = { title: "Private service monitor | RailQ", robots: { index: false, follow: false } };
export default function Page() { return <ServiceHealth />; }
