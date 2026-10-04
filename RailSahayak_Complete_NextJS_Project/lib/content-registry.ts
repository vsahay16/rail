export type ContentSection = { title: string; titleHi: string; body: string; bodyHi: string; bullets?: string[]; bulletsHi?: string[] };
export type ContentPage = { slug: string; title: string; titleHi: string; eyebrow: string; eyebrowHi: string; description: string; descriptionHi: string; updated?: string; sections: ContentSection[] };

export const contentPages: ContentPage[] = [
  { slug: "about", title: "Built around the Indian passenger", titleHi: "भारतीय यात्री के लिए बनाया गया", eyebrow: "About RailQ", eyebrowHi: "RailQ के बारे में", description: "RailQ brings railway tools, explanations and official verification links into one calm bilingual experience.", descriptionHi: "RailQ रेलवे टूल्स, सरल जानकारी और आधिकारिक सत्यापन लिंक को एक सहज द्विभाषी अनुभव में लाता है।", sections: [
    { title: "Our purpose", titleHi: "हमारा उद्देश्य", body: "A railway journey creates many small questions. Our purpose is to answer them in the order a traveller needs them—without hiding the answer behind noise.", bodyHi: "रेल यात्रा में कई छोटे सवाल आते हैं। हमारा उद्देश्य उन्हें यात्री की जरूरत के क्रम में जवाब देना है—बिना अनावश्यक शोर के।" },
    { title: "Independent by design", titleHi: "स्वतंत्र सेवा", body: "RailQ is not Indian Railways or IRCTC. We use third-party railway data, clearly label estimates and point passengers back to official services for final decisions.", bodyHi: "RailQ भारतीय रेल या IRCTC नहीं है। हम तीसरे पक्ष से रेलवे डेटा लेते हैं, अनुमानों को स्पष्ट दिखाते हैं और अंतिम निर्णय के लिए आधिकारिक सेवाओं की ओर ले जाते हैं।" },
    { title: "What we optimise for", titleHi: "हमारी प्राथमिकताएँ", body: "Fast mobile pages, accessible forms, Hindi and English, honest confidence labels, privacy-aware analytics and advertising that never disguises itself as a result.", bodyHi: "तेज़ मोबाइल पेज, सुगम फॉर्म, हिंदी और English, ईमानदार भरोसा लेबल, गोपनीय एनालिटिक्स और परिणाम जैसा न दिखने वाला विज्ञापन।" },
  ]},
  { slug: "contact", title: "Contact RailQ", titleHi: "RailQ से संपर्क", eyebrow: "Questions and feedback", eyebrowHi: "सवाल और प्रतिक्रिया", description: "Send a correction, partnership query, accessibility issue or product suggestion through the secure contact form.", descriptionHi: "सुधार, साझेदारी, सुगमता समस्या या उत्पाद सुझाव सुरक्षित संपर्क फॉर्म से भेजें।", sections: [
    { title: "Before you send", titleHi: "भेजने से पहले", body: "Never include a full PNR, OTP, password, card number, Aadhaar number or another passenger’s personal information. RailQ cannot book, cancel or modify an official railway ticket.", bodyHi: "पूरा PNR, OTP, पासवर्ड, कार्ड नंबर, आधार नंबर या किसी दूसरे यात्री की निजी जानकारी न भेजें। RailQ आधिकारिक टिकट बुक, रद्द या बदल नहीं सकता।" },
  ]},
  { slug: "methodology", title: "How RailQ reaches an answer", titleHi: "RailQ उत्तर कैसे तैयार करता है", eyebrow: "Methodology", eyebrowHi: "हमारी प्रक्रिया", description: "A transparent separation between provider data, calculations, historical signals and official authority.", descriptionHi: "प्रदाता डेटा, गणना, ऐतिहासिक संकेत और आधिकारिक स्रोत के बीच स्पष्ट अंतर।", sections: [
    { title: "Provider data", titleHi: "प्रदाता डेटा", body: "PNR, live running and reservation-dependent results are requested server-side from the configured railway-data provider. The browser never receives the provider key.", bodyHi: "PNR, लाइव रनिंग और आरक्षण-आधारित परिणाम सर्वर से जुड़े रेलवे डेटा प्रदाता द्वारा लिए जाते हैं। ब्राउज़र को प्रदाता कुंजी नहीं मिलती।" },
    { title: "Calculations and estimates", titleHi: "गणना और अनुमान", body: "Date, berth and connection tools apply documented rules or transparent heuristics. Every estimate is labelled and should be rechecked when the underlying rule can change.", bodyHi: "तारीख, बर्थ और कनेक्शन टूल्स स्पष्ट नियम या अनुमान उपयोग करते हैं। हर अनुमान पर लेबल है और बदलने वाले नियमों को फिर जाँचना चाहिए।" },
    { title: "Confidence labels", titleHi: "भरोसा लेबल", body: "Provider data means it came from the connected feed. Planning estimate means it was calculated. Official link means the final decision belongs on the linked railway service. Not available means we do not know.", bodyHi: "प्रदाता डेटा जुड़ी फ़ीड से आता है। योजना अनुमान गणना है। आधिकारिक लिंक पर अंतिम निर्णय होता है। उपलब्ध नहीं का अर्थ है कि हमें जानकारी नहीं मिली।" },
  ]},
  { slug: "corrections", title: "Corrections policy", titleHi: "सुधार नीति", eyebrow: "Accuracy and accountability", eyebrowHi: "सटीकता और जवाबदेही", description: "How rule changes, factual errors and unclear labels are reviewed and corrected.", descriptionHi: "नियम बदलाव, तथ्यात्मक गलती और अस्पष्ट लेबल की समीक्षा व सुधार कैसे होता है।", sections: [
    { title: "Report with evidence", titleHi: "प्रमाण के साथ रिपोर्ट करें", body: "Use the contact form and include the page URL, the exact statement, the date observed and an official source where possible. Do not include sensitive ticket data.", bodyHi: "संपर्क फॉर्म में पेज URL, सही कथन, देखी गई तारीख और संभव हो तो आधिकारिक स्रोत दें। संवेदनशील टिकट डेटा न दें।" },
    { title: "Review order", titleHi: "समीक्षा क्रम", body: "Safety-critical and money-related errors are prioritised, followed by live-data mapping, rule explanations, translations and presentation issues.", bodyHi: "सुरक्षा और पैसे से जुड़ी गलती पहले, फिर लाइव डेटा मैपिंग, नियम, अनुवाद और प्रस्तुति समस्याएँ देखी जाती हैं।" },
    { title: "Visible corrections", titleHi: "दिखने वाले सुधार", body: "Material editorial changes should update the page date or correction note. Provider outages are labelled as availability issues and are not replaced with invented data.", bodyHi: "महत्वपूर्ण संपादकीय बदलाव पर पेज तारीख या सुधार नोट अपडेट होना चाहिए। प्रदाता समस्या को उपलब्धता समस्या दिखाया जाता है, काल्पनिक डेटा नहीं।" },
  ]},
  { slug: "privacy", title: "Privacy policy", titleHi: "गोपनीयता नीति", eyebrow: "Privacy first", eyebrowHi: "गोपनीयता पहले", description: "How searches, optional analytics, favourites and support messages are handled.", descriptionHi: "खोज, वैकल्पिक एनालिटिक्स, पसंदीदा स्टेशन और सहायता संदेशों का प्रबंधन।", updated: "24 August 2026", sections: [
    { title: "Journey searches", titleHi: "यात्रा खोज", body: "PNR and journey inputs are sent to the site’s server only to answer the request. PNRs are submitted in a POST body, not a page URL, and are excluded from analytics and application logs. Other searches can include station codes and train numbers in request URLs. Live providers may process the query under their own terms.", bodyHi: "PNR और यात्रा जानकारी केवल अनुरोध का उत्तर देने के लिए साइट सर्वर पर भेजी जाती है। PNR को POST बॉडी में भेजते हैं, पेज URL में नहीं; इसे एनालिटिक्स और एप्लिकेशन लॉग से बाहर रखते हैं। अन्य खोज अनुरोध URL में स्टेशन कोड और ट्रेन नंबर हो सकते हैं। लाइव प्रदाता अपनी शर्तों के तहत क्वेरी संसाधित कर सकता है।" },
    { title: "Reminder data", titleHi: "रिमाइंडर डेटा", body: "PNR email alerts are paused and new subscriptions are not accepted. Calendar files are generated on your device and must be imported into your calendar. Recent train searches and favourites store only train numbers and station codes in this browser until you remove them or clear site data. No PNR or journey date is saved with favourites.", bodyHi: "PNR ईमेल अलर्ट बंद हैं और नए अनुरोध नहीं लिए जाते। कैलेंडर फ़ाइल आपके डिवाइस पर बनती है और कैलेंडर में जोड़नी होती है। हाल की ट्रेन खोज और पसंदीदा ट्रेन नंबर और स्टेशन कोड इसी ब्राउज़र में हटाने तक रहते हैं। इनके साथ PNR या यात्रा तारीख सेव नहीं होती।" },
    { title: "Analytics", titleHi: "एनालिटिक्स", body: "RailQ can record page views, tool names, broad outcomes and an anonymous session identifier. Full PNRs, passenger names, email addresses and form contents are excluded. IP handling depends on the configured analytics provider and should use available privacy controls.", bodyHi: "RailQ पेज व्यू, टूल नाम, सामान्य परिणाम और अनाम सत्र ID रिकॉर्ड कर सकता है। पूरा PNR, यात्री नाम, ईमेल और फॉर्म सामग्री शामिल नहीं होती। IP प्रबंधन एनालिटिक्स प्रदाता पर निर्भर है और उपलब्ध गोपनीयता नियंत्रण उपयोग होने चाहिए।" },
    { title: "Advertising and cookies", titleHi: "विज्ञापन और कुकीज़", body: "Advertising services may use cookies or similar identifiers after the consent setup required for the visitor’s region. Ads are labelled and kept separate from railway results. Do not enable personalised ads before the necessary consent and policy configuration is complete.", bodyHi: "विज्ञापन सेवाएँ क्षेत्र के अनुसार जरूरी सहमति के बाद कुकी या समान पहचान उपयोग कर सकती हैं। विज्ञापन स्पष्ट लेबल के साथ रेलवे परिणाम से अलग रहते हैं। आवश्यक सहमति और नीति सेटअप से पहले व्यक्तिगत विज्ञापन चालू न करें।" },
    { title: "Security and retention", titleHi: "सुरक्षा और डेटा अवधि", body: "Technical monitoring stores hourly counts, response durations and error categories, without PNRs or passenger details. Problem reports contain a tool name and problem code. Monitoring records older than 30 days are cleaned during subsequent monitored requests. Contact messages contain the details you submit and remain until the operator deletes them; you can request deletion through Contact. Hosting and railway providers process requests under their own policies.", bodyHi: "तकनीकी निगरानी में घंटेवार संख्या, जवाब का समय और त्रुटि श्रेणी रहती है, PNR या यात्री विवरण नहीं। समस्या रिपोर्ट में टूल और समस्या कोड रहता है। 30 दिन पुराने निगरानी रिकॉर्ड अगली निगरानी वाली खोजों पर हटते हैं। संपर्क संदेश संचालक के हटाने तक रहते हैं; संपर्क पेज से हटाने का अनुरोध करें। होस्टिंग और रेलवे प्रदाताओं की अपनी नीतियाँ लागू होती हैं।" },
    { title: "Your choices", titleHi: "आपके विकल्प", body: "Visitors can avoid reminders, reject optional cookies where offered and request deletion of contact or reminder data through the contact page. Identity verification may be required before fulfilling a request.", bodyHi: "उपयोगकर्ता रिमाइंडर न चुन सकते हैं, उपलब्ध होने पर वैकल्पिक कुकी अस्वीकार कर सकते हैं और संपर्क पेज से संपर्क या रिमाइंडर डेटा हटाने का अनुरोध कर सकते हैं। अनुरोध से पहले पहचान सत्यापन जरूरी हो सकता है।" },
  ]},
  { slug: "terms", title: "Terms of use", titleHi: "उपयोग की शर्तें", eyebrow: "Use RailQ responsibly", eyebrowHi: "RailQ का जिम्मेदार उपयोग", description: "The boundaries of this independent information service and the visitor’s responsibilities.", descriptionHi: "इस स्वतंत्र सूचना सेवा की सीमाएँ और उपयोगकर्ता की जिम्मेदारियाँ।", updated: "24 August 2026", sections: [
    { title: "Information service", titleHi: "सूचना सेवा", body: "RailQ provides tools, estimates, explanations and links. It is not a booking agent, railway authority or guarantee of a seat, refund, platform, punctuality or journey outcome.", bodyHi: "RailQ टूल्स, अनुमान, जानकारी और लिंक देता है। यह बुकिंग एजेंट या रेलवे प्राधिकरण नहीं और सीट, रिफंड, प्लेटफॉर्म, समय या यात्रा परिणाम की गारंटी नहीं देता।" },
    { title: "Acceptable use", titleHi: "स्वीकार्य उपयोग", body: "Do not probe, overload, scrape contrary to published controls, bypass rate limits, submit another person’s data without authority or use the service for fraud.", bodyHi: "सिस्टम की जाँच या ओवरलोड, नियंत्रण के विरुद्ध स्क्रैपिंग, रेट लिमिट बायपास, बिना अधिकार दूसरे का डेटा या धोखाधड़ी के लिए सेवा उपयोग न करें।" },
    { title: "Third-party services", titleHi: "तीसरे पक्ष की सेवाएँ", body: "Live data, official booking, analytics, advertising, email and hosting may be supplied by third parties. Their availability and terms apply to their services.", bodyHi: "लाइव डेटा, आधिकारिक बुकिंग, एनालिटिक्स, विज्ञापन, ईमेल और होस्टिंग तीसरे पक्ष से हो सकते हैं। उनकी सेवा पर उनकी उपलब्धता और शर्तें लागू होती हैं।" },
    { title: "Changes and availability", titleHi: "बदलाव और उपलब्धता", body: "Features may be changed, rate-limited or withdrawn for security, legal, provider or operational reasons. Material terms should show a revised effective date.", bodyHi: "सुरक्षा, कानूनी, प्रदाता या संचालन कारण से सुविधाएँ बदल, सीमित या बंद हो सकती हैं। महत्वपूर्ण शर्त बदलाव पर नई प्रभावी तारीख दिखनी चाहिए।" },
  ]},
  { slug: "disclaimer", title: "Railway information disclaimer", titleHi: "रेलवे जानकारी अस्वीकरण", eyebrow: "Important boundaries", eyebrowHi: "महत्वपूर्ण सीमाएँ", description: "Live feeds can be delayed, calculations can have exceptions and official railway records remain final.", descriptionHi: "लाइव फ़ीड में देरी हो सकती है, गणना में अपवाद हो सकते हैं और आधिकारिक रेलवे रिकॉर्ड अंतिम है।", sections: [
    { title: "Not official", titleHi: "आधिकारिक नहीं", body: "RailQ is an independent utility and is not affiliated with Indian Railways, IRCTC or the Ministry of Railways unless a specific written partnership is announced.", bodyHi: "RailQ एक स्वतंत्र सुविधा है और किसी लिखित साझेदारी की घोषणा के बिना भारतीय रेल, IRCTC या रेल मंत्रालय से संबद्ध नहीं है।" },
    { title: "Live data can change", titleHi: "लाइव डेटा बदल सकता है", body: "PNR, running, platform, coach, availability and fare information can change after the displayed time. Network or provider delays may make a result incomplete.", bodyHi: "PNR, रनिंग, प्लेटफॉर्म, कोच, उपलब्धता और किराया दिखाई गई जानकारी के बाद बदल सकते हैं। नेटवर्क या प्रदाता देरी से परिणाम अधूरा हो सकता है।" },
    { title: "Calculators are planning aids", titleHi: "कैलकुलेटर योजना सहायता हैं", body: "Booking, Tatkal, chart, cancellation, refund, luggage and connection results are estimates. Special trains, stations, quotas, circulars and ticket conditions can create exceptions.", bodyHi: "बुकिंग, तत्काल, चार्ट, रद्दीकरण, रिफंड, सामान और कनेक्शन परिणाम अनुमान हैं। विशेष ट्रेन, स्टेशन, कोटा, सर्कुलर और टिकट शर्तों में अपवाद हो सकते हैं।" },
  ]},
  { slug: "advertise", title: "Advertise with RailQ", titleHi: "RailQ पर विज्ञापन", eyebrow: "Useful, clearly labelled advertising", eyebrowHi: "उपयोगी और स्पष्ट विज्ञापन", description: "Reach Indian railway travellers without interrupting the answer they came to find.", descriptionHi: "भारतीय रेल यात्रियों तक पहुँचें—जिस उत्तर के लिए वे आए हैं उसे बाधित किए बिना।", sections: [
    { title: "Before programmatic ads", titleHi: "ऑटोमैटिक विज्ञापनों से पहले", body: "Until an advertising network approves the site, RailQ uses these placements for its own journey tools and a clearly labelled partnership invitation. No fake advertiser, fabricated offer or empty disruptive box is shown. Direct founding partnerships can begin only after traffic, contact handling and written placement terms are ready.", bodyHi: "विज्ञापन नेटवर्क की मंज़ूरी तक RailQ इन स्थानों पर अपने यात्रा टूल और स्पष्ट साझेदारी आमंत्रण दिखाता है। कोई नकली विज्ञापनदाता, झूठा ऑफर या खाली बाधक बॉक्स नहीं दिखाया जाता। शुरुआती सीधी साझेदारी ट्रैफिक, संपर्क व्यवस्था और लिखित शर्तें तैयार होने के बाद ही शुरू होगी।", bullets: ["House promotion: send visitors to useful RailQ tools", "Founding partner: fixed monthly placement with a written insertion order", "Affiliate links: only for relevant services with a visible disclosure"], bulletsHi: ["हाउस प्रमोशन: उपयोगकर्ताओं को उपयोगी RailQ टूल पर भेजें", "शुरुआती साझेदार: लिखित शर्त के साथ तय मासिक स्थान", "एफिलिएट लिंक: केवल उपयोगी सेवाओं के लिए स्पष्ट खुलासे के साथ"] },
    { title: "Available placements", titleHi: "उपलब्ध विज्ञापन स्थान", body: "The design includes responsive leaderboards after primary tools, in-content rectangles beside guides and lower-page placements. Inventory can be served through AdSense or direct campaigns.", bodyHi: "डिज़ाइन में मुख्य टूल के बाद रिस्पॉन्सिव लीडरबोर्ड, गाइड के पास इन-कंटेंट आयत और नीचे के स्थान हैं। इन्हें AdSense या सीधे अभियान से चलाया जा सकता है।", bullets: ["Desktop leaderboard: up to 970 × 90", "Mobile responsive: approximately 320 × 100", "In-content rectangle: 300 × 250"], bulletsHi: ["डेस्कटॉप लीडरबोर्ड: 970 × 90 तक", "मोबाइल रिस्पॉन्सिव: लगभग 320 × 100", "इन-कंटेंट आयत: 300 × 250"] },
    { title: "Editorial separation", titleHi: "संपादकीय अलगाव", body: "Ads are labelled, never placed inside the primary result and never styled as an official railway button. Sponsors cannot buy a confidence label or alter a calculation.", bodyHi: "विज्ञापन लेबल के साथ, मुख्य परिणाम से अलग और आधिकारिक रेलवे बटन जैसे नहीं होते। प्रायोजक भरोसा लेबल खरीद या गणना बदल नहीं सकते।" },
    { title: "Campaign requests", titleHi: "अभियान अनुरोध", body: "Use the contact page with the brand, destination URL, target geography, dates and proposed creative size. Travel, financial and regulated advertising may require additional review.", bodyHi: "संपर्क पेज पर ब्रांड, लिंक, लक्षित क्षेत्र, तारीख और रचनात्मक आकार भेजें। यात्रा, वित्तीय और विनियमित विज्ञापन की अतिरिक्त समीक्षा हो सकती है।" },
  ]},
  { slug: "alerts", title: "Railway alerts and reminders", titleHi: "रेलवे अलर्ट और रिमाइंडर", eyebrow: "Be ready at the right time", eyebrowHi: "सही समय पर तैयार रहें", description: "Create booking calendar reminders. PNR email monitoring is coming soon and is not accepting subscriptions.", descriptionHi: "बुकिंग के कैलेंडर रिमाइंडर बनाएँ। PNR ईमेल मॉनिटरिंग अभी शुरू नहीं है और नए अनुरोध नहीं लिए जाते।", sections: [
    { title: "PNR change alerts", titleHi: "PNR बदलाव अलर्ट", body: "PNR email alerts are coming soon and are paused in this release. We are not accepting new PNR or email reminder requests. Existing encrypted records are retained while verification, unsubscribe and delivery safeguards are completed.", bodyHi: "PNR ईमेल अलर्ट जल्द आएँगे और इस संस्करण में बंद हैं। नए PNR या ईमेल अनुरोध नहीं लिए जा रहे हैं। सत्यापन, अलर्ट बंद करने और डिलीवरी सुरक्षा पूरी होने तक पुराने एन्क्रिप्टेड रिकॉर्ड सुरक्षित हैं।" },
    { title: "Booking reminders", titleHi: "बुकिंग रिमाइंडर", body: "Booking and Tatkal calculators can create a local calendar file. The reminder remains on the visitor’s device or chosen calendar service.", bodyHi: "बुकिंग और तत्काल कैलकुलेटर स्थानीय कैलेंडर फाइल बनाते हैं। रिमाइंडर उपयोगकर्ता के डिवाइस या चुनी कैलेंडर सेवा में रहता है।" },
  ]},
  { slug: "railway-updates", title: "Railway rule updates", titleHi: "रेलवे नियम अपडेट", eyebrow: "Review queue", eyebrowHi: "समीक्षा सूची", description: "A transparent place for reviewed changes that affect calculators, guidance and passenger decisions.", descriptionHi: "कैलकुलेटर, गाइड और यात्री निर्णय पर असर डालने वाले समीक्षा किए बदलावों की स्पष्ट जगह।", sections: [
    { title: "What belongs here", titleHi: "यहाँ क्या आएगा", body: "Reviewed changes to reservation windows, Tatkal timings, charting, cancellation, refunds, quotas, luggage rules and passenger services should be summarised with an effective date and official source.", bodyHi: "आरक्षण अवधि, तत्काल समय, चार्ट, रद्दीकरण, रिफंड, कोटा, सामान नियम और यात्री सेवा बदलाव प्रभावी तारीख व आधिकारिक स्रोत के साथ यहाँ आएँगे।" },
    { title: "No unverified news feed", titleHi: "असत्यापित समाचार फ़ीड नहीं", body: "Until an update is sourced and reviewed, it should not change a calculator or appear as settled guidance. Social posts can be leads, not final authority.", bodyHi: "स्रोत और समीक्षा से पहले कोई अपडेट कैलकुलेटर नहीं बदलेगा या पक्का नियम नहीं बनेगा। सोशल पोस्ट संकेत हो सकते हैं, अंतिम स्रोत नहीं।" },
  ]},
  { slug: "blog", title: "RailQ journal", titleHi: "RailQ जर्नल", eyebrow: "Practical travel notes", eyebrowHi: "व्यावहारिक यात्रा नोट्स", description: "Deep explanations, product updates and seasonal planning notes for Indian railway passengers.", descriptionHi: "भारतीय रेल यात्रियों के लिए विस्तृत जानकारी, उत्पाद अपडेट और मौसमी यात्रा नोट्स।", sections: [
    { title: "Start with the guide library", titleHi: "गाइड लाइब्रेरी से शुरुआत करें", body: "The guide library already covers booking, Tatkal, refunds, PNR, coaches, charting, alternate routes, family journeys, stations and festival planning.", bodyHi: "गाइड लाइब्रेरी में बुकिंग, तत्काल, रिफंड, PNR, कोच, चार्ट, वैकल्पिक रूट, परिवार, स्टेशन और त्योहार यात्रा शामिल हैं।" },
    { title: "Publishing standard", titleHi: "प्रकाशन मानक", body: "Every article that states a changeable railway rule should include a source, review date and a plain-language distinction between a rule and an estimate.", bodyHi: "बदलने वाले रेलवे नियम वाले हर लेख में स्रोत, समीक्षा तारीख और नियम व अनुमान का सरल अंतर होना चाहिए।" },
  ]},
  { slug: "official-services", title: "Official railway services", titleHi: "आधिकारिक रेलवे सेवाएँ", eyebrow: "Final verification and action", eyebrowHi: "अंतिम सत्यापन और कार्रवाई", description: "Use the right official destination for booking, live enquiry and passenger assistance.", descriptionHi: "बुकिंग, लाइव पूछताछ और यात्री सहायता के लिए सही आधिकारिक सेवा चुनें।", sections: [
    { title: "IRCTC", titleHi: "IRCTC", body: "Use the official IRCTC website or app for ticket booking, account actions and the options shown against an online booking.", bodyHi: "टिकट बुकिंग, खाता कार्रवाई और ऑनलाइन बुकिंग से जुड़े विकल्प के लिए आधिकारिक IRCTC वेबसाइट या ऐप उपयोग करें।" },
    { title: "NTES", titleHi: "NTES", body: "Use National Train Enquiry System for official train running and station enquiry. Station displays and announcements can reflect the latest local operational change.", bodyHi: "आधिकारिक ट्रेन रनिंग और स्टेशन पूछताछ के लिए NTES उपयोग करें। स्टेशन डिस्प्ले और घोषणा नवीनतम स्थानीय बदलाव दिखा सकते हैं।" },
    { title: "RailMadad", titleHi: "RailMadad", body: "Use RailMadad for applicable passenger assistance and complaints. Keep the reference number and share only the data necessary for the issue.", bodyHi: "यात्री सहायता और लागू शिकायतों के लिए RailMadad उपयोग करें। संदर्भ नंबर रखें और केवल जरूरी जानकारी साझा करें।" },
  ]},
];

export function getContentPage(slug: string) { return contentPages.find((page) => page.slug === slug); }

// Substantive editorial replacements; original URLs remain unchanged.
const editorialUpdates: Record<string, Partial<ContentPage>> = {
  "blog": {
    "title": "Railway reading: choose a guide for your journey",
    "titleHi": "रेल यात्रा की पढ़ाई: जरूरत के अनुसार गाइड चुनें",
    "eyebrow": "Travel reading",
    "eyebrowHi": "यात्रा की पढ़ाई",
    "description": "Find the right RailQ guide for booking, reading a ticket, family travel and festival planning.",
    "descriptionHi": "बुकिंग, टिकट समझने, परिवार और त्योहार यात्रा के लिए सही RailQ गाइड चुनें।",
    "sections": [
      {
        "title": "Before booking",
        "titleHi": "बुकिंग से पहले",
        "body": "Compare stations, dates and classes before treating one train as your only option. The booking guide explains how to prepare a usable alternative and verify the issued ticket after payment.",
        "bodyHi": "एक ट्रेन पर निर्भर होने से पहले स्टेशन, तारीख और श्रेणी मिलाएँ। बुकिंग गाइड उपयोग योग्य विकल्प और भुगतान के बाद जारी टिकट जाँचना समझाती है।"
      },
      {
        "title": "After receiving a ticket",
        "titleHi": "टिकट मिलने के बाद",
        "body": "Read booking status and current status for every passenger. The PNR guide uses illustrative examples to explain missing allocations and why a waiting number is not a berth.",
        "bodyHi": "हर यात्री की बुकिंग और वर्तमान स्थिति पढ़ें। PNR गाइड उदाहरणों से खाली आवंटन और वेटलिस्ट संख्या बर्थ न होने का अंतर समझाती है।"
      }
    ]
  },
  "railway-updates": {
    "title": "Railway notices behind the planning tools",
    "titleHi": "योजना टूल्स से संबंधित रेलवे सूचनाएँ",
    "eyebrow": "Railway rule references",
    "eyebrowHi": "रेलवे नियम संदर्भ",
    "description": "Dated official notices relevant to advance reservation, Tatkal preparation and chart estimates, with practical next steps.",
    "descriptionHi": "अग्रिम आरक्षण, तत्काल तैयारी और चार्ट अनुमान की तारीख सहित आधिकारिक सूचनाएँ और अगले कदम।",
    "sections": [
      {
        "title": "Advance reservation: effective 1 November 2024",
        "titleHi": "अग्रिम आरक्षण: 1 नवंबर 2024 से लागू",
        "body": "The Ministry of Railways notice dated 17 October 2024 reduced the general window to 60 days, with exceptions. Use the booking-date calculator with the correct train-origin date and check the actual service before planning payment.",
        "bodyHi": "17 अक्टूबर 2024 की रेल मंत्रालय सूचना ने अपवादों के साथ सामान्य अवधि 60 दिन की। सही शुरुआती तारीख से बुकिंग कैलकुलेटर चलाएँ और भुगतान योजना से पहले वास्तविक सेवा जाँचें।"
      },
      {
        "title": "Tatkal authentication: July 2025 changes",
        "titleHi": "तत्काल सत्यापन: जुलाई 2025 बदलाव",
        "body": "The 11 June 2025 notice introduced Aadhaar-authenticated online users from 1 July and online Aadhaar OTP from 15 July. Prepare account access in advance and follow the current steps shown by IRCTC; RailQ does not perform identity verification.",
        "bodyHi": "11 जून 2025 की सूचना में 1 जुलाई से आधार-सत्यापित ऑनलाइन उपयोगकर्ता और 15 जुलाई से ऑनलाइन आधार OTP लागू किया गया। खाते की पहुँच पहले तैयार करें और IRCTC के मौजूदा चरण अपनाएँ; RailQ पहचान सत्यापन नहीं करता।"
      },
      {
        "title": "Chart estimates: check the actual status",
        "titleHi": "चार्ट अनुमान: वास्तविक स्थिति देखें",
        "body": "The linked Central Railway notice from July 2025 explains earlier first-chart preparation. A calculator gives a planning time, not proof that your chart is ready. Use the PNR chart status and the relevant charting location for a boarding decision.",
        "bodyHi": "जुड़ी जुलाई 2025 मध्य रेलवे सूचना पहले चार्ट को जल्दी बनाने का नियम समझाती है। कैलकुलेटर योजना का समय है, आपका चार्ट तैयार होने का प्रमाण नहीं। बोर्डिंग निर्णय में PNR चार्ट स्थिति और लागू चार्टिंग स्थान देखें।"
      }
    ]
  }
};
for (const page of contentPages) {
  if (editorialUpdates[page.slug]) Object.assign(page, editorialUpdates[page.slug], { updated: "3 October 2026" });
}

// Service-specific policy detail, reviewed with this release.
const policyUpdates: Record<string, ContentSection[]> = {
  "terms": [
    {
      "title": "What you can use RailQ for",
      "titleHi": "RailQ का उपयोग किसलिए करें",
      "body": "RailQ is an independent information service for planning Indian railway journeys. You can look up provider data, compare journey options, read guides and use planning calculators. RailQ does not issue tickets, collect railway fares, change reservations or process railway refunds. A result on this website is not a ticket or permission to board.",
      "bodyHi": "RailQ भारतीय रेल यात्रा की योजना के लिए स्वतंत्र सूचना सेवा है। यहाँ प्रदाता की जानकारी, यात्रा विकल्प, गाइड और योजना कैलकुलेटर मिलते हैं। RailQ टिकट जारी नहीं करता, रेलवे किराया नहीं लेता और आरक्षण या रेलवे रिफंड नहीं बदलता। यहाँ दिखा परिणाम टिकट या यात्रा की अनुमति नहीं है।"
    },
    {
      "title": "Check your inputs and the official record",
      "titleHi": "अपनी जानकारी और आधिकारिक रिकॉर्ड जाँचें",
      "body": "Choose the correct train, stations, date, class and ticket type. Read each passenger’s current status separately. Before paying, cancelling or boarding, verify the relevant details with the official railway service. If a RailQ estimate differs from the amount or status shown there, do not assume that the estimate overrides the official record.",
      "bodyHi": "सही ट्रेन, स्टेशन, तारीख, श्रेणी और टिकट प्रकार चुनें। हर यात्री की वर्तमान स्थिति अलग पढ़ें। भुगतान, रद्दीकरण या यात्रा से पहले आधिकारिक सेवा पर विवरण जाँचें। RailQ के अनुमान और वहाँ दिखी राशि या स्थिति में अंतर हो तो अनुमान को आधिकारिक रिकॉर्ड से ऊपर न मानें।"
    },
    {
      "title": "Use searches responsibly",
      "titleHi": "खोज का जिम्मेदारी से उपयोग करें",
      "body": "Search only for journeys you are entitled to check. Do not submit another passenger’s private information without permission, attempt to obtain secret keys, bypass request limits or overwhelm the service with automated requests. Repeated refreshes can consume a shared data allowance without producing a newer result. Respect any wait message before retrying.",
      "bodyHi": "केवल वही यात्रा खोजें जिसे जाँचने का आपको अधिकार हो। बिना अनुमति दूसरे यात्री की निजी जानकारी न दें, गुप्त कुंजी लेने, अनुरोध सीमा तोड़ने या स्वचालित खोज से सेवा पर भार डालने की कोशिश न करें। बार-बार रीफ्रेश से नया परिणाम मिले बिना साझा डेटा सीमा खर्च हो सकती है। दोबारा खोजने से पहले प्रतीक्षा संदेश मानें।"
    },
    {
      "title": "Privacy when asking for help",
      "titleHi": "सहायता लेते समय गोपनीयता",
      "body": "Use Contact for product questions and Corrections for factual problems. Include the affected page and a short description of what happened. Remove full PNRs, passenger names, phone numbers and account details from screenshots. Never send an OTP, password, payment-card number or identity document. The Privacy page explains how searches and messages are handled.",
      "bodyHi": "उत्पाद के सवाल के लिए संपर्क और तथ्य की गलती के लिए सुधार पेज उपयोग करें। प्रभावित पेज और समस्या का छोटा विवरण दें। स्क्रीनशॉट से पूरा PNR, यात्री का नाम, फोन और खाता विवरण हटाएँ। OTP, पासवर्ड, कार्ड नंबर या पहचान दस्तावेज न भेजें। गोपनीयता पेज खोज और संदेशों का प्रबंधन समझाता है।"
    },
    {
      "title": "Links, advertising and other providers",
      "titleHi": "लिंक, विज्ञापन और अन्य प्रदाता",
      "body": "Following an external link takes you to a separate service with its own terms and privacy policy. Check the destination before sharing information or paying. An advertisement or partner placement does not change a railway rule, reserve a seat or guarantee a third-party service. Direct questions about an external purchase to the provider that accepted it.",
      "bodyHi": "बाहरी लिंक की सेवा की अपनी शर्तें और गोपनीयता नीति होती हैं। जानकारी या भुगतान देने से पहले गंतव्य जाँचें। विज्ञापन या साझेदारी रेलवे नियम नहीं बदलती, सीट आरक्षित नहीं करती और अन्य सेवा की गारंटी नहीं देती। बाहरी खरीद के सवाल उसी प्रदाता से पूछें जिसने खरीद स्वीकार की।"
    },
    {
      "title": "Availability and reminders",
      "titleHi": "उपलब्धता और रिमाइंडर",
      "body": "Tools may be temporarily unavailable because of provider outages, maintenance or usage limits. PNR email alerts are currently paused; do not rely on them to monitor a ticket. A downloaded calendar reminder only works after you import it into your chosen calendar and check its time and notification settings. Keep your own record of important journey deadlines.",
      "bodyHi": "प्रदाता समस्या, रखरखाव या उपयोग सीमा से टूल अस्थायी रूप से बंद हो सकते हैं। PNR ईमेल अलर्ट अभी बंद हैं; टिकट की निगरानी के लिए उन पर निर्भर न रहें। डाउनलोड किया कैलेंडर रिमाइंडर तभी काम करेगा जब उसे कैलेंडर में जोड़कर समय और सूचना सेटिंग जाँचें। यात्रा की जरूरी समय-सीमाएँ अपने पास रखें।"
    },
    {
      "title": "Updates and questions about these terms",
      "titleHi": "इन शर्तों में बदलाव और सवाल",
      "body": "These terms describe the current use of RailQ. Features and the wording on this page may change as the service changes; the displayed update date identifies this revision. If a statement is unclear, use the contact page and identify the section you mean. For the limitations of individual results, also read the Disclaimer and Methodology pages.",
      "bodyHi": "ये शर्तें RailQ के वर्तमान उपयोग को समझाती हैं। सेवा के साथ सुविधाएँ और इस पेज की भाषा बदल सकती है; अपडेट तारीख इस संस्करण की पहचान है। कोई बात अस्पष्ट हो तो संपर्क पेज पर संबंधित खंड बताएँ। परिणामों की सीमाओं के लिए अस्वीकरण और कार्यप्रणाली पेज भी पढ़ें।"
    }
  ],
  "disclaimer": [
    {
      "title": "An independent planning service",
      "titleHi": "स्वतंत्र योजना सेवा",
      "body": "RailQ is not Indian Railways or IRCTC. It brings third-party data, explanatory guides and calculations together to help you plan. It cannot confirm a reservation, authorise travel, allocate a berth or settle a railway claim. Use the official record and the instructions of railway staff for actions that affect your journey.",
      "bodyHi": "RailQ भारतीय रेल या IRCTC नहीं है। यह योजना में मदद के लिए अन्य प्रदाताओं का डेटा, गाइड और गणना साथ लाता है। यह आरक्षण पक्का, यात्रा अधिकृत, बर्थ आवंटित या रेलवे दावा तय नहीं कर सकता। यात्रा पर असर डालने वाली कार्रवाई में आधिकारिक रिकॉर्ड और रेलवे कर्मचारियों के निर्देश मानें।"
    },
    {
      "title": "What a live result does and does not show",
      "titleHi": "लाइव परिणाम क्या बताता है",
      "body": "A provider response describes the information available when it was fetched. Network delays, caching or an incomplete response can make it older than the situation at the station. Read the displayed update time where available. “Not available” means a field was not supplied; it does not mean a cancellation, an empty train or a confirmed seat.",
      "bodyHi": "प्रदाता का जवाब जानकारी प्राप्त किए जाने के समय की स्थिति बताता है। नेटवर्क देरी, कैश या अधूरे जवाब से यह स्टेशन की स्थिति से पुराना हो सकता है। उपलब्ध हो तो अपडेट समय पढ़ें। “उपलब्ध नहीं” का अर्थ विवरण नहीं मिला है; यह रद्द ट्रेन, खाली ट्रेन या पक्की सीट का प्रमाण नहीं है।"
    },
    {
      "title": "PNR and passenger allocations",
      "titleHi": "PNR और यात्री आवंटन",
      "body": "Booking status and current status answer different questions. Check the current status for every passenger, not just the first row or the train name. A waitlist position is not a berth number. Do not infer a confirmed allocation from a missing coach field or from a prediction. Verify the latest PNR and applicable boarding conditions with the official service before travelling.",
      "bodyHi": "बुकिंग और वर्तमान स्थिति अलग जानकारी हैं। केवल पहली पंक्ति या ट्रेन नाम नहीं, हर यात्री की वर्तमान स्थिति जाँचें। वेटलिस्ट संख्या बर्थ नंबर नहीं है। खाली कोच विवरण या अनुमान से आवंटन पक्का न मानें। यात्रा से पहले आधिकारिक सेवा पर नवीनतम PNR और लागू बोर्डिंग शर्तें जाँचें।"
    },
    {
      "title": "Times, refunds and other estimates",
      "titleHi": "समय, रिफंड और अन्य अनुमान",
      "body": "Calculators apply the inputs and assumptions shown on the page. Train-origin dates, ticket type, quota, charting location and special conditions may affect the actual outcome. A refund estimate does not submit a cancellation or TDR claim. A booking reminder does not make a reservation. Complete the required action through the official service and retain its confirmation.",
      "bodyHi": "कैलकुलेटर पेज की जानकारी और मान्यताओं से गणना करते हैं। ट्रेन की शुरुआती तारीख, टिकट प्रकार, कोटा, चार्टिंग स्थान और विशेष शर्तें वास्तविक परिणाम बदल सकती हैं। रिफंड अनुमान रद्दीकरण या TDR दावा जमा नहीं करता। बुकिंग रिमाइंडर आरक्षण नहीं करता। जरूरी कार्रवाई आधिकारिक सेवा पर करके पुष्टि संभालें।"
    },
    {
      "title": "At the station and when changing trains",
      "titleHi": "स्टेशन पर और ट्रेन बदलते समय",
      "body": "Platform numbers, coach positions and arrival estimates can change. Check station displays and announcements and ask railway staff if the information conflicts. A suggested connection buffer cannot guarantee that you will catch another train. Allow for walking, luggage, accessibility needs and delays when choosing a connection; make a backup plan when missing it would cause a serious problem.",
      "bodyHi": "प्लेटफॉर्म, कोच स्थिति और आगमन अनुमान बदल सकते हैं। स्टेशन डिस्प्ले और घोषणाएँ देखें; विरोधी जानकारी पर रेलवे कर्मचारी से पूछें। सुझाया कनेक्शन अंतर अगली ट्रेन मिलने की गारंटी नहीं है। पैदल दूरी, सामान, सुगमता की जरूरत और देरी के लिए समय रखें; कनेक्शन छूटने से बड़ी परेशानी हो तो वैकल्पिक योजना बनाएँ।"
    },
    {
      "title": "If information is missing or looks wrong",
      "titleHi": "जानकारी गायब या गलत लगे तो",
      "body": "Do not treat an error screen as a railway decision. Retry after the suggested wait or use the official service linked on the page. To report a RailQ problem, send the page URL, the field that looks wrong and the time you saw it through Contact. Use a redacted screenshot if helpful. Do not include a full PNR, OTP or another passenger’s personal details.",
      "bodyHi": "त्रुटि स्क्रीन को रेलवे का निर्णय न मानें। सुझाई प्रतीक्षा के बाद प्रयास करें या पेज की आधिकारिक सेवा उपयोग करें। RailQ समस्या बताने के लिए संपर्क पर पेज URL, गलत विवरण और देखने का समय भेजें। जरूरत पर निजी जानकारी हटाया स्क्रीनशॉट दें। पूरा PNR, OTP या दूसरे यात्री का निजी विवरण न भेजें।"
    }
  ]
};
for (const page of contentPages) {
  if (policyUpdates[page.slug]) Object.assign(page, { sections: policyUpdates[page.slug], updated: "4 October 2026" });
}
