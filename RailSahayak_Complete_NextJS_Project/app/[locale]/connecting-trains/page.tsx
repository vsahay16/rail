import { JourneyPlanner } from "./planner";
import { pageMetadata } from "@/lib/request-seo";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params;
  return pageMetadata({ locale,  path: "/connecting-trains", title: "Connecting Train Planner", titleHi: "कनेक्टिंग ट्रेन प्लानर", description: "Compare direct trains and one-change journeys. See station codes, travel dates and transfer gaps before checking seats and booking.", descriptionHi: "सीधी ट्रेन और एक बदलाव वाले मार्ग की तुलना करें। सीट जाँचने और बुकिंग से पहले स्टेशन कोड, तारीख और ट्रेन बदलने का समय देखें।" });
}
export default function Page() { return <JourneyPlanner />; }
