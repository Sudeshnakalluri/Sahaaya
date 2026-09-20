/**
 * Regional Language Dictionaries & Demo Presets for Sahaaya
 */

export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', speechCode: 'en-IN', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', speechCode: 'hi-IN', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', speechCode: 'ta-IN', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', speechCode: 'te-IN', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', speechCode: 'kn-IN', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', speechCode: 'bn-IN', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', speechCode: 'mr-IN', flag: '🇮🇳' }
];

export const DEMO_PRESETS = [
  {
    id: 'prd-widow-farmer',
    badge: 'PRD Official Demo',
    title: 'Widow Farmer (Tamil Nadu)',
    subtitle: '58 yrs • Farmer • Widow • Small Landowner',
    speechText: {
      en: "I am 58 years old. I am a widow. I live in Tamil Nadu. I have a small farm and my income is low.",
      hi: "मैं 58 वर्ष की विधवा हूँ। मैं तमिलनाडु में रहती हूँ। मेरा एक छोटा खेत है और मेरी आय कम है।",
      ta: "எனக்கு 58 வயது. நான் ஒரு விதவை. தமிழ்நாட்டில் வசிக்கிறேன். எனக்கு ஒரு சிறிய விவசாய நிலம் உள்ளது, என் வருமானம் குறைவு.",
      te: "నా వయస్సు 58 సంవత్సరాలు. నేను వితంతువును. తమిళనాడులో నివసిస్తున్నాను. నాకు చిన్న పొలం ఉంది, నా ఆదాయం తక్కువ.",
      kn: "ನನಗೆ 58 ವರ್ಷ. ನಾನು ವಿಧವೆ. ತಮಿಳುನಾಡಿನಲ್ಲಿ ವಾಸಿಸುತ್ತಿದ್ದೇನೆ. ನನಗೆ ಸಣ್ಣ ಜಮೀನು ಇದೆ ಮತ್ತು ನನ್ನ ಆದಾಯ ಕಡಿಮೆ ಇದೆ.",
      bn: "আমার বয়স ৫৮ বছর। আমি একজন বিধবা। তামিলনাড়ুতে থাকি। আমার একটি ছোট জমি আছে এবং আয় কম।",
      mr: "माझे वय ५८ वर्षे आहे. मी विधवा आहे. मी तामिळनाडूमध्ये राहते. माझी लहान शेती आहे आणि उत्पन्न कमी आहे."
    }
  },
  {
    id: 'rural-student',
    badge: 'Student Welfare',
    title: 'College Student (Uttar Pradesh)',
    subtitle: '20 yrs • Female • OBC • Higher Education',
    speechText: {
      en: "I am a 20-year-old female student from Uttar Pradesh. I belong to OBC category and my family annual income is 1.5 lakhs.",
      hi: "मैं उत्तर प्रदेश से 20 वर्षीय छात्रा हूँ। मैं ओबीसी श्रेणी से हूँ और मेरी पारिवारिक वार्षिक आय 1.5 लाख है।",
      ta: "நான் உத்தரபிரதேசத்தை சேர்ந்த 20 வயது மாணவி. நான் ஓபிசி பிரிவைச் சேர்ந்தவள், குடும்ப ஆண்டு வருமானம் 1.5 லட்சம்.",
      te: "నేను ఉత్తరప్రదేశ్ చెందిన 20 సంవత్సరాల విద్యార్థిని. నా కుటుంబ వార్షిక ఆదాయం 1.5 లక్షలు.",
      kn: "ನಾನು ಉತ್ತರ ಪ್ರದೇಶದ 20 ವರ್ಷದ ವಿದ್ಯಾರ್ಥಿನಿ. ಒಬಿಸಿ ವರ್ಗ ಮತ್ತು ಕುಟುಂಬ ವಾರ್ಷಿಕ ಆದಾಯ 1.5 ಲಕ್ಷ.",
      bn: "আমি উত্তরপ্রদেশের ২০ বছর বয়সী ছাত্রী। ওবিসি ক্যাটাগরি এবং পরিবারের বার্ষিক আয় ১.৫ লক্ষ।",
      mr: "मी उत्तर प्रदेशमधील २० वर्षांची विद्यार्थिनी आहे. मी ओबीसी प्रवर्गातील असून कौटुंबिक उत्पन्न १.५ लाख आहे."
    }
  },
  {
    id: 'senior-laborer',
    badge: 'Elderly Support',
    title: 'Senior Citizen (Karnataka)',
    subtitle: '62 yrs • Daily Wage Laborer • BPL',
    speechText: {
      en: "I am 62 years old living in Karnataka. I work as a daily wage laborer with no pension. My income is below poverty line.",
      hi: "मेरी उम्र 62 वर्ष है और मैं कर्नाटक में रहता हूँ। मैं दिहाड़ी मजदूर हूँ और कोई पेंशन नहीं है। मेरी आय गरीबी रेखा से नीचे है।",
      ta: "எனக்கு 62 வயது, கர்நாடகாவில் வசிக்கிறேன். எனக்கு எந்த ஓய்வூதியமும் இல்லை, தினக்கூலி தொழிலாளி. குறைந்த வருமானம்.",
      te: "నా వయస్సు 62 సంవత్సరాలు, కర్ణాటకలో ఉంటున్నాను. కూలీ పని చేస్తాను, పింఛను లేదు. పేదరిక రేఖకు దిగువన ఉన్నాను.",
      kn: "ನನಗೆ 62 ವರ್ಷ, ಕರ್ನಾಟಕದಲ್ಲಿ ವಾಸಿಸುತ್ತಿದ್ದೇನೆ. ದಿನಗೂಲಿ ಕಾರ್ಮಿಕ, ಯಾವುದೇ ಪಿಂಚಣಿ ಇಲ್ಲ. ಬಡತನ ರೇಖೆಗಿಂತ ಕೆಳಗಿದ್ದೇನೆ.",
      bn: "আমার বয়স ৬২ বছর, কর্ণাটকে থাকি। দিনমজুর হিসেবে কাজ করি, কোনো পেনশন নেই। আয় দারিদ্র্য সীমার নিচে।",
      mr: "माझे वय ६२ वर्षे आहे, मी कर्नाटकात राहतो. मी रोजंदारी मजूर आहे, कोणतीही पेन्शन नाही. उत्पन्न कमी आहे."
    }
  },
  {
    id: 'street-vendor',
    badge: 'Urban Livelihood',
    title: 'Street Vendor (Maharashtra)',
    subtitle: '34 yrs • Cart Vendor • Small Business Loan',
    speechText: {
      en: "I am 34 years old street vendor in Maharashtra. I sell vegetables on a handcart and need a working capital loan.",
      hi: "मैं महाराष्ट्र में 34 वर्षीय स्ट्रीट वेंडर हूँ। मैं ठेले पर सब्जियां बेचता हूँ और मुझे कार्यशील पूंजी ऋण की आवश्यकता है।",
      ta: "நான் மகாராஷ்டிராவில் 34 வயது தெருவோர வியாபாரி. தள்ளுவண்டியில் காய்கறி விற்கிறேன், தொழில் கடன் தேவைப்படுகிறது.",
      te: "నేను మహారాష్ట్రలో 34 సంవత్సరాల వీధి వ్యాపారిని. తోపుడు బండిపై కూరగాయలు అమ్ముతాను, మూలధన రుణం కావాలి.",
      kn: "ನಾನು ಮಹಾರಾಷ್ಟ್ರದ 34 ವರ್ಷದ ಬೀದಿ ವ್ಯಾಪಾರಿ. ತಳ್ಳುಗಾಡಿಯಲ್ಲಿ ತರಕಾರಿ ಮಾರುತ್ತೇನೆ, ಬಂಡವಾಳ ಸಾಲ ಬೇಕು.",
      bn: "আমি মহারাষ্ট্রের ৩৪ বছর বয়সী পথবিক্রেতা। ঠেলাগাড়িতে সবজি বিক্রি করি, ব্যবসার জন্য ঋণ প্রয়োজন।",
      mr: "मी महाराष्ट्रात ३४ वर्षांचा फेरीवाला आहे. मी हातगाडीवर भाजी विकतो आणि मला व्यवसाय कर्जाची गरज आहे."
    }
  }
];

export const UI_STRINGS = {
  en: {
    selectSchemeAction: "Select Scheme & View Steps",
    selectedSchemeLabel: "Selected Scheme",
    allSchemesOption: "All Eligible Schemes",
    documentsForScheme: "Required Documents for",
    listenToStep: "Listen",
    stepNum: "Step",
    viewActionPlanForScheme: "Get Documents & Application Roadmap",
    documentsChecklist: "Documents Checklist",
    appTitle: "SAHAAYA",
    appTagline: "Voice-First Government Scheme Navigator",
    motto: "“Speak. Discover. Benefit.”",
    theme: "Tech for a Better Tomorrow 📡",
    welcomeHeader: "Speak in your own language to discover your government welfare benefits.",
    welcomeSub: "No complicated forms or confusing portals. Simply press the microphone and describe your situation.",
    startListening: "Press to Speak",
    listening: "Listening... speak now",
    stopListening: "Done Speaking",
    typeInstead: "Or type instead",
    typePlaceholder: "e.g., I am 58 years old, a widow farmer from Tamil Nadu with low income...",
    analyzeButton: "Discover Schemes",
    demoPresetLabel: "Or try a quick demo persona:",
    extractedProfileTitle: "Extracted Profile Information",
    profileVerifiedNotice: "Facts extracted strictly from your statements",
    age: "Age",
    gender: "Gender",
    maritalStatus: "Marital Status",
    state: "State",
    occupation: "Occupation",
    landOwnership: "Land Ownership",
    incomeCategory: "Income Group",
    annualIncome: "Annual Income",
    socialCategory: "Category",
    followUpTitle: "One Quick Clarification",
    followUpSub: "Answering this helps unlock additional schemes you might qualify for.",
    followUpSpeak: "Speak your answer",
    followUpSubmit: "Save & Continue",
    resultsTitle: "Your Potential Welfare Benefits",
    likelyEligibleTab: "Likely Eligible",
    needsInfoTab: "Needs More Info",
    notMatchingTab: "Not Matching",
    allTab: "All Schemes",
    potentialBenefit: "Potential Benefit",
    whyMatches: "Why it may match",
    whyConflict: "Why it doesn't match yet",
    viewDetails: "View Details & Steps",
    readAloud: "Read Aloud",
    stopAudio: "Stop Reading",
    documentsRequired: "Documents Required",
    howToApply: "How to Apply",
    cscGuidance: "CSC / Panchayat Guidance",
    officialPortal: "Official Portal",
    lastVerified: "Verified as of",
    actionPlanTitle: "Personalized Action Plan & Document Checklist",
    actionPlanSub: "Take this checklist to your nearest Common Service Centre (CSC) or Gram Panchayat office.",
    stepByStepRoadmap: "5-Step Roadmap to Claim Benefits",
    downloadSummary: "Download Summary",
    printSummary: "Print / Save PDF",
    shareSummary: "Share Summary",
    resetSession: "Start New Query",
    disclaimerTitle: "Official Trust & Eligibility Disclaimer",
    disclaimerText: "This result is an initial eligibility check. Final eligibility and approval are determined exclusively by the respective government department.",
    cscHelp: "CSC Citizen Helpline: Dial 14599 or visit locator.csccloud.in",
    switchLanguage: "Change Language"
  },
  hi: {
    selectSchemeAction: "योजना चुनें और चरण देखें",
    selectedSchemeLabel: "चयनित योजना",
    allSchemesOption: "सभी पात्र योजनाएं",
    documentsForScheme: "के लिए आवश्यक दस्तावेज",
    listenToStep: "सुनें",
    stepNum: "चरण",
    viewActionPlanForScheme: "दस्तावेज और आवेदन चरण प्राप्त करें",
    documentsChecklist: "दस्तावेज चेकलिस्ट",
    appTitle: "सहाय (SAHAAYA)",
    appTagline: "आवाज आधारित सरकारी योजना मार्गदर्शक",
    motto: "“बोलिए। जानिए। लाभ उठाइए।”",
    theme: "एक बेहतर कल के लिए तकनीक 📡",
    welcomeHeader: "अपनी भाषा में बोलकर अपनी सरकारी कल्याणकारी योजनाओं की जानकारी पाएं।",
    welcomeSub: "कोई जटिल फॉर्म या कठिन वेबसाइट नहीं। बस माइक बटन दबाएं और अपने बारे में बताएं।",
    startListening: "बोलने के लिए दबाएं",
    listening: "सुन रहे हैं... कृपया बोलिए",
    stopListening: "बोलना समाप्त करें",
    typeInstead: "या लिखकर बताएं",
    typePlaceholder: "जैसे: मेरी उम्र 58 वर्ष है, मैं तमिलनाडु की विधवा किसान हूँ और मेरी आय कम है...",
    analyzeButton: "योजनाएं खोजें",
    demoPresetLabel: "या इनमें से किसी एक को आजमाएं:",
    extractedProfileTitle: "निकाली गई प्रोफ़ाइल जानकारी",
    profileVerifiedNotice: "केवल आपके द्वारा बताए गए तथ्यों के आधार पर",
    age: "आयु",
    gender: "लिंग",
    maritalStatus: "वैवाहिक स्थिति",
    state: "राज्य",
    occupation: "व्यवसाय",
    landOwnership: "भूमि स्वामित्व",
    incomeCategory: "आय वर्ग",
    annualIncome: "वार्षिक आय",
    socialCategory: "श्रेणी",
    followUpTitle: "एक आवश्यक स्पष्टीकरण",
    followUpSub: "इसका उत्तर देने से आपको अन्य संभावित योजनाओं का लाभ मिल सकता है।",
    followUpSpeak: "बोलकर उत्तर दें",
    followUpSubmit: "सुरक्षित करें व आगे बढ़ें",
    resultsTitle: "आपके संभावित कल्याणकारी लाभ",
    likelyEligibleTab: "संभावित पात्र",
    needsInfoTab: "अतिरिक्त जानकारी चाहिए",
    notMatchingTab: "पात्र नहीं",
    allTab: "सभी योजनाएं",
    potentialBenefit: "संभावित लाभ",
    whyMatches: "यह योजना क्यों उपयुक्त है",
    whyConflict: "यह योजना क्यों लागू नहीं होती",
    viewDetails: "विवरण और आवेदन प्रक्रिया",
    readAloud: "सुनिए (बोलकर बताएं)",
    stopAudio: "रोकें",
    documentsRequired: "आवश्यक दस्तावेज",
    howToApply: "आवेदन कैसे करें",
    cscGuidance: "सीएससी / पंचायत मार्गदर्शन",
    officialPortal: "आधिकारिक पोर्टल",
    lastVerified: "सत्यापित तिथि",
    actionPlanTitle: "व्यक्तिगत कार्ययोजना और दस्तावेज सूची",
    actionPlanSub: "इस दस्तावेज सूची को अपने नजदीकी सीएससी केंद्र या ग्राम पंचायत ले जाएं।",
    stepByStepRoadmap: "लाभ प्राप्त करने के 5 आसान चरण",
    downloadSummary: "सारांश डाउनलोड करें",
    printSummary: "प्रिंट / पीडीएफ सेव करें",
    shareSummary: "साझा करें",
    resetSession: "नया सत्र शुरू करें",
    disclaimerTitle: "आधिकारिक पात्रता अस्वीकरण",
    disclaimerText: "यह परिणाम प्रारंभिक पात्रता जांच है। अंतिम पात्रता और स्वीकृति संबंधित सरकारी विभाग द्वारा तय की जाती है।",
    cscHelp: "सीएससी नागरिक हेल्पलाइन: डायल करें 14599 या locator.csccloud.in देखें",
    switchLanguage: "भाषा बदलें"
  },
  ta: {
    selectSchemeAction: "திட்டத்தைத் தேர்ந்தெடுத்து படிகளைப் பார்க்கவும்",
    selectedSchemeLabel: "தேர்ந்தெடுக்கப்பட்ட திட்டம்",
    allSchemesOption: "அனைத்து தகுதியான திட்டங்கள்",
    documentsForScheme: "தேவையான ஆவணங்கள்",
    listenToStep: "கேளுங்கள்",
    stepNum: "படி",
    viewActionPlanForScheme: "ஆவணங்கள் மற்றும் விண்ணப்ப வழிகாட்டியைப் பெறுங்கள்",
    documentsChecklist: "ஆவணங்களின் சரிபார்ப்புப் பட்டியல்",
    appTitle: "சகாயா (SAHAAYA)",
    appTagline: "குரல் வழி அரசு நலத்திட்ட வழிகாட்டி",
    motto: "“பேசுங்கள். அறியுங்கள். பயன் பெறுங்கள்.”",
    theme: "சிறந்த எதிர்காலத்திற்கான தொழில்நுட்பம் 📡",
    welcomeHeader: "உங்கள் சொந்த மொழியில் பேசி அரசு நலத்திட்டங்களை கண்டறியுங்கள்.",
    welcomeSub: "கடினமான படிவங்கள் தேவையில்லை. மைக்ரோஃபோன் பொத்தானை அழுத்தி உங்களைப் பற்றி பேசுங்கள்.",
    startListening: "பேச அழுத்தவும்",
    listening: "கேட்கிறது... பேசுங்கள்",
    stopListening: "பேசி முடிந்தது",
    typeInstead: "அல்லது தட்டச்சு செய்யவும்",
    typePlaceholder: "உதாரணமாக: எனக்கு 58 வயது, தமிழ்நாட்டின் விதவை விவசாயி, வருமானம் குறைவு...",
    analyzeButton: "திட்டங்களை கண்டறி",
    demoPresetLabel: "மாதிரி உதாரணத்தை தேர்ந்தெடுக்கவும்:",
    extractedProfileTitle: "சுயவிவர விவரங்கள்",
    profileVerifiedNotice: "நீங்கள் கூறிய விவரங்கள் மட்டுமே பெறப்பட்டுள்ளன",
    age: "வயது",
    gender: "பாலினம்",
    maritalStatus: "திருமண நிலை",
    state: "மாநிலம்",
    occupation: "தொழில்",
    landOwnership: "நில உரிமை",
    incomeCategory: "வருமான பிரிவு",
    annualIncome: "ஆண்டு வருமானம்",
    socialCategory: "சமூக பிரிவு",
    followUpTitle: "ஒரு எளிய கேள்வி",
    followUpSub: "இதற்கு பதிலளிப்பதன் மூலம் கூடுதல் திட்டங்களை நீங்கள் பெற முடியும்.",
    followUpSpeak: "பேசி பதிலளிக்கவும்",
    followUpSubmit: "சேமித்து தொடரவும்",
    resultsTitle: "உங்களுக்கு கிடைக்கக்கூடிய அரசு நன்மைகள்",
    likelyEligibleTab: "வாய்ப்புள்ள திட்டங்கள்",
    needsInfoTab: "கூடுதல் தகவல் தேவை",
    notMatchingTab: "பொருந்தாதவை",
    allTab: "அனைத்து திட்டங்கள்",
    potentialBenefit: "கிடைக்கும் பயன்",
    whyMatches: "பொருந்துவதற்கான காரணம்",
    whyConflict: "பொருந்தாமைக்கான காரணம்",
    viewDetails: "முழு விவரங்கள் & விண்ணப்பிக்கும் வழி",
    readAloud: "குரலில் கேட்க",
    stopAudio: "நிறுத்து",
    documentsRequired: "தேவையான ஆவணங்கள்",
    howToApply: "விண்ணப்பிக்கும் முறை",
    cscGuidance: "சி.எஸ்.சி / பஞ்சாயத்து வழிகாட்டுதல்",
    officialPortal: "அதிகாரப்பூர்வ தளம்",
    lastVerified: "சரிபார்க்கப்பட்ட நாள்",
    actionPlanTitle: "செயல்திட்டம் & ஆவண சரிபார்ப்பு பட்டியல்",
    actionPlanSub: "இந்த பட்டியலை உங்கள் அருகிலுள்ள சி.எஸ்.சி மையத்திற்கு எடுத்துச் செல்லுங்கள்.",
    stepByStepRoadmap: "பயன்களைப் பெற 5 எளிய படிகள்",
    downloadSummary: "பதிவிறக்கம் செய்",
    printSummary: "அச்சிடு / PDF சேமி",
    shareSummary: "பகிரவும்",
    resetSession: "புதிய தேடல்",
    disclaimerTitle: "அதிகாரப்பூர்வ பொறுப்புத்துறப்பு",
    disclaimerText: "இது ஒரு ஆரம்ப தகுதி சரிபார்ப்பு மட்டுமே. இறுதி தகுதியை சம்பந்தப்பட்ட அரசு துறை முடிவு செய்யும்.",
    cscHelp: "சி.எஸ்.சி உதவி எண்: 14599 அல்லது locator.csccloud.in",
    switchLanguage: "மொழி மாற்று"
  },
  te: {
    selectSchemeAction: "పథకం ఎంచుకుని దశలు చూడండి",
    selectedSchemeLabel: "ఎంచుకున్న పథకం",
    allSchemesOption: "అన్ని అర్హత పథకాలు",
    documentsForScheme: "కావలసిన ముఖ్యమైన పత్రాలు",
    listenToStep: "వినండి",
    stepNum: "దశ",
    viewActionPlanForScheme: "పత్రాలు మరియు దరఖాస్తు దశలను పొందండి",
    documentsChecklist: "పత్రాల జాబితా (చెక్‌లిస్ట్)",
    appTitle: "సహాయ (SAHAAYA)",
    appTagline: "వాయిస్ ఆధారిత ప్రభుత్వ పథకాల నావిగేటర్",
    motto: "“మాట్లాడండి. తెలుసుకోండి. లబ్ది పొందండి.”",
    theme: "మంచి రేపటి కోసం సాంకేతికత 📡",
    welcomeHeader: "మీ స్వభాషలో మాట్లాడి ప్రభుత్వ సంక్షేమ పథకాలను తెలుసుకోండి.",
    welcomeSub: "క్లిష్టమైన ఫారాలు అవసరం లేదు. మైక్రోఫోన్ నొక్కి మీ వివరాలు చెప్పండి.",
    startListening: "మాట్లాడటానికి నొక్కండి",
    listening: "వింటోంది... ఇప్పుడు మాట్లాడండి",
    stopListening: "పూర్తయింది",
    typeInstead: "లేదా టైప్ చేయండి",
    typePlaceholder: "ఉదాహరణ: నా వయస్సు 58, వితంతువు రైతును, తక్కువ ఆదాయం...",
    analyzeButton: "పథకాలను కనుగొనండి",
    demoPresetLabel: "నమూనా ఉదాహరణ ఎంచుకోండి:",
    extractedProfileTitle: "సేకరించిన ప్రొఫైల్ వివరాలు",
    profileVerifiedNotice: "మీరు చెప్పిన సమాచారం మాత్రమే",
    age: "వయస్సు",
    gender: "లింగం",
    maritalStatus: "వైవాహిక స్థితి",
    state: "రాష్ట్రం",
    occupation: "వృత్తి",
    landOwnership: "భూమి యాజమాన్యం",
    incomeCategory: "ఆదాయ వర్గం",
    annualIncome: "వార్షిక ఆదాయం",
    socialCategory: "సామాజిక వర్గం",
    followUpTitle: "ఒక చిన్న ప్రశ్న",
    followUpSub: "సమాధానం ఇవ్వడం ద్వారా మరిన్ని పథకాలు అందుబాటులోకి వస్తాయి.",
    followUpSpeak: "మాట్లాడి సమాధానం చెప్పండి",
    followUpSubmit: "సేవ్ చేయండి",
    resultsTitle: "మీకు వర్తించే సంక్షేమ ప్రయోజనాలు",
    likelyEligibleTab: "అర్హత ఉన్నవి",
    needsInfoTab: "మరింత సమాచారం కావాలి",
    notMatchingTab: "వర్తించనివి",
    allTab: "అన్ని పథకాలు",
    potentialBenefit: "ప్రయోజనం",
    whyMatches: "అర్హత కారణం",
    whyConflict: "వర్తించకపోవడానికి కారణం",
    viewDetails: "వివరాలు & విధానం",
    readAloud: "వినండి",
    stopAudio: "ఆపు",
    documentsRequired: "కావలసిన పత్రాలు",
    howToApply: "దరఖాస్తు విధానం",
    cscGuidance: "CSC / పంచాయతీ సలహా",
    officialPortal: "అధికారిక వెబ్‌సైట్",
    lastVerified: "ధృవీకరించబడిన తేదీ",
    actionPlanTitle: "కార్యాచరణ ప్రణాళిక & పత్రాల జాబితా",
    actionPlanSub: "ఈ పత్రాలతో మీ సమీప CSC లేదా గ్రామ పంచాయతీని సందర్శించండి.",
    stepByStepRoadmap: "లబ్ది పొందడానికి 5 సులభ దశలు",
    downloadSummary: "డౌన్‌లోడ్ చేయండి",
    printSummary: "ప్రింట్ / PDF",
    shareSummary: "షేర్ చేయండి",
    resetSession: "కొత్త సెషన్",
    disclaimerTitle: "నిరాకరణ ప్రకటన",
    disclaimerText: "ఇది ప్రాథమిక తనిఖీ మాత్రమే. తుది అర్హతను ప్రభుత్వం నిర్ణయిస్తుంది.",
    cscHelp: "CSC హెల్ప్‌లైన్: 14599 లేదా locator.csccloud.in",
    switchLanguage: "భాష మార్చండి"
  },
  kn: {
    selectSchemeAction: "ಯೋಜನೆ ಆಯ್ಕೆಮಾಡಿ ಮತ್ತು ಹಂತಗಳನ್ನು ನೋಡಿ",
    selectedSchemeLabel: "ಆಯ್ಕೆಮಾಡಿದ ಯೋಜನೆ",
    allSchemesOption: "ಎಲ್ಲಾ ಅರ್ಹ ಯೋಜನೆಗಳು",
    documentsForScheme: "ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳು",
    listenToStep: "ಕೇಳಿ",
    stepNum: "ಹಂತ",
    viewActionPlanForScheme: "ದಾಖಲೆಗಳು ಮತ್ತು ಅರ್ಜಿ ಮಾರ್ಗಸೂಚಿಯನ್ನು ಪಡೆಯಿರಿ",
    documentsChecklist: "ದಾಖಲೆಗಳ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ",
    appTitle: "ಸಹಾಯ (SAHAAYA)",
    appTagline: "ಧ್ವನಿ ಆಧಾರಿತ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಮಾರ್ಗದರ್ಶಿ",
    motto: "“ಮಾತನಾಡಿ. ತಿಳಿಯಿರಿ. ಪ್ರಯೋಜನ ಪಡೆಯಿರಿ.”",
    theme: "ಉತ್ತಮ ನಾಳೆಗಾಗಿ ತಂತ್ರಜ್ಞಾನ 📡",
    welcomeHeader: "ನಿಮ್ಮದೇ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ ಸರ್ಕಾರಿ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳನ್ನು ತಿಳಿದುಕೊಳ್ಳಿ.",
    welcomeSub: "ಕಷ್ಟಕರ ಅರ್ಜಿಗಳ ಅಗತ್ಯವಿಲ್ಲ. ಮೈಕ್ ಬಟನ್ ಒತ್ತಿ ನಿಮ್ಮ ಬಗ್ಗೆ ಮಾತನಾಡಿ.",
    startListening: "ಮಾತನಾಡಲು ಒತ್ತಿರಿ",
    listening: "ಆಲಿಸುತ್ತಿದೆ... ಮಾತನಾಡಿ",
    stopListening: "ಮುಕ್ತಾಯ",
    typeInstead: "ಅಥವಾ ಟೈಪ್ ಮಾಡಿ",
    typePlaceholder: "ಉದಾ: ನನಗೆ 58 ವರ್ಷ, ತಮಿಳುನಾಡಿನ ವಿಧವೆ ರೈತ ಮಹಿಳೆ...",
    analyzeButton: "ಯೋಜನೆಗಳನ್ನು ಹುಡುಕಿ",
    demoPresetLabel: "ಮಾದರಿ ಪ್ರೊಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ:",
    extractedProfileTitle: "ಸಂಗ್ರಹಿಸಿದ ಪ್ರೊಫೈಲ್ ಮಾಹಿತಿ",
    profileVerifiedNotice: "ನೀವು ನೀಡಿದ ಮಾಹಿತಿ ಮಾತ್ರ",
    age: "ವಯಸ್ಸು",
    gender: "ಲಿಂಗ",
    maritalStatus: "ವೈವಾಹಿಕ ಸ್ಥಿತಿ",
    state: "ರಾಜ್ಯ",
    occupation: "ಉದ್ಯೋಗ",
    landOwnership: "ಜಮೀನು ಮಾಲೀಕತ್ವ",
    incomeCategory: "ಆದಾಯ ವರ್ಗ",
    annualIncome: "ವಾರ್ಷಿಕ ಆದಾಯ",
    socialCategory: "ಸಾಮಾಜಿಕ ವರ್ಗ",
    followUpTitle: "ಒಂದು ಸರಳ ಸ್ಪಷ್ಟೀಕರಣ",
    followUpSub: "ಉತ್ತರಿಸುವುದರಿಂದ ಹೆಚ್ಚಿನ ಯೋಜನೆಗಳನ್ನು ಅನ್‌ಲಾಕ್ ಮಾಡಬಹುದು.",
    followUpSpeak: "ಮಾತನಾಡಿ ಉತ್ತರಿಸಿ",
    followUpSubmit: "ಉಳಿಸಿ ಮತ್ತು ಮುಂದುವರಿಯಿರಿ",
    resultsTitle: "ನಿಮಗೆ ಲಭ್ಯವಿರುವ ಕಲ್ಯಾಣ ಪ್ರಯೋಜನಗಳು",
    likelyEligibleTab: "ಸಂಭಾವ್ಯ ಅರ್ಹ ಯೋಜನೆಗಳು",
    needsInfoTab: "ಹೆಚ್ಚಿನ ಮಾಹಿತಿ ಅಗತ್ಯವಿದೆ",
    notMatchingTab: "ಹೊಂದಾಣಿಕೆಯಾಗದವು",
    allTab: "ಎಲ್ಲ ಯೋಜನೆಗಳು",
    potentialBenefit: "ಪ್ರಯೋಜನ",
    whyMatches: "ಅರ್ಹತೆಯ ಕಾರಣ",
    whyConflict: "ಹೊಂದಾಣಿಕೆಯಾಗದ ಕಾರಣ",
    viewDetails: "ವಿವರಗಳು & ಅರ್ಜಿ ಹಂತಗಳು",
    readAloud: "ಕೇಳಿ (ಓದಿ ಹೇಳಿ)",
    stopAudio: "ನಿಲ್ಲಿಸಿ",
    documentsRequired: "ಅಗತ್ಯ ದಾಖಲೆಗಳು",
    howToApply: "ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ವಿಧಾನ",
    cscGuidance: "CSC / ಪಂಚಾಯತ್ ಮಾರ್ಗದರ್ಶನ",
    officialPortal: "ಅಧಿಕೃತ ಪೋರ್ಟಲ್",
    lastVerified: "ಪರಿಶೀಲಿಸಿದ ದಿನಾಂಕ",
    actionPlanTitle: "ಕಾರ್ಯ ಯೋಜನೆ ಮತ್ತು ದಾಖಲೆಗಳ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ",
    actionPlanSub: "ಈ ದಾಖಲೆಗಳೊಂದಿಗೆ ಹತ್ತಿರದ CSC ಅಥವಾ ಗ್ರಾಮ ಪಂಚಾಯಿತಿಗೆ ಭೇಟಿ ನೀಡಿ.",
    stepByStepRoadmap: "ಪ್ರಯೋಜನ ಪಡೆಯಲು 5 ಸುಲಭ ಹಂತಗಳು",
    downloadSummary: "ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    printSummary: "ಪ್ರಿಂಟ್ / PDF",
    shareSummary: "ಹಂಚಿಕೊಳ್ಳಿ",
    resetSession: "ಹೊಸ ಹುಡುಕಾಟ",
    disclaimerTitle: "ಅಧಿಕೃತ ಹಕ್ಕುತ್ಯಾಗ",
    disclaimerText: "ಇದು ಪ್ರಾಥಮಿಕ ಅರ್ಹತಾ ತಪಾಸಣೆ ಮಾತ್ರ. ಅಂತಿಮ ಅರ್ಹತೆಯನ್ನು ಸಂಬಂಧಿತ ಸರ್ಕಾರಿ ಇಲಾಖೆ ನಿರ್ಧರಿಸುತ್ತದೆ.",
    cscHelp: "CSC ಸಹಾಯವಾಣಿ: 14599 ಅಥವಾ locator.csccloud.in",
    switchLanguage: "ಭಾಷೆ ಬದಲಿಸಿ"
  },
  bn: {
    selectSchemeAction: "প্রকল্প নির্বাচন করুন এবং ধাপ দেখুন",
    selectedSchemeLabel: "নির্বাচিত প্রকল্প",
    allSchemesOption: "সমস্ত যোগ্য প্রকল্প",
    documentsForScheme: "প্রয়োজনীয় নথিপত্র",
    listenToStep: "শুনুন",
    stepNum: "ধাপ",
    viewActionPlanForScheme: "নথি এবং আবেদনের ধাপ দেখুন",
    documentsChecklist: "নথি চেকলিস্ট",
    appTitle: "সহায় (SAHAAYA)",
    appTagline: "ভয়েস-ভিত্তিক সরকারি প্রকল্প নির্দেশিকা",
    motto: "“বলুন। জানুন। উপকৃত হন।”",
    theme: "একটি সুন্দর আগামীর জন্য প্রযুক্তি 📡",
    welcomeHeader: "আপনার নিজের ভাষায় কথা বলে সরকারি কল্যাণমূলক প্রকল্প জানুন।",
    welcomeSub: "কোনো জটিল ফর্ম পূরণের ঝামেলা নেই। মাইক বাটনে চাপ দিন এবং নিজের কথা বলুন।",
    startListening: "কথা বলতে চাপুন",
    listening: "শুনছি... এখন বলুন",
    stopListening: "বলা শেষ",
    typeInstead: "অথবা লিখে জানান",
    typePlaceholder: "যেমন: আমার বয়স ৫৮ বছর, বিধবা কৃষক, আয় কম...",
    analyzeButton: "প্রকল্প খুঁজুন",
    demoPresetLabel: "অথবা একটি ডেমো নির্বাচন করুন:",
    extractedProfileTitle: "সংগৃহীত প্রোফাইল বিবরণ",
    profileVerifiedNotice: "কেবলমাত্র আপনার স্পষ্ট বিবৃতির ভিত্তিতে",
    age: "বয়স",
    gender: "লিঙ্গ",
    maritalStatus: "বৈবাহিক অবস্থা",
    state: "রাজ্য",
    occupation: "পেশা",
    landOwnership: "জমির মালিকানা",
    incomeCategory: "আয় বিভাগ",
    annualIncome: "বার্ষিক আয়",
    socialCategory: "সামাজিক বিভাগ",
    followUpTitle: "একটি প্রয়োজনীয় প্রশ্ন",
    followUpSub: "উত্তর দিলে আরও প্রকল্পের সুযোগ পাওয়া যাবে।",
    followUpSpeak: "মুখে বলে উত্তর দিন",
    followUpSubmit: "সংরক্ষণ করুন",
    resultsTitle: "আপনার সম্ভাব্য কল্যাণমূলক সুবিধা",
    likelyEligibleTab: "সম্ভাব্য যোগ্য",
    needsInfoTab: "আরও তথ্য প্রয়োজন",
    notMatchingTab: "যোগ্য নয়",
    allTab: "সব প্রকল্প",
    potentialBenefit: "সুবিধা",
    whyMatches: "যোগ্যতার কারণ",
    whyConflict: "অনুপযুক্ততার কারণ",
    viewDetails: "বিস্তারিত বিবরণ",
    readAloud: "শুনুন",
    stopAudio: "থামান",
    documentsRequired: "প্রয়োজনীয় নথিপত্র",
    howToApply: "আবেদন পদ্ধতি",
    cscGuidance: "সিএসসি / পঞ্চায়েত নির্দেশিকা",
    officialPortal: "অফিসিয়াল পোর্টাল",
    lastVerified: "যাচাইয়ের তারিখ",
    actionPlanTitle: "কর্মপরিকল্পনা ও নথির তালিকা",
    actionPlanSub: "এই নথিগুলি নিয়ে আপনার নিকটস্থ সিএসসি কেন্দ্র বা পঞ্চায়েতে যোগাযোগ করুন।",
    stepByStepRoadmap: "সুবিধা পাওয়ার ৫টি সহজ ধাপ",
    downloadSummary: "ডাউনলোড করুন",
    printSummary: "প্রিন্ট / PDF",
    shareSummary: "শেয়ার করুন",
    resetSession: "নতুন করে শুরু",
    disclaimerTitle: "অফিসিয়াল অস্বীকৃতি",
    disclaimerText: "এটি প্রাথমিক যোগ্যতা পরীক্ষা। চূড়ান্ত সিদ্ধান্ত সরকারি কর্তৃপক্ষ গ্রহণ করবে।",
    cscHelp: "সিএসসি হেল্পলাইন: 14599 বা locator.csccloud.in",
    switchLanguage: "ভাষা পরিবর্তন"
  },
  mr: {
    selectSchemeAction: "योजना निवडा आणि टप्पे पहा",
    selectedSchemeLabel: "निवडलेली योजना",
    allSchemesOption: "सर्व पात्र योजना",
    documentsForScheme: "आवश्यक कागदपत्रे",
    listenToStep: "ऐका",
    stepNum: "टप्पा",
    viewActionPlanForScheme: "कागदपत्रे आणि अर्ज प्रक्रिया मिळवा",
    documentsChecklist: "कागदपत्रांची सूची",
    appTitle: "सहाय (SAHAAYA)",
    appTagline: "व्हॉइस-आधारित शासकीय योजना मार्गदर्शक",
    motto: "“बोला. शोधा. लाभ मिळवा.”",
    theme: "उज्ज्वल भविष्यासाठी तंत्रज्ञान 📡",
    welcomeHeader: "आपल्या स्वतःच्या भाषेत बोलून शासकीय योजनांची माहिती मिळवा.",
    welcomeSub: "कोणतेही किचकट फॉर्म भरण्याची गरज नाही. फक्त माइक बटण दाबा आणि माहिती सांगा.",
    startListening: "बोलण्यासाठी दाबा",
    listening: "ऐकत आहे... बोला",
    stopListening: "बोलणे पूर्ण",
    typeInstead: "किंवा लिहून सांगा",
    typePlaceholder: "उदा: माझे वय ५८ वर्षे आहे, मी विधवा शेतकरी आहे, उत्पन्न कमी आहे...",
    analyzeButton: "योजना शोधा",
    demoPresetLabel: "किंवा नमुना प्रोफाइल निवडा:",
    extractedProfileTitle: "मिळवलेली माहिती",
    profileVerifiedNotice: "केवळ तुमच्या वक्तव्यावर आधारित माहिती",
    age: "वय",
    gender: "लिंग",
    maritalStatus: "वैवाहिक स्थिती",
    state: "राज्य",
    occupation: "व्यवसाय",
    landOwnership: "जमीन मालकी",
    incomeCategory: "उत्पन्न गट",
    annualIncome: "वार्षिक उत्पन्न",
    socialCategory: "सामाजिक प्रवर्ग",
    followUpTitle: "एक आवश्यक स्पष्टीकरण",
    followUpSub: "याचे उत्तर दिल्यास अतिरिक्त योजना उपलब्ध होऊ शकतात.",
    followUpSpeak: "बोलून उत्तर द्या",
    followUpSubmit: "जतन करा आणि पुढे जा",
    resultsTitle: "तुमचे संभाव्य शासकीय लाभ",
    likelyEligibleTab: "संभाव्य पात्र योजना",
    needsInfoTab: "अतिरिक्त माहिती आवश्यक",
    notMatchingTab: "अपात्र योजना",
    allTab: "सर्व योजना",
    potentialBenefit: "संभाव्य लाभ",
    whyMatches: "पात्रतेचे कारण",
    whyConflict: "अपात्रतेचे कारण",
    viewDetails: "सविस्तर माहिती व अर्ज प्रक्रिया",
    readAloud: "ऐका (आवाजात)",
    stopAudio: "थांबवा",
    documentsRequired: "आवश्यक कागदपत्रे",
    howToApply: "अर्ज कसा करावा",
    cscGuidance: "सीएससी / पंचायत मार्गदर्शन",
    officialPortal: "अधिकृत पोर्टल",
    lastVerified: "पडताळणी तारीख",
    actionPlanTitle: "कृती आराखडा आणि कागदपत्रांची यादी",
    actionPlanSub: "ही यादी घेऊन जवळच्या सीएससी केंद्रात किंवा ग्रामपंचायतीमध्ये जा.",
    stepByStepRoadmap: "लाभ मिळवण्यासाठी ५ सोप्या पायऱ्या",
    downloadSummary: "डाउनलोड करा",
    printSummary: "प्रिंट / PDF",
    shareSummary: "शेअर करा",
    resetSession: "नवीन शोध",
    disclaimerTitle: "अधिकृत अस्वीकरण",
    disclaimerText: "ही केवळ प्राथमिक पात्रता तपासणी आहे. अंतिम निर्णय संबंधित शासकीय विभाग घेईल.",
    cscHelp: "सीएससी हेल्पलाइन: 14599 किंवा locator.csccloud.in",
    switchLanguage: "भाषा बदला"
  }
};

export function getProfileSpeechText(profile, lang = 'en') {
  const age = profile.age ? `${profile.age}` : '';
  if (lang === 'te') {
    const genderStr = profile.gender === 'female' ? 'మహిళ' : (profile.gender === 'male' ? 'పురుషుడు' : '');
    const widowStr = profile.marital_status === 'widow' ? 'వితంతువు' : '';
    const occStr = profile.occupation === 'farmer' ? 'రైతు' : (profile.occupation === 'student' ? 'విద్యార్థి' : (profile.occupation || ''));
    const landStr = profile.land_owned === true ? 'వ్యవసాయ భూమి ఉంది' : (profile.land_owned === false ? 'భూమి లేదు' : '');
    return `మేము మీ ప్రొఫైల్ వివరాలను సేకరించాము. వయస్సు ${age} సంవత్సరాలు. ${genderStr} ${widowStr}. రాష్ట్రం ${profile.state || 'భారతదేశం'}. వృత్తి ${occStr}. ${landStr}. మీ కోసం సరిపోయే సంక్షేమ పథకాలను ఇప్పుడు చూద్దాం.`;
  } else if (lang === 'hi') {
    const genderStr = profile.gender === 'female' ? 'महिला' : (profile.gender === 'male' ? 'पुरुष' : '');
    const widowStr = profile.marital_status === 'widow' ? 'विधवा' : '';
    const occStr = profile.occupation === 'farmer' ? 'किसान' : (profile.occupation === 'student' ? 'छात्र' : (profile.occupation || ''));
    const landStr = profile.land_owned === true ? 'कृषि भूमि है' : (profile.land_owned === false ? 'भूमिहीन' : '');
    return `आपकी प्रोफ़ाइल जानकारी: आयु ${age} वर्ष, ${genderStr} ${widowStr}, राज्य ${profile.state || 'भारत'}, व्यवसाय ${occStr}, ${landStr}। आइए आपकी पात्रता जांचते हैं।`;
  } else if (lang === 'ta') {
    const genderStr = profile.gender === 'female' ? 'பெண்' : (profile.gender === 'male' ? 'ஆண்' : '');
    const widowStr = profile.marital_status === 'widow' ? 'விதவை' : '';
    const occStr = profile.occupation === 'farmer' ? 'விவசாயி' : (profile.occupation === 'student' ? 'மாணவர்' : (profile.occupation || ''));
    return `உங்கள் விவரங்கள்: வயது ${age}, ${genderStr} ${widowStr}, மாநிலம் ${profile.state || 'இந்தியா'}, தொழில் ${occStr}. உங்களுக்கான அரசு நலத்திட்டங்களை கண்டறிவோம்.`;
  } else if (lang === 'kn') {
    return `ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ವಿವರಗಳು: ವಯಸ್ಸು ${age}, ರಾಜ್ಯ ${profile.state || 'ಭಾರತ'}, ಉದ್ಯೋಗ ${profile.occupation || ''}. ನಿಮಗಾಗಿ ಯೋಜನೆಗಳನ್ನು ಪರಿಶೀಲಿಸೋಣ.`;
  } else if (lang === 'bn') {
    return `আপনার প্রোফাইল বিবরণ: বয়স ${age}, রাজ্য ${profile.state || 'ভারত'}, পেশা ${profile.occupation || ''}। আপনার জন্য সরকারি প্রকল্প খুঁজছি।`;
  } else if (lang === 'mr') {
    return `तुमची माहिती: वय ${age} वर्षे, राज्य ${profile.state || 'भारत'}, व्यवसाय ${profile.occupation || ''}। तुमच्यासाठी योजना शोधत आहोत.`;
  }
  return `We have extracted your profile: Age ${profile.age || 'unspecified'}, ${profile.gender || ''}, ${profile.marital_status || ''}, living in ${profile.state || 'India'}, occupation ${profile.occupation || 'unspecified'}, land ownership ${profile.land_owned ? 'yes' : 'unspecified'}. Let us check your welfare eligibility.`;
}

export function getHeadlineSpeechText(summary, lang = 'en') {
  if (lang === 'te') {
    return `సహాయ సంక్షేమ నావిగేటర్ ఫలితాలు. అంచనా ప్రయోజనం: ${summary.headline_benefit}. మీ ప్రొఫైల్ ప్రకారం ${summary.likely_eligible_count} ప్రభుత్వ పథకాలు అనుకూలంగా గుర్తించబడ్డాయి.`;
  } else if (lang === 'hi') {
    return `सहाय कल्याणकारी परिणाम: ${summary.headline_benefit}। आपकी प्रोफ़ाइल के अनुसार ${summary.likely_eligible_count} सरकारी योजनाएं उपयुक्त पाई गईं।`;
  } else if (lang === 'ta') {
    return `சகாயா அரசு திட்ட முடிவுகள்: ${summary.headline_benefit}. உங்களுக்காக ${summary.likely_eligible_count} அரசு திட்டங்கள் கண்டறியப்பட்டுள்ளன.`;
  } else if (lang === 'kn') {
    return `ಸಹಾಯ ಕಲ್ಯಾಣ ಫಲಿತಾಂಶ: ${summary.headline_benefit}. ನಿಮಗಾಗಿ ${summary.likely_eligible_count} ಯೋಜನೆಗಳು ಲಭ್ಯವಿವೆ.`;
  } else if (lang === 'bn') {
    return `সহায় ফলাফল: ${summary.headline_benefit}। আপনার জন্য ${summary.likely_eligible_count}টি প্রকল্প প্রযোজ্য।`;
  } else if (lang === 'mr') {
    return `सहाय परिणाम: ${summary.headline_benefit}। तुमच्यासाठी ${summary.likely_eligible_count} योजना पात्र आढळल्या.`;
  }
  return `Sahaaya eligibility result: ${summary.headline_benefit}. We found ${summary.likely_eligible_count} likely eligible government welfare schemes for you.`;
}

export function getSchemeCardSpeechText(scheme, lang = 'en') {
  const name = scheme.short_name || scheme.scheme_name;
  if (lang === 'te') {
    return `${name}. సంక్షేమ ప్రయోజనం: ${scheme.benefit}. స్థితి: ${scheme.status === 'likely_eligible' ? 'అర్హత ఉంది' : 'మరింత సమాచారం కావాలి'}. కారణం: ${scheme.reason}`;
  } else if (lang === 'hi') {
    return `${name}। संभावित लाभ: ${scheme.benefit}। स्थिति: ${scheme.status === 'likely_eligible' ? 'संभावित पात्र' : 'अतिरिक्त जानकारी आवश्यक'}। कारण: ${scheme.reason}`;
  } else if (lang === 'ta') {
    return `${name}. கிடைக்கும் பயன்: ${scheme.benefit}. நிலை: ${scheme.status === 'likely_eligible' ? 'வாய்ப்புள்ள திட்டம்' : 'கூடுதல் தகவல் தேவை'}. காரணம்: ${scheme.reason}`;
  }
  return `${name}. Category: ${scheme.category}. Potential benefit: ${scheme.benefit}. Status: ${scheme.status_label}. ${scheme.reason}`;
}

export function getSchemeDetailSpeechText(scheme, lang = 'en') {
  if (lang === 'te') {
    return `${scheme.scheme_name}. సంక్షేమ ప్రయోజనం: ${scheme.benefit}. పథకం ఉద్దేశ్యం: ${scheme.description}. కావలసిన పత్రాలు: ${scheme.documents.slice(0, 4).join(', ')}. దరఖాస్తు విధానం: ${scheme.application_method}. మీ సమీప గ్రామ పంచాయతీ లేదా సి.ఎస్.సి కేంద్రాన్ని సంప్రదించండి.`;
  } else if (lang === 'hi') {
    return `${scheme.scheme_name}। लाभ: ${scheme.benefit}। योजना विवरण: ${scheme.description}। आवश्यक दस्तावेज: ${scheme.documents.slice(0, 4).join(', ')}। आवेदन प्रक्रिया: ${scheme.application_method}। अपने नजदीकी सीएससी केंद्र या ग्राम पंचायत से संपर्क करें।`;
  } else if (lang === 'ta') {
    return `${scheme.scheme_name}. பயன்: ${scheme.benefit}. விளக்கம்: ${scheme.description}. தேவையான ஆவணங்கள்: ${scheme.documents.slice(0, 4).join(', ')}. விண்ணப்பிக்கும் முறை: ${scheme.application_method}.`;
  }
  return `Scheme details for ${scheme.scheme_name}. Benefit: ${scheme.benefit}. What it is: ${scheme.description}. Required documents: ${scheme.documents.slice(0, 4).join(', ')}. How to apply: ${scheme.application_method}. Common service centre guidance: ${scheme.csc_guidance}.`;
}

export function getActionPlanSpeechText(summary, likelyCount, lang = 'en') {
  if (lang === 'te') {
    return `మీ వ్యక్తిగత కార్యాచరణ ప్రణాళిక. మొత్తం అర్హత పథకాలు: ${likelyCount}. అంచనా ప్రయోజనం: ${summary.headline_benefit}. కావలసిన ముఖ్యమైన పత్రాలు: ఆధార్ కార్డు, బ్యాంకు పాస్‌బుక్, ఆదాయ లేదా భూమి పత్రాలు. మొదటి అడుగు: ఈ పత్రాలతో మీ సమీప సి.ఎస్.సి లేదా గ్రామ పంచాయతీకి వెళ్లి దరఖాస్తు చేసుకోండి. సహాయం కోసం 14599 నంబర్‌కు కాల్ చేయండి.`;
  } else if (lang === 'hi') {
    return `आपकी व्यक्तिगत कार्ययोजना। कुल पात्र योजनाएं: ${likelyCount}। संभावित लाभ: ${summary.headline_benefit}। आवश्यक दस्तावेज: आधार कार्ड, बैंक पासबुक, आय या जमीन के कागजात। पहला कदम: इन दस्तावेजों के साथ नजदीकी सीएससी या ग्राम पंचायत जाएं। हेल्पलाइन: 14599 पर कॉल करें।`;
  } else if (lang === 'ta') {
    return `உங்கள் தனிப்பயனாக்கப்பட்ட செயல்திட்டம். தகுதியான திட்டங்கள்: ${likelyCount}. பயன்: ${summary.headline_benefit}. தேவையான ஆவணங்கள்: ஆதார் அட்டை, வங்கி பாஸ்புக், நில ஆவணங்கள். சி.எஸ்.சி மையம் அல்லது கிராம பஞ்சாயத்தை அணுகவும். உதவி எண்: 14599.`;
  }
  return `Your personalized action plan for ${likelyCount} welfare schemes. Potential total benefits: ${summary.headline_benefit}. Required documents include: Aadhaar card and Bank Passbook. First step: gather your documents, then visit your local Common Service Centre or Gram Panchayat. Helpline: dial 14599.`;
}


export const ROADMAP_STEPS = {
  en: [
    {
      step: 1,
      title: "Prepare Essential Identity & Bank Passbook",
      description: "Ensure your Aadhaar is linked with your active Savings Bank Account for direct cash benefit transfers (DBT)."
    },
    {
      step: 2,
      title: "Gather Scheme-Specific Proofs",
      description: "Collect Land Ownership Records (Patta / RoR), valid Income Certificate, or Caste / Category Proofs."
    },
    {
      step: 3,
      title: "Visit Nearest CSC or Gram Panchayat / Apply Online",
      description: "Take this document checklist to your local Village Panchayat, CSC Digital Seva Kendra, or apply via the official government portal."
    },
    {
      step: 4,
      title: "Complete Biometric e-KYC Verification",
      description: "Provide your fingerprint / iris scan or Aadhaar OTP for instantaneous authentication and verification."
    },
    {
      step: 5,
      title: "Collect Acknowledgement Slip & Track Status",
      description: "Keep the application tracking number and verify your application status on the official welfare portal."
    }
  ],
  hi: [
    {
      step: 1,
      title: "पहचान पत्र और बैंक पासबुक तैयार करें",
      description: "प्रत्यक्ष लाभ अंतरण (DBT) के लिए सुनिश्चित करें कि आपका आधार आपके सक्रिय बचत बैंक खाते से लिंक है।"
    },
    {
      step: 2,
      title: "योजना से जुड़े आवश्यक प्रमाण पत्र एकत्र करें",
      description: "भूमि स्वामित्व रिकॉर्ड (खतौनी/पट्टा), वैध आय प्रमाण पत्र, या जाति/श्रेणी प्रमाण पत्र तैयार रखें।"
    },
    {
      step: 3,
      title: "नजदीकी सीएससी या ग्राम पंचायत जाएं / ऑनलाइन आवेदन करें",
      description: "दस्तावेजों की चेकलिस्ट के साथ अपने ग्राम पंचायत, सीएससी डिजिटल सेवा केंद्र जाएं या आधिकारिक पोर्टल पर आवेदन करें।"
    },
    {
      step: 4,
      title: "बायोमेट्रिक ई-केवाईसी सत्यापन पूरा करें",
      description: "त्वरित सत्यापन और ई-केवाईसी के लिए अपना फिंगरप्रिंट/आईरिस स्कैन या आधार ओटीपी प्रदान करें।"
    },
    {
      step: 5,
      title: "पावती रसीद प्राप्त करें और स्थिति ट्रैक करें",
      description: "आवेदन ट्रैकिंग नंबर सुरक्षित रखें और आधिकारिक कल्याण पोर्टल पर अपनी स्थिति की जांच करते रहें।"
    }
  ],
  te: [
    {
      step: 1,
      title: "ఆధార్ కార్డు మరియు బ్యాంక్ పాస్‌బుక్ సిద్ధం చేసుకోండి",
      description: "డైరెక్ట్ బెనిఫిట్ ట్రాన్స్‌ఫర్ (DBT) ద్వారా నగదు పొందడానికి మీ ఆధార్ మీ యాక్టివ్ బ్యాంక్ ఖాతాతో లింక్ అయి ఉందని నిర్ధారించుకోండి."
    },
    {
      step: 2,
      title: "పథకానికి అవసరమైన ధృవీకరణ పత్రాలు సేకరించండి",
      description: "భూమి యాజమాన్య పత్రాలు (పట్టా/రికార్డు), తహశీల్దార్ జారీ చేసిన ఆదాయ లేదా కుల ధృవీకరణ పత్రాలు సిద్ధం చేసుకోండి."
    },
    {
      step: 3,
      title: "సమీప గ్రామ పంచాయతీ లేదా సి.ఎస్.సి కేంద్రాన్ని సందర్శించండి",
      description: "ఈ సహాయ పత్రాల జాబితాతో మీ గ్రామ పంచాయతీ, సి.ఎస్.సి డిజిటల్ సేవా కేంద్రానికి వెళ్ళండి లేదా ఆన్‌లైన్ పోర్టల్‌లో దరఖాస్తు చేయండి."
    },
    {
      step: 4,
      title: "బయోమెట్రిక్ ఈ-కేవైసీ (e-KYC) పూర్తి చేయండి",
      description: "తక్షణ ప్రమాణీకరణ మరియు ఈ-కేవైసీ కోసం మీ వేలిముద్ర లేదా ఆధార్ ఓటీపీని నమోదు చేయండి."
    },
    {
      step: 5,
      title: "దరఖాస్తు రసీదు తీసుకోండి మరియు స్థితిని పరిశీలించండి",
      description: "దరఖాస్తు ట్రాకింగ్ నంబర్‌ను భద్రపరుచుకుని, సంబంధిత అధికారిక ప్రభుత్వ పోర్టల్‌లో దరఖాస్తు పురోగతిని తెలుసుకోండి."
    }
  ],
  ta: [
    {
      step: 1,
      title: "அடையாள அட்டை மற்றும் வங்கி பாஸ்புக்கை தயார் செய்யவும்",
      description: "நேரடி பணப் பரிமாற்றத்திற்கு (DBT) உங்கள் ஆதார் செயலில் உள்ள வங்கி கணக்குடன் இணைக்கப்பட்டுள்ளதை உறுதிப்படுத்தவும்."
    },
    {
      step: 2,
      title: "திட்டத்திற்கு தேவையான சான்றிதழ்களை சேகரிக்கவும்",
      description: "நில உரிமை ஆவணங்கள் (பட்டா/சிட்டா), வருமானச் சான்றிதழ் அல்லது சாதிச் சான்றிதழைப் பெறவும்."
    },
    {
      step: 3,
      title: "அருகிலுள்ள சி.எஸ்.சி மையம் அல்லது பஞ்சாயத்து அலுவலகம் செல்லவும்",
      description: "இந்த ஆவணப் பட்டியலுடன் உங்கள் கிராம பஞ்சாயத்து, சி.எஸ்.சி பொதுச் சேவை மையம் அல்லது அதிகாரப்பூர்வ போர்ட்டலில் விண்ணப்பிக்கவும்."
    },
    {
      step: 4,
      title: "பயோமெட்ரிக் இ-கேஒய்சி சரிபார்ப்பை முடிக்கவும்",
      description: "உடனடி சரிபார்ப்பிற்கு கைரேகை / கண் விழித்திரை ஸ்கேன் அல்லது ஆதார் OTP வழங்கவும்."
    },
    {
      step: 5,
      title: "ஒப்புகைச் சீட்டைப் பெற்று நிலையை கண்காணிக்கவும்",
      description: "விண்ணப்ப கண்காணிப்பு எண்ணைப் பாதுகாத்து வைத்து அதிகாரப்பூர்வ போர்ட்டலில் நிலையைத் தொடர்ந்து சரிபார்க்கவும்."
    }
  ],
  kn: [
    {
      step: 1,
      title: "ಗುರುತಿನ ಚೀಟಿ ಮತ್ತು ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಸಿದ್ಧಪಡಿಸಿ",
      description: "ನೇರ ನಗದು ವರ್ಗಾವಣೆಗಾಗಿ (DBT) ನಿಮ್ಮ ಆಧಾರ್ ಸಕ್ರಿಯ ಉಳಿತಾಯ ಖಾತೆಗೆ ಲಿಂಕ್ ಆಗಿರುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ."
    },
    {
      step: 2,
      title: "ಯೋಜನೆಗೆ ಅಗತ್ಯವಿರುವ ಪುರಾವೆಗಳನ್ನು ಸಂಗ್ರಹಿಸಿ",
      description: "ಭೂ ದಾಖಲೆಗಳು (ಪಹಣಿ/ಖಾತೆ), ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ಜಾತಿ ಪ್ರಮಾಣಪತ್ರವನ್ನು ಪಡೆದುಕೊಳ್ಳಿ."
    },
    {
      step: 3,
      title: "ಹತ್ತಿರದ ಸಿಎಸ್‌ಸಿ ಅಥವಾ ಗ್ರಾಮ ಪಂಚಾಯಿತಿಗೆ ಭೇಟಿ ನೀಡಿ",
      description: "ಈ ದಾಖಲೆಗಳ ಪಟ್ಟಿಯೊಂದಿಗೆ ನಿಮ್ಮ ಗ್ರಾಮ ಪಂಚಾಯತ್, ಸಿಎಸ್‌ಸಿ ಸೇವಾ ಕೇಂದ್ರ ಅಥವಾ ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ."
    },
    {
      step: 4,
      title: "ಬಯೋಮೆಟ್ರಿಕ್ ಇ-ಕೆವೈಸಿ ಪರಿಶೀಲನೆ ಪೂರ್ಣಗೊಳಿಸಿ",
      description: "ತಕ್ಷಣದ ಪರಿಶೀಲನೆಗಾಗಿ ನಿಮ್ಮ ಬೆರಳಚ್ಚು ಅಥವಾ ಆಧಾರ್ ಒಟಿಪಿ ನೀಡಿ ಇ-ಕೆವೈಸಿ ಪೂರ್ಣಗೊಳಿಸಿ."
    },
    {
      step: 5,
      title: "ಸ್ವೀಕೃತಿ ರಶೀದಿ ಪಡೆಯಿರಿ ಮತ್ತು ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ",
      description: "ಅರ್ಜಿ ಸಂಖ್ಯೆಯನ್ನು ಸುರಕ್ಷಿತವಾಗಿರಿಸಿ ಮತ್ತು ಅಧಿಕೃತ ಕಲ್ಯಾಣ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಜಿಯ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ."
    }
  ],
  bn: [
    {
      step: 1,
      title: "পরিচয়পত্র এবং ব্যাঙ্ক পাসবই প্রস্তুত করুন",
      description: "সরাসরি ব্যাঙ্ক স্থানান্তরের (DBT) জন্য আধার নম্বর সক্রিয় সেভিংস ব্যাঙ্ক অ্যাকাউন্টের সাথে লিঙ্ক থাকা নিশ্চিত করুন।"
    },
    {
      step: 2,
      title: "প্রকল্পের প্রয়োজনীয় নথিপত্র সংগ্রহ করুন",
      description: "জমির রেকর্ড (পর্চা/খতিয়ান), বৈধ আয়ের প্রমাণপত্র বা জাতিগত শংসাপত্র সংগ্রহ করুন।"
    },
    {
      step: 3,
      title: "নিকটস্থ সিএসসি বা গ্রাম পঞ্চায়েতে যান / অনলাইনে আবেদন করুন",
      description: "নথির তালিকা নিয়ে স্থানীয় গ্রাম পঞ্চায়েত, সিএসসি ডিজিটাল সেবা কেন্দ্র বা অফিসিয়াল পোর্টালে আবেদন করুন।"
    },
    {
      step: 4,
      title: "বায়োমেট্রিক ই-কেওয়াইসি যাচাইকরণ সম্পন্ন করুন",
      description: "তাৎক্ষণিক প্রমাণীকরণের জন্য আঙুলের ছাপ বা আধার ওটিপি প্রদান করে ই-কেওয়াইসি সম্পূর্ণ করুন।"
    },
    {
      step: 5,
      title: "প্রাপ্তি স্বীকারপত্র নিন এবং স্ট্যাটাস ট্র্যাক করুন",
      description: "আবেদন নম্বরটি সংরক্ষণ করুন এবং অফিসিয়াল সরকারি পোর্টালে আবেদনের অগ্রগতি ট্র্যাক করুন।"
    }
  ],
  mr: [
    {
      step: 1,
      title: "ओळखपत्र आणि बँक पासबुक तयार ठेवा",
      description: "थेट बँक खात्यात लाभासाठी (DBT) आधार कार्ड सक्रिय बचत खात्याशी जोडलेले असल्याची खात्री करा."
    },
    {
      step: 2,
      title: "योजनेसाठी आवश्यक कागदपत्रे गोळा करा",
      description: "जमिनीचे उतारे (७/१२, ८-अ), तहसीलदार जारी केलेले उत्पन्न प्रमाणपत्र किंवा जात प्रमाणपत्र गोळा करा."
    },
    {
      step: 3,
      title: "जवळच्या सीएससी किंवा ग्रामपंचायतीला भेट द्या",
      description: "या कागदपत्रांसह आपल्या ग्रामपंचायत, सीएससी डिजिटल सेवा केंद्रात जा किंवा अधिकृत पोर्टलवर अर्ज करा."
    },
    {
      step: 4,
      title: "बायोमेट्रिक ई-केवायसी पडताळणी पूर्ण करा",
      description: "त्वरित प्रमाणीकरणासाठी अंगठ्याचा ठसा किंवा आधार ओटीपी देऊन ई-केवायसी पूर्ण करा."
    },
    {
      step: 5,
      title: "पोचपावती मिळवा आणि स्थिती ट्रॅक करा",
      description: "अर्ज क्रमांक जपून ठेवा आणि अधिकृत पोर्टलवर अर्जाची सद्यस्थिती तपासा."
    }
  ]
};

// Document Translations Dictionary
export const DOCUMENT_TRANSLATIONS = {
  "Aadhaar Card": {
    hi: "आधार कार्ड",
    te: "ఆధార్ కార్డు",
    ta: "ஆதார் அட்டை",
    kn: "ಆಧಾರ್ ಕಾರ್ಡ್",
    bn: "আধার কার্ড",
    mr: "आधार कार्ड"
  },
  "Aadhaar Card or Voter ID": {
    hi: "आधार कार्ड या मतदाता पहचान पत्र",
    te: "ఆధార్ కార్డు లేదా ఓటరు గుర్తింపు కార్డు",
    ta: "ஆதார் அட்டை அல்லது வாக்காளர் அடையாள அட்டை",
    kn: "ಆಧಾರ್ ಕಾರ್ಡ್ ಅಥವಾ ಮತದಾರರ ಗುರುತಿನ ಚೀಟಿ",
    bn: "আধার কার্ড বা ভোটার আইডি",
    mr: "आधार कार्ड किंवा मतदार ओळखपत्र"
  },
  "Aadhaar Card or Voter ID Card": {
    hi: "आधार कार्ड या मतदाता पहचान पत्र",
    te: "ఆధార్ కార్డు లేదా ఓటరు గుర్తింపు కార్డు",
    ta: "ஆதார் அட்டை அல்லது வாக்காளர் அடையாள அட்டை",
    kn: "ಆಧಾರ್ ಕಾರ್ಡ್ ಅಥವಾ ಮತದಾರರ ಗುರುತಿನ ಚೀಟಿ",
    bn: "আধার কার্ড বা ভোটার আইডি",
    mr: "आधार कार्ड किंवा मतदार ओळखपत्र"
  },
  "Bank Passbook linked with Aadhaar": {
    hi: "आधार से जुड़ा बैंक पासबुक",
    te: "ఆధార్‌తో అనుసంధానించబడిన బ్యాంక్ పాస్‌బుక్",
    ta: "ஆதாருடன் இணைக்கப்பட்ட வங்கி பாஸ்புக்",
    kn: "ಆಧಾರ್ ಲಿಂಕ್ ಆದ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್",
    bn: "আধার সংযুক্ত ব্যাঙ্ক পাসবই",
    mr: "आधारशी जोडलेले बँक पासबुक"
  },
  "Bank Passbook linked to Aadhaar": {
    hi: "आधार से जुड़ा बैंक पासबुक",
    te: "ఆధార్‌తో అనుసంధానించబడిన బ్యాంక్ పాస్‌బుక్",
    ta: "ஆதாருடன் இணைக்கப்பட்ட வங்கி பாஸ்புக்",
    kn: "ಆಧಾರ್ ಲಿಂಕ್ ಆದ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್",
    bn: "আধার সংযুক্ত ব্যাঙ্ক পাসবই",
    mr: "आधारशी जोडलेले बँक पासबुक"
  },
  "Bank Account details / Passbook copy": {
    hi: "बैंक खाता विवरण / पासबुक की प्रति",
    te: "బ్యాంక్ ఖాతా వివరాలు / పాస్‌బుక్ కాపీ",
    ta: "வங்கி கணக்கு விவரங்கள் / பாஸ்புக் நகல்",
    kn: "ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರಗಳು / ಪಾಸ್‌ಬುಕ್ ಪ್ರತಿ",
    bn: "ব্যাঙ্ক অ্যাকাউন্টের বিবরণ / পাসবইয়ের প্রতিলিপি",
    mr: "बँक खात्याचा तपशील / पासबुक प्रत"
  },
  "Bank Account details": {
    hi: "बैंक खाता विवरण",
    te: "బ్యాంక్ ఖాతా వివరాలు",
    ta: "வங்கி கணக்கு விவரங்கள்",
    kn: "ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರಗಳು",
    bn: "ব্যাঙ্ক অ্যাকাউন্টের বিবরণ",
    mr: "बँक खात्याचा तपशील"
  },
  "Bank Account Passbook": {
    hi: "बैंक खाता पासबुक",
    te: "బ్యాంక్ ఖాతా పాస్‌బుక్",
    ta: "வங்கி கணக்கு பாஸ்புக்",
    kn: "ಬ್ಯಾಂಕ್ ಖಾತೆ ಪಾಸ್‌ಬುಕ್",
    bn: "ব্যাঙ্ক অ্যাকাউন্ট পাসবই",
    mr: "बँक खाते पासबुक"
  },
  "Bank Passbook copy": {
    hi: "बैंक पासबुक की फोटोकॉपी",
    te: "బ్యాంక్ పాస్‌బుక్ కాపీ",
    ta: "வங்கி பாஸ்புக் நகல்",
    kn: "ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಪ್ರತಿ",
    bn: "ব্যাঙ্ক পাসবইয়ের কপি",
    mr: "बँक पासबुक प्रत"
  },
  "Bank Passbook in student's name": {
    hi: "विद्यार्थी के नाम पर बैंक पासबुक",
    te: "విద్యార్థి పేరు మీద బ్యాంక్ పాస్‌బుక్",
    ta: "மாணவர் பெயரிலான வங்கி பாஸ்புக்",
    kn: "ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರಿನ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್",
    bn: "শিক্ষার্থীর নামে ব্যাঙ্ক পাসবই",
    mr: "विद्यार्थ्याच्या नावावरील बँक पासबुक"
  },
  "Bank Passbook in the applicant's name": {
    hi: "आवेदक के नाम पर बैंक पासबुक",
    te: "దరఖాస్తుదారు పేరు మీద బ్యాంక్ పాస్‌బుక్",
    ta: "விண்ணப்பதாரர் பெயரிலான வங்கி பாஸ்புக்",
    kn: "ಅರ್ಜಿದಾರರ ಹೆಸರಿನ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್",
    bn: "আবেদনকারীর নামে ব্যাঙ্ক পাসবই",
    mr: "अर्जदाराच्या नावावरील बँक पासबुक"
  },
  "Land Ownership Documents (Patta / Khatauni / RoR / 7/12 extract)": {
    hi: "भूमि स्वामित्व दस्तावेज (पट्टा / खतौनी / 7/12 नकल)",
    te: "భూమి యాజమాన్య పత్రాలు (పట్టా / ఖతౌని / RoR / పాస్‌బుక్)",
    ta: "நில உரிமை ஆவணங்கள் (பட்டா / சிட்டா / அடங்கல்)",
    kn: "ಭೂ ಮಾಲೀಕತ್ವದ ದಾಖಲೆಗಳು (ಪಹಣಿ / ಪಟ್ಟಾ / 7/12)",
    bn: "জমির মালিকানার নথি (পর্চা / খতিয়ান)",
    mr: "जमीन मालकीची कागदपत्रे (७/१२ / ८-अ उतारा / पट्टा)"
  },
  "Land Record Certificate (Khatauni / Patta / Sowing Certificate)": {
    hi: "भूमि रिकॉर्ड प्रमाण पत्र (खतौनी / पट्टा / बुवाई प्रमाण पत्र)",
    te: "భూమి రికార్డు పత్రం (ఖతౌని / పట్టా / సాగు ధృవీకరణ)",
    ta: "நில உரிமை ஆவணங்கள் (பட்டா / சாகுபடி சான்றிதழ்)",
    kn: "ಭೂ ದಾಖಲೆ ಪ್ರಮಾಣಪತ್ರ (ಪಹಣಿ / ಪಟ್ಟಾ)",
    bn: "জমির রেকর্ড সার্টিফিকেট (পর্চা / খতিয়ান)",
    mr: "जमीन नोंदणी प्रमाणपत्र (७/१२ / पेरणी प्रमाणपत्र)"
  },
  "Land Ownership Documents or Tenant Cultivator Agreement": {
    hi: "भूमि स्वामित्व दस्तावेज या बटाईदार समझौता पत्र",
    te: "భూమి యాజమాన్య పత్రాలు లేదా కౌలుదారు ఒప్పందం",
    ta: "நில உரிமை ஆவணம் அல்லது குத்தகை உழவர் ஒப்பந்தம்",
    kn: "ಭೂ ಮಾಲೀಕತ್ವದ ದಾಖಲೆ ಅಥವಾ ಗೇಣಿ ಒಪ್ಪಂದ",
    bn: "জমির মালিকানার নথি বা বর্গা চাষীর চুক্তিপত্র",
    mr: "जमीन मालकीची कागदपत्रे किंवा कुळ करारपत्र"
  },
  "Land Patta / Chitta / Revenue Record showing cultivable land": {
    hi: "कृषि योग्य भूमि का पट्टा / राजस्व रिकॉर्ड",
    te: "సాగు భూమి పట్టా / చిట్టా / రెవెన్యూ రికార్డు",
    ta: "விவசாய நிலத்திற்கான பட்டா / சிட்டா ஆவணம்",
    kn: "ಕೃಷಿ ಭೂಮಿಯ ಪಟ್ಟಾ / ಕಂದಾಯ ದಾಖಲೆ",
    bn: "চাষযোগ্য জমির পাট্টা / রাজস্ব রেকর্ড",
    mr: "शेतजमिनीचा पट्टा / महसूल नोंद"
  },
  "Crop Sowing Certificate from Village Administrative Officer (VAO)": {
    hi: "ग्राम प्रशासनिक अधिकारी (VAO) से फसल बुवाई प्रमाण पत्र",
    te: "గ్రామ పాలనాధికారి (VAO) జారీ చేసిన పంట సాగు ధృవీకరణ పత్రం",
    ta: "கிராம நிர்வாக அலுவலர் (VAO) வழங்கிய பயிர் சாகுபடி சான்றிதழ்",
    kn: "ಗ್ರಾಮ ಲೆಕ್ಕಿಗರಿಂದ ಬೆಳೆ ಬಿತ್ತನೆ ದೃಢೀಕರಣ ಪತ್ರ",
    bn: "গ্রাম প্রশাসনিক কর্মকর্তার থেকে ফসল বোনার শংসাপত্র",
    mr: "तलाठी / ग्रामसेवकाकडून पीक पेरणी दाखला"
  },
  "Active Mobile Number (Aadhaar OTP)": {
    hi: "सक्रिय मोबाइल नंबर (आधार ओटीपी हेतु)",
    te: "క్రియాశీల మొబైల్ నంబర్ (ఆధార్ OTP కొరకు)",
    ta: "செயலில் உள்ள கைபேசி எண் (ஆதார் OTP)",
    kn: "ಸಕ್ರಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ (ಆಧಾರ್ OTP)",
    bn: "সক্রিয় মোবাইল নম্বর (আধার ওটিপির জন্য)",
    mr: "सक्रिय मोबाईल क्रमांक (आधार ओटीपीसाठी)"
  },
  "Active Mobile number for OTP verification": {
    hi: "ओटीपी सत्यापन के लिए सक्रिय मोबाइल नंबर",
    te: "OTP ధృవీకరణ కోసం క్రియాశీల మొబైల్ నంబర్",
    ta: "OTP சரிபார்ப்பிற்கான மொபைல் எண்",
    kn: "OTP ಪರಿಶೀಲನೆಗಾಗಿ ಸಕ್ರಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    bn: "ওটিপি যাচাইয়ের জন্য সক্রিয় মোবাইল নম্বর",
    mr: "ओटीपी पडताळणीसाठी सक्रिय मोबाईल क्रमांक"
  },
  "Active Mobile number linked with Aadhaar": {
    hi: "आधार से जुड़ा सक्रिय मोबाइल नंबर",
    te: "ఆధార్‌తో లింక్ చేయబడిన క్రియాశీల మొబైల్ నంబర్",
    ta: "ஆதாருடன் இணைக்கப்பட்ட மொபைல் எண்",
    kn: "ಆಧಾರ್ ಲಿಂಕ್ ಆದ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    bn: "আধার লিঙ্কযুক্ত সক্রিয় মোবাইল নম্বর",
    mr: "आधारशी जोडलेला सक्रिय मोबाईल क्रमांक"
  },
  "Death Certificate of Husband": {
    hi: "पति का मृत्यु प्रमाण पत्र",
    te: "భర్త మరణ ధృవీకరణ పత్రం",
    ta: "கணவரின் இறப்புச் சான்றிதழ்",
    kn: "ಗಂಡನ ಮರಣ ಪ್ರಮಾಣಪತ್ರ",
    bn: "স্বামীর মৃত্যু শংসাপত্র",
    mr: "पतीचे मृत्यू प्रमाणपत्र"
  },
  "BPL Ration Card or BPL Certificate": {
    hi: "बीपीएल राशन कार्ड या बीपीएल प्रमाण पत्र",
    te: "బి.పి.ఎల్ రేషన్ కార్డు లేదా బి.పి.ఎల్ సర్టిఫికేట్",
    ta: "வறுமைக் கோட்டிற்கு கீழ் உள்ள குடும்ப அட்டை (BPL)",
    kn: "ಬಿಪಿಎಲ್ ರೇಷನ್ ಕಾರ್ಡ್ ಅಥವಾ ಬಿಪಿಎಲ್ ಪ್ರಮಾಣಪತ್ರ",
    bn: "বিপিএল রেশন কার্ড বা দারিদ্র্য শংসাপত্র",
    mr: "बीपीएल रेशन कार्ड किंवा बीपीएल दाखला"
  },
  "BPL Ration Card / BPL Survey Certificate": {
    hi: "बीपीएल राशन कार्ड / बीपीएल सर्वेक्षण प्रमाण पत्र",
    te: "బి.పి.ఎల్ రేషన్ కార్డు / సర్వే ధృవీకరణ పత్రం",
    ta: "BPL குடும்ப அட்டை / கணக்கெடுப்பு சான்றிதழ்",
    kn: "ಬಿಪಿಎಲ್ ರೇಷನ್ ಕಾರ್ಡ್ / ಸಮೀಕ್ಷಾ ಪ್ರಮಾಣಪತ್ರ",
    bn: "বিপিএল রেশন কার্ড / সমীক্ষা শংসাপত্র",
    mr: "बीपीएल रेशन कार्ड / बीपीएल सर्वेक्षण दाखला"
  },
  "Ration Card (NFSA / BPL / Antyodaya) or Family Register": {
    hi: "राशन कार्ड (NFSA / बीपीएल / अंत्योदय) या परिवार रजिस्टर",
    te: "రేషన్ కార్డు (NFSA / బి.పి.ఎల్ / అంత్యోదయ) లేదా కుటుంబ రిజిస్టర్",
    ta: "குடும்ப அட்டை (NFSA / BPL / அந்த்யோதயா) அல்லது குடும்ப பதிவு",
    kn: "ರೇಷನ್ ಕಾರ್ಡ್ (NFSA / BPL / ಅಂತ್ಯೋದಯ) ಅಥವಾ ಕುಟುಂಬ ನೋಂದಣಿ",
    bn: "রেশন কার্ড (NFSA / বিপিএল / অন্ত্যোদয়) বা পারিবারিক খাতা",
    mr: "रेशन कार्ड (NFSA / बीपीएल / अंत्योदय) किंवा कुटुंब नोंदवही"
  },
  "Age Proof (Aadhaar / Voter ID / Birth Certificate)": {
    hi: "आयु प्रमाण पत्र (आधार / मतदाता पहचान पत्र / जन्म प्रमाण पत्र)",
    te: "వయస్సు ధృవీకరణ పత్రం (ఆధార్ / ఓటరు గుర్తింపు / జనన ధృవీకరణ)",
    ta: "வயது சான்றிதழ் (ஆதார் / வாக்காளர் அட்டை / பிறப்புச் சான்றிதழ்)",
    kn: "ವಯಸ್ಸಿನ ಪುರಾವೆ (ಆಧಾರ್ / ಮತದಾರರ ಗುರುತು / ಜನನ ಪ್ರಮಾಣಪತ್ರ)",
    bn: "বয়সের প্রমাণ (আধার / ভোটার আইডি / জন্ম শংসাপত্র)",
    mr: "वयाचा पुरावा (आधार / मतदार ओळखपत्र / जन्म दाखला)"
  },
  "Passport-size Photographs": {
    hi: "पासपोर्ट आकार की नवीनतम रंगीन तस्वीरें",
    te: "పాస్‌పోర్ట్ సైజు తాజా ఫోటోలు",
    ta: "பாஸ்போர்ட் அளவு புகைப்படங்கள்",
    kn: "ಪಾಸ್‌ಪೋರ್ಟ್ ಅಳತೆಯ ಇತ್ತೀಚಿನ ಫೋಟೋಗಳು",
    bn: "পাসপোর্ট আকারের রঙিন ছবি",
    mr: "पासपोर्ट आकाराचे अलिकडील फोटो"
  },
  "Passport Photographs": {
    hi: "पासपोर्ट आकार की तस्वीरें",
    te: "పాస్‌పోర్ట్ సైజు ఫోటోలు",
    ta: "பாஸ்போர்ட் புகைப்படங்கள்",
    kn: "ಪಾಸ್‌ಪೋರ್ಟ್ ಅಳತೆಯ ಫೋಟೋಗಳು",
    bn: "পাসপোর্ট সাইজের ছবি",
    mr: "पासपोर्ट आकाराचे फोटो"
  },
  "Family Income Certificate issued by Tahsildar / Revenue Authority": {
    hi: "तहसीलदार / राजस्व अधिकारी द्वारा जारी पारिवारिक आय प्रमाण पत्र",
    te: "తహశీల్దార్ / రెవెన్యూ అధికారి జారీ చేసిన కుటుంబ ఆదాయ ధృవీకరణ పత్రం",
    ta: "வட்டாட்சியரால் வழங்கப்பட்ட குடும்ப வருமானச் சான்றிதழ்",
    kn: "ತಹಶೀಲ್ದಾರ್ ನೀಡಿದ ಕುಟುಂಬ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ",
    bn: "তহশিলদার / রাজস্ব দপ্তর প্রদত্ত পারিবারিক আয়ের শংসাপত্র",
    mr: "तहसीलदार / महसूल अधिकाऱ्यांनी दिलेले कौटुंबिक उत्पन्न प्रमाणपत्र"
  },
  "Income Certificate (< ₹2.5 Lakhs)": {
    hi: "आय प्रमाण पत्र (₹2.5 लाख से कम)",
    te: "ఆదాయ ధృవీకరణ పత్రం (₹2.5 లక్షల లోపు)",
    ta: "வருமானச் சான்றிதழ் (₹2.5 லட்சத்திற்கும் குறைவு)",
    kn: "ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ (₹2.5 ಲಕ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ)",
    bn: "আয়ের শংসাপত্র (২.৫ লক্ষ টাকার নিচে)",
    mr: "उत्पन्न प्रमाणपत्र (₹२.५ लाखांपेक्षा कमी)"
  },
  "Caste Certificate issued by competent revenue authority": {
    hi: "सक्षम राजस्व अधिकारी द्वारा जारी जाति प्रमाण पत्र",
    te: "అధికారిక రెవెన్యూ అధికారి జారీ చేసిన కుల ధృవీకరణ పత్రం",
    ta: "தகுதிவாய்ந்த அதிகாரியால் வழங்கப்பட்ட சாதிச் சான்றிதழ்",
    kn: "ಸಕ್ಷಮ ಕಂದಾಯ ಪ್ರಾಧಿಕಾರ ನೀಡಿದ ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ",
    bn: "সক্ষম কর্তৃপক্ষ দ্বারা প্রদত্ত জাতিগত শংসাপত্র",
    mr: "सक्षम महसूल अधिकाऱ्यांनी दिलेला जातीचा दाखला"
  },
  "Girl Child's Birth Certificate": {
    hi: "बालिका का जन्म प्रमाण पत्र",
    te: "బాలిక జనన ధృవీకరణ పత్రం",
    ta: "பெண் குழந்தையின் பிறப்புச் சான்றிதழ்",
    kn: "ಹೆಣ್ಣು ಮಗುವಿನ ಜನನ ಪ್ರಮಾಣಪತ್ರ",
    bn: "কন্যা সন্তানের জন্ম শংসাপত্র",
    mr: "मुलीचा जन्म दाखला"
  },
  "Mother and Child Protection (MCP) Card from Anganwadi": {
    hi: "आंगनवाड़ी से प्राप्त मातृ एवं शिशु सुरक्षा (MCP) कार्ड",
    te: "అంగన్‌వాడీ నుండి తల్లి మరియు పిల్లల రక్షణ (MCP) కార్డు",
    ta: "அங்கன்வாடி வழங்கிய தாய்-சேய் பாதுகாப்பு (MCP) அட்டை",
    kn: "ಅಂಗನವಾಡಿಯಿಂದ ತಾಯಿ ಮತ್ತು ಮಕ್ಕಳ ರಕ್ಷಣೆ (MCP) ಕಾರ್ಡ್",
    bn: "অঙ্গনওয়াড়ি থেকে মা ও শিশু সুরক্ষা (MCP) কার্ড",
    mr: "अंगणवाडीकडून माता व बाल संरक्षण (MCP) कार्ड"
  },
  "Vending Certificate / Identity Card issued by Urban Local Body (ULB) or Letter of Recommendation (LoR)": {
    hi: "शहरी स्थानीय निकाय द्वारा जारी वेंडिंग प्रमाण पत्र / पहचान पत्र या सिफारिश पत्र (LoR)",
    te: "పట్టణ స్థానిక సంస్థ (ULB) జారీ చేసిన వెండింగ్ సర్టిఫికేట్ / గుర్తింపు కార్డు లేదా సిఫార్సు లేఖ",
    ta: "நகர்ப்புற உள்ளாட்சி அமைப்பு வழங்கிய வியாபார சான்றிதழ் அல்லது பரிந்துரை கடிதம் (LoR)",
    kn: "ನಗರ ಸ್ಥಳೀಯ ಸಂಸ್ಥೆ ನೀಡಿದ ಬೀದಿ ವ್ಯಾಪಾರಿ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ಶಿಫಾರಸು ಪತ್ರ",
    bn: "পৌরসভা বা নগর পঞ্চায়েত প্রদত্ত ভেন্ডিং সার্টিফিকেট / পরিচয়পত্র",
    mr: "स्थानिक स्वराज्य संस्थेने दिलेले फेरीवाला प्रमाणपत्र / ओळखपत्र किंवा शिफारस पत्र"
  },
  "MGNREGA Job Card Number": {
    hi: "मनरेगा जॉब कार्ड नंबर",
    te: "ఉపాధి హామీ (MGNREGA) జాబ్ కార్డు నంబర్",
    ta: "மகாத்மா காந்தி ஊரக வேலைவாய்ப்பு அட்டை எண்",
    kn: "ನರೇಗಾ ಜಾಬ್ ಕಾರ್ಡ್ ಸಂಖ್ಯೆ",
    bn: "১০০ দিনের কাজের (মনরেগা) জব কার্ড নম্বর",
    mr: "मनरेगा जॉब कार्ड क्रमांक"
  }
};

export function translateDocument(docName, lang = 'en') {
  if (!docName || lang === 'en') return docName;
  
  // Exact match
  if (DOCUMENT_TRANSLATIONS[docName] && DOCUMENT_TRANSLATIONS[docName][lang]) {
    return DOCUMENT_TRANSLATIONS[docName][lang];
  }

  const d = docName.toLowerCase();

  // Pattern-based translation fallbacks
  if (d.includes('aadhaar')) {
    if (d.includes('mother') || d.includes('husband') || d.includes('parent') || d.includes('family')) {
      if (lang === 'hi') return 'परिवार/अभिभावक का आधार कार्ड';
      if (lang === 'te') return 'కుటుంబ సభ్యుల / తల్లిదండ్రుల ఆధార్ కార్డు';
      if (lang === 'ta') return 'குடும்ப உறுப்பினர்களின் ஆதார் அட்டை';
      if (lang === 'kn') return 'ಕುಟುಂಬದ ಸದಸ್ಯರ ಆಧಾರ್ ಕಾರ್ಡ್';
      if (lang === 'bn') return 'পরিবারের সদস্যদের আধার কার্ড';
      if (lang === 'mr') return 'कुटुंबातील सदस्यांचे आधार कार्ड';
    }
    if (lang === 'hi') return 'आधार कार्ड';
    if (lang === 'te') return 'ఆధార్ కార్డు';
    if (lang === 'ta') return 'ஆதார் அட்டை';
    if (lang === 'kn') return 'ಆಧಾರ್ ಕಾರ್ಡ್';
    if (lang === 'bn') return 'আধার কার্ড';
    if (lang === 'mr') return 'आधार कार्ड';
  }

  if (d.includes('passbook') || d.includes('bank account') || d.includes('bank details')) {
    if (lang === 'hi') return 'बैंक पासबुक / बैंक खाता विवरण';
    if (lang === 'te') return 'బ్యాంక్ పాస్‌బుక్ / ఖాతా వివరాలు';
    if (lang === 'ta') return 'வங்கி பாஸ்புக் / கணக்கு விவரங்கள்';
    if (lang === 'kn') return 'ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ / ಖಾತೆ ವಿವರಗಳು';
    if (lang === 'bn') return 'ব্যাঙ্ক পাসবই / ব্যাঙ্ক অ্যাকাউন্টের বিবরণ';
    if (lang === 'mr') return 'बँक पासबुक / बँक खात्याचा तपशील';
  }

  if (d.includes('patta') || d.includes('khatauni') || d.includes('land') || d.includes('7/12') || d.includes('ror')) {
    if (lang === 'hi') return 'भूमि स्वामित्व दस्तावेज (पट्टा / खतौनी / 7/12)';
    if (lang === 'te') return 'భూమి యాజమాన్య పత్రాలు (పట్టా / రికార్డు)';
    if (lang === 'ta') return 'நில உரிமை ஆவணங்கள் (பட்டா / சிட்டா)';
    if (lang === 'kn') return 'ಭೂ ಮಾಲೀಕತ್ವದ ದಾಖಲೆಗಳು (ಪಹಣಿ / ಪಟ್ಟಾ)';
    if (lang === 'bn') return 'জমির মালিকানার নথি (পর্চা / খতিয়ান)';
    if (lang === 'mr') return 'जमीन मालकीची कागदपत्रे (७/१२ / पट्टा)';
  }

  if (d.includes('income certificate')) {
    if (lang === 'hi') return 'वैध आय प्रमाण पत्र';
    if (lang === 'te') return 'ఆదాయ ధృవీకరణ పత్రం';
    if (lang === 'ta') return 'வருமானச் சான்றிதழ்';
    if (lang === 'kn') return 'ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ';
    if (lang === 'bn') return 'আয়ের শংসাপত্র';
    if (lang === 'mr') return 'उत्पन्न प्रमाणपत्र';
  }

  if (d.includes('caste') || d.includes('category certificate')) {
    if (lang === 'hi') return 'जाति प्रमाण पत्र';
    if (lang === 'te') return 'కుల ధృవీకరణ పత్రం';
    if (lang === 'ta') return 'சாதிச் சான்றிதழ்';
    if (lang === 'kn') return 'ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ';
    if (lang === 'bn') return 'জাতিগত শংসাপত্র';
    if (lang === 'mr') return 'जात प्रमाणपत्र';
  }

  if (d.includes('ration card') || d.includes('bpl')) {
    if (lang === 'hi') return 'राशन कार्ड (बीपीएल / अंत्योदय)';
    if (lang === 'te') return 'రేషన్ కార్డు (బి.పి.ఎల్ / అంత్యోదయ)';
    if (lang === 'ta') return 'குடும்ப அட்டை (ரேஷன் கார்டு)';
    if (lang === 'kn') return 'ರೇಷನ್ ಕಾರ್ಡ್ (ಬಿಪಿಎಲ್)';
    if (lang === 'bn') return 'রেশন কার্ড (বিপিএল)';
    if (lang === 'mr') return 'रेशन कार्ड (बीपीएल)';
  }

  if (d.includes('mobile')) {
    if (lang === 'hi') return 'सक्रिय मोबाइल नंबर';
    if (lang === 'te') return 'క్రియాశీల మొబైల్ నంబర్';
    if (lang === 'ta') return 'செயலில் உள்ள மொபைல் எண்';
    if (lang === 'kn') return 'ಸಕ್ರಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ';
    if (lang === 'bn') return 'সক্রিয় মোবাইল নম্বর';
    if (lang === 'mr') return 'सक्रिय मोबाईल क्रमांक';
  }

  if (d.includes('photo') || d.includes('photograph')) {
    if (lang === 'hi') return 'पासपोर्ट साइज फोटो';
    if (lang === 'te') return 'పాస్‌పోర్ట్ సైజు ఫోటోలు';
    if (lang === 'ta') return 'பாஸ்போர்ட் அளவு புகைப்படங்கள்';
    if (lang === 'kn') return 'ಪಾಸ್‌ಪೋರ್ಟ್ ಅಳತೆಯ ಫೋಟೋಗಳು';
    if (lang === 'bn') return 'পাসপোর্ট সাইজের ছবি';
    if (lang === 'mr') return 'पासपोर्ट आकाराचे फोटो';
  }

  return docName;
}

export function getSchemeActionPlanSpeech(scheme, docs = [], steps = [], lang = 'en') {
  const schemeName = scheme.short_name || scheme.scheme_name;
  const translatedDocs = docs.slice(0, 3).map(d => translateDocument(d, lang)).join(', ');

  if (lang === 'te') {
    return `${schemeName} పథకానికి వ్యక్తిగత కార్యాచరణ ప్రణాళిక. లభించే ప్రయోజనం: ${scheme.benefit}. కావలసిన ముఖ్యమైన పత్రాలు: ${translatedDocs}. దరఖాస్తు దశలు: మొదట మీ పత్రాలను సిద్ధం చేసుకోండి, మీ సమీప గ్రామ పంచాయతీ లేదా సి.ఎస్.సి డిజిటల్ సేవా కేంద్రంలో బయోమెట్రిక్ ఈ-కేవైసీ పూర్తి చేసి రసీదు పొందండి. సహాయం కోసం 14599 నంబర్‌కు కాల్ చేయండి.`;
  } else if (lang === 'hi') {
    return `${schemeName} योजना के लिए व्यक्तिगत कार्ययोजना। मिलने वाला लाभ: ${scheme.benefit}। आवश्यक दस्तावेज: ${translatedDocs}। आवेदन चरण: पहले दस्तावेज तैयार करें, नजदीकी ग्राम पंचायत या सीएससी डिजिटल सेवा केंद्र जाकर बायोमेट्रिक ई-केवाईसी पूरा करें और रसीद लें। हेल्पलाइन: 14599 पर संपर्क करें।`;
  } else if (lang === 'ta') {
    return `${schemeName} திட்டத்திற்கான தனிப்பயனாக்கப்பட்ட செயல்திட்டம். கிடைக்கும் நன்மை: ${scheme.benefit}. தேவையான ஆவணங்கள்: ${translatedDocs}. விண்ணப்ப படிகள்: ஆவணங்களை தயார் செய்து சி.எஸ்.சி மையம் அல்லது கிராம பஞ்சாயத்தில் இ-கேஒய்சி செய்து ரசீது பெறவும். உதவி எண்: 14599.`;
  } else if (lang === 'kn') {
    return `${schemeName} ಯೋಜನೆಗಾಗಿ ಕ್ರಿಯಾ ಯೋಜನೆ. ಲಭ್ಯವಿರುವ ಪ್ರಯೋಜನ: ${scheme.benefit}. ಅಗತ್ಯ ದಾಖಲೆಗಳು: ${translatedDocs}. ಅರ್ಜಿ ಹಂತಗಳು: ದಾಖಲೆಗಳನ್ನು ಸಂಗ್ರಹಿಸಿ, ಸಿಎಸ್‌ಸಿ ಕೇಂದ್ರ ಅಥವಾ ಗ್ರಾಮ ಪಂಚಾಯಿತಿಯಲ್ಲಿ ಇ-ಕೆವೈಸಿ ಪೂರ್ಣಗೊಳಿಸಿ ಸ್ವೀಕೃತಿ ರಸೀದಿ ಪಡೆಯಿರಿ. ಸಹಾಯವಾಣಿ: 14599.`;
  } else if (lang === 'bn') {
    return `${schemeName} প্রকল্পের জন্য কর্মপরিকল্পনা। প্রাপ্ত সুবিধা: ${scheme.benefit}। প্রয়োজনীয় নথিপত্র: ${translatedDocs}। আবেদনের ধাপ: কাগজপত্র সংগ্রহ করে নিকটস্থ সিএসসি কেন্দ্র বা গ্রাম পঞ্চায়েতে ই-কেওয়াইসি সম্পন্ন করে রশিদ সংগ্রহ করুন। হেল্পলাইন: 14599.`;
  } else if (lang === 'mr') {
    return `${schemeName} योजनेसाठी कृती आराखडा. मिळणारा लाभ: ${scheme.benefit}. आवश्यक कागदपत्रे: ${translatedDocs}. अर्ज प्रक्रिया: कागदपत्रे गोळा करून जवळच्या सीएससी किंवा ग्रामपंचायतीत ई-केवायसी पूर्ण करा आणि पावती घ्या. हेल्पलाइन: 14599.`;
  }
  return `Personalized action plan for ${schemeName}. Potential benefit: ${scheme.benefit}. Required documents include: ${translatedDocs}. First step: gather documents, visit your nearest Common Service Centre or Gram Panchayat, complete biometric e-KYC, and track your application slip. Helpline: dial 14599.`;
}

export function getStepSpeechText(stepNumber, title, description, lang = 'en') {
  if (lang === 'te') {
    return `దశ ${stepNumber}: ${title}. ${description}`;
  } else if (lang === 'hi') {
    return `चरण ${stepNumber}: ${title}। ${description}`;
  } else if (lang === 'ta') {
    return `படி ${stepNumber}: ${title}. ${description}`;
  } else if (lang === 'kn') {
    return `ಹಂತ ${stepNumber}: ${title}. ${description}`;
  } else if (lang === 'bn') {
    return `ধাপ ${stepNumber}: ${title}। ${description}`;
  } else if (lang === 'mr') {
    return `टप्पा ${stepNumber}: ${title}। ${description}`;
  }
  return `Step ${stepNumber}: ${title}. ${description}`;
}
