/** First measured metadata batch. Other proposed copy remains queued. */
export const seoMetadataDate = "2026-10-26";
export const seoMetadataBatch: Record<string, {title:string;titleHi:string;description:string;descriptionHi:string}> = {
  "/seat-availability": {
    "title": "Train Seat Availability: Check by Date & Class",
    "titleHi": "ट्रेन सीट उपलब्धता: तारीख और श्रेणी से जाँचें",
    "description": "Check train seat availability by train number, stations, journey date, class and quota. Read available seats or waiting status before booking.",
    "descriptionHi": "ट्रेन नंबर, स्टेशन, यात्रा तारीख, श्रेणी और कोटा से सीट उपलब्धता जाँचें। बुकिंग से पहले उपलब्ध सीट और वेटलिस्ट स्थिति समझें।"
  },
  "/coach-position": {
    "title": "Train Coach Position: Check Your Coach Order",
    "titleHi": "ट्रेन कोच पोज़िशन: अपने कोच का क्रम देखें",
    "description": "Enter your train number and journey date to check available coach order. Match your ticket’s coach label and verify its position at the station.",
    "descriptionHi": "ट्रेन नंबर और यात्रा तारीख से उपलब्ध कोच क्रम देखें। टिकट का कोच लेबल मिलाएँ और स्टेशन के डिस्प्ले पर स्थिति की पुष्टि करें।"
  },
  "/guides/train-classes-and-coaches": {
    "title": "Train Classes Explained: Sleeper, 3A, 2A & More",
    "titleHi": "ट्रेन श्रेणियाँ समझें: स्लीपर, 3A, 2A और अन्य",
    "description": "Compare Indian Railways accommodation classes and common coach labels. Understand berth patterns and check the actual allocation on your ticket.",
    "descriptionHi": "भारतीय रेलवे की यात्रा श्रेणियों और सामान्य कोच लेबल की तुलना करें। बर्थ पैटर्न समझें और अपने टिकट का वास्तविक आवंटन जाँचें।"
  },
  "/guides/missed-train-what-to-do": {
    "title": "Missed Your Train? Next Steps & Refund Checks",
    "titleHi": "ट्रेन छूट गई? अगले कदम और रिफंड की जाँच",
    "description": "Work out your next step after missing a train. Check ticket conditions, onward options and official help before buying another ticket or claiming a refund.",
    "descriptionHi": "ट्रेन छूटने पर टिकट की शर्तें, आगे की यात्रा के विकल्प और आधिकारिक सहायता जाँचें। दूसरा टिकट या रिफंड लेने से पहले जरूरी जानकारी समझें।"
  },
  "/guides/train-food-delivery-apps-compared": {
    "title": "Train Food Delivery Apps Compared: Cost & Coverage",
    "titleHi": "ट्रेन में खाना पहुँचाने वाले ऐप: खर्च और सेवा की तुलना",
    "description": "Compare six train-food services by delivery coverage, checkout charges and support. Check availability for your train and station before ordering.",
    "descriptionHi": "छह ट्रेन-फूड सेवाओं की डिलीवरी उपलब्धता, कुल शुल्क और सहायता की तुलना करें। ऑर्डर से पहले अपनी ट्रेन और स्टेशन की सेवा जाँचें।"
  }
};
export const seoChangedPaths = new Set([...Object.keys(seoMetadataBatch), "/trains-between-stations", "/waitlist-guide", "/status-code-decoder"]);
