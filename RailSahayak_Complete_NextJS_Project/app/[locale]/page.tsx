import Home from "./home-client";
import { pageMetadata } from "@/lib/request-seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; return pageMetadata({ locale, "path": "/", "title": "Indian Railway Tools: PNR, Live Trains & Booking", "titleHi": "भारतीय रेल टूल्स: PNR, लाइव ट्रेन और बुकिंग", "description": "Check PNR, live trains, booking dates, Tatkal timing and refund estimates in English and Hindi.", "descriptionHi": "हिंदी और अंग्रेज़ी में PNR, लाइव ट्रेन, बुकिंग तारीख, तत्काल समय और रिफंड का अनुमान देखें।"}); }
export default function Page() { return <Home />; }
