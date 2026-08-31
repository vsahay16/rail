import { DashboardClient } from "./dashboard-client";
import { pageMetadata } from "@/lib/request-seo";

export async function generateMetadata() { return pageMetadata({"path": "/dashboard", "title": "My Journey Dashboard", "titleHi": "मेरी यात्रा का डैशबोर्ड", "description": "Bring PNR, live train status, boarding details and useful journey tools together.", "descriptionHi": "PNR, लाइव ट्रेन स्थिति, बोर्डिंग जानकारी और उपयोगी यात्रा टूल्स एक जगह देखें।"}); }
export default function Page() { return <DashboardClient />; }
