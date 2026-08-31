import { GuidesDirectory } from "./guides-directory";
import { pageMetadata } from "@/lib/request-seo";

export async function generateMetadata() { return pageMetadata({"path": "/guides", "title": "Indian Railway Travel Guides", "titleHi": "भारतीय रेल यात्रा गाइड", "description": "Practical guides for booking, Tatkal, refunds, PNR, coaches and family travel.", "descriptionHi": "बुकिंग, तत्काल, रिफंड, PNR, कोच और परिवार के साथ यात्रा की उपयोगी गाइड पढ़ें।"}); }
export default function Page() { return <GuidesDirectory />; }
