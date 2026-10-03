import type { GuideAddition } from "@/lib/guide-additions";
export const guideExpansions: Record<string, GuideAddition> = {
  "booking-and-advance-reservation": {
    "checked": "3 October 2026",
    "sources": [
      {
        "label": "Ministry of Railways: advance reservation notice, 17 October 2024",
        "url": "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2065790"
      },
      {
        "label": "IRCTC: official booking service",
        "url": "https://www.irctc.co.in/"
      }
    ],
    "tools": [
      "booking-date-calculator",
      "trains-between-stations",
      "seat-availability",
      "booking-reminders"
    ],
    "sections": [
      {
        "title": "Decide the journey you can actually use",
        "titleHi": "उपयोग योग्य यात्रा पहले तय करें",
        "body": "Write down the latest acceptable arrival time, your boarding station, luggage needs and acceptable classes. Compare two or three services against those constraints. A popular train is not automatically the best choice if its arrival requires an overnight wait or a difficult transfer.",
        "bodyHi": "पहुँचने की अंतिम स्वीकार्य सीमा, बोर्डिंग स्टेशन, सामान और श्रेणियाँ लिखें। इन जरूरतों से दो या तीन सेवाएँ मिलाएँ। लोकप्रिय ट्रेन हमेशा सही विकल्प नहीं होती, खासकर यदि आगमन के बाद रातभर इंतजार या कठिन ट्रांसफर हो।"
      },
      {
        "title": "Calculate the opening with the right date",
        "titleHi": "सही तारीख से बुकिंग खुलना निकालें",
        "body": "The general reservation window introduced from 1 November 2024 is 60 days excluding the journey date, with exceptions for some services. Check the originating date when you board after the train has already travelled overnight. Use the calculator for preparation, then confirm the actual opening offered by IRCTC.",
        "bodyHi": "1 नवंबर 2024 से सामान्य आरक्षण अवधि यात्रा का दिन छोड़कर 60 दिन है; कुछ सेवाओं के अपवाद हैं। रातभर चलने के बाद ट्रेन में चढ़ना हो तो शुरुआती तारीख देखें। कैलकुलेटर से तैयारी करें, फिर IRCTC में उपलब्ध वास्तविक बुकिंग समय जाँचें।"
      },
      {
        "title": "Example: the city is right, the station is wrong",
        "titleHi": "उदाहरण: शहर सही, स्टेशन गलत",
        "body": "Suppose your plan is to leave from New Delhi, but the selected service boards at another Delhi station. Before paying, check the station code, travel time to that station and the return journey as well. Save exact codes in your private itinerary so a second search uses the same pair. This is a planning example, not a recommendation for a particular train.",
        "bodyHi": "मान लें नई दिल्ली से जाने की योजना है लेकिन चुनी ट्रेन दिल्ली के दूसरे स्टेशन से है। भुगतान से पहले कोड, वहाँ पहुँचने का समय और वापसी भी देखें। निजी यात्रा सूची में सही कोड रखें ताकि अगली खोज समान हो। यह योजना का उदाहरण है, किसी ट्रेन की सिफारिश नहीं।"
      },
      {
        "title": "Prepare a short booking checklist",
        "titleHi": "छोटी बुकिंग सूची तैयार करें",
        "body": "Keep the details you need inside your own booking account or private notes. Do not send passenger information to a public help forum to speed up booking.",
        "bodyHi": "जरूरी जानकारी अपने बुकिंग खाते या निजी नोट में रखें। जल्दी बुकिंग के लिए यात्री विवरण सार्वजनिक सहायता मंच पर न भेजें।",
        "points": [
          "Correct train, date, boarding and destination codes",
          "Passenger details entered accurately in the booking service",
          "Class, quota and current availability reviewed",
          "Total payable amount and cancellation conditions checked"
        ],
        "pointsHi": [
          "सही ट्रेन, तारीख, बोर्डिंग और गंतव्य कोड",
          "बुकिंग सेवा में सही यात्री विवरण",
          "श्रेणी, कोटा और वर्तमान उपलब्धता की जाँच",
          "कुल भुगतान और रद्दीकरण शर्तों की जाँच"
        ]
      },
      {
        "title": "After payment, verify the booking record",
        "titleHi": "भुगतान के बाद बुकिंग रिकॉर्ड देखें",
        "body": "A bank debit alone does not show which booking stage completed. Open the official booking history and look for the issued ticket and passenger statuses. If the payment is uncertain, inspect transaction history before making a second attempt. Keep the confirmation privately and set a reminder to review the journey before departure.",
        "bodyHi": "बैंक से पैसा कटने से बुकिंग का पूरा चरण पता नहीं चलता। आधिकारिक इतिहास में जारी टिकट और यात्री स्थिति देखें। भुगतान स्पष्ट न हो तो दोबारा प्रयास से पहले लेन-देन इतिहास देखें। पुष्टि निजी रखें और यात्रा से पहले जाँच का रिमाइंडर बनाएँ।"
      }
    ]
  },
  "train-classes-and-coaches": {
    "checked": "3 October 2026",
    "sources": [
      {
        "label": "IRCTC: official booking service",
        "url": "https://www.irctc.co.in/"
      },
      {
        "label": "Indian Railways: PNR enquiry and status legend",
        "url": "https://www.indianrail.gov.in/enquiry/PNR/PnrEnquiry.html?locale=en"
      }
    ],
    "tools": [
      "coach-layout",
      "seat-berth-finder",
      "coach-position",
      "seat-availability"
    ],
    "sections": [
      {
        "title": "Choose for the journey, not just the price",
        "titleHi": "केवल कीमत नहीं, यात्रा के अनुसार चुनें",
        "body": "Compare journey length, overnight travel, air-conditioning preference and the needs of your group. A daytime seated journey and an overnight berth serve different purposes. Check which classes the particular train offers before comparing fares; not every service carries every coach type.",
        "bodyHi": "यात्रा की लंबाई, रात का सफर, AC की जरूरत और समूह की सुविधा देखें। दिन की सीट और रात की बर्थ अलग काम आती हैं। किराया तुलना से पहले ट्रेन में उपलब्ध श्रेणियाँ देखें; हर सेवा में हर कोच नहीं होता।"
      },
      {
        "title": "Read class and coach labels separately",
        "titleHi": "श्रेणी और कोच लेबल अलग पढ़ें",
        "body": "The class describes the accommodation booked. The coach label identifies the vehicle you should find on the platform. A berth number locates your place inside that coach. For example, a class field and a label such as B2 are not interchangeable; keep all the ticket fields together when checking the allocation.",
        "bodyHi": "श्रेणी बुक की जगह का प्रकार है। कोच लेबल प्लेटफॉर्म पर खोजने वाला डिब्बा है। बर्थ नंबर उस डिब्बे के अंदर जगह बताता है। श्रेणी और B2 जैसे लेबल एक नहीं हैं; आवंटन देखते समय टिकट के सभी फ़ील्ड साथ रखें।"
      },
      {
        "title": "Compare sleeping and seated arrangements",
        "titleHi": "सोने और बैठने की व्यवस्था की तुलना करें",
        "body": "SL denotes Sleeper; 3A and 2A denote AC three-tier and two-tier accommodation. CC denotes AC Chair Car and 2S denotes Second Sitting. A representative layout can help explain the arrangement, but it does not prove the exact vehicle design or final berth for your ticket.",
        "bodyHi": "SL स्लीपर है; 3A और 2A AC तीन-टियर और दो-टियर हैं। CC AC चेयर कार और 2S सेकंड सिटिंग है। उदाहरण लेआउट व्यवस्था समझाता है, लेकिन आपके टिकट का असली कोच डिज़ाइन या अंतिम बर्थ साबित नहीं करता।"
      },
      {
        "title": "Example: plan an overnight family journey",
        "titleHi": "उदाहरण: परिवार की रात की यात्रा",
        "body": "First check whether each traveller can use the allocated berth safely and comfortably. Then compare whether the departure and arrival fit the family’s routine. A lower-berth preference is not an allocation guarantee. Do not promise a specific berth to a family member until the official ticket actually shows it.",
        "bodyHi": "पहले देखें कि हर यात्री मिली बर्थ आराम और सुरक्षा से इस्तेमाल कर सकता है। फिर प्रस्थान व आगमन परिवार की दिनचर्या से मिलाएँ। लोअर बर्थ पसंद आवंटन की गारंटी नहीं है। आधिकारिक टिकट में दिखने से पहले किसी सदस्य को खास बर्थ का वादा न करें।"
      },
      {
        "title": "Before boarding",
        "titleHi": "बोर्डिंग से पहले",
        "body": "Check the current allocation and match the coach label to the station display. Use the layout to understand the coach interior, and coach position to locate it along the train. If the displayed rake differs, ask railway staff instead of inferring a new allocation from a diagram.",
        "bodyHi": "वर्तमान आवंटन देखें और स्टेशन डिस्प्ले से कोच लेबल मिलाएँ। अंदर की व्यवस्था के लिए लेआउट और ट्रेन में जगह के लिए कोच स्थिति देखें। रेक अलग हो तो चित्र से नया आवंटन मानने के बजाय रेलवे कर्मचारी से पूछें।"
      }
    ]
  },
  "vikalp-and-alternate-routes": {
    "checked": "3 October 2026",
    "sources": [
      {
        "label": "IRCTC: VIKALP terms and conditions",
        "url": "https://contents.irctc.co.in/en/vikalpTerms.html"
      }
    ],
    "tools": [
      "vikalp-eligibility",
      "trains-between-stations",
      "connection-buffer-calculator",
      "pnr-status"
    ],
    "sections": [
      {
        "title": "What choosing VIKALP does",
        "titleHi": "VIKALP चुनने का अर्थ",
        "body": "VIKALP requests consideration for an alternate service; it does not guarantee a berth. Check the option and offered trains in your official booking history. RailQ’s assistant cannot submit the preference or confirm an allocation. Read the linked IRCTC terms before selecting services.",
        "bodyHi": "VIKALP वैकल्पिक सेवा में विचार का अनुरोध है, बर्थ की गारंटी नहीं। आधिकारिक बुकिंग इतिहास में विकल्प और ट्रेनें देखें। RailQ सहायक पसंद जमा या आवंटन कन्फर्म नहीं कर सकता। ट्रेन चुनने से पहले जुड़े IRCTC नियम पढ़ें।"
      },
      {
        "title": "Only select alternatives you can reach",
        "titleHi": "वही विकल्प चुनें जहाँ पहुँच सकते हैं",
        "body": "Compare the exact departure station, date and arrival. A nearby station can still involve a long road transfer at a busy time. Write down the earliest time you can reach each alternative and the latest arrival you can accept. Remove choices that would miss an essential appointment.",
        "bodyHi": "सही प्रस्थान स्टेशन, तारीख और आगमन मिलाएँ। पास का स्टेशन भी भीड़ में लंबा सड़क ट्रांसफर माँग सकता है। हर विकल्प तक सबसे जल्दी पहुँचने और अंतिम स्वीकार्य आगमन का समय लिखें। जरूरी काम छुड़ाने वाले विकल्प न चुनें।"
      },
      {
        "title": "After an alternate is allotted",
        "titleHi": "वैकल्पिक ट्रेन मिलने के बाद",
        "body": "Recheck the PNR and the allotted train, including any changed station. IRCTC’s terms say passengers given alternate accommodation must not board the original train. Follow the cancellation conditions for the alternate allocation rather than assuming the original waiting-list treatment continues.",
        "bodyHi": "PNR और आवंटित ट्रेन के साथ बदला स्टेशन भी जाँचें। IRCTC की शर्तें कहती हैं कि वैकल्पिक जगह पाने वाले यात्री मूल ट्रेन में न चढ़ें। पुरानी वेटलिस्ट प्रक्रिया मानने के बजाय वैकल्पिक आवंटन की रद्दीकरण शर्तें देखें।"
      },
      {
        "title": "A separate connection is a different plan",
        "titleHi": "अलग कनेक्शन दूसरी योजना है",
        "body": "Booking two independent trains is not the same as receiving a VIKALP allocation. Work out the transfer yourself: scheduled gap, station change, platform access, luggage and delay margin. A short scheduled connection can become expensive if a missed train requires a fresh ticket or an overnight stay.",
        "bodyHi": "दो अलग ट्रेनें बुक करना VIKALP आवंटन जैसा नहीं। समय अंतर, स्टेशन बदलाव, प्लेटफॉर्म पहुँच, सामान और देरी स्वयं जोड़ें। कम समय का कनेक्शन छूटे तो नया टिकट या रात का ठहराव महँगा पड़ सकता है।"
      },
      {
        "title": "Keep a clear decision record",
        "titleHi": "निर्णय की स्पष्ट निजी सूची रखें",
        "body": "Before travel, put the final train, station, date and transport plan in one private note. Remove obsolete reminders so you do not act on the abandoned plan. Verify the final booking again before leaving for the station.",
        "bodyHi": "यात्रा से पहले अंतिम ट्रेन, स्टेशन, तारीख और परिवहन एक निजी नोट में रखें। पुराने रिमाइंडर हटाएँ ताकि छोड़ी योजना पर न चलें। स्टेशन निकलने से पहले अंतिम बुकिंग फिर देखें।"
      }
    ]
  },
  "family-and-senior-citizen-travel": {
    "checked": "3 October 2026",
    "sources": [
      {
        "label": "IRCTC: official booking service",
        "url": "https://www.irctc.co.in/"
      },
      {
        "label": "RailMadad: passenger assistance and complaints",
        "url": "https://railmadad.indianrailways.gov.in/"
      }
    ],
    "tools": [
      "seat-availability",
      "luggage-allowance",
      "coach-position",
      "booking-reminders"
    ],
    "sections": [
      {
        "title": "Start with the traveller who needs most time",
        "titleHi": "जिसे ज्यादा समय चाहिए उससे योजना शुरू करें",
        "body": "Choose the journey around walking distance, boarding steps, rest needs and comfortable arrival times. Avoid a plan that works only if everyone can rush between platforms. Ask the traveller what support is useful instead of assuming that age alone describes their mobility.",
        "bodyHi": "पैदल दूरी, चढ़ने के चरण, आराम और सुविधाजनक आगमन के अनुसार यात्रा चुनें। ऐसी योजना न रखें जिसमें सभी को प्लेटफॉर्म के बीच दौड़ना पड़े। केवल उम्र से क्षमता मानने के बजाय यात्री से जरूरी सहायता पूछें।"
      },
      {
        "title": "Check allocations for the whole group",
        "titleHi": "पूरे समूह का आवंटन देखें",
        "body": "Read every passenger row on the ticket. Being on the same PNR does not mean the same status or adjacent berths. Keep a preference request separate from the actual allocation. If the assigned accommodation is unsuitable, ask the booking service or railway staff about available options before travel.",
        "bodyHi": "टिकट की हर यात्री पंक्ति पढ़ें। एक PNR का अर्थ समान स्थिति या पास-पास बर्थ नहीं है। पसंद का अनुरोध और वास्तविक आवंटन अलग रखें। मिली जगह उपयुक्त न हो तो यात्रा से पहले बुकिंग सेवा या रेलवे कर्मचारी से विकल्प पूछें।"
      },
      {
        "title": "Make an arrival and assistance plan",
        "titleHi": "पहुँचने और सहायता की योजना बनाएँ",
        "body": "Check the exact station entrance, how you will reach the platform and whether the required assistance can be arranged. Do not assume a lift, wheelchair or porter will be immediately available. Keep the group together during station changes and allow time for a slower route when necessary.",
        "bodyHi": "सही प्रवेश, प्लेटफॉर्म का रास्ता और आवश्यक सहायता की व्यवस्था जाँचें। लिफ्ट, व्हीलचेयर या कुली तुरंत उपलब्ध होगा, ऐसा न मानें। स्टेशन बदलते समय साथ रहें और जरूरत हो तो धीमे रास्ते का समय रखें।"
      },
      {
        "title": "Pack essentials where they can be reached",
        "titleHi": "जरूरी सामान आसानी से मिलने वाली जगह रखें",
        "body": "Separate essentials from the large bags so they remain accessible during the journey. Keep personal records and prescription information private. This is a travel checklist, not medical advice.",
        "bodyHi": "जरूरी चीजें बड़े बैग से अलग रखें ताकि सफर में मिलें। निजी रिकॉर्ड और दवाओं की पर्ची गोपनीय रखें। यह यात्रा सूची है, चिकित्सा सलाह नहीं।",
        "points": [
          "Ticket and identification required for your booking",
          "Regular medicines and personal instructions already provided by your clinician",
          "Water, suitable food and a small change of clothing",
          "Charged phone and a privately saved family contact"
        ],
        "pointsHi": [
          "बुकिंग के लिए जरूरी टिकट और पहचान",
          "नियमित दवाएँ और चिकित्सक के पहले से दिए निर्देश",
          "पानी, उपयुक्त भोजन और अतिरिक्त कपड़ों की छोटी जोड़ी",
          "चार्ज फोन और निजी रूप से सहेजा पारिवारिक संपर्क"
        ]
      },
      {
        "title": "Agree on a simple separation plan",
        "titleHi": "अलग हो जाने पर सरल योजना रखें",
        "body": "Choose a visible meeting point and tell each adult who stays with the child or traveller needing assistance. If someone is separated, use railway staff and official assistance instead of moving the whole group repeatedly. Avoid publishing a child’s ticket, phone number or live location in public posts.",
        "bodyHi": "दिखने वाला मिलने का स्थान तय करें और हर वयस्क को बताएँ कि बच्चे या सहायता वाले यात्री के साथ कौन रहेगा। अलग होने पर पूरा समूह बार-बार घुमाने के बजाय रेलवे कर्मचारी और आधिकारिक सहायता लें। बच्चे का टिकट, फोन या लाइव स्थान सार्वजनिक न करें।"
      }
    ]
  },
  "station-and-onboard-travel": {
    "checked": "3 October 2026",
    "sources": [
      {
        "label": "NTES: official train enquiry",
        "url": "https://enquiry.indianrail.gov.in/"
      },
      {
        "label": "RailMadad: passenger assistance and complaints",
        "url": "https://railmadad.indianrailways.gov.in/"
      }
    ],
    "tools": [
      "platform-number",
      "coach-position",
      "live-train-status",
      "official-services"
    ],
    "sections": [
      {
        "title": "Before leaving for the station",
        "titleHi": "स्टेशन निकलने से पहले",
        "body": "Verify the station code, train number and boarding date from your ticket. Check current running information and allow time for the approach road, entry, security and platform access. A delayed estimate can change; do not reduce your margin to zero because an earlier result showed a delay.",
        "bodyHi": "टिकट से स्टेशन कोड, ट्रेन नंबर और बोर्डिंग तारीख मिलाएँ। लाइव स्थिति देखें और सड़क, प्रवेश, सुरक्षा व प्लेटफॉर्म का समय रखें। देरी का अनुमान बदल सकता है; पुराने परिणाम के भरोसे पूरा अतिरिक्त समय खत्म न करें।"
      },
      {
        "title": "At the station, use local information",
        "titleHi": "स्टेशन पर स्थानीय सूचना लें",
        "body": "Read the train number on the departure display and listen for updates. A platform or coach position shown online may be provisional. Follow designated crossings between platforms and keep bags out of walking routes. Ask railway staff when an announcement and an app disagree.",
        "bodyHi": "प्रस्थान डिस्प्ले में ट्रेन नंबर देखें और अपडेट सुनें। ऑनलाइन प्लेटफॉर्म या कोच स्थिति अस्थायी हो सकती है। प्लेटफॉर्म के बीच निर्धारित रास्ता लें और सामान रास्ते में न रखें। घोषणा और ऐप अलग हों तो रेलवे कर्मचारी से पूछें।"
      },
      {
        "title": "Find the coach before the train arrives",
        "titleHi": "ट्रेन आने से पहले कोच की जगह देखें",
        "body": "Match your coach label to the indicator without assuming the diagram’s left side is nearest the entrance. Keep enough space for passengers to get off. If your coach is not where expected, ask staff for guidance rather than rushing alongside a moving train.",
        "bodyHi": "प्रवेश की दिशा का अनुमान लगाए बिना कोच लेबल संकेतक से मिलाएँ। उतरने वालों के लिए जगह छोड़ें। कोच अपेक्षित जगह न हो तो चलती ट्रेन के साथ दौड़ने के बजाय कर्मचारी से सहायता लें।"
      },
      {
        "title": "Onboard checks",
        "titleHi": "ट्रेन में चढ़ने के बाद जाँच",
        "body": "Confirm the coach and berth against your allocation before settling in. Keep access to doors and aisles clear. Store valuables and travel documents so you can supervise them. If there is an allocation dispute, use railway staff rather than treating a third-party seat diagram as authority.",
        "bodyHi": "बैठने से पहले कोच और बर्थ अपने आवंटन से मिलाएँ। दरवाज़े और गलियारे खाली रखें। कीमती सामान व दस्तावेज़ निगरानी में रखें। आवंटन विवाद में वेबसाइट चित्र को अधिकार मानने के बजाय रेलवे कर्मचारी से संपर्क करें।"
      },
      {
        "title": "Ask for help with a clear description",
        "titleHi": "समस्या स्पष्ट बताकर मदद लें",
        "body": "For an applicable service complaint, use RailMadad and keep the reference privately. Explain the train, coach, location and problem through the official channel, sharing only what is necessary. A correction sent to RailQ is about this website; it does not open a railway assistance request.",
        "bodyHi": "लागू सेवा शिकायत RailMadad पर करें और संदर्भ निजी रखें। आधिकारिक माध्यम में जरूरी ट्रेन, कोच, स्थान और समस्या बताएँ। RailQ को भेजा सुधार इस वेबसाइट के लिए है; उससे रेलवे सहायता अनुरोध नहीं खुलता।"
      }
    ]
  },
  "festival-travel-planning": {
    "checked": "3 October 2026",
    "sources": [
      {
        "label": "IRCTC: official booking service",
        "url": "https://www.irctc.co.in/"
      },
      {
        "label": "NTES: official train enquiry",
        "url": "https://enquiry.indianrail.gov.in/"
      }
    ],
    "tools": [
      "booking-date-calculator",
      "trains-between-stations",
      "waitlist-guide",
      "connection-buffer-calculator"
    ],
    "sections": [
      {
        "title": "Plan a range of acceptable journeys",
        "titleHi": "स्वीकार्य यात्राओं की अवधि तय करें",
        "body": "Start with an arrival deadline and a budget that includes the station transfer and accommodation. Compare departures on nearby dates and the return leg before choosing the outward ticket. A confirmed outward trip with no workable return can create a second booking problem later.",
        "bodyHi": "पहुँचने की सीमा और स्टेशन ट्रांसफर व ठहरने सहित बजट तय करें। जाने का टिकट चुनने से पहले पास की तारीखें और वापसी देखें। जाने का कन्फर्म टिकट लेकिन उपयोग योग्य वापसी न होने से बाद में दूसरी समस्या बन सकती है।"
      },
      {
        "title": "Compare special trains carefully",
        "titleHi": "विशेष ट्रेन ध्यान से मिलाएँ",
        "body": "When a special service is offered, verify its exact number, operating dates, stations and class availability through official services. Do not reuse the timetable of a similarly named regular train. A social post announcing a train is not a ticket or proof of seats for your day.",
        "bodyHi": "विशेष सेवा मिले तो आधिकारिक माध्यम से सही नंबर, चलने की तारीखें, स्टेशन और श्रेणी देखें। मिलते नाम वाली नियमित ट्रेन की समय-सारणी न लगाएँ। सोशल पोस्ट आपकी तारीख की सीट या टिकट का प्रमाण नहीं है।"
      },
      {
        "title": "Set a decision point for an uncertain booking",
        "titleHi": "अनिश्चित बुकिंग के लिए निर्णय समय तय करें",
        "body": "Decide how late you can wait before committing to another usable option. Include any cancellation conditions for hotels and ground transport. Waiting-list movement can be encouraging without resolving your need to arrive on time; keep the appointment deadline visible in your plan.",
        "bodyHi": "तय करें कि दूसरे उपयोग योग्य विकल्प पर जाने से पहले कब तक प्रतीक्षा कर सकते हैं। होटल और परिवहन की रद्दीकरण शर्तें जोड़ें। वेटलिस्ट आगे बढ़ना अच्छा है लेकिन समय पर पहुँचने की जरूरत अलग है; योजना में जरूरी समय सीमा रखें।"
      },
      {
        "title": "Prepare for a crowded station",
        "titleHi": "भीड़ वाले स्टेशन की तैयारी करें",
        "body": "Keep luggage manageable and the ticket accessible. Agree on a meeting point with your group, charge phones and save the itinerary offline. Leave extra time for slower movement, but use the actual station and travel situation rather than one fixed arrival buffer for every journey.",
        "bodyHi": "सामान संभालने योग्य और टिकट आसानी से मिलने वाला रखें। समूह का मिलने का स्थान तय करें, फोन चार्ज करें और योजना ऑफलाइन रखें। धीमी आवाजाही का समय जोड़ें, लेकिन हर यात्रा के लिए एक तय समय के बजाय वास्तविक परिस्थिति देखें।"
      },
      {
        "title": "Review the whole plan before departure",
        "titleHi": "प्रस्थान से पहले पूरी योजना देखें",
        "body": "Recheck PNR, the operating date and live running information. Confirm that your pickup person has the correct arrival station and date. Remove reminders for abandoned trains and keep only the current plan so a busy travel day does not start with conflicting information.",
        "bodyHi": "PNR, संचालन तारीख और लाइव स्थिति फिर देखें। लेने आने वाले के पास सही स्टेशन और तारीख हो। छोड़ी ट्रेनों के रिमाइंडर हटाकर वर्तमान योजना रखें ताकि भीड़ वाले दिन उलझी जानकारी न रहे।"
      }
    ]
  }
};
