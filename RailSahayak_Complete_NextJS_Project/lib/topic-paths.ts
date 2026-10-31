export const topicData = {
  "pnr": {
    "title": [
      "Understand your PNR before making a decision",
      "निर्णय से पहले अपना PNR समझें"
    ],
    "summary": [
      "Current status describes your booking now. A confirmation estimate concerns a possible future outcome; it is not a confirmed berth. Check every passenger separately.",
      "वर्तमान स्थिति अभी की बुकिंग बताती है। कन्फर्मेशन अनुमान संभावित भविष्य का संकेत है, कन्फर्म बर्थ नहीं। हर यात्री की स्थिति अलग जाँचें।"
    ],
    "example": [
      "Illustrative example: Passenger 1 is CNF and Passenger 2 is WL/5. A booking-level estimate of 80% does not mean Passenger 2 has a berth. Verify both rows before deciding to travel.",
      "उदाहरण: यात्री 1 CNF है और यात्री 2 WL/5 है। बुकिंग स्तर का 80% अनुमान यात्री 2 को बर्थ मिलना नहीं बताता। यात्रा तय करने से पहले दोनों पंक्तियाँ जाँचें।"
    ],
    "links": [
      [
        "/pnr-status",
        "Check current PNR status",
        "वर्तमान PNR स्थिति देखें"
      ],
      [
        "/guides/pnr-confirmation-probability",
        "Understand the confirmation percentage",
        "कन्फर्मेशन प्रतिशत समझें"
      ],
      [
        "/guides/pnr-and-waiting-lists",
        "Understand waiting-list movement",
        "वेटलिस्ट में बदलाव समझें"
      ],
      [
        "/guides/partially-confirmed-family-ticket",
        "Read a mixed-status family ticket",
        "परिवार की मिली-जुली स्थिति समझें"
      ]
    ],
    "source": [
      "Indian Railways: PNR enquiry and prediction notice",
      "https://www.indianrail.gov.in/enquiry/PNR/PnrEnquiry.html?locale=en"
    ]
  },
  "connection": {
    "title": [
      "Compare the whole connection",
      "पूरे कनेक्शन की तुलना करें"
    ],
    "summary": [
      "A connecting route is a timetable option, not a reservation. Check both train dates, the exact interchange stations and seat availability on every leg.",
      "कनेक्टिंग मार्ग समय-सारणी का विकल्प है, आरक्षण नहीं। दोनों ट्रेनों की तारीख, बदलने वाले सही स्टेशन और हर हिस्से की सीट उपलब्धता जाँचें।"
    ],
    "example": [
      "Illustrative example: arrival at 23:30 and onward departure at 02:15 the next day gives 2 hours 45 minutes. A 90-minute arrival delay leaves 75 minutes before the scheduled departure, before walking or road travel.",
      "उदाहरण: रात 23:30 पर आगमन और अगले दिन 02:15 पर प्रस्थान के बीच 2 घंटे 45 मिनट हैं। पहली ट्रेन 90 मिनट लेट हो तो पैदल या सड़क यात्रा से पहले केवल 75 मिनट बचते हैं।"
    ],
    "links": [
      [
        "/connecting-trains",
        "Find a route with one train change",
        "एक बदलाव वाला मार्ग खोजें"
      ],
      [
        "/connection-buffer-calculator",
        "Assess your transfer margin",
        "ट्रांसफर समय जाँचें"
      ],
      [
        "/seat-availability",
        "Check seats for both trains",
        "दोनों ट्रेनों की सीट जाँचें"
      ],
      [
        "/guides/vikalp-and-alternate-routes",
        "Compare alternatives before paying",
        "भुगतान से पहले विकल्प समझें"
      ]
    ],
    "source": [
      "Indian Railways: train enquiry",
      "https://enquiry.indianrail.gov.in/mntes/"
    ]
  },
  "booking": {
    "title": [
      "Keep booking, charting and refunds separate",
      "बुकिंग, चार्ट और रिफंड अलग समझें"
    ],
    "summary": [
      "A booking date tells you when to prepare. A chart-time estimate helps you plan a status check. A refund calculation is an estimate, not an approved refund. Verify the applicable action in your booking account.",
      "बुकिंग तारीख तैयारी का समय बताती है। चार्ट का अनुमान स्थिति जाँचने की योजना में मदद करता है। रिफंड गणना अनुमान है, स्वीकृत रिफंड नहीं। बुकिंग खाते में लागू कार्रवाई जाँचें।"
    ],
    "example": [
      "Planning example: before cancelling a family ticket, identify who will travel, read each current status, check the amount shown by the booking service and save its acknowledgement. Do not cancel everyone just to investigate one passenger’s uncertainty.",
      "योजना का उदाहरण: परिवार का टिकट रद्द करने से पहले तय करें कौन जाएगा, हर यात्री की वर्तमान स्थिति पढ़ें, बुकिंग सेवा में दिखी रकम जाँचें और रसीद रखें। एक यात्री की अनिश्चितता समझने के लिए सबका टिकट रद्द न करें।"
    ],
    "links": [
      [
        "/booking-date-calculator",
        "Plan when to book",
        "बुकिंग का समय तय करें"
      ],
      [
        "/chart-preparation-calculator",
        "Estimate first-chart timing",
        "पहले चार्ट का समय अनुमानित करें"
      ],
      [
        "/guides/cancellation-and-refunds",
        "Choose the relevant refund process",
        "संबंधित रिफंड प्रक्रिया समझें"
      ],
      [
        "/refund-calculator",
        "Estimate a refund",
        "रिफंड का अनुमान देखें"
      ]
    ],
    "source": [
      "IRCTC: official booking service",
      "https://www.irctc.co.in/"
    ]
  }
} as const;
export const topicPaths: Record<string, keyof typeof topicData> = {
  "pnr-status": "pnr",
  "guides/pnr-confirmation-probability": "pnr",
  "guides/pnr-status-explained": "pnr",
  "guides/pnr-and-waiting-lists": "pnr",
  "guides/partially-confirmed-family-ticket": "pnr",
  "connecting-trains": "connection",
  "connection-buffer-calculator": "connection",
  "trains-between-stations": "connection",
  "guides/vikalp-and-alternate-routes": "connection",
  "booking-date-calculator": "booking",
  "chart-preparation-calculator": "booking",
  "refund-calculator": "booking",
  "cancellation-deadline-calculator": "booking",
  "guides/booking-and-advance-reservation": "booking",
  "guides/chart-preparation": "booking",
  "guides/cancellation-and-refunds": "booking"
};
