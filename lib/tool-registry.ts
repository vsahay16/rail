export type ToolCategory = "live" | "booking" | "refund" | "coach" | "planning";

export type ToolConfig = {
  slug: string;
  icon: string;
  category: ToolCategory;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  live?: boolean;
  working?: boolean;
};

export const toolConfigs: ToolConfig[] = [
  { slug: "pnr-status", icon: "ticket", category: "live", title: "PNR Status", titleHi: "PNR स्थिति", description: "Check current confirmation, coach, berth and chart information.", descriptionHi: "वर्तमान कन्फर्मेशन, कोच, बर्थ और चार्ट जानकारी देखें।", live: true, working: true },
  { slug: "live-train-status", icon: "pulse", category: "live", title: "Live Train Status", titleHi: "लाइव ट्रेन स्थिति", description: "Track the latest available running position, delay and next halt.", descriptionHi: "ट्रेन की नवीनतम स्थिति, देरी और अगला स्टेशन देखें।", live: true, working: true },
  { slug: "trains-between-stations", icon: "route", category: "live", title: "Trains Between Stations", titleHi: "स्टेशनों के बीच ट्रेनें", description: "Find scheduled direct trains between an origin and destination.", descriptionHi: "शुरुआती और मंज़िल स्टेशन के बीच निर्धारित सीधी ट्रेनें खोजें।", live: true, working: true },
  { slug: "seat-availability", icon: "seat", category: "live", title: "Seat Availability", titleHi: "सीट उपलब्धता", description: "Check class and quota availability for a selected journey.", descriptionHi: "चुनी गई यात्रा के लिए श्रेणी और कोटा उपलब्धता देखें।", live: true },
  { slug: "train-schedule", icon: "calendar", category: "live", title: "Train Schedule", titleHi: "ट्रेन समय-सारणी", description: "View the station sequence and scheduled arrival or departure times.", descriptionHi: "स्टेशन क्रम और निर्धारित आगमन या प्रस्थान समय देखें।", live: true, working: true },
  { slug: "train-fare", icon: "refund", category: "live", title: "Train Fare", titleHi: "ट्रेन किराया", description: "Estimate or fetch fare by class, quota and journey segment.", descriptionHi: "श्रेणी, कोटा और यात्रा के आधार पर किराया देखें।", live: true },
  { slug: "station-arrivals-departures", icon: "clock", category: "live", title: "Station Arrivals & Departures", titleHi: "स्टेशन आगमन और प्रस्थान", description: "See trains scheduled or expected at a station.", descriptionHi: "किसी स्टेशन पर निर्धारित या अपेक्षित ट्रेनें देखें।", live: true },
  { slug: "coach-position", icon: "chart", category: "live", title: "Coach Position", titleHi: "कोच स्थिति", description: "Find the available rake and coach order information.", descriptionHi: "उपलब्ध रेक और कोच क्रम की जानकारी पाएँ।", live: true },
  { slug: "platform-number", icon: "route", category: "live", title: "Platform Number", titleHi: "प्लेटफॉर्म नंबर", description: "Check available platform information with a visible confidence label.", descriptionHi: "विश्वसनीयता लेबल के साथ उपलब्ध प्लेटफॉर्म जानकारी देखें।", live: true },
  { slug: "pnr-alerts", icon: "bell", category: "live", title: "PNR Change Alerts", titleHi: "PNR बदलाव अलर्ट", description: "Coming soon: PNR status-change emails. Calendar booking reminders are available now.", descriptionHi: "जल्द आ रहा है: PNR बदलाव के ईमेल। कैलेंडर बुकिंग रिमाइंडर अभी उपलब्ध हैं।", live: true },
  { slug: "booking-date-calculator", icon: "calendar", category: "booking", title: "Advance Booking Date Calculator", titleHi: "अग्रिम बुकिंग तारीख कैलकुलेटर", description: "Calculate when the general advance reservation window is expected to open.", descriptionHi: "जानें सामान्य अग्रिम आरक्षण विंडो कब खुलने की उम्मीद है।", working: true },
  { slug: "tatkal-time-calculator", icon: "clock", category: "booking", title: "Tatkal Date & Time Calculator", titleHi: "तत्काल तारीख और समय कैलकुलेटर", description: "Calculate the expected AC or non-AC Tatkal opening time.", descriptionHi: "AC या नॉन-AC तत्काल बुकिंग का अपेक्षित समय निकालें।", working: true },
  { slug: "chart-preparation-calculator", icon: "chart", category: "booking", title: "Chart Preparation Calculator", titleHi: "चार्ट तैयारी कैलकुलेटर", description: "Estimate the first reservation-chart preparation window.", descriptionHi: "पहले आरक्षण चार्ट के तैयार होने का अनुमान लगाएँ।", working: true },
  { slug: "booking-reminders", icon: "bell", category: "booking", title: "Booking & Tatkal Reminders", titleHi: "बुकिंग और तत्काल रिमाइंडर", description: "Create calendar reminders without exposing booking information.", descriptionHi: "बुकिंग जानकारी उजागर किए बिना कैलेंडर रिमाइंडर बनाएँ।", working: true },
  { slug: "cancellation-deadline-calculator", icon: "clock", category: "refund", title: "Cancellation Deadline Calculator", titleHi: "टिकट रद्द करने की समय-सीमा", description: "See important cancellation windows before scheduled departure.", descriptionHi: "निर्धारित प्रस्थान से पहले महत्वपूर्ण रद्दीकरण समय देखें।", working: true },
  { slug: "refund-calculator", icon: "refund", category: "refund", title: "Refund Calculator", titleHi: "रिफंड कैलकुलेटर", description: "Estimate the deduction and expected refund before cancelling.", descriptionHi: "टिकट रद्द करने से पहले संभावित कटौती और रिफंड का अनुमान लगाएँ।", working: true },
  { slug: "seat-berth-finder", icon: "seat", category: "coach", title: "Seat & Berth Finder", titleHi: "सीट और बर्थ पहचानें", description: "Identify lower, middle, upper or side berth from coach and seat number.", descriptionHi: "कोच और सीट नंबर से लोअर, मिडिल, अपर या साइड बर्थ पहचानें।", working: true },
  { slug: "coach-layout", icon: "seat", category: "coach", title: "Coach Layout Viewer", titleHi: "कोच लेआउट देखें", description: "Explore a clear representative layout for common Indian train coaches.", descriptionHi: "सामान्य भारतीय ट्रेन कोच का स्पष्ट उदाहरण लेआउट देखें।", working: true },
  { slug: "status-code-decoder", icon: "ticket", category: "coach", title: "Railway Status-Code Decoder", titleHi: "रेलवे स्थिति कोड समझें", description: "Decode CNF, RAC, GNWL, RLWL, PQWL, TQWL and common coach codes.", descriptionHi: "CNF, RAC, GNWL, RLWL, PQWL, TQWL और सामान्य कोच कोड समझें।", working: true },
  { slug: "waitlist-guide", icon: "ticket", category: "coach", title: "Waitlist Guide", titleHi: "वेटलिस्ट गाइड", description: "Understand waitlist categories and the importance of final chart status.", descriptionHi: "वेटलिस्ट श्रेणियाँ और अंतिम चार्ट स्थिति का महत्व समझें।", working: true },
  { slug: "vikalp-eligibility", icon: "swap", category: "planning", title: "VIKALP Eligibility Assistant", titleHi: "VIKALP पात्रता सहायक", description: "Understand when alternate-train consideration may apply.", descriptionHi: "जानें वैकल्पिक ट्रेन पर विचार कब लागू हो सकता है।", working: true },
  { slug: "connection-buffer-calculator", icon: "route", category: "planning", title: "Connection Buffer Calculator", titleHi: "कनेक्शन समय कैलकुलेटर", description: "Evaluate the practical time available between two train journeys.", descriptionHi: "दो ट्रेन यात्राओं के बीच उपलब्ध व्यावहारिक समय जाँचें।", working: true },
  { slug: "luggage-allowance", icon: "chart", category: "planning", title: "Luggage Allowance Guide", titleHi: "सामान सीमा गाइड", description: "Estimate free luggage allowance by travel class and passenger count.", descriptionHi: "यात्रा श्रेणी और यात्रियों के आधार पर मुफ्त सामान सीमा का अनुमान लगाएँ।", working: true },
];

export const categoryCopy: Record<ToolCategory, { title: string; titleHi: string; description: string; descriptionHi: string }> = {
  live: { title: "Live railway data", titleHi: "लाइव रेलवे डेटा", description: "Provider-backed journey lookups and operational information.", descriptionHi: "प्रदाता आधारित यात्रा खोज और संचालन जानकारी।" },
  booking: { title: "Booking & timing", titleHi: "बुकिंग और समय", description: "Plan reservation windows, Tatkal and chart timing.", descriptionHi: "आरक्षण विंडो, तत्काल और चार्ट समय की योजना बनाएँ।" },
  refund: { title: "Cancellation & refunds", titleHi: "रद्दीकरण और रिफंड", description: "Understand important deadlines and estimate deductions.", descriptionHi: "महत्वपूर्ण समय-सीमा और संभावित कटौती समझें।" },
  coach: { title: "Seats, coaches & status", titleHi: "सीट, कोच और स्थिति", description: "Decode ticket status and understand onboard layout.", descriptionHi: "टिकट स्थिति और कोच लेआउट समझें।" },
  planning: { title: "Journey planning", titleHi: "यात्रा योजना", description: "Practical helpers for connections, alternatives and luggage.", descriptionHi: "कनेक्शन, वैकल्पिक ट्रेन और सामान के व्यावहारिक टूल्स।" },
};

export function getToolConfig(slug: string) {
  return toolConfigs.find((tool) => tool.slug === slug);
}
