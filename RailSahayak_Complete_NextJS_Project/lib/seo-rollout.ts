/** Full URL-specific rollout; English and Hindi exclusions are independent. */
export type SeoRolloutCopy = {title:string;description:string;h1?:string};
export const seoRolloutDate = "2026-10-26";
export const protectedSeoPaths = new Set<string>([
  "/pnr-status",
  "/coach-layout",
  "/chart-preparation-calculator",
  "/guides/vikalp-and-alternate-routes",
  "/seat-berth-finder",
  "/guides/new-delhi-station-ajmeri-gate-paharganj",
  "/guides/partially-confirmed-family-ticket",
  "/",
  "/hi/pnr-status",
  "/guides/gnwl-rlwl-pqwl-tqwl-difference"
]);
export const seoRolloutCopy: Record<string,SeoRolloutCopy> = {
  "/coach-position": {
    "title": "Train Coach Position: Check Your Coach Order",
    "description": "Enter your train number and journey date to check available coach order. Match your ticket’s coach label and verify its position at the station.",
    "h1": "Train Coach Position"
  },
  "/hi/coach-position": {
    "title": "ट्रेन कोच पोज़िशन: अपने कोच का क्रम देखें",
    "description": "ट्रेन नंबर और यात्रा तारीख से उपलब्ध कोच क्रम देखें। टिकट का कोच लेबल मिलाएँ और स्टेशन के डिस्प्ले पर स्थिति की पुष्टि करें।",
    "h1": "ट्रेन कोच पोज़िशन"
  },
  "/connecting-trains": {
    "title": "Connecting Trains: Find Routes With One Change",
    "description": "Find direct trains and routes with one change between stations. Compare dates, interchange stations and transfer time, then check seats for each train.",
    "h1": "Find Connecting Trains"
  },
  "/hi/connecting-trains": {
    "title": "कनेक्टिंग ट्रेनें: एक बदलाव वाले मार्ग खोजें",
    "description": "दो स्टेशनों के बीच सीधी ट्रेनें या एक बदलाव वाले मार्ग खोजें। तारीख, बदलने का स्टेशन और बीच का समय मिलाएँ; हर ट्रेन की सीट अलग जाँचें।",
    "h1": "कनेक्टिंग ट्रेनें खोजें"
  },
  "/guides/missed-train-what-to-do": {
    "title": "Missed Your Train? Next Steps & Refund Checks",
    "description": "Work out your next step after missing a train. Check ticket conditions, onward options and official help before buying another ticket or claiming a refund.",
    "h1": "Missed Your Train? Next Steps & Refund Checks"
  },
  "/hi/guides/missed-train-what-to-do": {
    "title": "ट्रेन छूट गई? अगले कदम और रिफंड की जाँच",
    "description": "ट्रेन छूटने पर टिकट की शर्तें, आगे की यात्रा के विकल्प और आधिकारिक सहायता जाँचें। दूसरा टिकट या रिफंड लेने से पहले जरूरी जानकारी समझें।",
    "h1": "ट्रेन छूट गई? अगले कदम और रिफंड की जाँच"
  },
  "/guides/pnr-confirmation-probability": {
    "title": "PNR Confirmation Chances: What the Percentage Means",
    "description": "Understand PNR confirmation percentages, missing estimates and mixed passenger statuses. Learn how to request an estimate and why it is not a guarantee.",
    "h1": "PNR Confirmation Chances: What the Percentage Means"
  },
  "/hi/guides/pnr-confirmation-probability": {
    "title": "PNR कन्फर्मेशन चांस: प्रतिशत का अर्थ समझें",
    "description": "PNR कन्फर्मेशन प्रतिशत, अनुमान न मिलने और यात्रियों की अलग स्थितियों को समझें। अनुमान माँगने का तरीका और उसकी सीमाएँ जानें।",
    "h1": "PNR कन्फर्मेशन चांस: प्रतिशत का अर्थ समझें"
  },
  "/guides/train-classes-and-coaches": {
    "title": "Train Classes Explained: Sleeper, 3A, 2A & More",
    "description": "Compare Indian Railways accommodation classes and common coach labels. Understand berth patterns and check the actual allocation on your ticket.",
    "h1": "Train Classes Explained: Sleeper, 3A, 2A & More"
  },
  "/hi/guides/train-classes-and-coaches": {
    "title": "ट्रेन श्रेणियाँ समझें: स्लीपर, 3A, 2A और अन्य",
    "description": "भारतीय रेलवे की यात्रा श्रेणियों और सामान्य कोच लेबल की तुलना करें। बर्थ पैटर्न समझें और अपने टिकट का वास्तविक आवंटन जाँचें।",
    "h1": "ट्रेन श्रेणियाँ समझें: स्लीपर, 3A, 2A और अन्य"
  },
  "/guides/train-food-delivery-apps-compared": {
    "title": "Train Food Delivery Apps Compared: Cost & Coverage",
    "description": "Compare six train-food services by delivery coverage, checkout charges and support. Check availability for your train and station before ordering.",
    "h1": "Train Food Delivery Apps Compared: Cost & Coverage"
  },
  "/hi/guides/train-food-delivery-apps-compared": {
    "title": "ट्रेन में खाना पहुँचाने वाले ऐप: खर्च और सेवा की तुलना",
    "description": "छह ट्रेन-फूड सेवाओं की डिलीवरी उपलब्धता, कुल शुल्क और सहायता की तुलना करें। ऑर्डर से पहले अपनी ट्रेन और स्टेशन की सेवा जाँचें।",
    "h1": "ट्रेन में खाना पहुँचाने वाले ऐप: खर्च और सेवा की तुलना"
  },
  "/live-train-status": {
    "title": "Live Train Running Status: Location & Delay",
    "description": "Enter your train number and journey date to check reported running status, delay and next halt. Review the update time before planning your arrival.",
    "h1": "Live Train Running Status"
  },
  "/hi/live-train-status": {
    "title": "लाइव ट्रेन रनिंग स्टेटस: स्थान और देरी देखें",
    "description": "ट्रेन नंबर और यात्रा तारीख से मिली रनिंग स्थिति, देरी और अगला ठहराव देखें। स्टेशन पहुँचने की योजना से पहले जानकारी का अपडेट समय जाँचें।",
    "h1": "लाइव ट्रेन रनिंग स्टेटस"
  },
  "/seat-availability": {
    "title": "Train Seat Availability: Check by Date & Class",
    "description": "Check train seat availability by train number, stations, journey date, class and quota. Read available seats or waiting status before booking.",
    "h1": "Train Seat Availability"
  },
  "/hi/seat-availability": {
    "title": "ट्रेन सीट उपलब्धता: तारीख और श्रेणी से जाँचें",
    "description": "ट्रेन नंबर, स्टेशन, यात्रा तारीख, श्रेणी और कोटा से सीट उपलब्धता जाँचें। बुकिंग से पहले उपलब्ध सीट और वेटलिस्ट स्थिति समझें।",
    "h1": "ट्रेन सीट उपलब्धता"
  },
  "/train-fare": {
    "title": "Train Fare Enquiry: Check Ticket Fare by Class",
    "description": "Check available train ticket fares by number, route, date, class and quota. Review fare components and verify the total before booking.",
    "h1": "Train Ticket Fare Enquiry"
  },
  "/hi/train-fare": {
    "title": "ट्रेन किराया पूछताछ: श्रेणी के अनुसार किराया देखें",
    "description": "ट्रेन नंबर, रूट, तारीख, श्रेणी और कोटा से उपलब्ध टिकट किराया देखें। शामिल शुल्क समझें और बुकिंग से पहले कुल राशि की पुष्टि करें।",
    "h1": "ट्रेन टिकट किराया पूछताछ"
  },
  "/train-schedule": {
    "title": "Train Time Table: Route, Stops & Arrival Times",
    "description": "Enter a train number to see its timetable, route, stops and arrival or departure times. Check journey days; use live status for current delays.",
    "h1": "Train Time Table & Route"
  },
  "/hi/train-schedule": {
    "title": "ट्रेन टाइम टेबल: रूट, ठहराव और आगमन समय",
    "description": "ट्रेन नंबर से समय-सारणी, रूट, ठहराव और आगमन-प्रस्थान समय देखें। यात्रा के दिन मिलाएँ; वर्तमान देरी के लिए लाइव स्थिति जाँचें।",
    "h1": "ट्रेन टाइम टेबल और रूट"
  },
  "/blog": {
    "title": "Railway Travel Blog: Tickets, Food & Journey Planning",
    "description": "Read practical articles on train tickets, food orders, station transfers and family travel. Explore detailed guides and the tools for your next journey."
  },
  "/hi/blog": {
    "title": "रेल यात्रा ब्लॉग: टिकट, भोजन और यात्रा की तैयारी",
    "description": "ट्रेन टिकट, भोजन ऑर्डर, स्टेशन बदलने और परिवार की यात्रा पर उपयोगी लेख पढ़ें। अगली यात्रा के लिए विस्तृत गाइड और टूल्स देखें।"
  },
  "/booking-date-calculator": {
    "title": "Train Booking Date Calculator: When Can I Book?",
    "description": "Enter your journey date from the train’s origin to estimate when advance booking opens. Check the date and opening time before booking on IRCTC.",
    "h1": "Train Booking Date Calculator"
  },
  "/hi/booking-date-calculator": {
    "title": "ट्रेन बुकिंग तारीख कैलकुलेटर: बुकिंग कब खुलेगी?",
    "description": "ट्रेन के शुरुआती स्टेशन से यात्रा की तारीख भरकर अग्रिम बुकिंग खुलने का अनुमान देखें। IRCTC पर बुकिंग से पहले तारीख और समय जाँचें।",
    "h1": "ट्रेन बुकिंग तारीख कैलकुलेटर"
  },
  "/booking-reminders": {
    "title": "Train Booking Reminder: Add to Your Calendar",
    "description": "Create a calendar reminder for advance or Tatkal booking. Download the file, add it to your calendar and check that notifications are enabled.",
    "h1": "Train Booking Calendar Reminders"
  },
  "/hi/booking-reminders": {
    "title": "ट्रेन बुकिंग रिमाइंडर: कैलेंडर में जोड़ें",
    "description": "अग्रिम या तत्काल बुकिंग के लिए कैलेंडर रिमाइंडर बनाएँ। फ़ाइल डाउनलोड करके अपने कैलेंडर में जोड़ें और सूचना सेटिंग जाँचें।",
    "h1": "ट्रेन बुकिंग कैलेंडर रिमाइंडर"
  },
  "/cancellation-deadline-calculator": {
    "title": "Train Ticket Cancellation Deadline Calculator",
    "description": "Check planning deadlines for cancelling a train ticket using its type, status and departure time. Verify the applicable policy in your booking.",
    "h1": "Train Ticket Cancellation Deadline Calculator"
  },
  "/hi/cancellation-deadline-calculator": {
    "title": "ट्रेन टिकट रद्द करने की समय-सीमा कैलकुलेटर",
    "description": "टिकट प्रकार, स्थिति और प्रस्थान समय से रद्दीकरण की योजना के लिए समय-सीमा देखें। अपनी बुकिंग में लागू नीति और अंतिम समय की पुष्टि करें।",
    "h1": "ट्रेन टिकट रद्द करने की समय-सीमा"
  },
  "/connection-buffer-calculator": {
    "title": "Train Connection Time Calculator: Check Your Gap",
    "description": "Compare arrival and onward departure times. Allow for a station change and extra delay to assess the transfer margin between two trains.",
    "h1": "Train Connection Time Calculator"
  },
  "/hi/connection-buffer-calculator": {
    "title": "ट्रेन कनेक्शन समय कैलकुलेटर: बीच का समय जाँचें",
    "description": "पहली ट्रेन के आगमन और अगली के प्रस्थान की तुलना करें। स्टेशन बदलाव और अतिरिक्त देरी जोड़कर ट्रांसफर के लिए बचा समय समझें।",
    "h1": "ट्रेन कनेक्शन समय कैलकुलेटर"
  },
  "/guides": {
    "title": "Indian Railway Guides: PNR, Booking & Stations",
    "description": "Find practical guides to PNR codes, RAC, waitlists, train booking, coaches and station transfers. Open the matching RailQ tool when you need to check."
  },
  "/hi/guides": {
    "title": "रेलवे गाइड: PNR, बुकिंग और स्टेशन की जानकारी",
    "description": "PNR कोड, RAC, वेटलिस्ट, ट्रेन बुकिंग, कोच और स्टेशन बदलने की जानकारी पढ़ें। जरूरत के अनुसार संबंधित RailQ टूल खोलकर जाँचें।"
  },
  "/guides/3e-vs-3a-train-class": {
    "title": "3E vs 3A in Trains: AC Economy vs AC 3 Tier",
    "description": "Compare 3E and 3A accommodation, fare checks, linen and practical travel needs. Understand the difference before choosing a train class.",
    "h1": "3E vs 3A in Trains: AC Economy vs AC 3 Tier"
  },
  "/hi/guides/3e-vs-3a-train-class": {
    "title": "ट्रेन में 3E और 3A का अंतर: AC इकोनॉमी या 3 टियर?",
    "description": "3E और 3A की बर्थ व्यवस्था, किराया जाँच, लिनन और यात्रा जरूरतों की तुलना करें। ट्रेन श्रेणी चुनने से पहले अंतर समझें।",
    "h1": "ट्रेन में 3E और 3A का अंतर: AC इकोनॉमी या 3 टियर?"
  },
  "/guides/booking-and-advance-reservation": {
    "title": "Train Advance Reservation: Booking Date & Checklist",
    "description": "Prepare the correct journey date, stations, class and passenger details for train booking. Check when booking opens and verify the issued ticket.",
    "h1": "Train Advance Reservation: Booking Date & Checklist"
  },
  "/hi/guides/booking-and-advance-reservation": {
    "title": "ट्रेन अग्रिम आरक्षण: बुकिंग तारीख और तैयारी",
    "description": "ट्रेन बुकिंग के लिए सही तारीख, स्टेशन, श्रेणी और यात्री विवरण तैयार रखें। बुकिंग खुलने का समय और जारी टिकट की जानकारी जाँचें।",
    "h1": "ट्रेन अग्रिम आरक्षण: बुकिंग तारीख और तैयारी"
  },
  "/guides/can-you-travel-with-rac-ticket": {
    "title": "Can You Travel With an RAC Ticket? Seat vs Berth",
    "description": "Understand what RAC means for travel and seating, how it differs from a confirmed berth and what each passenger should verify before boarding.",
    "h1": "Can You Travel With an RAC Ticket? Seat vs Berth"
  },
  "/hi/guides/can-you-travel-with-rac-ticket": {
    "title": "RAC टिकट पर यात्रा कर सकते हैं? सीट और बर्थ का अंतर",
    "description": "यात्रा और बैठने के लिए RAC का अर्थ समझें। कन्फर्म बर्थ से उसका अंतर और ट्रेन में चढ़ने से पहले हर यात्री की जरूरी जाँच जानें।",
    "h1": "RAC टिकट पर यात्रा कर सकते हैं? सीट और बर्थ का अंतर"
  },
  "/guides/cancellation-and-refunds": {
    "title": "Train Ticket Cancellation & Refund Rules Explained",
    "description": "Find the right process for a cancelled ticket, disrupted train or failed booking. Check applicable refund conditions and the records to keep.",
    "h1": "Train Ticket Cancellation & Refund Rules Explained"
  },
  "/hi/guides/cancellation-and-refunds": {
    "title": "ट्रेन टिकट रद्दीकरण और रिफंड नियम समझें",
    "description": "टिकट रद्द करने, ट्रेन सेवा बाधित होने या बुकिंग विफल होने की सही प्रक्रिया जानें। लागू रिफंड शर्तें और रखने वाले प्रमाण जाँचें।",
    "h1": "ट्रेन टिकट रद्दीकरण और रिफंड नियम समझें"
  },
  "/guides/change-boarding-station-irctc": {
    "title": "How to Change Boarding Station on IRCTC",
    "description": "Learn how to change a train boarding point, check applicable timing and resolve conflicting guidance. Verify the updated station in your booking.",
    "h1": "How to Change Boarding Station on IRCTC"
  },
  "/hi/guides/change-boarding-station-irctc": {
    "title": "IRCTC पर बोर्डिंग स्टेशन कैसे बदलें?",
    "description": "ट्रेन का बोर्डिंग स्टेशन बदलने की प्रक्रिया, लागू समय और अलग-अलग जानकारी की जाँच समझें। अपनी बुकिंग में नया स्टेशन सत्यापित करें।",
    "h1": "IRCTC पर बोर्डिंग स्टेशन कैसे बदलें?"
  },
  "/guides/chart-preparation": {
    "title": "Train Chart Preparation: Meaning, Timing & Status",
    "description": "Understand what chart preparation changes, how chart-time estimates work and where to check actual chart status for each passenger’s PNR.",
    "h1": "Train Chart Preparation: Meaning, Timing & Status"
  },
  "/hi/guides/chart-preparation": {
    "title": "ट्रेन चार्ट तैयारी: अर्थ, समय और स्थिति",
    "description": "समझें कि चार्ट बनने पर क्या बदलता है, समय के अनुमान का उपयोग कैसे करें और हर यात्री की वास्तविक चार्ट व PNR स्थिति कहाँ जाँचें।",
    "h1": "ट्रेन चार्ट तैयारी: अर्थ, समय और स्थिति"
  },
  "/guides/current-booking-after-chart": {
    "title": "Current Booking After Charting: Check Vacant Seats",
    "description": "Understand current booking after chart preparation, where to check vacant accommodation and what to verify before buying a last-minute train ticket.",
    "h1": "Current Booking After Charting: Check Vacant Seats"
  },
  "/hi/guides/current-booking-after-chart": {
    "title": "चार्ट के बाद करंट बुकिंग: खाली सीट कैसे जाँचें?",
    "description": "चार्ट बनने के बाद करंट बुकिंग समझें। खाली सीट कहाँ जाँचें और आखिरी समय ट्रेन टिकट लेने से पहले किन बातों की पुष्टि करें, जानें।",
    "h1": "चार्ट के बाद करंट बुकिंग: खाली सीट कैसे जाँचें?"
  },
  "/guides/delhi-railway-stations-codes": {
    "title": "Delhi Railway Station Codes: NDLS, DLI, NZM & ANVT",
    "description": "Compare New Delhi, Old Delhi, Hazrat Nizamuddin and Anand Vihar station codes. Match your ticket and plan the correct station transfer.",
    "h1": "Delhi Railway Station Codes: NDLS, DLI, NZM & ANVT"
  },
  "/hi/guides/delhi-railway-stations-codes": {
    "title": "दिल्ली रेलवे स्टेशन कोड: NDLS, DLI, NZM और ANVT",
    "description": "नई दिल्ली, पुरानी दिल्ली, हजरत निजामुद्दीन और आनंद विहार के कोड मिलाएँ। टिकट का स्टेशन पहचानें और सही जगह पहुँचने की योजना बनाएँ।",
    "h1": "दिल्ली रेलवे स्टेशन कोड: NDLS, DLI, NZM और ANVT"
  },
  "/guides/family-and-senior-citizen-travel": {
    "title": "Train Travel With Seniors & Family: Planning Guide",
    "description": "Plan station access, lower-berth needs, medicines, meals and transfer time for family or senior travellers. Prepare around each passenger’s needs.",
    "h1": "Train Travel With Seniors & Family: Planning Guide"
  },
  "/hi/guides/family-and-senior-citizen-travel": {
    "title": "परिवार और बुजुर्गों के साथ ट्रेन यात्रा की तैयारी",
    "description": "परिवार और बुजुर्गों के लिए स्टेशन पहुँच, लोअर बर्थ की जरूरत, दवा, भोजन और ट्रांसफर समय की योजना बनाएँ। हर यात्री की जरूरत देखें।",
    "h1": "परिवार और बुजुर्गों के साथ ट्रेन यात्रा की तैयारी"
  },
  "/guides/festival-travel-planning": {
    "title": "Festival Train Travel: Booking & Backup Checklist",
    "description": "Plan festival train travel with alternative dates, trains and realistic station time. Check seat availability and keep a workable backup journey.",
    "h1": "Festival Train Travel: Booking & Backup Checklist"
  },
  "/hi/guides/festival-travel-planning": {
    "title": "त्योहार में ट्रेन यात्रा: बुकिंग और विकल्प की तैयारी",
    "description": "त्योहार में ट्रेन यात्रा के लिए दूसरी तारीख, ट्रेन और स्टेशन पर पर्याप्त समय की योजना बनाएँ। सीट उपलब्धता जाँचें और यात्रा का विकल्प रखें।",
    "h1": "त्योहार में ट्रेन यात्रा: बुकिंग और विकल्प की तैयारी"
  },
  "/guides/hotel-near-railway-station-checklist": {
    "title": "Hotel Near a Railway Station: 7 Booking Checks",
    "description": "Check the station exit, late arrival, room access, final price and cancellation terms before choosing a hotel near a railway station.",
    "h1": "Hotel Near a Railway Station: 7 Booking Checks"
  },
  "/hi/guides/hotel-near-railway-station-checklist": {
    "title": "रेलवे स्टेशन के पास होटल: बुकिंग से पहले 7 जाँचें",
    "description": "स्टेशन के पास होटल चुनने से पहले सही निकास, देर से आगमन, कमरे में प्रवेश, कुल कीमत और रद्दीकरण की शर्तें जाँचें।",
    "h1": "रेलवे स्टेशन के पास होटल: बुकिंग से पहले 7 जाँचें"
  },
  "/guides/howrah-vs-sealdah-stations": {
    "title": "Howrah vs Sealdah: Station Codes & Transfer Guide",
    "description": "Check the difference between Howrah and Sealdah stations, match your ticket’s code and allow for a separate station transfer before your train.",
    "h1": "Howrah vs Sealdah: Station Codes & Transfer Guide"
  },
  "/hi/guides/howrah-vs-sealdah-stations": {
    "title": "हावड़ा या सियालदह: स्टेशन कोड और ट्रांसफर गाइड",
    "description": "हावड़ा और सियालदह का अंतर जानें, टिकट का स्टेशन कोड मिलाएँ और ट्रेन से पहले अलग स्टेशन तक पहुँचने के लिए पर्याप्त समय रखें।",
    "h1": "हावड़ा या सियालदह: स्टेशन कोड और ट्रांसफर गाइड"
  },
  "/guides/irctc-money-debited-ticket-not-booked": {
    "title": "IRCTC Money Debited but Ticket Not Booked? Next Steps",
    "description": "Check booking and payment status when money is debited but no train ticket is issued. Avoid paying twice and keep the references for follow-up.",
    "h1": "IRCTC Money Debited but Ticket Not Booked? Next Steps"
  },
  "/hi/guides/irctc-money-debited-ticket-not-booked": {
    "title": "IRCTC में पैसे कटे पर टिकट नहीं बना? अगले कदम",
    "description": "पैसे कटने पर ट्रेन टिकट जारी न हो तो बुकिंग और भुगतान स्थिति जाँचें। दोबारा भुगतान से पहले जरूरी पुष्टि करें और संदर्भ संख्या रखें।",
    "h1": "IRCTC में पैसे कटे पर टिकट नहीं बना? अगले कदम"
  },
  "/guides/mumbai-railway-terminals-codes": {
    "title": "Mumbai Station Codes: CSMT, LTT, MMCT & BDTS",
    "description": "Identify Mumbai railway terminals using the code on your ticket. Compare CSMT, LTT, MMCT and BDTS and plan transfers between different stations.",
    "h1": "Mumbai Station Codes: CSMT, LTT, MMCT & BDTS"
  },
  "/hi/guides/mumbai-railway-terminals-codes": {
    "title": "मुंबई स्टेशन कोड: CSMT, LTT, MMCT और BDTS",
    "description": "टिकट के कोड से मुंबई का सही रेलवे टर्मिनल पहचानें। CSMT, LTT, MMCT और BDTS मिलाएँ तथा अलग स्टेशनों के बीच ट्रांसफर की योजना बनाएँ।",
    "h1": "मुंबई स्टेशन कोड: CSMT, LTT, MMCT और BDTS"
  },
  "/guides/overnight-train-journey-checklist": {
    "title": "Overnight Train Journey Checklist: What to Pack",
    "description": "Prepare your ticket, allocated berth, small travel bag, food and phone for an overnight train journey. Use the packing example and arrival checklist.",
    "h1": "Overnight Train Journey Checklist: What to Pack"
  },
  "/hi/guides/overnight-train-journey-checklist": {
    "title": "रात की ट्रेन यात्रा चेकलिस्ट: क्या साथ रखें?",
    "description": "रात की ट्रेन यात्रा के लिए टिकट, आवंटित बर्थ, छोटा बैग, भोजन और फोन तैयार रखें। पैकिंग उदाहरण और आगमन की जाँच सूची पढ़ें।",
    "h1": "रात की ट्रेन यात्रा चेकलिस्ट: क्या साथ रखें?"
  },
  "/guides/patna-junction-rajendra-nagar-danapur-stations": {
    "title": "Patna Railway Stations: PNBE, RJPB & DNR Explained",
    "description": "Compare Patna Junction, Rajendra Nagar Terminal and Danapur station codes. Match your boarding station and plan a transfer without terminal confusion.",
    "h1": "Patna Railway Stations: PNBE, RJPB & DNR Explained"
  },
  "/hi/guides/patna-junction-rajendra-nagar-danapur-stations": {
    "title": "पटना रेलवे स्टेशन: PNBE, RJPB और DNR समझें",
    "description": "पटना जंक्शन, राजेंद्र नगर टर्मिनल और दानापुर के स्टेशन कोड मिलाएँ। अपना बोर्डिंग स्टेशन पहचानें और सही स्टेशन तक पहुँच की योजना बनाएँ।",
    "h1": "पटना रेलवे स्टेशन: PNBE, RJPB और DNR समझें"
  },
  "/guides/pnr-and-waiting-lists": {
    "title": "Train Waiting List Movement: Changes & Next Steps",
    "description": "Understand why a train waiting-list number changes and why movement does not guarantee a berth. Check current PNR status and compare alternatives.",
    "h1": "Train Waiting List Movement: Changes & Next Steps"
  },
  "/hi/guides/pnr-and-waiting-lists": {
    "title": "ट्रेन वेटलिस्ट में बदलाव: अर्थ और अगले कदम",
    "description": "ट्रेन की वेटलिस्ट संख्या बदलने का कारण समझें और जानें कि आगे बढ़ना बर्थ की गारंटी क्यों नहीं है। वर्तमान PNR स्थिति और विकल्प जाँचें।",
    "h1": "ट्रेन वेटलिस्ट में बदलाव: अर्थ और अगले कदम"
  },
  "/guides/pnr-status-explained": {
    "title": "PNR Status Explained: Booking vs Current Status",
    "description": "Read each passenger’s booking and current status, coach, berth and chart details. Understand mixed results and the limits of confirmation estimates.",
    "h1": "PNR Status Explained: Booking vs Current Status"
  },
  "/hi/guides/pnr-status-explained": {
    "title": "PNR स्थिति समझें: बुकिंग और वर्तमान स्थिति का अंतर",
    "description": "हर यात्री की बुकिंग और वर्तमान स्थिति, कोच, बर्थ और चार्ट विवरण पढ़ें। मिले-जुले परिणाम तथा कन्फर्मेशन अनुमान की सीमाएँ समझें।",
    "h1": "PNR स्थिति समझें: बुकिंग और वर्तमान स्थिति का अंतर"
  },
  "/guides/station-and-onboard-travel": {
    "title": "Railway Station & Onboard Help: Passenger Guide",
    "description": "Prepare for station entry, platform checks, coach location and help on board. Learn which details can change and where to verify the latest information.",
    "h1": "Railway Station & Onboard Help: Passenger Guide"
  },
  "/hi/guides/station-and-onboard-travel": {
    "title": "रेलवे स्टेशन और ट्रेन में सहायता: यात्री गाइड",
    "description": "स्टेशन प्रवेश, प्लेटफॉर्म जाँच, कोच की जगह और ट्रेन में सहायता के लिए तैयार रहें। बदल सकने वाली जानकारी और पुष्टि के स्रोत जानें।",
    "h1": "रेलवे स्टेशन और ट्रेन में सहायता: यात्री गाइड"
  },
  "/guides/tatkal": {
    "title": "Tatkal Booking Guide: Timing, Details & Preparation",
    "description": "Prepare passenger details, journey dates and payment before Tatkal booking. Use the timing calculator and compare alternatives if seats are unavailable.",
    "h1": "Tatkal Booking Guide: Timing, Details & Preparation"
  },
  "/hi/guides/tatkal": {
    "title": "तत्काल बुकिंग गाइड: समय, विवरण और तैयारी",
    "description": "तत्काल बुकिंग से पहले यात्री विवरण, यात्रा तारीख और भुगतान तैयार करें। समय कैलकुलेटर इस्तेमाल करें और सीट न मिलने पर विकल्प देखें।",
    "h1": "तत्काल बुकिंग गाइड: समय, विवरण और तैयारी"
  },
  "/guides/train-cancelled-delayed-refund": {
    "title": "Train Cancelled or Delayed? Refund & TDR Guide",
    "description": "Check the right refund process for a cancelled or delayed train. Understand cancellation versus TDR, applicable conditions and evidence to keep.",
    "h1": "Train Cancelled or Delayed? Refund & TDR Guide"
  },
  "/hi/guides/train-cancelled-delayed-refund": {
    "title": "ट्रेन रद्द या लेट है? रिफंड और TDR गाइड",
    "description": "ट्रेन रद्द या देरी होने पर सही रिफंड प्रक्रिया जाँचें। रद्दीकरण और TDR का अंतर, लागू शर्तें और रखने वाले प्रमाण समझें।",
    "h1": "ट्रेन रद्द या लेट है? रिफंड और TDR गाइड"
  },
  "/guides/train-food-discounts-final-price": {
    "title": "Train Food Discounts: Check the Final Order Price",
    "description": "Compare train-food coupons using caps, minimum orders, delivery fees and cashback terms. Use worked examples to check the final bill before paying.",
    "h1": "Train Food Discounts: Check the Final Order Price"
  },
  "/hi/guides/train-food-discounts-final-price": {
    "title": "ट्रेन फूड डिस्काउंट: ऑर्डर की कुल कीमत जाँचें",
    "description": "कूपन सीमा, न्यूनतम ऑर्डर, डिलीवरी शुल्क और कैशबैक शर्तों से ट्रेन-फूड ऑफर मिलाएँ। भुगतान से पहले उदाहरणों से कुल बिल समझें।",
    "h1": "ट्रेन फूड डिस्काउंट: ऑर्डर की कुल कीमत जाँचें"
  },
  "/guides/train-food-ordering-checklist": {
    "title": "Ordering Food on a Train: 10 Checks Before Paying",
    "description": "Check your delivery station, coach, phone number, meal details and total bill before ordering train food. Keep the confirmation and cancellation terms.",
    "h1": "Ordering Food on a Train: 10 Checks Before Paying"
  },
  "/hi/guides/train-food-ordering-checklist": {
    "title": "ट्रेन में खाना ऑर्डर करने से पहले 10 जाँचें",
    "description": "ट्रेन में भोजन मँगाने से पहले डिलीवरी स्टेशन, कोच, फोन, भोजन विवरण और कुल बिल जाँचें। ऑर्डर पुष्टि और रद्दीकरण की शर्तें रखें।",
    "h1": "ट्रेन में खाना ऑर्डर करने से पहले 10 जाँचें"
  },
  "/guides/useful-apps-indian-train-travel": {
    "title": "Useful Railway Apps: Booking, Tracking & Food",
    "description": "Compare railway apps by the task you need: ticket booking, live running, complaints, food or navigation. Understand official services and their limits.",
    "h1": "Useful Railway Apps: Booking, Tracking & Food"
  },
  "/hi/guides/useful-apps-indian-train-travel": {
    "title": "उपयोगी रेलवे ऐप: बुकिंग, लाइव स्थिति और भोजन",
    "description": "टिकट बुकिंग, लाइव रनिंग, शिकायत, भोजन और रास्ते के लिए रेलवे ऐप की तुलना करें। आधिकारिक सेवाएँ पहचानें और उनकी सीमाएँ समझें।",
    "h1": "उपयोगी रेलवे ऐप: बुकिंग, लाइव स्थिति और भोजन"
  },
  "/guides/waitlisted-ticket-after-chart-preparation": {
    "title": "Waitlisted Ticket After Charting: Can You Travel?",
    "description": "Check the next steps for a fully waitlisted e-ticket, mixed-status booking or counter ticket after charting. Verify your ticket-specific travel conditions.",
    "h1": "Waitlisted Ticket After Charting: Can You Travel?"
  },
  "/hi/guides/waitlisted-ticket-after-chart-preparation": {
    "title": "चार्ट के बाद वेटलिस्ट टिकट: यात्रा कर सकते हैं?",
    "description": "चार्ट बनने के बाद पूरी वेटलिस्ट ई-टिकट, मिले-जुले परिणाम और काउंटर टिकट के अगले कदम समझें। अपने टिकट की यात्रा शर्तें सत्यापित करें।",
    "h1": "चार्ट के बाद वेटलिस्ट टिकट: यात्रा कर सकते हैं?"
  },
  "/guides/when-to-order-food-in-train": {
    "title": "When to Order Food on a Train: Timing Checklist",
    "description": "Plan a train-food order around the delivery station, order cutoff and running delay. Check contact details and keep a practical meal backup.",
    "h1": "When to Order Food on a Train: Timing Checklist"
  },
  "/hi/guides/when-to-order-food-in-train": {
    "title": "ट्रेन में खाना कब ऑर्डर करें? समय और तैयारी",
    "description": "डिलीवरी स्टेशन, ऑर्डर समय-सीमा और ट्रेन की देरी के अनुसार खाना मँगाने की योजना बनाएँ। संपर्क विवरण जाँचें और भोजन का विकल्प रखें।",
    "h1": "ट्रेन में खाना कब ऑर्डर करें? समय और तैयारी"
  },
  "/luggage-allowance": {
    "title": "Indian Railways Luggage Allowance Calculator",
    "description": "Estimate luggage allowance using train class and adult or child passenger counts. Check the assumptions and official baggage rules before packing.",
    "h1": "Railway Luggage Allowance Calculator"
  },
  "/hi/luggage-allowance": {
    "title": "भारतीय रेलवे सामान सीमा कैलकुलेटर",
    "description": "ट्रेन श्रेणी और वयस्क-बच्चों की संख्या से सामान सीमा का अनुमान देखें। पैकिंग से पहले गणना की धारणाएँ और आधिकारिक नियम जाँचें।",
    "h1": "रेलवे सामान सीमा कैलकुलेटर"
  },
  "/platform-number": {
    "title": "Train Platform Number: Check by Train & Station",
    "description": "Look up available platform details using your train number, station and date. Platforms can change; confirm the latest station announcement.",
    "h1": "Check Your Train Platform Number"
  },
  "/hi/platform-number": {
    "title": "ट्रेन प्लेटफॉर्म नंबर: ट्रेन और स्टेशन से जाँचें",
    "description": "ट्रेन नंबर, स्टेशन और तारीख से उपलब्ध प्लेटफॉर्म जानकारी देखें। प्लेटफॉर्म बदल सकता है; स्टेशन की ताजा घोषणा और डिस्प्ले जाँचें।",
    "h1": "ट्रेन का प्लेटफॉर्म नंबर जाँचें"
  },
  "/railway-updates": {
    "title": "Indian Railway Updates: Booking & Travel Rules",
    "description": "Read dated railway updates with source links and practical passenger implications. Check booking, charting and travel guidance before your journey."
  },
  "/hi/railway-updates": {
    "title": "भारतीय रेलवे अपडेट: बुकिंग और यात्रा नियम",
    "description": "तारीख और स्रोत लिंक के साथ रेलवे अपडेट तथा यात्रियों पर असर पढ़ें। यात्रा से पहले बुकिंग, चार्ट और लागू नियमों की जानकारी जाँचें।"
  },
  "/refund-calculator": {
    "title": "Train Ticket Refund Calculator: Cancellation Fees",
    "description": "Estimate cancellation deductions using ticket type, fare, class, passenger status and time before departure. Check your booking’s applicable refund policy.",
    "h1": "Train Ticket Refund Calculator"
  },
  "/hi/refund-calculator": {
    "title": "ट्रेन टिकट रिफंड कैलकुलेटर: रद्दीकरण शुल्क",
    "description": "टिकट प्रकार, किराया, श्रेणी, यात्री स्थिति और प्रस्थान से बचे समय से कटौती का अनुमान देखें। बुकिंग में लागू रिफंड नीति जाँचें।",
    "h1": "ट्रेन टिकट रिफंड कैलकुलेटर"
  },
  "/station-arrivals-departures": {
    "title": "Live Station: Train Arrivals & Departures",
    "description": "Enter a station name or code to check available arrivals and departures. Compare scheduled and expected train times for the selected time window.",
    "h1": "Live Station Arrivals & Departures"
  },
  "/hi/station-arrivals-departures": {
    "title": "लाइव स्टेशन: ट्रेनों का आगमन और प्रस्थान",
    "description": "स्टेशन नाम या कोड डालकर उपलब्ध आगमन और प्रस्थान देखें। चुनी समय अवधि में ट्रेनों के निर्धारित और अपेक्षित समय की तुलना करें।",
    "h1": "लाइव स्टेशन: आगमन और प्रस्थान"
  },
  "/status-code-decoder": {
    "title": "Railway Ticket Status Codes: CNF, RAC, WL & More",
    "description": "Enter a railway ticket status code to understand its meaning. Decode CNF, RAC, WL, GNWL and other codes, then check each passenger’s current status.",
    "h1": "Railway Ticket Status Code Checker"
  },
  "/hi/status-code-decoder": {
    "title": "रेलवे टिकट स्थिति कोड: CNF, RAC और WL का अर्थ",
    "description": "रेलवे टिकट का स्थिति कोड भरकर उसका अर्थ जानें। CNF, RAC, WL, GNWL और अन्य कोड समझें, फिर हर यात्री की वर्तमान स्थिति जाँचें।",
    "h1": "रेलवे टिकट स्थिति कोड जाँचें"
  },
  "/tatkal-time-calculator": {
    "title": "Tatkal Booking Time Calculator: AC & Non-AC",
    "description": "Find the Tatkal booking date and opening time for AC or non-AC classes using the train’s origin date. Read the result in Indian Standard Time.",
    "h1": "Tatkal Booking Date & Time Calculator"
  },
  "/hi/tatkal-time-calculator": {
    "title": "तत्काल बुकिंग समय कैलकुलेटर: AC और नॉन-AC",
    "description": "ट्रेन की शुरुआती तारीख से AC या नॉन-AC श्रेणी की तत्काल बुकिंग का दिन और समय जानें। परिणाम भारतीय समय में पढ़ें और आधिकारिक पुष्टि करें।",
    "h1": "तत्काल बुकिंग तारीख और समय कैलकुलेटर"
  },
  "/tools": {
    "title": "Indian Railway Tools: PNR, Trains & Calculators",
    "description": "Check PNR status, train running, seats and routes. Use booking-date, chart-time, berth and refund tools in English or Hindi without installing an app."
  },
  "/hi/tools": {
    "title": "रेलवे टूल्स: PNR, ट्रेन और यात्रा कैलकुलेटर",
    "description": "PNR, लाइव ट्रेन, सीट और मार्ग जाँचें। बुकिंग तारीख, चार्ट समय, बर्थ और रिफंड टूल्स हिंदी या अंग्रेज़ी में ब्राउज़र पर इस्तेमाल करें।"
  },
  "/trains-between-stations": {
    "title": "Trains Between Two Stations: Routes & Timings",
    "description": "Find direct trains between your source and destination stations. Compare departure and arrival times, then check seats for your chosen date and class.",
    "h1": "Find Trains Between Two Stations"
  },
  "/hi/trains-between-stations": {
    "title": "दो स्टेशनों के बीच ट्रेनें: मार्ग और समय देखें",
    "description": "शुरुआती और मंज़िल स्टेशन के बीच सीधी ट्रेनें खोजें। प्रस्थान और आगमन समय मिलाएँ, फिर चुनी तारीख और श्रेणी की सीट उपलब्धता जाँचें।",
    "h1": "दो स्टेशनों के बीच ट्रेनें खोजें"
  },
  "/vikalp-eligibility": {
    "title": "IRCTC VIKALP Eligibility: Check Your Booking",
    "description": "Answer three booking questions to see whether VIKALP may apply. Understand the limits of alternate-train allocation and check your official booking.",
    "h1": "Check VIKALP Eligibility"
  },
  "/hi/vikalp-eligibility": {
    "title": "IRCTC VIKALP पात्रता: अपनी बुकिंग जाँचें",
    "description": "बुकिंग के तीन सवालों के जवाब देकर VIKALP लागू होने का संकेत देखें। वैकल्पिक ट्रेन आवंटन की सीमाएँ समझें और आधिकारिक बुकिंग जाँचें।",
    "h1": "VIKALP पात्रता जाँचें"
  },
  "/waitlist-guide": {
    "title": "Train Waitlist Code Checker: GNWL, RLWL & RAC",
    "description": "Select your waiting-list category to understand what it means. Compare waitlist codes with RAC and learn why a queue number cannot promise confirmation.",
    "h1": "Train Waitlist Code Checker"
  },
  "/hi/waitlist-guide": {
    "title": "ट्रेन वेटलिस्ट कोड जाँचें: GNWL, RLWL और RAC",
    "description": "अपनी वेटलिस्ट श्रेणी चुनकर उसका अर्थ समझें। कोड और RAC का अंतर जानें तथा समझें कि प्रतीक्षा क्रम कन्फर्मेशन की गारंटी क्यों नहीं है।",
    "h1": "ट्रेन वेटलिस्ट कोड जाँचें"
  },
  "/hi": {
    "title": "भारतीय रेलवे टूल्स: PNR, लाइव ट्रेन और यात्रा योजना",
    "description": "PNR स्थिति, लाइव ट्रेन, सीट और मार्ग जाँचें। बुकिंग तारीख, चार्ट समय और रिफंड की योजना के लिए RailQ के हिंदी टूल्स और यात्री गाइड इस्तेमाल करें।"
  },
  "/hi/chart-preparation-calculator": {
    "title": "ट्रेन चार्ट बनने का समय: चार्ट तैयारी कैलकुलेटर",
    "description": "लागू चार्टिंग स्टेशन का प्रस्थान दिन और समय भरकर पहले चार्ट का अनुमान देखें। वास्तविक चार्ट तैयार होने की पुष्टि PNR रिकॉर्ड से करें।"
  },
  "/hi/coach-layout": {
    "title": "ट्रेन कोच लेआउट: स्लीपर, 3A और 2A की बर्थ व्यवस्था",
    "description": "स्लीपर, 3A और 2A के समर्थित सामान्य बर्थ पैटर्न देखें। लोअर, मिडिल, अपर और साइड बर्थ समझें तथा वास्तविक कोच से पैटर्न मिलाएँ।",
    "h1": "ट्रेन कोच की बर्थ व्यवस्था"
  },
  "/hi/guides/gnwl-rlwl-pqwl-tqwl-difference": {
    "title": "GNWL, RLWL, PQWL और TQWL वेटलिस्ट में क्या अंतर है?",
    "description": "चार वेटलिस्ट श्रेणियों के अर्थ और अंतर उदाहरणों से समझें। जानें कि केवल कोड या प्रतीक्षा संख्या टिकट कन्फर्म होने की गारंटी क्यों नहीं है।",
    "h1": "GNWL, RLWL, PQWL और TQWL वेटलिस्ट में क्या अंतर है?"
  },
  "/hi/guides/new-delhi-station-ajmeri-gate-paharganj": {
    "title": "नई दिल्ली स्टेशन अजमेरी गेट: मेट्रो और प्रवेश मार्ग",
    "description": "NDLS पर अजमेरी गेट और पहाड़गंज प्रवेश की तुलना करें। मेट्रो, टैक्सी या होटल से सही रास्ता चुनें और स्पष्ट मैप लिंक से पहुँच की योजना बनाएँ।",
    "h1": "नई दिल्ली स्टेशन अजमेरी गेट: मेट्रो और प्रवेश मार्ग"
  },
  "/hi/guides/partially-confirmed-family-ticket": {
    "title": "एक यात्री कन्फर्म, दूसरा वेटलिस्ट: फैमिली PNR गाइड",
    "description": "एक ही PNR में यात्रियों की अलग-अलग स्थिति समझें। हर यात्री का वर्तमान परिणाम तथा लागू यात्रा या रद्दीकरण शर्तें अलग जाँचें।",
    "h1": "एक यात्री कन्फर्म, दूसरा वेटलिस्ट: फैमिली PNR गाइड"
  },
  "/hi/guides/vikalp-and-alternate-routes": {
    "title": "VIKALP और वैकल्पिक ट्रेन मार्ग: क्या जाँचें?",
    "description": "VIKALP, दूसरी सीधी ट्रेन और कनेक्टिंग मार्ग की तुलना करें। नई यात्रा चुनने से पहले स्टेशन, तारीख, सीट और ट्रेन बदलने का समय मिलाएँ।",
    "h1": "VIKALP और वैकल्पिक ट्रेन मार्ग: क्या जाँचें?"
  },
  "/hi/seat-berth-finder": {
    "title": "ट्रेन बर्थ कैलकुलेटर: सीट नंबर से बर्थ पहचानें",
    "description": "आवंटित सीट नंबर और मिलता कोच पैटर्न चुनकर अपेक्षित बर्थ प्रकार तथा हाइलाइट किया चित्र देखें। WL संख्या को आवंटित बर्थ न मानें।",
    "h1": "ट्रेन बर्थ कैलकुलेटर"
  },
  "/about": {
    "title": "About: Independent Indian Railway Tools",
    "description": "Learn about RailQ’s independent railway tools, third-party data and passenger guides. Understand service limits and how to contact the website team."
  },
  "/hi/about": {
    "title": "हमारे बारे में: स्वतंत्र भारतीय रेलवे टूल्स",
    "description": "RailQ के स्वतंत्र रेलवे टूल्स, तृतीय-पक्ष डेटा और यात्री गाइड के बारे में जानें। सेवा की सीमाएँ और वेबसाइट टीम से संपर्क का तरीका समझें।"
  },
  "/advertise": {
    "title": "Railway Website Advertising & Partnerships",
    "description": "Explore advertising or partnership enquiries for RailQ’s railway audience. Learn about labelled placements and offers relevant to passenger journeys."
  },
  "/hi/advertise": {
    "title": "रेलवे वेबसाइट पर विज्ञापन और साझेदारी",
    "description": "RailQ के रेलवे यात्रियों तक पहुँचने के लिए विज्ञापन या साझेदारी की जानकारी लें। स्पष्ट लेबल वाले विज्ञापन और यात्रा से संबंधित ऑफर का तरीका समझें।"
  },
  "/alerts": {
    "title": "Railway Alerts & Calendar Booking Reminders",
    "description": "See which RailQ reminders are available and create a booking calendar file. PNR email monitoring is not active; no new email subscriptions are accepted."
  },
  "/hi/alerts": {
    "title": "रेलवे अलर्ट और कैलेंडर बुकिंग रिमाइंडर",
    "description": "RailQ पर उपलब्ध रिमाइंडर देखें और बुकिंग की कैलेंडर फ़ाइल बनाएँ। PNR ईमेल निगरानी चालू नहीं है और नए ईमेल अनुरोध नहीं लिए जा रहे हैं।"
  },
  "/contact": {
    "title": "Contact: Website Support, Feedback & Partnerships",
    "description": "Contact the RailQ website team about tool errors, accessibility, factual corrections or partnerships. Omit full PNRs, passwords and payment details."
  },
  "/hi/contact": {
    "title": "संपर्क: वेबसाइट सहायता, सुझाव और साझेदारी",
    "description": "टूल की समस्या, सुगमता, तथ्य सुधार या साझेदारी के लिए RailQ वेबसाइट टीम से संपर्क करें। पूरा PNR, पासवर्ड और भुगतान विवरण न भेजें।"
  },
  "/corrections": {
    "title": "Report a Railway Information or Tool Error",
    "description": "Found an incorrect explanation or a railway tool problem? Send the RailQ page address, issue and supporting source without sharing private ticket data."
  },
  "/hi/corrections": {
    "title": "रेलवे जानकारी या टूल की गलती बताएँ",
    "description": "किसी गाइड में गलत जानकारी या रेलवे टूल में समस्या मिली? RailQ पेज का पता, समस्या और स्रोत भेजें। टिकट का निजी विवरण साझा न करें।"
  },
  "/dashboard": {
    "title": "Train Journey Dashboard: PNR & Travel Checks",
    "description": "Open your journey dashboard for PNR, train-running and boarding checks. Review available journey details and verify the official record before travel."
  },
  "/hi/dashboard": {
    "title": "ट्रेन यात्रा डैशबोर्ड: PNR और जरूरी जाँच",
    "description": "PNR, ट्रेन की रनिंग स्थिति और बोर्डिंग की जरूरी जाँच के लिए यात्रा डैशबोर्ड खोलें। उपलब्ध जानकारी देखें और यात्रा से पहले आधिकारिक रिकॉर्ड मिलाएँ।"
  },
  "/disclaimer": {
    "title": "Railway Data & Prediction Disclaimer",
    "description": "Read the limits of RailQ’s railway feeds, confirmation estimates and calculators. Use official services to verify ticket status and important travel decisions."
  },
  "/hi/disclaimer": {
    "title": "रेलवे डेटा और कन्फर्मेशन अनुमान का अस्वीकरण",
    "description": "RailQ के रेलवे डेटा, कन्फर्मेशन अनुमान और कैलकुलेटर की सीमाएँ पढ़ें। टिकट स्थिति और जरूरी यात्रा निर्णय आधिकारिक सेवाओं से सत्यापित करें।"
  },
  "/methodology": {
    "title": "Railway Data Sources & Prediction Limits",
    "description": "Understand RailQ’s railway-data sources, provider estimates and planning calculations. Learn why results may be missing and when to verify official records."
  },
  "/hi/methodology": {
    "title": "रेलवे डेटा स्रोत और कन्फर्मेशन अनुमान की सीमाएँ",
    "description": "RailQ के रेलवे डेटा स्रोत, प्रदाता के अनुमान और योजना की गणना समझें। जानकारी न मिलने के कारण तथा आधिकारिक रिकॉर्ड जाँचने की जरूरत जानें।"
  },
  "/official-services": {
    "title": "Official Railway Links: IRCTC, NTES & Passenger Help",
    "description": "Find official Indian Railways links for ticket booking, PNR enquiry, train running and passenger assistance. Choose the service that matches your task."
  },
  "/hi/official-services": {
    "title": "आधिकारिक रेलवे लिंक: IRCTC, NTES और यात्री सहायता",
    "description": "टिकट बुकिंग, PNR पूछताछ, ट्रेन रनिंग और यात्री सहायता के आधिकारिक भारतीय रेल लिंक पाएँ। अपनी जरूरत के अनुसार सही सेवा चुनें।"
  },
  "/pnr-alerts": {
    "title": "PNR Email Alerts: Not Yet Available",
    "description": "PNR status-change emails are not active on RailQ. Use the available booking and Tatkal calendar reminders, or check your PNR manually when needed."
  },
  "/hi/pnr-alerts": {
    "title": "PNR ईमेल अलर्ट: अभी उपलब्ध नहीं",
    "description": "RailQ पर PNR स्थिति बदलने के ईमेल अभी चालू नहीं हैं। उपलब्ध बुकिंग और तत्काल कैलेंडर रिमाइंडर इस्तेमाल करें या जरूरत पर स्वयं PNR जाँचें।"
  },
  "/privacy": {
    "title": "Privacy Policy: Searches, Analytics & Saved Data",
    "description": "See how RailQ handles railway lookups, optional analytics, saved browser shortcuts and contact messages. Read the privacy choices available to you."
  },
  "/hi/privacy": {
    "title": "गोपनीयता नीति: खोज, एनालिटिक्स और सेव डेटा",
    "description": "जानें RailQ में रेलवे खोज, वैकल्पिक एनालिटिक्स, ब्राउज़र के सेव शॉर्टकट और संपर्क संदेश कैसे संभाले जाते हैं। अपने गोपनीयता विकल्प पढ़ें।"
  },
  "/terms": {
    "title": "Terms of Use: Railway Tools & Estimates",
    "description": "Read the conditions for using RailQ’s railway tools, information and estimates. Check service limitations and responsibilities before relying on a result."
  },
  "/hi/terms": {
    "title": "उपयोग की शर्तें: रेलवे टूल्स और अनुमान",
    "description": "RailQ के रेलवे टूल्स, जानकारी और अनुमानों के उपयोग की शर्तें पढ़ें। किसी परिणाम पर निर्भर होने से पहले सेवा की सीमाएँ और जिम्मेदारियाँ समझें।"
  }
};
export function seoPagePath(path: string, locale: string) {
 const base = path.replace(/^\/hi(?=\/|$)/, "").replace(/\/+$/, "") || "/";
 return locale === "hi" ? `/hi${base === "/" ? "" : base}` : base;
}
export function getSeoRollout(path: string, locale: string): SeoRolloutCopy | undefined {
 const key=seoPagePath(path,locale);
 return protectedSeoPaths.has(key) ? undefined : seoRolloutCopy[key];
}
