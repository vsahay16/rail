import { PageSchema } from "@/components/page-schema";
import { DashboardClient } from "./dashboard-client";
import { pageMetadata } from "@/lib/request-seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; return pageMetadata({ locale, "path": "/dashboard", "title": "My Journey Dashboard", "titleHi": "मेरी यात्रा का डैशबोर्ड", "description": "Bring PNR, live train status, boarding details and useful journey tools together.", "descriptionHi": "PNR, लाइव ट्रेन स्थिति, बोर्डिंग जानकारी और उपयोगी यात्रा टूल्स एक जगह देखें।"}); }
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; const metadata = await generateMetadata({ params }); return <><PageSchema metadata={metadata} locale={locale} type="WebPage" /><DashboardClient /></>; }
