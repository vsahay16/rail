/** Page-specific editorial help. Examples are illustrative, never live railway records. */
export type HelpSection = { title: string; titleHi: string; body: string; bodyHi: string };
export type PageGuidance = { related: string[]; sources: string[]; sections: HelpSection[] };
export const pageGuidance: Record<string, PageGuidance> = {
  "live-train-status": {
    "related": [
      "train-schedule",
      "platform-number",
      "station-arrivals-departures"
    ],
    "sources": [
      "ntes"
    ],
    "sections": [
      {
        "title": "Choose the correct running date",
        "titleHi": "सही संचालन तारीख चुनें",
        "body": "Use the train number from your ticket and check which date the service started from its first station. A train that started yesterday may reach your boarding station today. Choosing today’s origin date can show a different run of the same train.",
        "bodyHi": "टिकट का ट्रेन नंबर डालें और देखें कि ट्रेन अपने पहले स्टेशन से किस तारीख को चली थी। कल शुरू हुई ट्रेन आज आपके स्टेशन आ सकती है। शुरुआती तारीख गलत चुनने पर उसी ट्रेन की दूसरी यात्रा दिख सकती है।"
      },
      {
        "title": "Read the update time as well as the delay",
        "titleHi": "देरी के साथ अपडेट का समय भी देखें",
        "body": "A reported location is the last location supplied by the provider, not a promise of continuous GPS tracking. For example, a 25-minute delay reported at 14:10 does not establish the position at 14:40. Compare the update time, last reported station and next halt before deciding when to leave.",
        "bodyHi": "दिखा स्थान प्रदाता की आखिरी सूचना है, लगातार GPS ट्रैकिंग की गारंटी नहीं। जैसे 14:10 पर मिली 25 मिनट की देरी, 14:40 की स्थिति नहीं बताती। निकलने से पहले अपडेट समय, आखिरी स्टेशन और अगला ठहराव मिलाएँ।"
      },
      {
        "title": "If the service is unavailable",
        "titleHi": "जानकारी उपलब्ध न हो तो",
        "body": "Check the train number and date once, then use NTES for an official running enquiry. A missing response does not mean the train is cancelled or on time. Confirm platform changes through station displays and announcements.",
        "bodyHi": "ट्रेन नंबर और तारीख एक बार जाँचें, फिर आधिकारिक स्थिति NTES पर देखें। परिणाम न मिलने का अर्थ ट्रेन रद्द या समय पर होना नहीं है। प्लेटफॉर्म बदलाव स्टेशन डिस्प्ले और घोषणा से पक्का करें।"
      }
    ]
  },
  "trains-between-stations": {
    "related": [
      "seat-availability",
      "train-schedule",
      "guides/vikalp-and-alternate-routes"
    ],
    "sources": [
      "ntes"
    ],
    "sections": [
      {
        "title": "Search by station, not just city",
        "titleHi": "केवल शहर नहीं, सही स्टेशन चुनें",
        "body": "Select the suggested station names and verify their codes. New Delhi (NDLS) and Delhi Junction (DLI), for example, are different stations. Search a nearby station separately only if you can reach it comfortably; a shorter train journey can still require a longer road transfer.",
        "bodyHi": "सुझाव से स्टेशन चुनकर कोड मिलाएँ। नई दिल्ली (NDLS) और दिल्ली जंक्शन (DLI) अलग स्टेशन हैं। पास के स्टेशन की अलग खोज तभी उपयोगी है जब वहाँ पहुँचना सुविधाजनक हो; छोटी रेल यात्रा में सड़क का सफर बढ़ सकता है।"
      },
      {
        "title": "A listed train is not a seat offer",
        "titleHi": "ट्रेन की सूची सीट की उपलब्धता नहीं है",
        "body": "Compare running days, boarding time and arrival day before checking seats for your exact date and class. A timetable match does not reserve a seat. A train reaching the destination after midnight arrives on a different calendar date; include that when arranging a pickup or hotel.",
        "bodyHi": "चलने के दिन, बोर्डिंग समय और आगमन का दिन देखकर अपनी तारीख व श्रेणी की सीट जाँचें। समय-सारणी में ट्रेन मिलने से सीट आरक्षित नहीं होती। आधी रात के बाद पहुँचने वाली ट्रेन की तारीख अलग होगी; होटल या लेने आने की योजना में इसे ध्यान रखें।"
      },
      {
        "title": "When no direct train appears",
        "titleHi": "सीधी ट्रेन न मिले तो",
        "body": "Try the exact station pair and an alternative date. Do not interpret a failed request as proof that no service exists. If you plan separate connecting tickets, compare the transfer station and a realistic delay margin before booking either leg.",
        "bodyHi": "सही स्टेशन जोड़ी और दूसरी तारीख देखें। असफल खोज यह साबित नहीं करती कि ट्रेन नहीं है। अलग टिकटों पर कनेक्शन बनाते समय स्टेशन बदलने का समय और संभावित देरी जोड़कर ही दोनों यात्राएँ बुक करें।"
      }
    ]
  },
  "seat-availability": {
    "related": [
      "train-fare",
      "waitlist-guide",
      "guides/booking-and-advance-reservation"
    ],
    "sources": [
      "pnr",
      "booking"
    ],
    "sections": [
      {
        "title": "Keep the search conditions identical",
        "titleHi": "खोज की शर्तें एक जैसी रखें",
        "body": "Enter the train, boarding and destination stations, journey date, class and quota. A result for another class or shorter section is not availability for your intended journey. Compare alternative dates one at a time so you know which change produced the result.",
        "bodyHi": "ट्रेन, बोर्डिंग व गंतव्य स्टेशन, यात्रा तारीख, श्रेणी और कोटा भरें। दूसरी श्रेणी या छोटे हिस्से का परिणाम आपकी पूरी यात्रा की उपलब्धता नहीं है। एक बार में एक तारीख बदलें ताकि परिणाम का कारण स्पष्ट रहे।"
      },
      {
        "title": "Read availability before making payment",
        "titleHi": "भुगतान से पहले उपलब्धता पढ़ें",
        "body": "An available count is a snapshot; it is not a seat held for you. WL/7 is a waiting position, not berth 7. After paying through your booking service, check the status on the issued ticket rather than assuming it matches an earlier search.",
        "bodyHi": "उपलब्ध सीटों की संख्या उस समय की सूचना है; आपके लिए सीट रोककर नहीं रखी गई है। WL/7 प्रतीक्षा क्रम है, बर्थ 7 नहीं। बुकिंग सेवा पर भुगतान के बाद जारी टिकट का स्टेटस देखें, पुरानी खोज जैसा मानकर न चलें।"
      },
      {
        "title": "No result versus no seats",
        "titleHi": "परिणाम न मिलना और सीट न मिलना अलग हैं",
        "body": "An error or empty provider response means availability could not be checked. It must not be read as “sold out”. Use the official booking service for the same stations, date, class and quota before changing your plans.",
        "bodyHi": "त्रुटि या खाली उत्तर का अर्थ है कि उपलब्धता की जाँच नहीं हो सकी। इसे सभी सीटें बिक जाना न मानें। योजना बदलने से पहले आधिकारिक बुकिंग सेवा पर वही स्टेशन, तारीख, श्रेणी और कोटा जाँचें।"
      }
    ]
  },
  "train-schedule": {
    "related": [
      "live-train-status",
      "trains-between-stations",
      "connection-buffer-calculator"
    ],
    "sources": [
      "ntes"
    ],
    "sections": [
      {
        "title": "Timetable and running status answer different questions",
        "titleHi": "समय-सारणी और लाइव स्थिति अलग हैं",
        "body": "The schedule shows planned stops and times. It does not establish today’s delay, cancellation or diversion. Use it to choose the boarding station and understand the route, then check live status for the actual service before departure.",
        "bodyHi": "समय-सारणी निर्धारित ठहराव और समय दिखाती है। इससे आज की देरी, रद्दीकरण या बदला रूट तय नहीं होता। बोर्डिंग स्टेशन और रूट समझने के बाद यात्रा से पहले लाइव स्थिति देखें।"
      },
      {
        "title": "Read the journey day",
        "titleHi": "यात्रा का दिन देखें",
        "body": "If departure is at 23:30 on Day 1 and your station is reached at 06:00 on Day 2, your boarding date is the next calendar day. Check the station code as well as its name, and distinguish arrival from departure at intermediate stops.",
        "bodyHi": "पहले दिन 23:30 पर चलने वाली ट्रेन दूसरे दिन 06:00 पर आपके स्टेशन पहुँचे तो आपकी बोर्डिंग तारीख अगली होगी। नाम के साथ स्टेशन कोड भी मिलाएँ और बीच के स्टेशन पर आगमन व प्रस्थान में अंतर रखें।"
      },
      {
        "title": "Allow time beyond the published halt",
        "titleHi": "दिए ठहराव से अलग तैयारी का समय रखें",
        "body": "A two-minute halt is not two minutes for entering the station and finding your coach. Reach the station before the scheduled arrival, locate the platform and monitor announcements. Verify special-train schedules and operational changes through NTES.",
        "bodyHi": "दो मिनट के ठहराव का अर्थ स्टेशन में प्रवेश और कोच खोजने के लिए दो मिनट नहीं है। निर्धारित आगमन से पहले पहुँचें, प्लेटफॉर्म खोजें और घोषणाएँ सुनें। विशेष ट्रेनों और संचालन बदलाव को NTES पर जाँचें।"
      }
    ]
  },
  "train-fare": {
    "related": [
      "seat-availability",
      "refund-calculator"
    ],
    "sources": [
      "booking"
    ],
    "sections": [
      {
        "title": "Match the fare to the journey",
        "titleHi": "किराया सही यात्रा से मिलाएँ",
        "body": "Use the same train, stations, date, class and quota you intend to book. Compare like-for-like searches: a shorter section or different quota can change the amount. A fare result says nothing about whether a seat is available.",
        "bodyHi": "जिस ट्रेन, स्टेशन, तारीख, श्रेणी और कोटा में बुक करना है वही भरें। छोटा यात्रा हिस्सा या दूसरा कोटा रकम बदल सकता है। किराया मिलने का अर्थ सीट उपलब्ध होना नहीं है।"
      },
      {
        "title": "Check the total at checkout",
        "titleHi": "भुगतान पेज पर कुल रकम देखें",
        "body": "Review the provider’s fare breakdown when supplied. Before paying, check passenger count, applicable taxes and the booking service’s additional charges. Do not multiply a displayed amount until you know whether it represents one passenger or the whole booking.",
        "bodyHi": "प्रदाता ने शुल्क विवरण दिया हो तो देखें। भुगतान से पहले यात्री संख्या, लागू कर और बुकिंग सेवा के अतिरिक्त शुल्क मिलाएँ। रकम एक यात्री की है या पूरी बुकिंग की, जाने बिना उसे गुणा न करें।"
      },
      {
        "title": "If the price differs",
        "titleHi": "रकम अलग हो तो",
        "body": "Keep both searches on the same conditions and compare which charges are included. The amount accepted by the official booking system is what matters for purchase. RailQ does not collect the ticket fare or issue a booking.",
        "bodyHi": "दोनों खोज की शर्तें समान रखकर शामिल शुल्कों की तुलना करें। खरीद के लिए आधिकारिक बुकिंग सिस्टम की अंतिम रकम मान्य है। RailQ टिकट का पैसा नहीं लेता और टिकट जारी नहीं करता।"
      }
    ]
  },
  "station-arrivals-departures": {
    "related": [
      "live-train-status",
      "platform-number",
      "train-schedule"
    ],
    "sources": [
      "ntes"
    ],
    "sections": [
      {
        "title": "Select the exact station",
        "titleHi": "सही स्टेशन चुनें",
        "body": "A city can have several railway stations. Confirm the code on your ticket or pickup plan before opening the board. Check whether the result describes an arrival or departure and whether the time is scheduled or expected.",
        "bodyHi": "एक शहर में कई स्टेशन हो सकते हैं। बोर्ड खोलने से पहले टिकट या लेने आने की योजना का स्टेशन कोड मिलाएँ। परिणाम आगमन का है या प्रस्थान का और समय निर्धारित है या अनुमानित, यह देखें।"
      },
      {
        "title": "Follow one service through the board",
        "titleHi": "सही ट्रेन की पंक्ति पहचानें",
        "body": "Use the train number rather than a similar name. For a late-night pickup, compare the service date as well as the clock time. A delayed train from the previous day may appear alongside today’s trains.",
        "bodyHi": "मिलते-जुलते नाम के बजाय ट्रेन नंबर से पहचानें। देर रात लेने जाना हो तो घड़ी के समय के साथ संचालन तारीख भी देखें। पिछले दिन की लेट ट्रेन आज की ट्रेनों के साथ दिखाई दे सकती है।"
      },
      {
        "title": "An empty board is not a closure notice",
        "titleHi": "खाली बोर्ड स्टेशन बंद होने की सूचना नहीं है",
        "body": "The provider may return only a limited time window or no usable data. Verify through NTES or station information before assuming there are no trains. Platforms may change after a result is fetched.",
        "bodyHi": "प्रदाता सीमित अवधि की जानकारी दे सकता है या डेटा उपलब्ध न हो। ट्रेन नहीं है मानने से पहले NTES या स्टेशन पर जाँचें। परिणाम आने के बाद भी प्लेटफॉर्म बदल सकता है।"
      }
    ]
  },
  "coach-position": {
    "related": [
      "coach-layout",
      "platform-number",
      "seat-berth-finder"
    ],
    "sources": [
      "ntes"
    ],
    "sections": [
      {
        "title": "Coach order is not a berth allocation",
        "titleHi": "कोच क्रम बर्थ आवंटन नहीं है",
        "body": "Match your coach label, such as B2 or S4, to the displayed sequence. The sequence helps you locate a coach along the train; it does not tell you which passenger owns a berth. Read your ticket or current PNR for that allocation.",
        "bodyHi": "B2 या S4 जैसे टिकट के कोच लेबल को दिखे क्रम से मिलाएँ। क्रम ट्रेन में कोच की जगह समझाता है, किसी यात्री की बर्थ नहीं। बर्थ के लिए टिकट या वर्तमान PNR देखें।"
      },
      {
        "title": "Confirm the direction on the platform",
        "titleHi": "प्लेटफॉर्म पर दिशा पक्की करें",
        "body": "Do not assume the left side of a diagram is the end nearest the station entrance. Check the engine direction and coach indicators. Rake changes or reversals can make an earlier diagram unsuitable for your departure.",
        "bodyHi": "चित्र का बायाँ सिरा स्टेशन प्रवेश के पास होगा, ऐसा न मानें। इंजन की दिशा और कोच संकेतक देखें। रेक बदलने या ट्रेन की दिशा पलटने से पुराना चित्र लागू नहीं हो सकता।"
      },
      {
        "title": "If your coach is missing",
        "titleHi": "आपका कोच न दिखे तो",
        "body": "Recheck the train and service date, then ask railway staff or use the station’s coach guidance display. Avoid running along a platform based only on a third-party diagram. Allow extra walking time for children, luggage or limited mobility.",
        "bodyHi": "ट्रेन और संचालन तारीख दोबारा मिलाएँ, फिर रेलवे कर्मचारी या स्टेशन के कोच डिस्प्ले से पूछें। केवल बाहरी वेबसाइट के चित्र पर प्लेटफॉर्म पर दौड़ें नहीं। बच्चों, सामान या चलने में कठिनाई के लिए अतिरिक्त समय रखें।"
      }
    ]
  },
  "platform-number": {
    "related": [
      "station-arrivals-departures",
      "coach-position",
      "live-train-status"
    ],
    "sources": [
      "ntes"
    ],
    "sections": [
      {
        "title": "Check the station and service date",
        "titleHi": "स्टेशन और संचालन तारीख जाँचें",
        "body": "Platform information belongs to a particular station and train run. Confirm both before using the number. A platform at the origin does not describe the platform at your intermediate boarding station.",
        "bodyHi": "प्लेटफॉर्म सूचना एक खास स्टेशन और ट्रेन यात्रा की होती है। नंबर इस्तेमाल करने से पहले दोनों जाँचें। शुरुआती स्टेशन का प्लेटफॉर्म आपके बीच के बोर्डिंग स्टेशन का प्लेटफॉर्म नहीं है।"
      },
      {
        "title": "Treat the number as provisional",
        "titleHi": "नंबर को बदल सकने वाली सूचना मानें",
        "body": "A displayed platform is planning information and may change for operational reasons. On arrival, read the station display and listen for announcements. Check the train number; two services can have similar names.",
        "bodyHi": "दिखा प्लेटफॉर्म योजना में मदद करता है लेकिन संचालन के कारण बदल सकता है। पहुँचकर स्टेशन डिस्प्ले और घोषणा देखें। ट्रेन नंबर मिलाएँ; दो ट्रेनों के नाम एक जैसे हो सकते हैं।"
      },
      {
        "title": "Missing does not mean unassigned",
        "titleHi": "जानकारी न मिलने से आवंटन का पता नहीं चलता",
        "body": "If RailQ has no platform result, the provider may simply lack the information. Ask at the station or use official enquiry. Never cross railway tracks to reach a different platform; use the designated bridge, subway or accessible route.",
        "bodyHi": "RailQ पर प्लेटफॉर्म न मिले तो प्रदाता के पास जानकारी न होना संभव है। स्टेशन या आधिकारिक पूछताछ से पता करें। दूसरे प्लेटफॉर्म के लिए पटरी पार न करें; निर्धारित पुल, सबवे या सुगम रास्ता लें।"
      }
    ]
  },
  "pnr-status": {
    "related": [
      "guides/pnr-status-explained",
      "guides/pnr-and-waiting-lists",
      "status-code-decoder"
    ],
    "sources": [
      "pnr",
      "waiting"
    ],
    "sections": [
      {
        "title": "Example: a waiting position is not a berth",
        "titleHi": "उदाहरण: वेटलिस्ट संख्या बर्थ नहीं है",
        "body": "In an illustrative result, booking WL/9 and current WL/7 mean the passenger moved forward in the waiting list. Neither 9 nor 7 should be shown as an allocated berth. Read each passenger’s current status separately, even when everyone shares one PNR.",
        "bodyHi": "उदाहरण में बुकिंग WL/9 और वर्तमान WL/7 का अर्थ प्रतीक्षा क्रम आगे बढ़ना है। 9 या 7 को आवंटित बर्थ नहीं दिखाना चाहिए। एक PNR होने पर भी हर यात्री की वर्तमान स्थिति अलग देखें।"
      },
      {
        "title": "When only part of the result appears",
        "titleHi": "परिणाम का कुछ हिस्सा ही मिले तो",
        "body": "A train name without passenger status is an incomplete response. Do not assume confirmation from the presence of train details. Check the official enquiry, and report missing fields using the page name and error description without posting your full ticket.",
        "bodyHi": "केवल ट्रेन का नाम और यात्री स्थिति न मिलना अधूरा परिणाम है। ट्रेन विवरण मिलने से कन्फर्मेशन न मानें। आधिकारिक जाँच करें और पूरा टिकट भेजे बिना पेज के नाम व त्रुटि से समस्या बताएँ।"
      }
    ]
  },
  "booking-date-calculator": {
    "related": [
      "guides/booking-and-advance-reservation",
      "booking-reminders",
      "seat-availability"
    ],
    "sources": [
      "arp"
    ],
    "sections": [
      {
        "title": "Use the train’s origin date",
        "titleHi": "ट्रेन की शुरुआती तारीख इस्तेमाल करें",
        "body": "Start with the date the train leaves its first station. If it starts on Monday and you board after midnight on Tuesday, those are different dates. The calculator subtracts the reservation window from the entered date; it cannot infer the train’s origin from your boarding station.",
        "bodyHi": "ट्रेन के पहले स्टेशन से चलने की तारीख लें। सोमवार को शुरू होकर मंगलवार आधी रात बाद आपकी बोर्डिंग हो तो तारीखें अलग हैं। कैलकुलेटर भरी तारीख से आरक्षण अवधि घटाता है; बोर्डिंग स्टेशन से शुरुआती तारीख खुद नहीं जानता।"
      },
      {
        "title": "Understand the 60-day assumption",
        "titleHi": "60 दिन की धारणा समझें",
        "body": "The general advance reservation period was reduced to 60 days, excluding the journey date, from 1 November 2024. Some services have shorter windows. Confirm the opening offered for your selected service rather than treating one calculation as a rule for every train.",
        "bodyHi": "1 नवंबर 2024 से सामान्य अग्रिम आरक्षण अवधि यात्रा का दिन छोड़कर 60 दिन की गई थी। कुछ सेवाओं की अवधि कम है। एक गणना सभी ट्रेनों पर लागू मानने के बजाय चुनी सेवा का उपलब्ध बुकिंग समय जाँचें।"
      },
      {
        "title": "Prepare the booking before the reminder",
        "titleHi": "रिमाइंडर से पहले बुकिंग की तैयारी करें",
        "body": "Write down two suitable trains, acceptable classes and exact station codes. An opening date does not guarantee availability. After booking, keep the official confirmation; a calendar event or calculator result is not a reservation.",
        "bodyHi": "दो उपयुक्त ट्रेनें, स्वीकार्य श्रेणियाँ और सही स्टेशन कोड लिखें। बुकिंग खुलने की तारीख सीट की गारंटी नहीं है। बुकिंग के बाद आधिकारिक पुष्टि रखें; कैलेंडर इवेंट या गणना आरक्षण नहीं है।"
      }
    ]
  },
  "tatkal-time-calculator": {
    "related": [
      "guides/tatkal",
      "booking-reminders",
      "seat-availability"
    ],
    "sources": [
      "tatkal",
      "tatkalIdentity"
    ],
    "sections": [
      {
        "title": "Calculate from the origin date and class",
        "titleHi": "शुरुआती तारीख और श्रेणी से गणना करें",
        "body": "Tatkal planning uses the train’s originating date, not necessarily your boarding date. The calculator applies the usual previous-day opening at 10:00 for AC and 11:00 for non-AC classes, in Indian Standard Time. Confirm that Tatkal is offered for the selected train and class.",
        "bodyHi": "तत्काल योजना ट्रेन की शुरुआती तारीख से होती है, जरूरी नहीं कि वही आपकी बोर्डिंग तारीख हो। कैलकुलेटर पिछले दिन AC के लिए 10:00 और नॉन-AC के लिए 11:00 भारतीय समय का सामान्य नियम लगाता है। चुनी ट्रेन और श्रेणी में तत्काल उपलब्ध है या नहीं, जाँचें।"
      },
      {
        "title": "Do account checks in advance",
        "titleHi": "खाते की जाँच पहले करें",
        "body": "Use your own official IRCTC account and follow its current Aadhaar and OTP requirements. Resolve account or mobile-access problems before booking time. RailQ does not authenticate an IRCTC account and should never receive your OTP.",
        "bodyHi": "अपना आधिकारिक IRCTC खाता इस्तेमाल करके उसकी मौजूदा आधार और OTP प्रक्रिया पूरी करें। बुकिंग समय से पहले खाते या मोबाइल की समस्या ठीक करें। RailQ IRCTC खाता सत्यापित नहीं करता और उसे OTP नहीं देना चाहिए।"
      },
      {
        "title": "A reminder cannot buy a ticket",
        "titleHi": "रिमाइंडर टिकट नहीं खरीदता",
        "body": "Keep the chosen train, class and a usable alternative ready. The tool does not hold inventory or submit payment. If a payment attempt is uncertain, inspect official booking history before paying again.",
        "bodyHi": "चुनी ट्रेन, श्रेणी और उपयोग योग्य विकल्प तैयार रखें। टूल सीट नहीं रोकता और भुगतान नहीं करता। भुगतान की स्थिति स्पष्ट न हो तो दोबारा भुगतान से पहले आधिकारिक बुकिंग इतिहास देखें।"
      }
    ]
  },
  "chart-preparation-calculator": {
    "related": [
      "guides/chart-preparation",
      "pnr-status",
      "cancellation-deadline-calculator"
    ],
    "sources": [
      "chart"
    ],
    "sections": [
      {
        "title": "Use the relevant charting departure",
        "titleHi": "लागू चार्टिंग प्रस्थान समय लें",
        "body": "The input is a planning reference, not a live chart feed. The origin or previous charting station may control your booking. Entering an intermediate boarding time without checking the charting location can give a misleading estimate.",
        "bodyHi": "इनपुट योजना का आधार है, लाइव चार्ट सूचना नहीं। आपकी बुकिंग पर शुरुआती या पिछले चार्टिंग स्टेशन का समय लागू हो सकता है। चार्टिंग स्थान जाने बिना बीच के बोर्डिंग समय से गलत अनुमान मिल सकता है।"
      },
      {
        "title": "Do not confuse a countdown with chart status",
        "titleHi": "काउंटडाउन को चार्ट स्थिति न समझें",
        "body": "When the estimated time passes, check your PNR’s chart field. Do not assume chart preparation has finished or infer a confirmed berth. The first chart and final chart are different events.",
        "bodyHi": "अनुमानित समय बीतने पर PNR का चार्ट फ़ील्ड देखें। चार्ट बन गया या बर्थ कन्फर्म है, ऐसा अनुमान न लगाएँ। पहला और अंतिम चार्ट अलग चरण हैं।"
      },
      {
        "title": "Plan your decision before leaving home",
        "titleHi": "घर से निकलने से पहले निर्णय की योजना बनाएँ",
        "body": "Set a private check before travelling to the station and another before boarding. Keep cancellation decisions separate: their deadlines and applicable claim process should be checked through the booking service.",
        "bodyHi": "स्टेशन जाने से पहले और बोर्डिंग से पहले निजी जाँच रखें। रद्दीकरण का निर्णय अलग है: उसकी समय-सीमा और लागू दावा प्रक्रिया बुकिंग सेवा से जाँचें।"
      }
    ]
  },
  "booking-reminders": {
    "related": [
      "booking-date-calculator",
      "tatkal-time-calculator",
      "alerts"
    ],
    "sources": [
      "arp",
      "tatkal"
    ],
    "sections": [
      {
        "title": "A calendar download needs one more step",
        "titleHi": "कैलेंडर डाउनलोड के बाद एक और कदम है",
        "body": "Choose general booking or the correct Tatkal class group, calculate the opening, then import the downloaded file into your calendar. Downloading a file alone does not enable a notification. Check the event date, time and alert setting after import.",
        "bodyHi": "सामान्य बुकिंग या सही तत्काल श्रेणी चुनकर समय निकालें और डाउनलोड की फ़ाइल कैलेंडर में जोड़ें। केवल डाउनलोड से सूचना चालू नहीं होती। जोड़ने के बाद तारीख, समय और अलर्ट सेटिंग जाँचें।"
      },
      {
        "title": "Check the time zone",
        "titleHi": "समय-क्षेत्र जाँचें",
        "body": "Railway booking times use Indian Standard Time. If you are travelling or your device uses another time zone, verify how your calendar displays the event. A reminder should give you time to sign in and check your chosen service.",
        "bodyHi": "रेलवे बुकिंग भारतीय समय पर होती है। यात्रा में या दूसरे समय-क्षेत्र वाले डिवाइस पर देखें कि कैलेंडर इवेंट का समय कैसे दिखा रहा है। रिमाइंडर में लॉगिन और चुनी सेवा जाँचने का समय रखें।"
      },
      {
        "title": "This does not monitor your PNR",
        "titleHi": "यह PNR की निगरानी नहीं करता",
        "body": "Calendar reminders are one-off events stored in your chosen calendar. They do not check changes to a booking, guarantee a notification delivery or reserve a ticket. PNR email monitoring remains unavailable.",
        "bodyHi": "कैलेंडर रिमाइंडर चुने कैलेंडर में एक बार के इवेंट हैं। वे बुकिंग बदलाव नहीं जाँचते, सूचना मिलने की गारंटी नहीं देते और टिकट आरक्षित नहीं करते। PNR ईमेल निगरानी अभी उपलब्ध नहीं है।"
      }
    ]
  },
  "cancellation-deadline-calculator": {
    "related": [
      "refund-calculator",
      "guides/cancellation-and-refunds"
    ],
    "sources": [
      "refund"
    ],
    "sections": [
      {
        "title": "Use scheduled departure, not a live delay",
        "titleHi": "लाइव देरी नहीं, निर्धारित प्रस्थान लें",
        "body": "Enter the relevant scheduled departure and choose the actual passenger status. This tool marks time windows; it does not establish eligibility for every reason for cancellation. A delayed train should not automatically be entered as a later scheduled departure.",
        "bodyHi": "लागू निर्धारित प्रस्थान और वास्तविक यात्री स्थिति भरें। टूल समय-सीमाएँ दिखाता है, हर कारण की रिफंड पात्रता नहीं। ट्रेन लेट होने पर देरी वाला समय निर्धारित प्रस्थान की जगह अपने आप न डालें।"
      },
      {
        "title": "A deadline is not a refund promise",
        "titleHi": "समय-सीमा रिफंड की गारंटी नहीं है",
        "body": "Ticket type, charting and the claim reason matter. In a mixed family booking, one passenger’s confirmed status does not describe everyone. Open the official booking and check the permitted cancellation or TDR action before the applicable cutoff.",
        "bodyHi": "टिकट प्रकार, चार्ट और दावे का कारण महत्वपूर्ण हैं। परिवार की मिश्रित बुकिंग में एक यात्री का कन्फर्म स्टेटस सभी का नहीं होता। लागू समय से पहले आधिकारिक बुकिंग में रद्दीकरण या TDR विकल्प देखें।"
      },
      {
        "title": "Keep proof of the action",
        "titleHi": "कार्रवाई का प्रमाण रखें",
        "body": "Save the cancellation or claim acknowledgement and submission time privately. Setting a reminder or calculating a cutoff does not submit a cancellation. Leave enough time to complete the official process rather than starting at the boundary.",
        "bodyHi": "रद्दीकरण या दावा जमा होने की पुष्टि और समय निजी रखें। रिमाइंडर या समय गणना से टिकट रद्द नहीं होता। अंतिम क्षण पर शुरू करने के बजाय आधिकारिक प्रक्रिया पूरी करने का समय रखें।"
      }
    ]
  },
  "refund-calculator": {
    "related": [
      "cancellation-deadline-calculator",
      "guides/cancellation-and-refunds"
    ],
    "sources": [
      "refund"
    ],
    "sections": [
      {
        "title": "Enter the total fare for the selected passengers",
        "titleHi": "चुने यात्रियों का कुल किराया भरें",
        "body": "Use the combined ticket fare for the passengers being estimated, not a per-person amount multiplied again. Select their class, status and normal or Tatkal ticket type. If passengers have different statuses, calculate comparable groups separately and confirm the booking’s actual treatment.",
        "bodyHi": "जिन यात्रियों का अनुमान चाहिए उनका मिला टिकट किराया भरें; प्रति व्यक्ति रकम दोबारा गुणा न करें। श्रेणी, स्थिति और सामान्य या तत्काल चुनें। अलग स्थिति वाले यात्रियों के समान समूह अलग गणना करें और बुकिंग का वास्तविक नियम जाँचें।"
      },
      {
        "title": "Worked example: compare the same fare basis",
        "titleHi": "उदाहरण: एक जैसे किराया आधार की तुलना",
        "body": "Suppose the entered total is ₹2,000 and the applicable deduction is ₹500. The arithmetic estimate is ₹1,500. This illustrates subtraction only, not a railway refund entitlement. Taxes, non-refundable service charges and exceptional claims can make the settled amount different.",
        "bodyHi": "मान लें कुल किराया ₹2,000 और लागू कटौती ₹500 है। गणना ₹1,500 देती है। यह केवल घटाने का उदाहरण है, रेलवे रिफंड पात्रता नहीं। कर, वापस न मिलने वाले सेवा शुल्क और असाधारण दावे से अंतिम रकम अलग हो सकती है।"
      },
      {
        "title": "Complete the official cancellation separately",
        "titleHi": "आधिकारिक रद्दीकरण अलग से करें",
        "body": "The tool neither cancels a ticket nor files a TDR. Check the action available in your booking account, including the chart status. Keep its acknowledgement and follow the refund there; RailQ cannot approve or accelerate payment.",
        "bodyHi": "टूल टिकट रद्द या TDR जमा नहीं करता। बुकिंग खाते में चार्ट स्थिति सहित उपलब्ध कार्रवाई देखें। उसकी पुष्टि रखें और वहीं रिफंड देखें; RailQ भुगतान स्वीकृत या जल्दी नहीं कर सकता।"
      }
    ]
  },
  "seat-berth-finder": {
    "related": [
      "coach-layout",
      "coach-position",
      "guides/train-classes-and-coaches"
    ],
    "sources": [
      "pnr"
    ],
    "sections": [
      {
        "title": "Use an allocated seat, not a waiting number",
        "titleHi": "आवंटित सीट भरें, वेटलिस्ट संख्या नहीं",
        "body": "Copy the berth or seat number from the allocation on your ticket or current PNR. Do not enter a waiting position such as WL/12 as seat 12. Choose the correct coach type; a number alone cannot describe every coach design.",
        "bodyHi": "टिकट या वर्तमान PNR के आवंटन से सीट या बर्थ नंबर लें। WL/12 को सीट 12 न भरें। सही कोच प्रकार चुनें; एक नंबर सभी कोच डिज़ाइन पर लागू नहीं है।"
      },
      {
        "title": "Read this as a representative pattern",
        "titleHi": "इसे उदाहरण नंबरिंग मानें",
        "body": "The finder uses repeating patterns for common coach types. Actual coach variants, seating arrangements and first-class cabin allocations can differ. Confirm the printed berth label and coach diagram before relying on a window, lower or side berth result.",
        "bodyHi": "फ़ाइंडर सामान्य कोच की दोहराई नंबरिंग लगाता है। वास्तविक कोच, बैठने की व्यवस्था और प्रथम श्रेणी के केबिन अलग हो सकते हैं। विंडो, लोअर या साइड बर्थ मानने से पहले छपा लेबल और कोच चित्र देखें।"
      },
      {
        "title": "The result does not change your booking",
        "titleHi": "परिणाम बुकिंग नहीं बदलता",
        "body": "A preferred berth request is different from an assigned berth. If mobility makes a particular allocation difficult, speak to railway staff about the actual situation. Do not occupy another passenger’s berth based on this calculation.",
        "bodyHi": "बर्थ की पसंद और मिला आवंटन अलग हैं। चलने में कठिनाई के कारण बर्थ उपयुक्त न हो तो रेलवे कर्मचारी से वास्तविक स्थिति बताएँ। इस गणना के आधार पर दूसरे यात्री की बर्थ न लें।"
      }
    ]
  },
  "coach-layout": {
    "related": [
      "seat-berth-finder",
      "coach-position",
      "guides/train-classes-and-coaches"
    ],
    "sources": [
      "pnr"
    ],
    "sections": [
      {
        "title": "A layout explains the inside of a coach",
        "titleHi": "लेआउट कोच का अंदरूनी हिस्सा समझाता है",
        "body": "Use the diagram to understand a representative bay, aisle and berth arrangement. It is not a live view of your coach. Coach position describes where the vehicle sits along the train; this layout describes the accommodation inside it.",
        "bodyHi": "चित्र से सामान्य खंड, गलियारा और बर्थ व्यवस्था समझें। यह आपके कोच का लाइव दृश्य नहीं। कोच स्थिति ट्रेन में वाहन की जगह बताती है; लेआउट उसके अंदर की व्यवस्था है।"
      },
      {
        "title": "Match the class before the seat number",
        "titleHi": "सीट नंबर से पहले श्रेणी मिलाएँ",
        "body": "A sleeper berth diagram should not be used to infer a chair-car window seat. Check the class on your ticket and any berth label already assigned. Variants of the same broad class can have different numbering and capacity.",
        "bodyHi": "स्लीपर बर्थ के चित्र से चेयर कार की विंडो सीट तय न करें। टिकट की श्रेणी और आवंटित बर्थ लेबल देखें। एक ही सामान्य श्रेणी के अलग कोच में नंबरिंग और क्षमता बदल सकती है।"
      },
      {
        "title": "Plan for movement and luggage",
        "titleHi": "चलने और सामान की योजना बनाएँ",
        "body": "Keep the aisle and access to doors clear. Plan where essential items will remain reachable without disturbing other passengers. If you need an accessible arrangement, verify the actual coach and available assistance before travel.",
        "bodyHi": "गलियारा और दरवाज़े तक रास्ता खाली रखें। जरूरी सामान ऐसी जगह रखें कि दूसरों को परेशान किए बिना मिले। सुगम व्यवस्था चाहिए तो यात्रा से पहले वास्तविक कोच और उपलब्ध सहायता जाँचें।"
      }
    ]
  },
  "status-code-decoder": {
    "related": [
      "pnr-status",
      "guides/pnr-and-waiting-lists",
      "coach-layout"
    ],
    "sources": [
      "pnr"
    ],
    "sections": [
      {
        "title": "Enter the status label",
        "titleHi": "स्थिति का लेबल डालें",
        "body": "Use the letters shown in the result, such as CNF, RAC or GNWL. If the ticket says GNWL/18, select GNWL here; keep the number for comparing your own booking and current positions. The decoder explains a label, not the probability of confirmation.",
        "bodyHi": "CNF, RAC या GNWL जैसे अक्षर डालें। GNWL/18 लिखा हो तो यहाँ GNWL चुनें; संख्या अपनी बुकिंग और वर्तमान स्थिति की तुलना के लिए रखें। डिकोडर अर्थ बताता है, कन्फर्म होने की संभावना नहीं।"
      },
      {
        "title": "Separate status, class and coach",
        "titleHi": "स्थिति, श्रेणी और कोच अलग रखें",
        "body": "CNF is a reservation status; 3A is a travel class; B2 can be a coach label. They answer different questions. Read the passenger row as a whole instead of treating every short code as a waiting-list category.",
        "bodyHi": "CNF आरक्षण स्थिति है; 3A यात्रा श्रेणी है; B2 कोच लेबल हो सकता है। तीनों अलग जानकारी देते हैं। हर छोटे कोड को वेटलिस्ट मानने के बजाय पूरी यात्री पंक्ति पढ़ें।"
      },
      {
        "title": "When a code is not supported",
        "titleHi": "कोड न मिले तो",
        "body": "Use the official enquiry legend or ask the booking service. Do not shorten an unfamiliar code until it resembles a known one. To report a missing explanation, send the code and page name without your PNR or passenger details.",
        "bodyHi": "आधिकारिक पूछताछ की कोड सूची या बुकिंग सेवा से पूछें। अनजान कोड को काटकर परिचित कोड जैसा न बनाएँ। अर्थ जोड़ने का अनुरोध करते समय कोड और पेज नाम भेजें, PNR या यात्री विवरण नहीं।"
      }
    ]
  },
  "waitlist-guide": {
    "related": [
      "guides/pnr-and-waiting-lists",
      "pnr-status",
      "vikalp-eligibility"
    ],
    "sources": [
      "waiting"
    ],
    "sections": [
      {
        "title": "Compare the same passenger over time",
        "titleHi": "समय के साथ उसी यात्री की तुलना करें",
        "body": "Record the booking label and the current label for each passenger. A movement from WL/15 to WL/8 shows a change in position, not a guaranteed final outcome. Different quotas are not one shared queue, so a smaller number in another category is not a reliable comparison.",
        "bodyHi": "हर यात्री का बुकिंग और वर्तमान लेबल देखें। WL/15 से WL/8 होने का अर्थ क्रम बदलना है, अंतिम कन्फर्मेशन की गारंटी नहीं। अलग कोटा एक कतार नहीं हैं; दूसरी श्रेणी की छोटी संख्या सीधी तुलना नहीं है।"
      },
      {
        "title": "Check the complete ticket after charting",
        "titleHi": "चार्ट के बाद पूरा टिकट देखें",
        "body": "For an e-ticket on which all passengers remain waitlisted after charting, IRCTC’s published rule does not permit boarding. Mixed-status bookings need separate consideration. Do not infer travel authority from a colour, prediction or an old screenshot.",
        "bodyHi": "ई-टिकट में सभी यात्री चार्ट के बाद भी वेटलिस्ट हों तो IRCTC का प्रकाशित नियम बोर्डिंग की अनुमति नहीं देता। मिश्रित स्थिति वाली बुकिंग अलग देखें। रंग, भविष्यवाणी या पुराने स्क्रीनशॉट से यात्रा अनुमति न मानें।"
      },
      {
        "title": "Keep a usable fallback",
        "titleHi": "काम आने वाला विकल्प रखें",
        "body": "Compare another departure, class or station before the day becomes time-critical. Include the cost and time of reaching a different station. If a later journey would miss your appointment, choose the alternative based on that deadline rather than a hoped-for upgrade.",
        "bodyHi": "समय कम पड़ने से पहले दूसरी ट्रेन, श्रेणी या स्टेशन देखें। दूसरे स्टेशन का खर्च और समय जोड़ें। बाद की यात्रा से जरूरी काम छूटे तो उम्मीद के कन्फर्मेशन के बजाय पहुँचने की सीमा के आधार पर विकल्प चुनें।"
      }
    ]
  },
  "vikalp-eligibility": {
    "related": [
      "guides/vikalp-and-alternate-routes",
      "trains-between-stations",
      "pnr-status"
    ],
    "sources": [
      "vikalp"
    ],
    "sections": [
      {
        "title": "This is a planning check",
        "titleHi": "यह योजना की जाँच है",
        "body": "The assistant uses the answers you provide; it cannot inspect your booking or enrol you in VIKALP. Open your official booking history to see whether the option is offered and which alternate trains you can select.",
        "bodyHi": "सहायक आपके जवाब इस्तेमाल करता है; बुकिंग देख या VIKALP में नाम दर्ज नहीं कर सकता। विकल्प और वैकल्पिक ट्रेनें देखने के लिए आधिकारिक बुकिंग इतिहास खोलें।"
      },
      {
        "title": "An option is not an allocation",
        "titleHi": "विकल्प चुनना आवंटन नहीं है",
        "body": "IRCTC states that choosing VIKALP does not guarantee accommodation. If an alternate is allotted, recheck its boarding station, departure, destination and final PNR. Nearby cluster stations may differ from your original journey.",
        "bodyHi": "IRCTC के अनुसार VIKALP चुनने से जगह की गारंटी नहीं है। विकल्प आवंटित हो तो बोर्डिंग स्टेशन, प्रस्थान, गंतव्य और अंतिम PNR फिर देखें। पास के समूह स्टेशन मूल यात्रा से अलग हो सकते हैं।"
      },
      {
        "title": "Compare the door-to-door journey",
        "titleHi": "घर से मंज़िल तक पूरी यात्रा देखें",
        "body": "A later train from another station can require different transport and accommodation. Before selecting alternatives, decide which departures you could actually use. Follow the official terms for cancellation after an alternate allocation.",
        "bodyHi": "दूसरे स्टेशन की बाद की ट्रेन से परिवहन और ठहरने की जरूरत बदल सकती है। विकल्प चुनने से पहले तय करें कि किन ट्रेनों में सच में जा सकते हैं। वैकल्पिक आवंटन के बाद रद्दीकरण के आधिकारिक नियम देखें।"
      }
    ]
  },
  "connection-buffer-calculator": {
    "related": [
      "train-schedule",
      "live-train-status",
      "guides/vikalp-and-alternate-routes"
    ],
    "sources": [
      "ntes"
    ],
    "sections": [
      {
        "title": "Enter both dates, not only times",
        "titleHi": "दोनों तारीखें भी भरें",
        "body": "A connection from 23:30 arrival to 01:00 departure crosses midnight. Enter the next date for the second train. If stations differ, include the road transfer and the time needed to enter the second station and reach its platform.",
        "bodyHi": "23:30 आगमन से 01:00 प्रस्थान का कनेक्शन आधी रात पार करता है। दूसरी ट्रेन के लिए अगली तारीख भरें। स्टेशन अलग हों तो सड़क यात्रा, दूसरे स्टेशन में प्रवेश और प्लेटफॉर्म तक पहुँचने का समय जोड़ें।"
      },
      {
        "title": "Work through a realistic example",
        "titleHi": "व्यावहारिक उदाहरण से समझें",
        "body": "An arrival at 14:00 and departure at 16:00 leave 120 minutes on the timetable. If exiting, transferring and reaching the platform take 70 minutes, only 50 minutes remain for delay and other disruption. Those times are an example, not a recommended minimum for every station.",
        "bodyHi": "14:00 आगमन और 16:00 प्रस्थान में समय-सारणी के अनुसार 120 मिनट हैं। बाहर निकलने, ट्रांसफर और प्लेटफॉर्म तक 70 मिनट लगें तो देरी के लिए 50 मिनट बचते हैं। ये उदाहरण के समय हैं, हर स्टेशन की न्यूनतम सिफारिश नहीं।"
      },
      {
        "title": "A positive result is not a protected connection",
        "titleHi": "अच्छा परिणाम सुरक्षित कनेक्शन की गारंटी नहीं",
        "body": "The calculation cannot predict delays or promise a replacement if you miss a separately booked train. Consider luggage, mobility, crowding and the cost of a missed connection. Recheck live status before making the transfer. The current calculator compares the remaining gap with a planning threshold of 90 minutes at the same station or 180 minutes when changing stations. These are RailQ heuristics, not railway minimum connection rules.",
        "bodyHi": "गणना देरी नहीं बता सकती और अलग बुक ट्रेन छूटने पर नया टिकट देने का वादा नहीं करती। सामान, चलने की क्षमता, भीड़ और ट्रेन छूटने की लागत देखें। ट्रांसफर से पहले लाइव स्थिति फिर जाँचें। अभी कैलकुलेटर एक स्टेशन पर 90 मिनट और स्टेशन बदलने पर 180 मिनट के योजना आधार से बचे समय की तुलना करता है। ये RailQ के अनुमान हैं, रेलवे की न्यूनतम कनेक्शन शर्त नहीं।"
      }
    ]
  },
  "luggage-allowance": {
    "related": [
      "guides/family-and-senior-citizen-travel",
      "guides/station-and-onboard-travel"
    ],
    "sources": [
      "luggage"
    ],
    "sections": [
      {
        "title": "Choose the ticketed class",
        "titleHi": "टिकट वाली श्रेणी चुनें",
        "body": "Select the travel class and enter adults separately from children aged 5 to under 12. The calculator uses the class allowance for each adult and half that allowance for each child in this age group. Mixed classes and unusual items need separate checking; the estimate is not permission to carry every bag in the compartment.",
        "bodyHi": "यात्रा श्रेणी चुनें और वयस्क व 5 से 12 वर्ष से कम बच्चे अलग भरें। कैलकुलेटर प्रति वयस्क श्रेणी सीमा और इस आयु के प्रति बच्चे उसकी आधी सीमा लगाता है। अलग श्रेणियाँ व असामान्य सामान अलग जाँचें; अनुमान हर बैग डिब्बे में ले जाने की अनुमति नहीं है।"
      },
      {
        "title": "Weight is only one check",
        "titleHi": "केवल वजन ही शर्त नहीं है",
        "body": "Weigh bags before travel and consider their dimensions and contents. Being under a weight allowance does not make a prohibited or oversized item acceptable. Keep access routes clear and ask the railway luggage office about items needing booking.",
        "bodyHi": "यात्रा से पहले बैग तौलें और आकार व सामग्री देखें। कम वजन होने से प्रतिबंधित या बहुत बड़ा सामान स्वीकार्य नहीं हो जाता। रास्ते खाली रखें और बुकिंग वाले सामान के लिए रेलवे सामान कार्यालय से पूछें।"
      },
      {
        "title": "If you exceed the allowance",
        "titleHi": "सीमा से अधिक सामान हो तो",
        "body": "Check the official luggage rules and booking process before arriving at the platform. Do not treat the calculator’s total as a permission slip or an excess-luggage price quote. Keep any luggage booking receipt with your travel documents.",
        "bodyHi": "प्लेटफॉर्म पहुँचने से पहले आधिकारिक नियम और सामान बुकिंग प्रक्रिया जाँचें। कैलकुलेटर की संख्या अनुमति पत्र या अतिरिक्त सामान का शुल्क नहीं है। सामान बुकिंग रसीद यात्रा कागज़ों के साथ रखें।"
      }
    ]
  },
  "pnr-alerts": {
    "related": [
      "booking-reminders",
      "pnr-status",
      "alerts"
    ],
    "sources": [
      "pnr"
    ],
    "sections": [
      {
        "title": "PNR email alerts are not active",
        "titleHi": "PNR ईमेल अलर्ट चालू नहीं हैं",
        "body": "RailQ is not accepting new PNR-monitoring subscriptions. This page does not run background checks or promise a status-change email. Use a manual PNR enquiry for your journey and set your own reminder to check again.",
        "bodyHi": "RailQ नए PNR निगरानी अनुरोध नहीं ले रहा है। यह पेज पीछे से जाँच नहीं करता और बदलाव का ईमेल देने का वादा नहीं करता। यात्रा के लिए स्वयं PNR जाँचें और अगली जाँच का निजी रिमाइंडर रखें।"
      },
      {
        "title": "What you can use now",
        "titleHi": "अभी क्या इस्तेमाल कर सकते हैं",
        "body": "Booking reminders create a calendar event for a booking opening. They are different from live PNR monitoring. Do not submit your ticket details through the contact form to request an alert.",
        "bodyHi": "बुकिंग रिमाइंडर बुकिंग खुलने का कैलेंडर इवेंट बनाते हैं। यह लाइव PNR निगरानी से अलग है। अलर्ट माँगने के लिए संपर्क फॉर्म में टिकट विवरण न भेजें।"
      }
    ]
  },
  "contact": {
    "related": [
      "corrections",
      "methodology",
      "official-services"
    ],
    "sources": [],
    "sections": [
      {
        "title": "Report a website problem",
        "titleHi": "वेबसाइट की समस्या बताएँ",
        "body": "Include the page address, the button you used, the visible error and whether you used a phone or computer. For a translation error, paste the sentence and your suggested wording. Hide the PNR, names and ticket QR code in any screenshot.",
        "bodyHi": "पेज का पता, इस्तेमाल बटन, दिखी त्रुटि और फोन या कंप्यूटर बताएँ। अनुवाद गलती में वाक्य और सुझाया सुधार लिखें। स्क्रीनशॉट में PNR, नाम और टिकट QR कोड छिपाएँ।"
      },
      {
        "title": "Ticket actions belong with the booking service",
        "titleHi": "टिकट की कार्रवाई बुकिंग सेवा से करें",
        "body": "RailQ cannot cancel a booking, approve a refund or allocate a berth. Use your official booking service for those actions and railway assistance for an onboard problem. This form is for RailQ feedback; it is not an urgent railway helpdesk.",
        "bodyHi": "RailQ बुकिंग रद्द, रिफंड मंजूर या बर्थ आवंटित नहीं कर सकता। इन कामों के लिए आधिकारिक बुकिंग सेवा और ट्रेन में समस्या के लिए रेलवे सहायता लें। यह फॉर्म RailQ प्रतिक्रिया का है, तत्काल रेलवे सहायता केंद्र नहीं।"
      }
    ]
  },
  "corrections": {
    "related": [
      "contact",
      "methodology",
      "railway-updates"
    ],
    "sources": [],
    "sections": [
      {
        "title": "Make the correction easy to reproduce",
        "titleHi": "सुधार को दोबारा जाँचने योग्य बनाएँ",
        "body": "A useful report contains the exact page, the inaccurate sentence or result field, what you expected and an official source where relevant. For calculator problems, use made-up inputs that reproduce the issue. Avoid sending a real passenger record.",
        "bodyHi": "उपयोगी रिपोर्ट में सही पेज, गलत वाक्य या परिणाम फ़ील्ड, अपेक्षित जानकारी और लागू आधिकारिक स्रोत होता है। कैलकुलेटर में समस्या दोहराने वाले काल्पनिक इनपुट दें। असली यात्री रिकॉर्ड न भेजें।"
      },
      {
        "title": "Separate a rule change from stale live data",
        "titleHi": "नियम बदलाव और पुरानी लाइव सूचना अलग करें",
        "body": "A new railway circular, an untranslated label and a provider outage require different fixes. Tell us which you observed. Include a notice’s effective date as well as its publication date; they need not be the same.",
        "bodyHi": "नया रेलवे परिपत्र, अनुवाद का छूटा लेबल और प्रदाता बंद होना अलग सुधार माँगते हैं। बताएं कौन-सी समस्या दिखी। सूचना की प्रकाशन और लागू तारीख दोनों दें; वे अलग हो सकती हैं।"
      }
    ]
  },
  "methodology": {
    "related": [
      "official-services",
      "corrections",
      "guides/pnr-status-explained"
    ],
    "sources": [],
    "sections": [
      {
        "title": "How to read missing or old data",
        "titleHi": "खाली या पुराना डेटा कैसे पढ़ें",
        "body": "An unavailable field means the response did not provide usable information. It does not mean “no seats”, “on time” or “confirmed”. Compare the fetched or update time when present. A schedule is planned information; it should not be presented as a live movement report.",
        "bodyHi": "अनुपलब्ध फ़ील्ड का अर्थ उपयोगी सूचना न मिलना है। इसका अर्थ सीट नहीं, समय पर या कन्फर्म नहीं है। उपलब्ध हो तो परिणाम या अपडेट समय देखें। समय-सारणी योजना है, लाइव संचालन रिपोर्ट नहीं।"
      },
      {
        "title": "Worked examples are not real bookings",
        "titleHi": "समझाने वाले उदाहरण असली टिकट नहीं हैं",
        "body": "Guide examples and representative coach diagrams explain a process. They are not evidence of a live seat, a railway endorsement or a successful booking. Calculator outputs remain estimates within the inputs and limits shown on the page.",
        "bodyHi": "गाइड उदाहरण और सामान्य कोच चित्र प्रक्रिया समझाते हैं। वे लाइव सीट, रेलवे समर्थन या सफल बुकिंग का प्रमाण नहीं हैं। कैलकुलेटर पेज पर बताए इनपुट और सीमाओं के भीतर अनुमान देते हैं।"
      }
    ]
  },
  "official-services": {
    "related": [
      "pnr-status",
      "live-train-status",
      "contact"
    ],
    "sources": [
      "pnr",
      "booking",
      "ntes",
      "assistance"
    ],
    "sections": [
      {
        "title": "Choose the service for the action",
        "titleHi": "कार्रवाई के अनुसार सेवा चुनें",
        "body": "Use the official PNR enquiry for reservation status, NTES for train running information and IRCTC for actions against an IRCTC booking. RailMadad is a passenger-assistance channel. A result on RailQ does not submit a booking, cancellation or complaint to any of these services.",
        "bodyHi": "आरक्षण स्थिति के लिए आधिकारिक PNR, ट्रेन संचालन के लिए NTES और IRCTC बुकिंग की कार्रवाई के लिए IRCTC खोलें। RailMadad यात्री सहायता का माध्यम है। RailQ परिणाम इनमें बुकिंग, रद्दीकरण या शिकायत जमा नहीं करता।"
      },
      {
        "title": "Open the official destination directly",
        "titleHi": "आधिकारिक वेबसाइट सीधे खोलें",
        "body": "Check the destination address before entering account credentials or payment details. You do not need to give RailQ an OTP to follow these links. If a site is unavailable, try its official app or another official assistance channel rather than a number in an unverified advertisement.",
        "bodyHi": "खाता या भुगतान जानकारी से पहले वेबसाइट का पता जाँचें। इन लिंक के लिए RailQ को OTP नहीं देना है। वेबसाइट न चले तो आधिकारिक ऐप या सहायता लें, अपुष्ट विज्ञापन के नंबर पर निर्भर न रहें।"
      }
    ]
  },
  "about": {
    "related": [
      "methodology",
      "corrections",
      "official-services"
    ],
    "sources": [],
    "sections": [
      {
        "title": "What RailQ does and does not do",
        "titleHi": "RailQ क्या करता है",
        "body": "RailQ combines railway enquiry tools, planning calculators and English/Hindi explanations. It is an independent website, not Indian Railways or IRCTC. It does not issue train tickets, collect ticket fares or control seat allocation.",
        "bodyHi": "RailQ रेलवे पूछताछ, योजना कैलकुलेटर और हिंदी/अंग्रेज़ी जानकारी देता है। यह स्वतंत्र वेबसाइट है, भारतीय रेल या IRCTC नहीं। यह टिकट जारी, टिकट किराया जमा या सीट आवंटन नियंत्रित नहीं करता।"
      },
      {
        "title": "Help make an explanation clearer",
        "titleHi": "जानकारी बेहतर बनाने में मदद करें",
        "body": "If an instruction is confusing, send the page address and the part you could not use. A useful correction may be a clearer Hindi term, an input label or a missing limitation. Ticket details are not needed to report those problems.",
        "bodyHi": "निर्देश उलझा हो तो पेज पता और कठिन हिस्सा भेजें। स्पष्ट हिंदी शब्द, इनपुट लेबल या छूटी सीमा उपयोगी सुधार हो सकते हैं। इनके लिए टिकट विवरण जरूरी नहीं।"
      }
    ]
  },
  "alerts": {
    "related": [
      "booking-reminders",
      "pnr-status",
      "pnr-alerts"
    ],
    "sources": [],
    "sections": [
      {
        "title": "Use a calendar event for booking preparation",
        "titleHi": "बुकिंग तैयारी के लिए कैलेंडर इवेंट लें",
        "body": "Create an event for the general or Tatkal opening and import it into your own calendar. Confirm the date, time zone and notification setting after import. The event does not monitor railway changes.",
        "bodyHi": "सामान्य या तत्काल खुलने का इवेंट बनाकर अपने कैलेंडर में जोड़ें। तारीख, समय-क्षेत्र और सूचना सेटिंग जाँचें। इवेंट रेलवे बदलाव की निगरानी नहीं करता।"
      },
      {
        "title": "Set a separate manual PNR check",
        "titleHi": "अलग से स्वयं PNR जाँच रखें",
        "body": "If your booking needs another check, use your calendar to remind yourself to open the PNR tool. Do not assume RailQ is polling in the background: email monitoring is paused and new subscriptions are not being accepted.",
        "bodyHi": "बुकिंग फिर देखनी हो तो कैलेंडर में PNR टूल खोलने का रिमाइंडर रखें। RailQ पीछे से जाँच रहा है, ऐसा न मानें: ईमेल निगरानी रुकी है और नए अनुरोध नहीं लिए जा रहे।"
      }
    ]
  },
  "blog": {
    "related": [
      "guides/pnr-status-explained",
      "guides/booking-and-advance-reservation",
      "guides/festival-travel-planning",
      "guides/family-and-senior-citizen-travel"
    ],
    "sources": [],
    "sections": [
      {
        "title": "Start with the question you have now",
        "titleHi": "अपने मौजूदा सवाल से शुरू करें",
        "body": "If you already have a ticket, start with how to read a PNR result. If you have not booked, start with advance reservation planning. For a busy holiday journey or a family trip, use the dedicated planning guides linked below rather than a generic checklist.",
        "bodyHi": "टिकट है तो PNR परिणाम पढ़ने की गाइड से शुरू करें। बुकिंग बाकी हो तो अग्रिम आरक्षण योजना देखें। त्योहार या परिवार की यात्रा के लिए नीचे की खास गाइड लें, सामान्य सूची पर निर्भर न रहें।"
      },
      {
        "title": "Use the guide with its matching tool",
        "titleHi": "गाइड के साथ संबंधित टूल लें",
        "body": "The explanation helps you choose inputs and interpret the result; the tool performs the enquiry or calculation. Keep that distinction when a provider is unavailable. Reading a guide is still useful, but it does not establish a live train or ticket status.",
        "bodyHi": "जानकारी इनपुट और परिणाम समझाती है; टूल पूछताछ या गणना करता है। प्रदाता अनुपलब्ध हो तो अंतर याद रखें। गाइड उपयोगी है, लेकिन लाइव ट्रेन या टिकट स्थिति तय नहीं करती।"
      }
    ]
  },
  "railway-updates": {
    "related": [
      "guides/booking-and-advance-reservation",
      "guides/tatkal",
      "guides/chart-preparation",
      "corrections"
    ],
    "sources": [
      "arp",
      "tatkalIdentity",
      "chart"
    ],
    "sections": [
      {
        "title": "Check the scope before applying a notice",
        "titleHi": "सूचना लागू करने से पहले दायरा देखें",
        "body": "Read the publication date, effective date, service and booking channel. An older notice can still explain a calculator’s assumptions, but this page is not a complete live bulletin of disruptions or every railway circular. Verify the rule for your selected service at booking.",
        "bodyHi": "प्रकाशन, लागू तारीख, सेवा और बुकिंग माध्यम देखें। पुरानी सूचना कैलकुलेटर की धारणा समझा सकती है, लेकिन यह सभी व्यवधान या परिपत्रों की पूरी लाइव सूची नहीं है। बुकिंग में चुनी सेवा का नियम जाँचें।"
      }
    ]
  },
  "dashboard": {
    "related": [
      "pnr-status",
      "live-train-status",
      "train-schedule",
      "guides/pnr-status-explained"
    ],
    "sources": [],
    "sections": [
      {
        "title": "Use each result for its own purpose",
        "titleHi": "हर परिणाम का सही उपयोग करें",
        "body": "PNR describes the reservation, running status describes the train’s reported progress, and a refund estimate describes a calculation. One successful card does not validate every other card. Check missing fields and the available update times separately.",
        "bodyHi": "PNR आरक्षण बताता है, लाइव स्थिति ट्रेन की सूचना और रिफंड गणना अनुमान है। एक कार्ड सही आने से बाकी सब सही नहीं होते। खाली फ़ील्ड और अपडेट समय अलग देखें।"
      },
      {
        "title": "Keep a fallback for the journey",
        "titleHi": "यात्रा का विकल्प तैयार रखें",
        "body": "If one service fails, open its dedicated tool or official enquiry. Avoid repeatedly refreshing all cards because that can repeat provider requests without resolving the problem. Do not share a dashboard screenshot until ticket details are hidden.",
        "bodyHi": "एक सेवा न चले तो उसका अलग टूल या आधिकारिक पूछताछ खोलें। सभी कार्ड बार-बार रिफ्रेश करने से समस्या ठीक हुए बिना अनुरोध दोहर सकते हैं। टिकट विवरण छिपाए बिना डैशबोर्ड स्क्रीनशॉट साझा न करें।"
      }
    ]
  }
};
