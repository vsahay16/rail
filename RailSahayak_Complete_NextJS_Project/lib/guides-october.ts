import type { GuideConfig } from "@/lib/guide-registry";
import type { GuideAddition } from "@/lib/guide-additions";
export const octoberGuides: GuideConfig[] = [
  {
    "slug": "can-you-travel-with-rac-ticket",
    "title": "Can You Travel With an RAC Ticket?",
    "titleHi": "RAC टिकट पर यात्रा कर सकते हैं?",
    "description": "Understand RAC travel, seating versus a full berth, passenger-wise status and what to check before boarding your train.",
    "descriptionHi": "RAC टिकट पर यात्रा, बैठने की जगह और पूरी बर्थ का अंतर समझें। जानें कि ट्रेन में चढ़ने से पहले हर यात्री की कौन-सी जानकारी जाँचनी चाहिए।",
    "icon": "ticket",
    "sections": [],
    "updated": "2026-10-05"
  },
  {
    "slug": "irctc-money-debited-ticket-not-booked",
    "title": "Money Debited but Train Ticket Not Booked?",
    "titleHi": "पैसे कटे, पर ट्रेन टिकट नहीं बना?",
    "description": "Check booking and payment status, avoid duplicate bookings, collect the right references and follow up on a failed train-ticket transaction.",
    "descriptionHi": "पैसे कटने पर बुकिंग और भुगतान की स्थिति कैसे जाँचें, दोहरी बुकिंग से कैसे बचें और असफल ट्रेन टिकट लेन-देन की शिकायत कैसे करें, जानें।",
    "icon": "refund",
    "sections": [],
    "updated": "2026-10-05"
  },
  {
    "slug": "patna-junction-rajendra-nagar-danapur-stations",
    "title": "PNBE, RJPB or DNR: Which Patna Station?",
    "titleHi": "PNBE, RJPB या DNR: पटना का कौन-सा स्टेशन?",
    "description": "Compare Patna Junction, Rajendra Nagar Terminal and Danapur station codes. Match your boarding point and plan transfers without station confusion.",
    "descriptionHi": "पटना जंक्शन, राजेंद्र नगर टर्मिनल और दानापुर के स्टेशन कोड समझें। सही बोर्डिंग स्टेशन पहचानें और स्टेशन बदलने की यात्रा पहले से तय करें।",
    "icon": "station",
    "sections": [],
    "updated": "2026-10-05"
  }
];
export const octoberAdditions: Record<string, GuideAddition> = {
  "can-you-travel-with-rac-ticket": {
    "checked": "5 October 2026",
    "checkedHi": "5 अक्टूबर 2026",
    "sources": [
      {
        "label": "Indian Railways: RAC accommodation explanation",
        "url": "https://eastcoastrail.indianrailways.gov.in/uploads/files/1296647194974-Passenger-services.pdf"
      },
      {
        "label": "IRCTC: RAC and waitlisted e-ticket travel conditions",
        "url": "https://contents.irctc.co.in/en/Waitlisted_E-Ticket.html"
      },
      {
        "label": "Indian Railways: current PNR status and legend",
        "url": "https://www.indianrail.gov.in/enquiry/PNR/PnrEnquiry.html?locale=en"
      }
    ],
    "tools": [
      "pnr-status",
      "coach-layout",
      "refund-calculator"
    ],
    "sections": [
      {
        "title": "The short answer",
        "titleHi": "सीधा जवाब",
        "body": "Yes. An RAC ticket allows travel with reserved sitting accommodation; it does not promise an individual sleeping berth. A full berth may become available through the railway allocation process. Check the latest status for each passenger before leaving for the station, especially if the booking was originally waitlisted.",
        "bodyHi": "हाँ। RAC टिकट पर आरक्षित बैठने की जगह के साथ यात्रा की जा सकती है, लेकिन अलग सोने की पूरी बर्थ की गारंटी नहीं होती। रेलवे की आवंटन प्रक्रिया में खाली बर्थ मिलने पर पूरी बर्थ मिल सकती है। स्टेशन निकलने से पहले हर यात्री की ताजा स्थिति देखें, खासकर अगर बुकिंग पहले वेटलिस्ट में थी।"
      },
      {
        "title": "RAC, CNF and WL answer different questions",
        "titleHi": "RAC, CNF और WL में अंतर",
        "body": "RAC means Reservation Against Cancellation. The useful distinction is between permission to travel and the accommodation allocated. Read the status together with the coach and seat or berth fields; a number on its own is not enough.",
        "bodyHi": "RAC का पूरा नाम Reservation Against Cancellation है। यात्रा की अनुमति और आवंटित सीट या बर्थ अलग बातें हैं। स्थिति के साथ कोच और सीट या बर्थ की जानकारी भी पढ़ें; अकेला नंबर पर्याप्त नहीं है।",
        "points": [
          "CNF: confirmed status; verify the actual accommodation details.",
          "RAC: reserved sitting accommodation initially, without a guaranteed individual sleeping berth.",
          "WL: a waiting-list position, not a berth number. Do not apply RAC travel rules to a fully waitlisted e-ticket."
        ],
        "pointsHi": [
          "CNF: कन्फर्म स्थिति; आवंटित सीट या बर्थ का विवरण भी देखें।",
          "RAC: शुरुआत में आरक्षित बैठने की जगह; अलग सोने की पूरी बर्थ तय नहीं।",
          "WL: प्रतीक्षा सूची का स्थान, बर्थ नंबर नहीं। पूरी तरह वेटलिस्ट ई-टिकट पर RAC के नियम लागू न करें।"
        ],
        "links": [
          {
            "href": "/guides/pnr-and-waiting-lists",
            "label": "Read the waiting-list guide",
            "labelHi": "वेटलिस्ट गाइड पढ़ें"
          }
        ]
      },
      {
        "title": "Read this example without confusing the numbers",
        "titleHi": "नंबरों को समझने का उदाहरण",
        "body": "Illustrative example: a passenger’s booking status is WL/18 and current status is RAC/6. WL/18 records the earlier waiting position; RAC/6 is the newer reservation status. Neither “18” nor “6” should automatically be treated as the assigned berth. Look for the separate accommodation details in the official enquiry. This is an invented teaching example, not a real PNR or a prediction.",
        "bodyHi": "समझने के लिए उदाहरण: किसी यात्री की बुकिंग स्थिति WL/18 और वर्तमान स्थिति RAC/6 है। WL/18 पुराना प्रतीक्षा स्थान है; RAC/6 नई आरक्षण स्थिति है। 18 या 6 को अपने-आप आवंटित बर्थ नंबर न समझें। आधिकारिक जाँच में सीट या बर्थ का अलग विवरण देखें। यह केवल समझाने के लिए बनाया गया उदाहरण है, वास्तविक PNR या भविष्यवाणी नहीं।",
        "links": [
          {
            "href": "/pnr-status",
            "label": "Check your current PNR status",
            "labelHi": "वर्तमान PNR स्थिति जाँचें"
          },
          {
            "href": "/guides/pnr-status-explained",
            "label": "Understand each PNR field",
            "labelHi": "PNR के हर विवरण का अर्थ समझें"
          }
        ]
      },
      {
        "title": "Plan for sitting accommodation on an overnight trip",
        "titleHi": "रात की यात्रा में बैठने की जगह के हिसाब से तैयारी",
        "body": "If uninterrupted sleep or an individual berth is essential, plan on the accommodation already confirmed rather than a hoped-for upgrade. For an older traveller, a child or someone with mobility needs, discuss whether the arrangement is practical before travelling. Keep luggage manageable and essential items within reach. Coach layouts are useful for orientation, but cannot establish your actual allocation.",
        "bodyHi": "अगर लगातार सोना या अलग बर्थ जरूरी है, तो संभावित अपग्रेड के बजाय अभी मिली जगह के अनुसार योजना बनाएँ। बुजुर्ग, बच्चे या चलने-फिरने में कठिनाई वाले यात्री के लिए यह व्यवस्था सुविधाजनक है या नहीं, पहले तय करें। सामान कम रखें और जरूरी चीजें पास रखें। कोच का चित्र समझने में मदद करता है, लेकिन आपकी वास्तविक सीट तय नहीं करता।",
        "links": [
          {
            "href": "/coach-layout",
            "label": "View representative coach layouts",
            "labelHi": "कोच के सामान्य लेआउट देखें"
          }
        ]
      },
      {
        "title": "What to check at the station and onboard",
        "titleHi": "स्टेशन और ट्रेन में क्या जाँचें",
        "body": "Check your train number, boarding station and boarding date together. Keep the ticket and required identification ready. Follow the official allocation and ask the ticket-checking staff if the seat details are unclear. A berth that looks empty may belong to someone boarding later; do not treat it as a free upgrade. Railway staff handle any onboard reallocation.",
        "bodyHi": "ट्रेन नंबर, बोर्डिंग स्टेशन और चढ़ने की तारीख साथ में मिलाएँ। टिकट और जरूरी पहचान पत्र तैयार रखें। आधिकारिक आवंटन के अनुसार बैठें और जानकारी अस्पष्ट हो तो टिकट जाँच कर्मचारी से पूछें। खाली दिख रही बर्थ आगे के स्टेशन से चढ़ने वाले यात्री की हो सकती है; उसे अपना अपग्रेड न मानें। ट्रेन में नया आवंटन रेलवे कर्मचारी करते हैं।"
      },
      {
        "title": "Will RAC definitely become confirmed?",
        "titleHi": "क्या RAC निश्चित रूप से कन्फर्म होगा?",
        "body": "No guarantee can be made from the RAC number alone. Keep a practical alternative if a full berth is essential. If the status changes to CNF, read the updated coach and berth information rather than relying on an earlier screenshot. Check every passenger separately on a family booking.",
        "bodyHi": "सिर्फ RAC नंबर देखकर कन्फर्म होने की गारंटी नहीं दी जा सकती। पूरी बर्थ जरूरी हो तो व्यावहारिक विकल्प रखें। स्थिति CNF हो जाए तो पुराने स्क्रीनशॉट के बजाय नया कोच और बर्थ विवरण देखें। परिवार की बुकिंग में हर यात्री की स्थिति अलग जाँचें।"
      },
      {
        "title": "What if you decide not to travel?",
        "titleHi": "यात्रा नहीं करनी हो तो?",
        "body": "Open the booking through the service used to buy it and check the available cancellation or claim action promptly. Do not assume leaving the ticket unused automatically starts a refund. Use the refund guide for the applicable status and deadline; RailQ can explain or estimate, but cannot cancel a ticket or approve a refund.",
        "bodyHi": "जिस सेवा से टिकट खरीदा था, उसमें बुकिंग खोलकर उपलब्ध रद्दीकरण या दावा विकल्प समय रहते देखें। केवल यात्रा न करने से रिफंड शुरू हो जाएगा, ऐसा न मानें। स्थिति और समय-सीमा के लिए रिफंड गाइड देखें। RailQ जानकारी या अनुमान दे सकता है, लेकिन टिकट रद्द या रिफंड मंजूर नहीं कर सकता।",
        "links": [
          {
            "href": "/guides/cancellation-and-refunds",
            "label": "Check cancellation and refund guidance",
            "labelHi": "रद्दीकरण और रिफंड की जानकारी देखें"
          }
        ]
      }
    ]
  },
  "irctc-money-debited-ticket-not-booked": {
    "checked": "5 October 2026",
    "checkedHi": "5 अक्टूबर 2026",
    "sources": [
      {
        "label": "IRCTC: money debited but ticket not booked (published 2018; process reference)",
        "url": "https://contents.irctc.co.in/en/Alerts_mone_debited.pdf"
      },
      {
        "label": "IRCTC: official booking and account service",
        "url": "https://www.irctc.co.in/"
      }
    ],
    "tools": [
      "pnr-status",
      "seat-availability"
    ],
    "sections": [
      {
        "title": "First confirm whether a ticket exists",
        "titleHi": "पहले देखें कि टिकट बना है या नहीं",
        "body": "A bank debit is not proof that a train ticket was issued. Open the booking history in the account or app you used, and check for the journey and a ticket record. Also inspect the transaction status. If you booked through an agent or another app, start there rather than expecting the booking to appear in an unrelated IRCTC account.",
        "bodyHi": "बैंक से पैसे कटना ट्रेन टिकट बनने का प्रमाण नहीं है। जिस खाते या ऐप से बुकिंग की थी, उसके बुकिंग इतिहास में यात्रा और टिकट का रिकॉर्ड देखें। लेन-देन की स्थिति भी जाँचें। एजेंट या दूसरे ऐप से बुकिंग की हो तो पहले उसी से जाँच करें; अलग IRCTC खाते में बुकिंग दिखाई देना जरूरी नहीं है।"
      },
      {
        "title": "A three-part check before you pay again",
        "titleHi": "दोबारा भुगतान से पहले तीन जाँच",
        "body": "Put the booking record, payment record and journey details next to each other. Check each attempt separately if you pressed pay more than once. A failed page or missing SMS alone does not settle the outcome.",
        "bodyHi": "बुकिंग रिकॉर्ड, भुगतान रिकॉर्ड और यात्रा की जानकारी साथ रखकर मिलाएँ। एक से ज्यादा बार भुगतान किया हो तो हर प्रयास अलग जाँचें। पेज बंद हो जाना या SMS न आना अपने-आप बुकिंग का अंतिम परिणाम नहीं बताता।",
        "points": [
          "Ticket found: verify the PNR, passengers and train before making another booking.",
          "Status pending or unclear: use the booking service’s refresh/status/help option and retain its reference.",
          "Failure confirmed with no ticket: consider a fresh booking separately, knowing that availability and price may have changed."
        ],
        "pointsHi": [
          "टिकट मिल गया: नई बुकिंग से पहले PNR, यात्री और ट्रेन मिलाएँ।",
          "स्थिति लंबित या अस्पष्ट: बुकिंग सेवा में स्थिति अपडेट या सहायता विकल्प देखें और संदर्भ सुरक्षित रखें।",
          "टिकट बने बिना असफलता की पुष्टि: नई बुकिंग अलग निर्णय है; सीट और किराया बदल सकते हैं।"
        ],
        "links": [
          {
            "href": "/pnr-status",
            "label": "Check a PNR if a ticket was issued",
            "labelHi": "टिकट बना हो तो PNR जाँचें"
          }
        ]
      },
      {
        "title": "Why the debit and ticket can disagree",
        "titleHi": "पैसे कटने के बाद भी टिकट क्यों नहीं बनता?",
        "body": "IRCTC’s published failed-payment note distinguishes a payment received without a completed booking from a payment that did not settle with IRCTC. That distinction affects which service needs to trace the money. Record the exact status shown rather than guessing from the debit notification. The note is dated 2018; use it to understand the process, not as a promise of today’s refund time.",
        "bodyHi": "IRCTC की प्रकाशित जानकारी में भुगतान पहुँचने पर भी टिकट न बनने और भुगतान IRCTC तक न पहुँचने की स्थितियाँ अलग बताई गई हैं। पैसे का पता किस सेवा से लगवाना है, यह इसी पर निर्भर करता है। केवल डेबिट संदेश से अनुमान न लगाएँ; दिखाई गई स्थिति लिख लें। यह सूचना 2018 की है; इसे प्रक्रिया समझने के लिए पढ़ें, आज की रिफंड समय-सीमा की गारंटी न मानें।"
      },
      {
        "title": "Keep this private evidence checklist",
        "titleHi": "ये प्रमाण निजी रूप से सुरक्षित रखें",
        "body": "Create a short record while the details are easy to find. You usually need the payment and booking references to explain the problem clearly, not a screenshot of your entire bank statement.",
        "bodyHi": "जानकारी आसानी से मिल रही हो तभी छोटा रिकॉर्ड बना लें। समस्या समझाने के लिए भुगतान और बुकिंग के संदर्भ काम आते हैं; पूरा बैंक स्टेटमेंट साझा करना जरूरी नहीं है।",
        "points": [
          "Booking service and account used; transaction or order ID.",
          "Attempt date and time; train and journey date; amount debited.",
          "Payment reference such as UTR/RRN if supplied by the bank or payment app.",
          "Exact booking/refund status, support case number and any response received."
        ],
        "pointsHi": [
          "बुकिंग सेवा और उपयोग किया खाता; लेन-देन या ऑर्डर ID।",
          "प्रयास की तारीख और समय; ट्रेन, यात्रा की तारीख और कटी रकम।",
          "बैंक या भुगतान ऐप में मिला UTR/RRN जैसा भुगतान संदर्भ।",
          "बुकिंग या रिफंड की स्थिति, शिकायत नंबर और मिला जवाब।"
        ]
      },
      {
        "title": "Who should you contact?",
        "titleHi": "किससे संपर्क करें?",
        "body": "Start with the official support option inside the booking service for a missing ticket or unclear booking status. For a debit, reversal or credit that the payment account cannot explain, use your bank or payment app’s official support. Share the earlier case reference when following up so the next person can trace the same transaction. Open support through the genuine app or website instead of a phone number from an unsolicited message.",
        "bodyHi": "टिकट नहीं मिला या बुकिंग अस्पष्ट हो तो बुकिंग सेवा के भीतर आधिकारिक सहायता से शुरू करें। खाते में कटौती, वापसी या जमा रकम स्पष्ट न हो तो बैंक या भुगतान ऐप की आधिकारिक सहायता लें। फॉलो-अप में पुराना शिकायत नंबर दें ताकि उसी लेन-देन की जाँच हो सके। अनचाहे संदेश के नंबर के बजाय असली ऐप या वेबसाइट से सहायता खोलें।",
        "links": [
          {
            "href": "/official-services",
            "label": "Find official railway services",
            "labelHi": "आधिकारिक रेलवे सेवाएँ देखें"
          }
        ]
      },
      {
        "title": "Example: two debits but only one ticket",
        "titleHi": "उदाहरण: दो बार पैसे कटे, टिकट एक बना",
        "body": "Suppose attempt A appears as failed and attempt B produced a ticket. Keep A and B as separate records. Verify B’s journey and passenger details; investigate A using its own payment reference. Do not cancel B simply to recover A’s debit. If two tickets were actually issued, that is a duplicate-booking situation and any cancellation must be assessed under the applicable ticket rules.",
        "bodyHi": "मान लें प्रयास A असफल दिखता है और प्रयास B से टिकट बन गया। A और B के अलग रिकॉर्ड रखें। B की यात्रा और यात्री जानकारी मिलाएँ; A की रकम के लिए उसी का भुगतान संदर्भ दें। A के पैसे वापस लेने के लिए B का टिकट रद्द न करें। अगर वास्तव में दो टिकट बने हैं, तो वह दोहरी बुकिंग है और रद्दीकरण पर संबंधित टिकट नियम लागू होंगे।"
      },
      {
        "title": "When will the refund arrive?",
        "titleHi": "रिफंड कब आएगा?",
        "body": "There is no single reliable countdown for every booking app, bank and payment method. Read the status and timeline supplied for your transaction. If that time passes, follow up with the reference numbers and ask whether the payment is awaiting settlement, reversal or a refund credit. A failed booking is different from cancelling an issued ticket, so a cancellation calculator cannot predict this refund.",
        "bodyHi": "हर बुकिंग ऐप, बैंक और भुगतान तरीके के लिए एक जैसी समय-सीमा बताना सही नहीं होगा। अपने लेन-देन में दी गई स्थिति और समय-सीमा देखें। समय बीत जाए तो संदर्भ नंबर के साथ पूछें कि भुगतान निपटान, वापसी या रिफंड जमा होने में कहाँ अटका है। असफल बुकिंग और बने हुए टिकट को रद्द करना अलग स्थितियाँ हैं; रद्दीकरण कैलकुलेटर इसका रिफंड नहीं बता सकता।"
      },
      {
        "title": "Keep payment details out of public posts",
        "titleHi": "भुगतान जानकारी सार्वजनिक न करें",
        "body": "Never give a stranger your OTP, password, card PIN or UPI PIN to obtain a refund. Hide passenger details, full PNRs, QR codes and financial identifiers in public screenshots. RailQ does not process railway payments or recover debited money; use the authorised booking and payment support channels.",
        "bodyHi": "रिफंड के लिए किसी अनजान व्यक्ति को OTP, पासवर्ड, कार्ड PIN या UPI PIN न दें। सार्वजनिक स्क्रीनशॉट में यात्री विवरण, पूरा PNR, QR कोड और वित्तीय पहचान छिपाएँ। RailQ रेलवे भुगतान नहीं करता और कटी रकम वापस नहीं दिलाता; अधिकृत बुकिंग और भुगतान सहायता से संपर्क करें।"
      }
    ]
  },
  "patna-junction-rajendra-nagar-danapur-stations": {
    "checked": "5 October 2026",
    "checkedHi": "5 अक्टूबर 2026",
    "sources": [
      {
        "label": "East Central Railway: station names and codes (historical list; not current facility availability)",
        "url": "https://ecr.indianrailways.gov.in/uploads/files/1325156480378-Wheel%20Chaires.pdf"
      },
      {
        "label": "Indian Railways: official passenger enquiry",
        "url": "https://www.indianrail.gov.in/enquiry/PNR/PnrEnquiry.html?locale=en"
      }
    ],
    "tools": [
      "trains-between-stations",
      "train-schedule",
      "connection-buffer-calculator"
    ],
    "sections": [
      {
        "title": "These are three different stations",
        "titleHi": "ये तीन अलग-अलग स्टेशन हैं",
        "body": "PNBE is Patna Junction, RJPB is Rajendra Nagar Terminal, and DNR is Danapur. They are not interchangeable names for the same boarding point. Use the station shown in your ticket’s boarding details, not simply “Patna” in a taxi instruction or a city-level search.",
        "bodyHi": "PNBE पटना जंक्शन, RJPB राजेंद्र नगर टर्मिनल और DNR दानापुर का कोड है। ये एक ही बोर्डिंग स्टेशन के अलग नाम नहीं हैं। टिकट में दर्ज बोर्डिंग स्टेशन के अनुसार जाएँ; टैक्सी को सिर्फ “पटना स्टेशन” कहना या केवल शहर का नाम खोजना पर्याप्त नहीं है।",
        "points": [
          "PNBE — Patna Junction / पटना जंक्शन",
          "RJPB — Rajendra Nagar Terminal / राजेंद्र नगर टर्मिनल",
          "DNR — Danapur / दानापुर"
        ],
        "pointsHi": [
          "PNBE — पटना जंक्शन / Patna Junction",
          "RJPB — राजेंद्र नगर टर्मिनल / Rajendra Nagar Terminal",
          "DNR — दानापुर / Danapur"
        ]
      },
      {
        "title": "Match these four details before leaving",
        "titleHi": "निकलने से पहले ये चार बातें मिलाएँ",
        "body": "Open the latest ticket or official booking record. Read the boarding point, train number, boarding date and scheduled time together. The station where a train starts its full route need not be your boarding point. A city name in the journey description is not enough to identify the entrance you need.",
        "bodyHi": "नया टिकट या आधिकारिक बुकिंग रिकॉर्ड खोलें। बोर्डिंग स्टेशन, ट्रेन नंबर, चढ़ने की तारीख और निर्धारित समय साथ में पढ़ें। ट्रेन का शुरुआती स्टेशन और आपका चढ़ने का स्टेशन अलग हो सकते हैं। यात्रा विवरण में केवल शहर का नाम देखकर सही स्टेशन प्रवेश नहीं चुना जा सकता।",
        "links": [
          {
            "href": "/pnr-status",
            "label": "Check the boarding details in your PNR",
            "labelHi": "PNR में बोर्डिंग विवरण देखें"
          },
          {
            "href": "/train-schedule",
            "label": "Check the train’s scheduled stops",
            "labelHi": "ट्रेन के निर्धारित ठहराव देखें"
          }
        ]
      },
      {
        "title": "Example: a ticket says RJPB, your cab is going to PNBE",
        "titleHi": "उदाहरण: टिकट RJPB का है, टैक्सी PNBE जा रही है",
        "body": "Show the driver the full station name and code before starting. If you notice the mismatch on the way, correct the destination and reassess arrival time immediately. Do not assume the train also stops at PNBE or that you can board elsewhere without checking. Verify the booked boarding point and applicable change process through the official booking service.",
        "bodyHi": "गाड़ी शुरू होने से पहले ड्राइवर को स्टेशन का पूरा नाम और कोड दिखाएँ। रास्ते में गलती पता चले तो गंतव्य ठीक करें और पहुँचने का समय फिर देखें। यह न मानें कि ट्रेन PNBE पर भी रुकती है या बिना जाँच कहीं और से चढ़ सकते हैं। बुकिंग सेवा पर दर्ज बोर्डिंग स्टेशन और उसे बदलने की लागू प्रक्रिया जाँचें।"
      },
      {
        "title": "How to compare trains from the Patna area",
        "titleHi": "पटना क्षेत्र से ट्रेन विकल्प कैसे देखें",
        "body": "When planning a new booking, run separate searches for PNBE, RJPB and DNR to your destination. Compare travel date, stopping pattern, class and the time needed to reach each station. A useful result must fit your whole journey, not only show an attractive departure time. Do not buy a ticket for a different station while assuming the city name makes it equivalent.",
        "bodyHi": "नई बुकिंग की योजना बनाते समय अपने गंतव्य के लिए PNBE, RJPB और DNR से अलग-अलग खोज करें। तारीख, ठहराव, श्रेणी और हर स्टेशन पहुँचने का समय मिलाएँ। केवल अच्छा प्रस्थान समय नहीं, पूरी यात्रा सुविधाजनक होनी चाहिए। शहर एक होने के कारण अलग स्टेशन का टिकट समान मानकर न खरीदें।",
        "links": [
          {
            "href": "/trains-between-stations",
            "label": "Compare trains using exact station codes",
            "labelHi": "सही स्टेशन कोड से ट्रेनें खोजें"
          },
          {
            "href": "/seat-availability",
            "label": "Check seats for the selected station pair",
            "labelHi": "चुने हुए स्टेशनों के बीच सीटें देखें"
          }
        ]
      },
      {
        "title": "Allow for a real station-to-station transfer",
        "titleHi": "स्टेशन बदलने के लिए पर्याप्त समय रखें",
        "body": "A connection between different stations includes getting off the first train, reaching the exit, finding transport, road travel, entering the second station and locating the coach. Check a current map route for the exact stations and leave additional margin for traffic, queues, luggage and slower walking. This guide deliberately gives no fixed transfer time or taxi fare: neither is reliable for every departure.",
        "bodyHi": "अलग स्टेशनों के बीच कनेक्शन में पहली ट्रेन से उतरना, बाहर निकलना, वाहन मिलना, सड़क यात्रा, दूसरे स्टेशन में प्रवेश और कोच तक पहुँचना शामिल है। सही स्टेशनों का मौजूदा नक्शा देखें और ट्रैफिक, कतार, सामान व धीमे चलने के लिए अतिरिक्त समय रखें। यहाँ तय ट्रांसफर समय या टैक्सी किराया नहीं दिया गया है, क्योंकि वह हर यात्रा के लिए सही नहीं होगा।",
        "links": [
          {
            "href": "/connection-buffer-calculator",
            "label": "Plan a connection buffer",
            "labelHi": "कनेक्शन के लिए अतिरिक्त समय की योजना बनाएँ"
          }
        ]
      },
      {
        "title": "Check platforms and assistance separately",
        "titleHi": "प्लेटफॉर्म और सहायता अलग से जाँचें",
        "body": "A correct station code does not establish the platform. Use station displays and announcements near departure. If a passenger needs step-free access or assistance, confirm the available arrangement with railway staff before relying on it. Old facility lists are not a live guarantee of working lifts, available wheelchairs or a particular entrance.",
        "bodyHi": "सही स्टेशन कोड से प्लेटफॉर्म तय नहीं होता। प्रस्थान के पास स्टेशन डिस्प्ले और घोषणाएँ देखें। किसी यात्री को सीढ़ियों से बचने का रास्ता या सहायता चाहिए तो रेलवे कर्मचारी से उपलब्ध व्यवस्था की पुष्टि करें। पुरानी सुविधा सूची चालू लिफ्ट, उपलब्ध व्हीलचेयर या किसी खास प्रवेश की ताजा गारंटी नहीं है।",
        "links": [
          {
            "href": "/platform-number",
            "label": "Check platform information",
            "labelHi": "प्लेटफॉर्म की जानकारी देखें"
          }
        ]
      },
      {
        "title": "Are PNBE and PNC the same?",
        "titleHi": "क्या PNBE और PNC एक हैं?",
        "body": "No. PNBE identifies Patna Junction; PNC identifies Patna Sahib. Similar names are a reason to double-check, not to shorten the station name. Keep the code with the name when sharing pickup instructions. If a suggestion list does not show your station, consult the ticket and official station enquiry instead of selecting the nearest-looking name.",
        "bodyHi": "नहीं। PNBE पटना जंक्शन और PNC पटना साहिब का कोड है। मिलते-जुलते नाम हों तो स्टेशन का नाम छोटा करने के बजाय दोबारा जाँचें। पिकअप की जानकारी में नाम के साथ कोड भी दें। सुझाव सूची में स्टेशन न मिले तो मिलता-जुलता नाम चुनने के बजाय टिकट और आधिकारिक स्टेशन जाँच देखें।"
      },
      {
        "title": "A simple family travel checklist",
        "titleHi": "परिवार के लिए छोटी यात्रा सूची",
        "body": "Before departure, send your travel group one clear message containing the station name and code, meeting point, train number and departure time. Keep the full ticket private. Agree how to reconnect if mobile data fails and ensure each adult knows which station is intended. This small check is more useful than discovering a station mismatch at the last minute.",
        "bodyHi": "निकलने से पहले साथ जाने वालों को एक स्पष्ट संदेश में स्टेशन का नाम और कोड, मिलने की जगह, ट्रेन नंबर और समय भेजें। पूरा टिकट निजी रखें। मोबाइल इंटरनेट बंद हो तो संपर्क कैसे करेंगे, तय करें और हर वयस्क को सही स्टेशन बताएँ। अंतिम समय पर स्टेशन की गलती पता चलने से यह छोटी तैयारी बेहतर है।"
      }
    ]
  }
};
