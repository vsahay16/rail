import { ToolsDirectory } from "./tools-directory";
import { pageMetadata } from "@/lib/request-seo";

export async function generateMetadata() { return pageMetadata({"path": "/tools", "title": "All Indian Railway Tools", "titleHi": "सभी भारतीय रेल टूल्स", "description": "Explore live railway lookups, booking calculators, refund tools and journey-planning utilities.", "descriptionHi": "लाइव रेलवे खोज, बुकिंग कैलकुलेटर, रिफंड टूल्स और यात्रा की योजना बनाने की सुविधाएँ देखें।"}); }
export default function Page() { return <ToolsDirectory />; }
