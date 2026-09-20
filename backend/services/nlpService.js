/**
 * NLP & Conversational Service for Sahaaya
 * 
 * Extracts structured user profile from natural voice/text input.
 * Implements dual-mode:
 * 1. AI LLM (Gemini API) if GEMINI_API_KEY is available.
 * 2. Robust Heuristic NLP Fallback (handles English, Hinglish, Tamil, Telugu, Hindi keywords)
 *    ensuring zero-setup offline reliability for hackathons.
 */

import { normalizeProfile } from './eligibilityEngine.js';

// Indian States list for recognition
const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry'
];

// Indic numerals to ASCII digits conversion
export function convertIndicDigits(text = '') {
  const indicDigits = {
    // Telugu
    '౦': '0', '౧': '1', '౨': '2', '౩': '3', '౪': '4', '౫': '5', '౬': '6', '౭': '7', '౮': '8', '౯': '9',
    // Devanagari (Hindi, Marathi)
    '०': '0', '१': '1', '२': '2', '३': '3', '४': '4', '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
    // Tamil
    '௦': '0', '௧': '1', '௨': '2', '௩': '3', '௪': '4', '௫': '5', '௬': '6', '௭': '7', '௮': '8', '௯': '9',
    // Kannada
    '೦': '0', '೧': '1', '೨': '2', '೩': '3', '೪': '4', '೫': '5', '೬': '6', '೭': '7', '೮': '8', '೯': '9',
    // Bengali
    '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
  };

  return String(text).replace(/[౦-౯०-९௦-௯೦-೯০-৯]/g, d => indicDigits[d] || d);
}

/**
 * Heuristic NLP Extractor
 * Extracts only explicit statements without hallucinating missing fields.
 * Fully supports Telugu, Hindi, Tamil, Kannada, Bengali, Marathi, and English.
 */
export function extractProfileHeuristics(rawText = '', existingProfile = {}) {
  const text = convertIndicDigits(rawText);
  const lower = text.toLowerCase();
  const extracted = {};

  // 1. Age extraction
  // Matches:
  // English: "58 years old", "58 yrs", "age 58", "I am 58", "a 20-year-old", "20-year-old"
  // Telugu: "నా వయస్సు 58", "58 సంవత్సరాలు", "58 ఏళ్ళు", "58 ఏళ్లు", "వయసు 58"
  // Hindi: "उम्र 58", "58 साल", "58 वर्ष"
  // Tamil: "வயது 58", "58 வயது", "58 வருடம்"
  // Kannada: "ವಯಸ್ಸು 58", "58 ವರ್ಷ"
  // Bengali: "বয়স ৫৮", "৫৮ বছর"
  // Marathi: "वय ५८", "५८ वर्षे"
  const agePatterns = [
    /(\d{1,2})\s*[-]?\s*(?:years?|yrs?)\s*[-]?\s*old/i,
    /(?:age|aged|am|is)\s+(?:a\s+)?(\d{1,2})\s*(?:years|yrs|year|saal|vayasu)?/i,
    /(?:i am|am)\s+(?:a\s+)?(\d{1,2})\b/i,
    /\b(\d{1,2})\s*(?:years|yrs|saal|vayasu)\b/i,
    // Telugu
    /(\d{1,2})\s*(?:సంవత్సరాల|సంవత్సరాలు|సం|ఏళ్లు|ఏళ్ళు|ఏళ్ల)/i,
    /(?:వయస్సు|వయసు|నాకు|నా)\s*(?:సుమారు|దాదాపు)?\s*(\d{1,2})/i,
    // Hindi & Marathi
    /(\d{1,2})\s*(?:साल|वर्ष|वर्षे)/i,
    /(?:उम्र|आयु|वय)\s*(?:लगभग)?\s*(\d{1,2})/i,
    // Tamil
    /(\d{1,2})\s*(?:வயது|வருடம்|வருஷம்)/i,
    /(?:வயது|எனக்கு)\s*(\d{1,2})/i,
    // Kannada
    /(\d{1,2})\s*(?:ವರ್ಷ|ವರ್ಷದ)/i,
    /(?:ವಯಸ್ಸು|ನನಗೆ)\s*(\d{1,2})/i,
    // Bengali
    /(\d{1,2})\s*বছর/i,
    /বয়স\s*(\d{1,2})/i
  ];

  for (const pat of agePatterns) {
    const m = text.match(pat);
    if (m && m[1]) {
      const val = parseInt(m[1], 10);
      if (val >= 5 && val <= 110) {
        extracted.age = val;
        break;
      }
    }
  }

  // Fallback age: If no pattern matched, check for standalone 2-digit number (15 to 99) when text mentions age/years words
  if (!extracted.age) {
    const ageKeywordPattern = /(?:age|year|saal|vayasu|వయస్సు|వయసు|సంవత్సరాలు|ఏళ్లు|ఏళ్ళు|ఉम्र|आयु|வயது|ವಯಸ್ಸು|বয়স|वय)/i;
    if (ageKeywordPattern.test(text)) {
      const numMatch = text.match(/\b([1-9]\d)\b/);
      if (numMatch && numMatch[1]) {
        const val = parseInt(numMatch[1], 10);
        if (val >= 15 && val <= 100) extracted.age = val;
      }
    }
  }

  // 2. Gender & Marital Status extraction
  // Widow detection (sets both marital_status = widow and gender = female)
  const widowPattern = /\b(widow|widowed|vidhwa|kaimpen)\b|వితంతువు|వితంతు|భర్త\s*చనిపోయారు|భర్త\s*లేరు|విధవా|पति\s*गुजर|पति\s*नहीं|விதவை|கைம்பெண்|ವಿಧವೆ|বিধবা/i;
  if (widowPattern.test(text) || /husband\s+(?:passed|died|no\s+more)/i.test(text)) {
    extracted.marital_status = 'widow';
    extracted.gender = 'female';
  } else {
    // Female
    const femalePattern = /\b(woman|female|lady|girl|mother|mahila|aurat|pen|amma)\b|మహిళ|స్త్రీ|ఆడ|అమ్మాయి|ఆడపడుచు|महिला|स्त्री|औरत|लड़की|பெண்|மகிளா|மகள்|ಮಹಿಳೆ|ಹೆಣ್ಣು|মহিলা|নারী/i;
    if (femalePattern.test(text)) {
      extracted.gender = 'female';
    }

    // Male
    const malePattern = /\b(man|male|boy|father|purush|aadmi|aan|aiya)\b|పురుషుడు|మగ|అబ్బాయి|पुरुष|आदमी|लड़का|ஆண்|ಪುರುಷ|ಗಂಡು|পুরুষ/i;
    if (malePattern.test(text)) {
      extracted.gender = 'male';
    }

    // Married
    const marriedPattern = /\b(married|wife|husband|shaadi)\b|పెళ్లయింది|వివాహం|భార్య|భర్త|विवाहित|शादीशुदा|திருமணமான|ವಿವಾಹಿತ/i;
    if (marriedPattern.test(text)) {
      extracted.marital_status = 'married';
    }

    // Single / Unmarried
    const singlePattern = /\b(single|unmarried|bachelor|spinster)\b|ఒంటరి|పెళ్లి\s*కాలేదు|అవివాహిత|अविवाहित|कुंवारा|कुंवारी|திருமணமாகாத|ಅವಿವಾಹಿತ/i;
    if (singlePattern.test(text)) {
      extracted.marital_status = 'single';
    }
  }

  // 3. State extraction (English & Regional scripts)
  const stateMappings = [
    { state: 'Tamil Nadu', pattern: /\b(tn|tamil\s*nadu|chennai|madurai|coimbatore)\b|తమిళనాడు|తమిళ\s*నాడు|तमिलनाडु|தமிழ்நாடு|ತಮಿಳುನಾಡು|তামিলনাড়ু/i },
    { state: 'Andhra Pradesh', pattern: /\b(ap|andhra|andhra\s*pradesh|vijayawada|visakhapatnam|tirupati)\b|ఆంధ్రప్రదేశ్|ఆంధ్ర\s*ప్రదేశ్|ఆంధ్ర|ఆంధ్రా|आंध्र\s*प्रदेश|ஆந்திரா|ಆಂಧ್ರಪ್ರದೇಶ|অন্ধ্রপ্রদেশ/i },
    { state: 'Telangana', pattern: /\b(telangana|hyderabad|warangal)\b|తెలంగాణ|తెలంగాణా|तेलंगाना|தெலுங்கானா|ತೆಲಂಗಾಣ|তেলেঙ্গানা/i },
    { state: 'Karnataka', pattern: /\b(karnataka|bengaluru|bangalore|mysore)\b|కర్ణాటక|కర్ణాటకలో|कर्नाटक|கர்நாடகா|ಕರ್ನಾಟಕ|কর্ণাটক/i },
    { state: 'Maharashtra', pattern: /\b(maharashtra|mumbai|pune|nagpur)\b|మహారాష్ట్ర|महाराष्ट्र|மகாராஷ்டிரா|ಮಹಾರಾಷ್ಟ್ರ|মহারাষ্ট্র/i },
    { state: 'Uttar Pradesh', pattern: /\b(up|uttar\s*pradesh|lucknow|kanpur|varanasi)\b|ఉత్తరప్రదేశ్|ఉత్తర\s*ప్రదేశ్|उत्तर\s*प्रदेश|உத்தரப்\s*பிரதேசம்|ಉತ್ತರ\s*ಪ್ರದೇಶ|উত্তরপ্রদেশ/i },
    { state: 'Kerala', pattern: /\b(kerala|cochin|trivandrum)\b|కేరళ|केरल|கேரளா|ಕೇರಳ|কেরালা/i },
    { state: 'Bihar', pattern: /\b(bihar|patna)\b|బీహార్|बिहार|பீகார்|ಬಿಹಾರ|বিহার/i },
    { state: 'Rajasthan', pattern: /\b(rajasthan|jaipur)\b|రాజస్థాన్|राजस्थान|ராஜஸ்தான்|ರಾಜಸ್ಥಾನ|রাজস্থান/i },
    { state: 'West Bengal', pattern: /\b(west\s*bengal|kolkata)\b|పశ్చిమ\s*బెంగాల్|पश्चिम\s*बंगाल|மேற்கு\s*வங்கம்|পশ্চিমবঙ্গ/i },
    { state: 'Gujarat', pattern: /\b(gujarat|ahmedabad)\b|గుజరాత్|गुजरात|குஜராத்|ಗುಜರಾತ್|গুজরাট/i },
    { state: 'Punjab', pattern: /\b(punjab)\b|పంజాబ్|पंजाब|பஞ்சாப்|ಪಂಜಾಬ್|পাঞ্জাব/i }
  ];

  for (const item of stateMappings) {
    if (item.pattern.test(text)) {
      extracted.state = item.state;
      break;
    }
  }

  // 4. Occupation extraction
  const farmerPattern = /\b(farm|farmer|farming|kisan|agriculture|cultivator|crop|kheti|vyavasayam)\b|రైతు|రైతును|రైతుని|రైతుల|వ్యవసాయం|వ్యవసాయ|సాగు|పొలం|కమతం|కృషి|किसान|खेती|कृषि|काश्तकार|விவசாயி|விவசாயம்|உழவர்|ರೈತ|ಕೃಷಿ|ವ್ಯವಸಾಯ|কৃষক|চাষী|शेतकरी|शेती/i;
  if (farmerPattern.test(text)) {
    extracted.occupation = 'farmer';
    // Often implies small farm / land ownership
    const smallFarmPattern = /\b(small\s*farm|my\s*farm|our\s*farm|small\s*holding|have\s*farm|own\s*land|small\s*land)\b|చిన్న\s*పొలం|సొంత\s*పొలం|నాకు\s*పొలం|కొద్దిగా\s*పొలం|భూమి\s*ఉంది|छोटा\s*खेत|खुद\s*का\s*खेत|जमीन\s*है|சிறிய\s*நிலம்|సಣ್ಣ\s*ಜಮೀನು/i;
    if (smallFarmPattern.test(text)) {
      extracted.land_owned = true;
    }
  }
  // Student
  else if (/\b(student|study|studying|college|school|vidyarthi|degree|diploma|btech|bsc|ba)\b|విద్యార్థి|విద్యార్థిని|చదువు|చదువుకుంటున్నాను|కాలేజీ|స్కూలు|छात्र|छात्रा|विद्यार्थी|पढ़ाई|कॉलेज|स्कूल|மாணவர்|மாணவி|படிக்கிறேன்|கல்லூரி|ವಿದ್ಯಾರ್ಥಿ|ಓದುತ್ತಿದ್ದೇನೆ|ಕಾಲೇಜು|ছাত্র|ছাত্রী|विद्यार्थी|विद्यार्थिनी/i.test(text)) {
    extracted.occupation = 'student';
  }
  // Street Vendor
  else if (/\b(street\s*vendor|vendor|hawker|cart|thela|selling\s*vegetables|selling\s*fruits|shopkeeper|petty\s*shop)\b|వీధి\s*వ్యాపారి|తోపుడు\s*బండి|తోపుడుబండి|కూరగాయలు\s*అమ్ముతాను|చిరు\s*వ్యాపారి|చిరు\s*వ్యాపారం|బండి\s*మీద|रेहड़ी|ठेला|फेरीवाला|सब्जी\s*विक्रेता|தெருவோர\s*வியாபாரி|தள்ளுவண்டி|பழக்கடை|ಬೀದಿ\s*ವ್ಯಾಪಾರಿ|ತಳ್ಳುಗಾಡಿ|পথবিক্রেতা|फेरीवाला|हातगाडी/i.test(text)) {
    extracted.occupation = 'street_vendor';
  }
  // Daily Wage Laborer
  else if (/\b(daily\s*wage|laborer|labourer|coolie|mazdoor|construction\s*worker|casual\s*worker|kooli)\b|కూలీ|కూలి|దినసరి\s*కూలీ|కూలి\s*పని|కూలిపని|రోజూ\s*కూలీ|మజ్దూర్|मजदूर|दिहाड़ी|कुली|श्रमजीवी|தினக்கூலி|கூலி\s*தொழிலாளி|ದಿನಗೂಲಿ|ಕೂಲಿ\s*ಕಾರ್ಮಿಕ|দিনমজুর|रोजंदारी\s*मजूर/i.test(text)) {
    extracted.occupation = 'daily_wage';
  }
  // Retired
  else if (/\b(retired|pensioner|senior\s*citizen)\b|రిటైర్డ్|పెన్షనర్|వృద్ధాప్యం|పెన్షన్|सेवानिवृत्त|पेंशनभोगी|वृद्ध|ஓய்வு|ನಿವೃತ್ತ/i.test(text)) {
    extracted.occupation = 'retired';
  }
  // Homemaker
  else if (/\b(housewife|homemaker)\b|గృహిణి|ఇంటి\s*పని|गृहणी|गृहिणी|இல்லத்தரசி|ಗೃಹಿಣಿ/i.test(text)) {
    extracted.occupation = 'homemaker';
  }

  // 5. Land ownership extraction
  if (extracted.land_owned === undefined) {
    const hasLandPattern = /\b(have\s*(?:a\s*)?(?:small\s*)?farm|own\s*land|small\s*holding|landowner|patta|acre|acres)\b|పొలం\s*ఉంది|భూమి\s*ఉంది|చిన్న\s*పొలం|సొంత\s*పొలం|సొంత\s*భూమి|కొద్దిగా\s*పొలం|కొద్దిగా\s*భూమి|ఎకరాలు|ఎకరం|పట్టా|జమీను|కమతం|जमीन\s*है|खेत\s*है|छोटा\s*खेत|खुद\s*की\s*जमीन|पट्टा|एकड़|நிலம்\s*உள்ளது|சிறிய\s*நிலம்|சொந்த\s*நிலம்|பட்டா|ಜಮೀನು\s*ಇದೆ|ಭೂಮಿ\s*ಇದೆ|ಸಣ್ಣ\s*ಜಮೀನು|জমি\s*আছে|जमीन\s*आहे/i;
    const noLandPattern = /\b(no\s*land|landless|don'?t\s*own\s*land|no\s*farm)\b|పొలం\s*లేదు|భూమి\s*లేదు|సొంత\s*భూమి\s*లేదు|కౌలు\s*రైతు|కౌలుదారు|భూమిలేని|పొలం\s*ఏమీ\s*లేదు|जमीन\s*नहीं|भूमिहीन|खेत\s*नहीं|நிலம்\s*இல்லை|குத்தகை\s*விவசாயி|ಜಮೀನು\s*ಇಲ್ಲ|ಭೂಮಿ\s*ಇಲ್ಲ|जमीन\s*नाही/i;

    if (hasLandPattern.test(text)) {
      extracted.land_owned = true;
    } else if (noLandPattern.test(text)) {
      extracted.land_owned = false;
    }
  }

  // 6. Income category / Annual income extraction
  const lowIncomePattern = /\b(low\s*income|income\s*is\s*low|poor|bpl|below\s*poverty|ration\s*card|garib|kam\s*aamadani|no\s*income)\b|తక్కువ\s*ఆదాయం|ఆదాయం\s*తక్కువ|చాలా\s*తక్కువ|పేద|బీపీఎల్|తెల్ల\s*రేషన్\s*కార్డు|రేషన్\s*కార్డు|పేదరికం|దారిద్య్ర\s*రేఖ|కడు\s*పేద|కష్టాల్లో|कम\s*आय|आय\s*कम|गरीब|बीपीएल|राशन\s*कार्ड|गरीबी\s*रेखा|குறைந்த\s*வருமானம்|வருமானம்\s*குறைவு|ஏழை|பிபிஎல்|ரேஷன்\s*அட்டை|ಕಡಿಮೆ\s*ಆದಾಯ|ಬಡತನ|ಬಿಪಿಎಲ್|ರೇಷನ್\s*ಕಾರ್ಡ್|কম\s*আয়|দরিদ্র|বিপিএল|कमी\s*उत्पन्न|दारिद्र्य/i;
  const mediumIncomePattern = /\b(medium\s*income|middle\s*class)\b|మధ్యతరగతి|మధ్యమ\s*ఆదాయం|मध्यम\s*आय|நடுத்தர|ಮಧ್ಯಮ\s*ಆದಾಯ/i;
  const highIncomePattern = /\b(high\s*income|rich|tax\s*payer)\b|ఎక్కువ\s*ఆదాయం|ధనికులు|ట్యాక్స్|अमीर|उच्च\s*आय|அதிக\s*வருமானம்/i;

  if (lowIncomePattern.test(text)) {
    extracted.income_category = 'low';
  } else if (mediumIncomePattern.test(text)) {
    extracted.income_category = 'medium';
  } else if (highIncomePattern.test(text)) {
    extracted.income_category = 'high';
  }

  // Numerical income (English & Regional numerals/words)
  const lakhMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:lakh|lakhs|lac|lacs|లక్ష|లక్షలు|లాఖ్|लाख|லட்சம்|ലക്ഷം|ಲಕ್ಷ|লাখ)/i);
  if (lakhMatch) {
    extracted.annual_income = parseFloat(lakhMatch[1]) * 100000;
  } else {
    const rawIncomeMatch = text.match(/(?:income|earning|earn|ఆదాయం|வருமானம்|आय|ಆದಾಯ|আয়)\s*(?:of|is|around|approx|సుమారు|தோராயமாக|लगभग)?\s*(?:₹|rs\.?|inr|రూ|రూపాయలు|रुपये)?\s*(\d{4,7})/i);
    if (rawIncomeMatch) {
      extracted.annual_income = parseInt(rawIncomeMatch[1], 10);
    }
  }

  // 7. Social Category (Caste)
  if (/\b(scheduled\s*caste|sc\b)|ఎస్సీ|షెడ్యూల్డ్\s*కులం|अनुसूचित\s*जाति|ஆதிதிராவிடர்|ಪರಿಶಿಷ್ಟ\s*ಜಾತಿ/i.test(text)) {
    extracted.social_category = 'sc';
  } else if (/\b(scheduled\s*tribe|st\b|adivasi)|ఎస్టీ|షెడ్యూల్డ్\s*తెగ|ఆదివాసి|ఆదివాసీ|अनुसूचित\s*जनजाति|ஆதிவாசி|ಪರಿಶಿಷ್ಟ\s*ಪಂಗಡ/i.test(text)) {
    extracted.social_category = 'st';
  } else if (/\b(obc|other\s*backward|backward\s*class)|ఓబీసీ|వెనుకబడిన\s*తరగతి|బీసీ|अन्य\s*पिछड़ा\s*वर्ग|ஓபிசி|ಹಿಂದುಳಿದ\s*ವರ್ಗ/i.test(text)) {
    extracted.social_category = 'obc';
  } else if (/\b(general\s*category|general\s*caste|open\s*category)|జనరల్|సాధారణ\s*వర్గం|सामान्य\s*वर्ग|பொதுப்\s*பிரிவு/i.test(text)) {
    extracted.social_category = 'general';
  }

  // Merge with existing profile (do not overwrite known non-null values with null)
  const merged = { ...existingProfile };
  for (const [key, val] of Object.entries(extracted)) {
    if (val !== null && val !== undefined) {
      merged[key] = val;
    }
  }

  return normalizeProfile(merged);
}

/**
 * Gemini LLM Extractor (Optional, if GEMINI_API_KEY is provided)
 */
export async function extractProfileWithGemini(text, existingProfile = {}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return extractProfileHeuristics(text, existingProfile);
  }

  try {
    const prompt = `
You are Sahaaya's civic profile extraction engine.
Analyze the user's natural spoken text and extract ONLY explicitly mentioned facts.
Never invent or assume any fact. If an attribute is not explicitly mentioned, return null.

User statement: "${text}"
Current confirmed profile: ${JSON.stringify(existingProfile)}

Respond with ONLY a raw JSON object matching this schema:
{
  "age": number or null,
  "gender": "female" | "male" | null,
  "marital_status": "widow" | "married" | "single" | null,
  "occupation": "farmer" | "student" | "street_vendor" | "daily_wage" | "artisan" | "retired" | "homemaker" | null,
  "land_owned": boolean | null,
  "income_category": "bpl" | "low" | "medium" | "high" | null,
  "annual_income": number or null,
  "social_category": "sc" | "st" | "obc" | "general" | null,
  "state": string or null
}
`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', temperature: 0.1 }
      })
    });

    if (!response.ok) {
      console.warn('Gemini API call failed, falling back to heuristic NLP');
      return extractProfileHeuristics(text, existingProfile);
    }

    const data = await response.json();
    const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (rawJson) {
      const parsed = JSON.parse(rawJson);
      // Merge with existing
      const merged = { ...existingProfile };
      for (const [key, val] of Object.entries(parsed)) {
        if (val !== null && val !== undefined) {
          merged[key] = val;
        }
      }
      return normalizeProfile(merged);
    }
  } catch (err) {
    console.error('Gemini extraction error:', err.message);
  }

  return extractProfileHeuristics(text, existingProfile);
}

/**
 * Generates ONE targeted follow-up question based on missing fields in 'needs_more_info' schemes
 */
export function generateFollowUpQuestion(profile, matchedResults, lang = 'en') {
  const needsMoreInfoSchemes = matchedResults?.results?.needs_more_info || [];
  if (needsMoreInfoSchemes.length === 0) {
    return null;
  }

  // Count frequency of missing fields to prioritize the highest-impact question
  const fieldCounts = {};
  needsMoreInfoSchemes.forEach(scheme => {
    scheme.missing_fields.forEach(field => {
      fieldCounts[field] = (fieldCounts[field] || 0) + 1;
    });
  });

  const sortedFields = Object.keys(fieldCounts).sort((a, b) => fieldCounts[b] - fieldCounts[a]);
  const targetField = sortedFields[0];

  if (!targetField) return null;

  // Question specifications with regional translations and one-tap quick options
  const questionsBank = {
    income_category: {
      field: 'income_category',
      question: {
        en: "What is your approximate annual household income?",
        hi: "आपकी वार्षिक पारिवारिक आय लगभग कितनी है?",
        ta: "உங்கள் குடும்பத்தின் ஆண்டு வருமானம் தோராயமாக எவ்வளவு?",
        te: "మీ కుటుంబ వార్షిక ఆదాయం సుమారుగా ఎంత?",
        kn: "ನಿಮ್ಮ ಕುಟುಂಬದ ವಾರ್ಷಿಕ ಆದಾಯ ಸರಿಸುಮಾರು ಎಷ್ಟು?",
        bn: "আপনার পরিবারের আনুমানিক বার্ষিক আয় কত?",
        mr: "तुमचे अंदाजे वार्षिक कौटुंबिक उत्पन्न किती आहे?"
      },
      why_needed: `Required to check eligibility for ${fieldCounts[targetField]} potential welfare schemes.`,
      options: [
        { label: "Low / BPL (Under ₹1 Lakh/yr)", value: "low", textToSpeak: "My income is low, under 1 lakh rupees" },
        { label: "Moderate (₹1 - 2.5 Lakhs/yr)", value: "low", textToSpeak: "My income is between 1 and 2.5 lakh rupees" },
        { label: "Middle Income (₹2.5 - 5 Lakhs/yr)", value: "medium", textToSpeak: "My income is between 2.5 and 5 lakh rupees" },
        { label: "Higher Income (> ₹5 Lakhs/yr)", value: "high", textToSpeak: "My income is more than 5 lakh rupees" }
      ]
    },
    land_owned: {
      field: 'land_owned',
      question: {
        en: "Do you or your family own agricultural land?",
        hi: "क्या आपके या आपके परिवार के नाम पर कृषि भूमि है?",
        ta: "உங்கள் அல்லது உங்கள் குடும்பத்தினர் பெயரில் விவசாய நிலம் உள்ளதா?",
        te: "మీకు లేదా మీ కుటుంబానికి వ్యవసాయ భూమి ఉందా?",
        kn: "ನಿಮ್ಮ ಅಥವಾ ನಿಮ್ಮ ಕುಟುಂಬದ ಹೆಸರಿನಲ್ಲಿ ಕೃಷಿ ಭೂಮಿ ಇದೆಯೇ?",
        bn: "আপনার বা আপনার পরিবারের নামে কি কৃষিজমি আছে?",
        mr: "तुमच्या किंवा तुमच्या कुटुंबाच्या नावावर शेतजमीन आहे का?"
      },
      why_needed: `Required for PM-KISAN, crop insurance, and agricultural subsidies.`,
      options: [
        { label: "Yes, small farm (< 5 acres)", value: true, textToSpeak: "Yes, I own a small agricultural land" },
        { label: "Yes, large farm (> 5 acres)", value: true, textToSpeak: "Yes, I own more than 5 acres of agricultural land" },
        { label: "No land / Tenant farmer", value: false, textToSpeak: "No, I do not own agricultural land" }
      ]
    },
    age: {
      field: 'age',
      question: {
        en: "What is your current age?",
        hi: "आपकी वर्तमान आयु कितनी है?",
        ta: "உங்கள் தற்போதைய வயது என்ன?",
        te: "మీ ప్రస్తుత వయస్సు ఎంత?",
        kn: "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ವಯಸ್ಸು ಎಷ್ಟು?",
        bn: "আপনার বর্তমান বয়স কত?",
        mr: "तुमचे सध्याचे वय किती आहे?"
      },
      why_needed: `Different schemes have specific age brackets (e.g. youth, senior pensions).`,
      options: [
        { label: "18 - 25 years (Youth / Student)", value: 21, textToSpeak: "I am 21 years old" },
        { label: "26 - 40 years (Working Age)", value: 35, textToSpeak: "I am 35 years old" },
        { label: "41 - 59 years", value: 50, textToSpeak: "I am 50 years old" },
        { label: "60+ years (Senior Citizen)", value: 65, textToSpeak: "I am 65 years old" }
      ]
    },
    marital_status: {
      field: 'marital_status',
      question: {
        en: "What is your marital status?",
        hi: "आपकी वैवाहिक स्थिति क्या है?",
        ta: "உங்கள் திருமண நிலை என்ன?",
        te: "మీ వైవాహಿಕ స్థితి ఏమిటి?",
        kn: "ನಿಮ್ಮ ವೈವಾಹಿಕ ಸ್ಥಿತಿ ಏನು?",
        bn: "আপনার বৈবাহিক অবস্থা কি?",
        mr: "तुमची वैवाहिक स्थिती काय आहे?"
      },
      why_needed: `Determines eligibility for special widow pensions and women's welfare support.`,
      options: [
        { label: "Widow", value: "widow", textToSpeak: "I am a widow" },
        { label: "Married", value: "married", textToSpeak: "I am married" },
        { label: "Single / Unmarried", value: "single", textToSpeak: "I am single" }
      ]
    },
    occupation: {
      field: 'occupation',
      question: {
        en: "What is your primary occupation or source of livelihood?",
        hi: "आपका मुख्य व्यवसाय या आजीविका का साधन क्या है?",
        ta: "உங்கள் முதன்மை தொழில் அல்லது வாழ்வாதாரம் என்ன?",
        te: "మీ ప్రధాన వృత్తి లేదా జీవనోపాధి ఏమిటి?",
        kn: "ನಿಮ್ಮ ಮುಖ್ಯ ಉದ್ಯೋಗ ಅಥವಾ ಜೀವನೋಪಾಯ ಏನು?",
        bn: "আপনার প্রধান পেশা বা জীবিকা কি?",
        mr: "तुमचा मुख्य व्यवसाय किंवा उपजीविकेचे साधन काय आहे?"
      },
      why_needed: `Matches specialized schemes for farmers, students, vendors, and unorganized workers.`,
      options: [
        { label: "Farmer / Cultivator", value: "farmer", textToSpeak: "I am a farmer" },
        { label: "Student", value: "student", textToSpeak: "I am a student" },
        { label: "Daily Wage Laborer", value: "daily_wage", textToSpeak: "I am a daily wage worker" },
        { label: "Street Vendor / Small Business", value: "street_vendor", textToSpeak: "I am a street vendor" }
      ]
    },
    social_category: {
      field: 'social_category',
      question: {
        en: "What is your social category (for scholarship & targeted welfare schemes)?",
        hi: "आपकी सामाजिक श्रेणी क्या है (छात्रवृत्ति और कल्याण योजनाओं के लिए)?",
        ta: "உங்கள் சமூகப் பிரிவு என்ன?",
        te: "మీ సామాజిక వర్గం ఏమిటి?",
        kn: "ನಿಮ್ಮ ಸಾಮಾಜಿಕ ವರ್ಗ ಯಾವುದು?",
        bn: "আপনার সামাজিক বিভাগ কি?",
        mr: "तुमचा सामाजिक प्रवर्ग कोणता आहे?"
      },
      why_needed: `Certain scholarships and affirmative welfare programs require category verification.`,
      options: [
        { label: "General", value: "general", textToSpeak: "General category" },
        { label: "OBC (Other Backward Class)", value: "obc", textToSpeak: "OBC category" },
        { label: "SC (Scheduled Caste)", value: "sc", textToSpeak: "Scheduled Caste" },
        { label: "ST (Scheduled Tribe)", value: "st", textToSpeak: "Scheduled Tribe" }
      ]
    }
  };

  const item = questionsBank[targetField];
  if (!item) return null;

  return {
    field: targetField,
    questionText: item.question[lang] || item.question.en,
    whyNeeded: item.why_needed,
    options: item.options,
    potentialSchemesUnlocked: fieldCounts[targetField]
  };
}

/**
 * Plain-language explanation for a scheme
 */
export function explainSchemeSimple(scheme, profile, lang = 'en') {
  const name = scheme.short_name || scheme.scheme_name;
  const benefit = scheme.benefit;
  const status = scheme.status;

  if (status === 'likely_eligible') {
    return `Good news! Based on your profile, you appear to be likely eligible for ${name}. This scheme provides ${benefit}. To apply, prepare your ${scheme.documents.slice(0, 3).join(', ')} and submit via your nearest CSC or Gram Panchayat.`;
  } else if (status === 'needs_more_info') {
    return `You could potentially qualify for ${name}, which provides ${benefit}. However, we need more information about your ${scheme.missing_fields.join(', ')} to confirm.`;
  } else {
    return `${name} does not appear to match your situation at this time because: ${scheme.reason}.`;
  }
}
