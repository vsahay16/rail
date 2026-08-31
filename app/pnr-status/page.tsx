import { PnrStatusClient } from "./pnr-status-client";
import { pageMetadata } from "@/lib/request-seo";

export async function generateMetadata() { return pageMetadata({"path": "/pnr-status", "title": "PNR Status Check Online", "titleHi": "PNR स्थिति ऑनलाइन देखें", "description": "Check your railway PNR, each passenger’s current status, coach, berth and chart information.", "descriptionHi": "रेलवे PNR, हर यात्री की वर्तमान स्थिति, कोच, बर्थ और चार्ट की जानकारी देखें।"}); }
export default function Page() { return <PnrStatusClient />; }
