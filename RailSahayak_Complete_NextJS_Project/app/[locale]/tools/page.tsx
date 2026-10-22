import { PageSchema } from "@/components/page-schema";
import { ToolsDirectory } from "./tools-directory";
import { pageMetadata } from "@/lib/request-seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; return pageMetadata({ locale, "path": "/tools", "title": "All Indian Railway Tools", "titleHi": "सभी भारतीय रेल टूल्स", "description": "Explore live railway lookups, booking calculators, refund tools and journey-planning utilities.", "descriptionHi": "लाइव रेलवे खोज, बुकिंग कैलकुलेटर, रिफंड टूल्स और यात्रा की योजना बनाने की सुविधाएँ देखें।"}); }
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; const metadata = await generateMetadata({ params }); return <><PageSchema metadata={metadata} locale={locale} type="CollectionPage" /><ToolsDirectory /></>; }
