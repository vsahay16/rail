import type { GuideConfig, GuideSection } from "@/lib/guide-registry";
import type { GuideAddition } from "@/lib/guide-additions";
export const confirmationGuide: GuideConfig = {
  "slug": "pnr-confirmation-probability",
  "title": "PNR Confirmation Probability Explained",
  "titleHi": "PNR कन्फर्मेशन संभावना का अर्थ",
  "description": "Understand what a confirmation percentage means, why WL movement is different, and how to compare alternatives without treating an estimate as a guarantee.",
  "descriptionHi": "कन्फर्मेशन प्रतिशत का अर्थ, वेटलिस्ट के बदलाव से उसका अंतर और अनुमान को गारंटी माने बिना दूसरे यात्रा विकल्पों की तुलना समझें।",
  "icon": "ticket",
  "updated": "2026-10-15",
  "related": [
    "pnr-and-waiting-lists",
    "pnr-status-explained",
    "vikalp-and-alternate-routes"
  ],
  "sections": [
    {
      "title": "A probability is an estimate—not your ticket status",
      "titleHi": "संभावना अनुमान है, टिकट की स्थिति नहीं",
      "body": "A confirmation percentage estimates a future outcome. Your current PNR result records the booking status available at the time of the enquiry. If the passenger row still says WL, an 80% estimate does not turn it into CNF. Read the status and the estimate separately, and use the official railway record for boarding decisions.",
      "bodyHi": "कन्फर्मेशन प्रतिशत भविष्य के परिणाम का अनुमान है। वर्तमान PNR परिणाम जाँच के समय उपलब्ध बुकिंग स्थिति बताता है। यात्री की पंक्ति में WL हो तो 80% अनुमान उसे CNF नहीं बनाता। स्थिति और अनुमान अलग पढ़ें तथा बोर्डिंग का निर्णय आधिकारिक रेलवे रिकॉर्ड के अनुसार लें।",
      "links": [
        {
          "href": "/pnr-status",
          "label": "Check PNR and request an estimate",
          "labelHi": "PNR जाँचें और अनुमान देखें"
        }
      ]
    },
    {
      "title": "What does an 80% chance mean?",
      "titleHi": "80% संभावना का क्या अर्थ है?",
      "body": "Illustrative example: in a well-calibrated model, a large group of comparable bookings given an 80% estimate would confirm about 80 times out of 100. It does not mean that your ticket is 80% confirmed, that 80 seats remain, or that four of five family members will receive berths. RailQ has not independently measured RailRadar’s calibration or published an accuracy rate. Treat the number as a planning signal, not a promise.",
      "bodyHi": "केवल उदाहरण: सही तरह से कैलिब्रेट किए गए मॉडल में 80% अनुमान वाली बहुत-सी तुलनीय बुकिंग में लगभग 100 में 80 कन्फर्म होंगी। इसका अर्थ आपका टिकट 80% कन्फर्म होना, 80 सीटें बचना या परिवार के पाँच में चार लोगों को बर्थ मिलना नहीं है। RailQ ने RailRadar के मॉडल की कैलिब्रेशन स्वतंत्र रूप से नहीं मापी है और अपनी सटीकता दर प्रकाशित नहीं की है। इस संख्या को योजना में मदद मानें, वादा नहीं।"
    },
    {
      "title": "How to check the estimate on RailQ",
      "titleHi": "RailQ पर अनुमान कैसे देखें",
      "body": "First submit your PNR and check that the train, date, class and passenger rows match your booking. For an eligible WL/RAC result, select “Check confirmation chance”. This is a separate request; opening the page alone does not fetch a prediction. If an estimate is returned, read it alongside the current status. The present RailQ integration displays a booking-level estimate; it does not calculate a separate percentage for each passenger.",
      "bodyHi": "पहले PNR डालें और ट्रेन, तारीख, श्रेणी तथा हर यात्री की पंक्ति अपनी बुकिंग से मिलाएँ। पात्र WL/RAC परिणाम में “कन्फर्म होने की संभावना देखें” चुनें। यह अलग अनुरोध है; केवल पेज खोलने से अनुमान नहीं माँगा जाता। अनुमान मिले तो उसे वर्तमान स्थिति के साथ पढ़ें। RailQ का मौजूदा इंटीग्रेशन बुकिंग स्तर का अनुमान दिखाता है; हर यात्री के लिए अलग प्रतिशत नहीं निकालता।",
      "links": [
        {
          "href": "/pnr-status",
          "label": "Check PNR and request an estimate",
          "labelHi": "PNR जाँचें और अनुमान देखें"
        }
      ]
    },
    {
      "title": "Why a smaller WL number is not enough",
      "titleHi": "केवल छोटा WL नंबर पर्याप्त क्यों नहीं",
      "body": "A move from WL 20 to WL 8 shows progress in the displayed waiting-list position. It does not provide the number of future cancellations or the time at which a berth will be allotted. Compare the complete status, class, journey date and quota on the same booking. Avoid comparing GNWL 8 on one train with RLWL 8 on another as though they were the same queue. A moving queue can still leave uncertainty close to departure.",
      "bodyHi": "WL 20 से WL 8 होना दिखाई गई प्रतीक्षा स्थिति में सुधार है। इससे आगे होने वाले रद्दीकरण की संख्या या बर्थ मिलने का समय पता नहीं चलता। उसी बुकिंग की पूरी स्थिति, श्रेणी, यात्रा तारीख और कोटा मिलाएँ। एक ट्रेन के GNWL 8 और दूसरी के RLWL 8 को एक कतार न मानें। कतार आगे बढ़ने पर भी प्रस्थान के पास अनिश्चितता रह सकती है।",
      "links": [
        {
          "href": "/guides/pnr-and-waiting-lists",
          "label": "Understand waiting-list movement",
          "labelHi": "वेटलिस्ट में बदलाव समझें"
        },
        {
          "href": "/guides/gnwl-rlwl-pqwl-tqwl-difference",
          "label": "Compare waiting-list categories",
          "labelHi": "वेटलिस्ट श्रेणियाँ समझें"
        }
      ]
    },
    {
      "title": "Use the estimate to choose your next check",
      "titleHi": "अनुमान से अगली जाँच तय करें",
      "body": "Do not use a fixed percentage as a universal “book” or “cancel” rule. A flexible solo trip and a family journey for a fixed appointment have different consequences if the ticket stays uncertain. Decide the latest time at which you need a dependable alternative. Compare another date, class or direct train first; then consider a connection if every leg and the transfer are practical. Check the original ticket’s current cancellation conditions before changing plans.",
      "bodyHi": "किसी तय प्रतिशत को सबके लिए “बुक करें” या “रद्द करें” का नियम न बनाएँ। लचीली अकेले की यात्रा और जरूरी समय पर परिवार के साथ पहुँचने की यात्रा में अनिश्चित टिकट के परिणाम अलग होते हैं। तय करें कब तक भरोसेमंद विकल्प चाहिए। पहले दूसरी तारीख, श्रेणी या सीधी ट्रेन देखें; फिर हर हिस्से और ट्रांसफर के व्यावहारिक होने पर कनेक्शन चुनें। योजना बदलने से पहले मूल टिकट की वर्तमान रद्दीकरण शर्तें देखें।",
      "links": [
        {
          "href": "/seat-availability",
          "label": "Compare dates and seat availability",
          "labelHi": "तारीख और सीट उपलब्धता की तुलना करें"
        },
        {
          "href": "/connecting-trains",
          "label": "Find direct and connecting trains",
          "labelHi": "सीधी और कनेक्टिंग ट्रेनें खोजें"
        },
        {
          "href": "/guides/cancellation-and-refunds",
          "label": "Check the correct cancellation workflow",
          "labelHi": "सही रद्दीकरण प्रक्रिया देखें"
        }
      ]
    },
    {
      "title": "Why is the estimate missing or different later?",
      "titleHi": "अनुमान गायब या बाद में अलग क्यों हो सकता है?",
      "body": "An unavailable estimate is not a 0% chance. The provider may not support the booking, may have insufficient data or may be temporarily unavailable. A later result may differ as its inputs change. RailQ does not fill gaps with a made-up percentage, and a previously fetched number should not override a newer official status. Recheck when it informs a decision instead of repeatedly pressing the button.",
      "bodyHi": "अनुमान न मिलने का अर्थ 0% संभावना नहीं है। प्रदाता उस बुकिंग को सपोर्ट न करता हो, पर्याप्त डेटा न हो या सेवा अस्थायी रूप से अनुपलब्ध हो सकती है। इनपुट बदलने पर बाद का परिणाम अलग हो सकता है। RailQ खाली जगह पर मनगढ़ंत प्रतिशत नहीं देता और पुराना प्रतिशत नई आधिकारिक स्थिति से ऊपर नहीं है। बार-बार बटन दबाने के बजाय निर्णय के लिए जरूरत होने पर जाँचें।"
    },
    {
      "title": "Can a high score guarantee travel or a family berth?",
      "titleHi": "क्या ऊँचा प्रतिशत यात्रा या परिवार की बर्थ की गारंटी है?",
      "body": "No. Neither a high percentage nor the status of the first passenger establishes the result for everyone else. Read each passenger row and verify the final applicable travel conditions. If two services disagree, compare their enquiry times and use the official enquiry. When reporting a problem, share the page and error message; hide the full PNR, passenger names and ticket QR code.",
      "bodyHi": "नहीं। ऊँचा प्रतिशत या पहले यात्री की स्थिति बाकी सबका परिणाम तय नहीं करती। हर यात्री की पंक्ति और अंतिम लागू यात्रा शर्तें जाँचें। दो सेवाएँ अलग बताएँ तो जाँच का समय मिलाएँ और आधिकारिक जाँच करें। समस्या बताते समय पेज और त्रुटि साझा करें; पूरा PNR, यात्री नाम और टिकट QR कोड छिपाएँ।",
      "links": [
        {
          "href": "/guides/partially-confirmed-family-ticket",
          "label": "Read a mixed-status family booking",
          "labelHi": "परिवार की मिली-जुली स्थिति समझें"
        }
      ]
    }
  ]
};
export const confirmationReferences: GuideAddition = {
  "checked": "15 October 2026",
  "checkedHi": "15 अक्टूबर 2026",
  "sources": [
    {
      "label": "RailRadar: PNR prediction API and probability format",
      "url": "https://railradar.in/docs/pnr-prediction"
    },
    {
      "label": "Indian Railways: current PNR status and prediction notice",
      "url": "https://www.indianrail.gov.in/enquiry/PNR/PnrEnquiry.html?locale=en"
    }
  ],
  "tools": [
    "pnr-status",
    "seat-availability"
  ],
  "sections": [
    {
      "title": "A probability is an estimate—not your ticket status",
      "titleHi": "संभावना अनुमान है, टिकट की स्थिति नहीं",
      "body": "A confirmation percentage estimates a future outcome. Your current PNR result records the booking status available at the time of the enquiry. If the passenger row still says WL, an 80% estimate does not turn it into CNF. Read the status and the estimate separately, and use the official railway record for boarding decisions.",
      "bodyHi": "कन्फर्मेशन प्रतिशत भविष्य के परिणाम का अनुमान है। वर्तमान PNR परिणाम जाँच के समय उपलब्ध बुकिंग स्थिति बताता है। यात्री की पंक्ति में WL हो तो 80% अनुमान उसे CNF नहीं बनाता। स्थिति और अनुमान अलग पढ़ें तथा बोर्डिंग का निर्णय आधिकारिक रेलवे रिकॉर्ड के अनुसार लें।",
      "links": [
        {
          "href": "/pnr-status",
          "label": "Check PNR and request an estimate",
          "labelHi": "PNR जाँचें और अनुमान देखें"
        }
      ]
    },
    {
      "title": "What does an 80% chance mean?",
      "titleHi": "80% संभावना का क्या अर्थ है?",
      "body": "Illustrative example: in a well-calibrated model, a large group of comparable bookings given an 80% estimate would confirm about 80 times out of 100. It does not mean that your ticket is 80% confirmed, that 80 seats remain, or that four of five family members will receive berths. RailQ has not independently measured RailRadar’s calibration or published an accuracy rate. Treat the number as a planning signal, not a promise.",
      "bodyHi": "केवल उदाहरण: सही तरह से कैलिब्रेट किए गए मॉडल में 80% अनुमान वाली बहुत-सी तुलनीय बुकिंग में लगभग 100 में 80 कन्फर्म होंगी। इसका अर्थ आपका टिकट 80% कन्फर्म होना, 80 सीटें बचना या परिवार के पाँच में चार लोगों को बर्थ मिलना नहीं है। RailQ ने RailRadar के मॉडल की कैलिब्रेशन स्वतंत्र रूप से नहीं मापी है और अपनी सटीकता दर प्रकाशित नहीं की है। इस संख्या को योजना में मदद मानें, वादा नहीं।"
    },
    {
      "title": "How to check the estimate on RailQ",
      "titleHi": "RailQ पर अनुमान कैसे देखें",
      "body": "First submit your PNR and check that the train, date, class and passenger rows match your booking. For an eligible WL/RAC result, select “Check confirmation chance”. This is a separate request; opening the page alone does not fetch a prediction. If an estimate is returned, read it alongside the current status. The present RailQ integration displays a booking-level estimate; it does not calculate a separate percentage for each passenger.",
      "bodyHi": "पहले PNR डालें और ट्रेन, तारीख, श्रेणी तथा हर यात्री की पंक्ति अपनी बुकिंग से मिलाएँ। पात्र WL/RAC परिणाम में “कन्फर्म होने की संभावना देखें” चुनें। यह अलग अनुरोध है; केवल पेज खोलने से अनुमान नहीं माँगा जाता। अनुमान मिले तो उसे वर्तमान स्थिति के साथ पढ़ें। RailQ का मौजूदा इंटीग्रेशन बुकिंग स्तर का अनुमान दिखाता है; हर यात्री के लिए अलग प्रतिशत नहीं निकालता।",
      "links": [
        {
          "href": "/pnr-status",
          "label": "Check PNR and request an estimate",
          "labelHi": "PNR जाँचें और अनुमान देखें"
        }
      ]
    },
    {
      "title": "Why a smaller WL number is not enough",
      "titleHi": "केवल छोटा WL नंबर पर्याप्त क्यों नहीं",
      "body": "A move from WL 20 to WL 8 shows progress in the displayed waiting-list position. It does not provide the number of future cancellations or the time at which a berth will be allotted. Compare the complete status, class, journey date and quota on the same booking. Avoid comparing GNWL 8 on one train with RLWL 8 on another as though they were the same queue. A moving queue can still leave uncertainty close to departure.",
      "bodyHi": "WL 20 से WL 8 होना दिखाई गई प्रतीक्षा स्थिति में सुधार है। इससे आगे होने वाले रद्दीकरण की संख्या या बर्थ मिलने का समय पता नहीं चलता। उसी बुकिंग की पूरी स्थिति, श्रेणी, यात्रा तारीख और कोटा मिलाएँ। एक ट्रेन के GNWL 8 और दूसरी के RLWL 8 को एक कतार न मानें। कतार आगे बढ़ने पर भी प्रस्थान के पास अनिश्चितता रह सकती है।",
      "links": [
        {
          "href": "/guides/pnr-and-waiting-lists",
          "label": "Understand waiting-list movement",
          "labelHi": "वेटलिस्ट में बदलाव समझें"
        },
        {
          "href": "/guides/gnwl-rlwl-pqwl-tqwl-difference",
          "label": "Compare waiting-list categories",
          "labelHi": "वेटलिस्ट श्रेणियाँ समझें"
        }
      ]
    },
    {
      "title": "Use the estimate to choose your next check",
      "titleHi": "अनुमान से अगली जाँच तय करें",
      "body": "Do not use a fixed percentage as a universal “book” or “cancel” rule. A flexible solo trip and a family journey for a fixed appointment have different consequences if the ticket stays uncertain. Decide the latest time at which you need a dependable alternative. Compare another date, class or direct train first; then consider a connection if every leg and the transfer are practical. Check the original ticket’s current cancellation conditions before changing plans.",
      "bodyHi": "किसी तय प्रतिशत को सबके लिए “बुक करें” या “रद्द करें” का नियम न बनाएँ। लचीली अकेले की यात्रा और जरूरी समय पर परिवार के साथ पहुँचने की यात्रा में अनिश्चित टिकट के परिणाम अलग होते हैं। तय करें कब तक भरोसेमंद विकल्प चाहिए। पहले दूसरी तारीख, श्रेणी या सीधी ट्रेन देखें; फिर हर हिस्से और ट्रांसफर के व्यावहारिक होने पर कनेक्शन चुनें। योजना बदलने से पहले मूल टिकट की वर्तमान रद्दीकरण शर्तें देखें।",
      "links": [
        {
          "href": "/seat-availability",
          "label": "Compare dates and seat availability",
          "labelHi": "तारीख और सीट उपलब्धता की तुलना करें"
        },
        {
          "href": "/connecting-trains",
          "label": "Find direct and connecting trains",
          "labelHi": "सीधी और कनेक्टिंग ट्रेनें खोजें"
        },
        {
          "href": "/guides/cancellation-and-refunds",
          "label": "Check the correct cancellation workflow",
          "labelHi": "सही रद्दीकरण प्रक्रिया देखें"
        }
      ]
    },
    {
      "title": "Why is the estimate missing or different later?",
      "titleHi": "अनुमान गायब या बाद में अलग क्यों हो सकता है?",
      "body": "An unavailable estimate is not a 0% chance. The provider may not support the booking, may have insufficient data or may be temporarily unavailable. A later result may differ as its inputs change. RailQ does not fill gaps with a made-up percentage, and a previously fetched number should not override a newer official status. Recheck when it informs a decision instead of repeatedly pressing the button.",
      "bodyHi": "अनुमान न मिलने का अर्थ 0% संभावना नहीं है। प्रदाता उस बुकिंग को सपोर्ट न करता हो, पर्याप्त डेटा न हो या सेवा अस्थायी रूप से अनुपलब्ध हो सकती है। इनपुट बदलने पर बाद का परिणाम अलग हो सकता है। RailQ खाली जगह पर मनगढ़ंत प्रतिशत नहीं देता और पुराना प्रतिशत नई आधिकारिक स्थिति से ऊपर नहीं है। बार-बार बटन दबाने के बजाय निर्णय के लिए जरूरत होने पर जाँचें।"
    },
    {
      "title": "Can a high score guarantee travel or a family berth?",
      "titleHi": "क्या ऊँचा प्रतिशत यात्रा या परिवार की बर्थ की गारंटी है?",
      "body": "No. Neither a high percentage nor the status of the first passenger establishes the result for everyone else. Read each passenger row and verify the final applicable travel conditions. If two services disagree, compare their enquiry times and use the official enquiry. When reporting a problem, share the page and error message; hide the full PNR, passenger names and ticket QR code.",
      "bodyHi": "नहीं। ऊँचा प्रतिशत या पहले यात्री की स्थिति बाकी सबका परिणाम तय नहीं करती। हर यात्री की पंक्ति और अंतिम लागू यात्रा शर्तें जाँचें। दो सेवाएँ अलग बताएँ तो जाँच का समय मिलाएँ और आधिकारिक जाँच करें। समस्या बताते समय पेज और त्रुटि साझा करें; पूरा PNR, यात्री नाम और टिकट QR कोड छिपाएँ।",
      "links": [
        {
          "href": "/guides/partially-confirmed-family-ticket",
          "label": "Read a mixed-status family booking",
          "labelHi": "परिवार की मिली-जुली स्थिति समझें"
        }
      ]
    }
  ]
};
export const journeyExpansions: Record<string, GuideSection[]> = {
  "pnr-and-waiting-lists": [
    {
      "title": "My WL number improved. What actually changed?",
      "titleHi": "मेरा WL नंबर घटा। असल में क्या बदला?",
      "body": "Illustrative example: booking WL/20 and current WL/8 show an original position and a newer position. The displayed queue position improved by 12, but this is not proof that exactly 12 passengers cancelled or that eight further cancellations will confirm your berth. Quota and allocation processes matter. Keep the category with the number, compare the same passenger, and do not turn the amount of movement into a percentage yourself.",
      "bodyHi": "उदाहरण: बुकिंग WL/20 और वर्तमान WL/8 शुरुआती और नई स्थिति दिखाते हैं। दिखाई गई कतार में 12 स्थान का सुधार हुआ, लेकिन यह ठीक 12 यात्रियों के रद्द करने या आठ और रद्दीकरण से आपकी बर्थ कन्फर्म होने का प्रमाण नहीं है। कोटा और आवंटन प्रक्रिया मायने रखते हैं। संख्या के साथ श्रेणी देखें, उसी यात्री की तुलना करें और बदलाव को खुद प्रतिशत में न बदलें।",
      "links": [
        {
          "href": "/guides/pnr-confirmation-probability",
          "label": "What a confirmation percentage means",
          "labelHi": "कन्फर्मेशन प्रतिशत का अर्थ"
        }
      ]
    },
    {
      "title": "Make a fallback plan while the ticket is uncertain",
      "titleHi": "टिकट अनिश्चित हो तो वैकल्पिक योजना रखें",
      "body": "Write down your latest acceptable arrival and the time you need to leave home. Check another date or direct train while you still have time to choose. A connecting route adds another booking and a transfer to verify. If the estimate is low or unavailable, it is a prompt to examine alternatives—not proof the ticket cannot confirm. Choose a decision time that fits your trip rather than waiting for a particular percentage.",
      "bodyHi": "पहुँचने की अंतिम स्वीकार्य समय-सीमा और घर से निकलने का समय लिखें। विकल्प चुनने का समय हो तभी दूसरी तारीख या सीधी ट्रेन देखें। कनेक्टिंग मार्ग में दूसरी बुकिंग और ट्रांसफर की जाँच भी जरूरी है। अनुमान कम या अनुपलब्ध हो तो विकल्प देखें; इससे टिकट कभी कन्फर्म नहीं होगा, यह सिद्ध नहीं होता। किसी प्रतिशत का इंतजार करने के बजाय अपनी यात्रा के अनुसार निर्णय का समय तय करें।",
      "links": [
        {
          "href": "/seat-availability",
          "label": "Check alternative dates",
          "labelHi": "दूसरी तारीखें जाँचें"
        },
        {
          "href": "/connecting-trains",
          "label": "Find direct and connecting trains",
          "labelHi": "सीधी और कनेक्टिंग ट्रेनें खोजें"
        }
      ]
    }
  ],
  "vikalp-and-alternate-routes": [
    {
      "title": "Low confirmation chances: compare alternatives in this order",
      "titleHi": "कन्फर्मेशन संभावना कम हो तो इस क्रम में विकल्प देखें",
      "body": "Start with a different departure time, date or class on a direct service. Next compare nearby stations only if you can reach them comfortably. Then use the connecting-train planner for routes with one train change. Compare the whole journey: both ticket prices, station transport, waiting time and any overnight accommodation. A cheaper individual ticket can produce a more expensive or less practical overall trip.",
      "bodyHi": "पहले सीधी ट्रेन में दूसरा समय, तारीख या श्रेणी देखें। फिर पास के स्टेशन तभी चुनें जब आराम से पहुँच सकें। इसके बाद एक बार ट्रेन बदलने वाले मार्ग के लिए कनेक्टिंग ट्रेन प्लानर उपयोग करें। पूरी यात्रा की तुलना करें: दोनों टिकट, स्टेशन परिवहन, इंतजार और रात में रुकने का खर्च। एक सस्ता टिकट मिलकर महँगी या कम व्यावहारिक यात्रा बना सकता है।",
      "links": [
        {
          "href": "/connecting-trains",
          "label": "Find direct and connecting trains",
          "labelHi": "सीधी और कनेक्टिंग ट्रेनें खोजें"
        },
        {
          "href": "/seat-availability",
          "label": "Check seats on each train",
          "labelHi": "हर ट्रेन की सीट जाँचें"
        },
        {
          "href": "/train-fare",
          "label": "Compare each leg’s fare",
          "labelHi": "हर हिस्से का किराया देखें"
        }
      ]
    },
    {
      "title": "Read a connection across midnight correctly",
      "titleHi": "आधी रात के पार कनेक्शन सही पढ़ें",
      "body": "Illustrative timetable: the first train arrives on 20 October at 23:30 and the next leaves on 21 October at 02:15. The scheduled gap is 2 hours 45 minutes, not a negative interval. If the first train arrives 90 minutes late, only 75 minutes remain before the second train’s scheduled departure, before allowing for walking or a station change. This is an example, not an actual service or a recommended connection.",
      "bodyHi": "केवल उदाहरण: पहली ट्रेन 20 अक्टूबर को 23:30 पर आती है और अगली 21 अक्टूबर को 02:15 पर जाती है। समय अंतर 2 घंटे 45 मिनट है, ऋणात्मक समय नहीं। पहली ट्रेन 90 मिनट लेट पहुँचे तो दूसरी के निर्धारित प्रस्थान तक केवल 75 मिनट बचेंगे; इसमें पैदल चलना या स्टेशन बदलना अभी शामिल नहीं है। यह उदाहरण है, वास्तविक सेवा या सुझाया कनेक्शन नहीं।",
      "links": [
        {
          "href": "/connection-buffer-calculator",
          "label": "Work through your transfer margin",
          "labelHi": "अपना ट्रांसफर अंतर जाँचें"
        }
      ]
    },
    {
      "title": "What the connecting planner does—and what it cannot promise",
      "titleHi": "कनेक्टिंग प्लानर क्या बताता है और किसकी गारंटी नहीं देता",
      "body": "RailQ searches timetable options with up to one train change and displays the exact station codes, dates and scheduled gap. The minimum gap you select is your planning preference, not an official rule. Routes without complete timings or enough gap are omitted. A result does not confirm seats, reserve tickets or establish that you will catch the second train. Check live running separately near travel time.",
      "bodyHi": "RailQ समय-सारणी में अधिकतम एक ट्रेन बदलाव वाले मार्ग खोजता है और सही स्टेशन कोड, तारीख तथा निर्धारित समय अंतर दिखाता है। चुना न्यूनतम अंतर आपकी योजना की पसंद है, आधिकारिक नियम नहीं। अधूरे समय या कम अंतर वाले मार्ग नहीं दिखते। परिणाम सीट कन्फर्म, टिकट आरक्षित या दूसरी ट्रेन पकड़ना सुनिश्चित नहीं करता। यात्रा के पास लाइव स्थिति अलग जाँचें।",
      "links": [
        {
          "href": "/live-train-status",
          "label": "Check running status",
          "labelHi": "लाइव स्थिति देखें"
        }
      ]
    },
    {
      "title": "Before paying for separate legs",
      "titleHi": "अलग-अलग हिस्सों के टिकट खरीदने से पहले",
      "body": "Verify the available class and passenger status on both trains, and review the terms in the authorised booking service. RailQ does not link PNRs or create refund protection. Do not assume that two independently purchased tickets receive the same treatment as an officially linked connecting booking. If a delay causes a missed connection, contact the booking service or railway staff promptly for the applicable process and evidence requirements.",
      "bodyHi": "दोनों ट्रेनों की उपलब्ध श्रेणी और यात्री स्थिति जाँचें तथा अधिकृत बुकिंग सेवा की शर्तें पढ़ें। RailQ PNR लिंक या रिफंड सुरक्षा नहीं बनाता। अलग खरीदे दो टिकटों को आधिकारिक लिंक वाली कनेक्टिंग बुकिंग जैसा न मानें। देरी से कनेक्शन छूटे तो लागू प्रक्रिया और प्रमाण के लिए बुकिंग सेवा या रेलवे कर्मचारी से तुरंत संपर्क करें।",
      "links": [
        {
          "href": "/guides/cancellation-and-refunds",
          "label": "Find the relevant refund guidance",
          "labelHi": "संबंधित रिफंड मार्गदर्शन देखें"
        }
      ]
    }
  ],
  "pnr-status-explained": [
    {
      "title": "Where confirmation chances fit into your result",
      "titleHi": "परिणाम में कन्फर्मेशन संभावना की भूमिका",
      "body": "Current status answers what the booking shows now. The optional confirmation estimate answers a different question about a possible future outcome. For supported WL/RAC results, use the separate confirmation-chance button, then read the explanation before acting. Keep checking every passenger row; a booking-level percentage must not be presented as a guaranteed individual berth.",
      "bodyHi": "वर्तमान स्थिति बताती है अभी बुकिंग में क्या है। वैकल्पिक कन्फर्मेशन अनुमान संभावित भविष्य के परिणाम का अलग सवाल समझाता है। सपोर्ट किए गए WL/RAC परिणाम में अलग संभावना बटन चुनें, फिर निर्णय से पहले व्याख्या पढ़ें। हर यात्री की पंक्ति देखें; बुकिंग स्तर के प्रतिशत को किसी व्यक्ति की बर्थ की गारंटी न मानें।",
      "links": [
        {
          "href": "/guides/pnr-confirmation-probability",
          "label": "What a confirmation percentage means",
          "labelHi": "कन्फर्मेशन प्रतिशत का अर्थ"
        }
      ]
    }
  ]
};
