# SAHAAYA: Voice-First Government Scheme Navigator 📡

> **Theme**: Tech for a Better Tomorrow  
> **Motto**: *“Speak. Discover. Benefit.”*  
> **Core Promise**: People should not need to understand complicated government websites before they can understand the support that may be available to them.

---

## 1. Product Overview

**Sahaaya** is a voice-first civic AI platform designed to help Indian citizens—especially rural citizens, farmers, senior citizens, women/widows, and low-literacy communities—discover and claim government welfare schemes relevant to their life situation.

Instead of navigating complex, English-heavy portals or filling long bureaucratic forms:
1. The citizen speaks naturally in their regional language (English, हिन्दी, தமிழ், తెలుగు, ಕನ್ನಡ, বাংলা, मराठी).
2. Sahaaya extracts only explicitly stated facts into a structured profile without hallucination.
3. If critical information is missing, Sahaaya asks **one targeted follow-up question** at a time.
4. A **100% deterministic eligibility engine** matches the profile against 22+ curated central & state schemes in code.
5. The citizen receives an aggregated potential benefits summary, plain-language explanations, a personalized document checklist, and an official CSC/Panchayat action plan.
6. Answers can be read aloud in regional Indian voices or printed/downloaded as a summary to take to a Common Service Centre.

---

## 2. Architecture & Tech Stack

```
User (Voice / Natural Regional Speech)
   │
   ▼
[Web Speech API (STT)]  ◄──►  [Speech Synthesis API (TTS)]
   │                               ▲
   ▼                               │
[React 18 + Vite + Tailwind CSS Frontend]
   │
   ▼
[Express.js Backend API]
   ├── POST /api/profile/extract   ──► Dual-Engine NLP (Local Heuristic + Optional Gemini LLM)
   ├── POST /api/profile/questions ──► Targeted Missing-Information Generator
   ├── POST /api/schemes/match     ──► Deterministic Rule Engine (No Hallucinations)
   ├── GET  /api/schemes           ──► 22+ Verified Indian Welfare Schemes
   ├── GET  /api/schemes/:id       ──► Verified Scheme Records & CSC Guidance
   ├── POST /api/explain           ──► Plain-Language Explanations & Translations
   └── POST /api/summary           ──► Printable Action Plan & Document Checklist
```

### Why Deterministic AI Matching?
In accordance with responsible civic AI principles, **the LLM is never allowed to invent benefits or decide eligibility**. 
Eligibility rules are verified against official government gazettes/portals and evaluated purely in deterministic code:
- **Likely Eligible**: All currently known conditions match.
- **Needs More Info**: No criteria conflicts, but 1 or 2 required attributes (e.g. land ownership or income) are unknown.
- **Doesn't Appear to Match**: A known user attribute conflicts with a hard scheme requirement.

---

## 3. Curated Welfare Schemes Database (22 Verified Schemes)

| Category | Schemes Included | Key Potential Benefits |
| :--- | :--- | :--- |
| **🌾 Agriculture** (4) | PM-KISAN, PM Fasal Bima Yojana (PMFBY), Kisan Credit Card (KCC), PM Krishi Sinchayee Yojana (Micro-Irrigation) | Up to ₹6,000/yr direct cash, crop insurance, 4% credit |
| **🎓 Education** (4) | PM-USP Central Sector Scholarship, Post-Matric SC/ST/OBC Scholarship, AICTE Pragati Scholarship for Girls, NMMSS School Scholarship | ₹12,000 to ₹50,000/yr tuition & maintenance |
| **👩 Women & Widows** (4) | Indira Gandhi National Widow Pension (IGNWPS), PM Matru Vandana Yojana (PMMVY), Lakhpati Didi SHG Initiative, Sukanya Samriddhi Yojana (SSY) | ₹3,600-₹12,000/yr pension, ₹5,000-₹6,000 maternity DBT, SHG credit |
| **🏥 Healthcare** (3) | Ayushman Bharat (PM-JAY), PM Suraksha Bima Yojana (PMSBY), Janani Shishu Suraksha Karyakram (JSSK) | ₹5,00,000/family cashless hospitalization, ₹2 Lakh accident cover |
| **👴 Pension & Elderly** (3) | Indira Gandhi National Old Age Pension (IGNOAPS), Atal Pension Yojana (APY), PM Vaya Vandana Yojana (PMVVY) | Guaranteed monthly pension, assured 7.4% senior annuity |
| **🏠 Housing** (2) | PM Awas Yojana - Gramin (PMAY-G), PM Awas Yojana - Urban (PMAY-U) | ₹1,20,000 - ₹1,30,000 construction grant, interest subsidies |
| **💼 Employment** (2) | MGNREGA (100 Days Work Guarantee), PM SVANidhi (Street Vendors AtmaNirbhar) | 100 days guaranteed wage employment, ₹10,000-₹50,000 collateral-free credit |

*All records include official portal URLs, last verified dates, and Common Service Centre (CSC) operational guidance.*

---

## 4. Quick Start & Setup Instructions

### Prerequisites
- **Node.js** v18+ (Tested on Node v24.18)
- **npm** v9+

### Zero-Setup Instant Run (Works 100% Offline with Zero API Keys)
Sahaaya includes a high-accuracy, zero-dependency heuristic NLP extractor and conversational engine. No external API key is needed to run the complete hackathon demo!

```bash
# 1. Install dependencies for backend and frontend
cd backend
npm install
cd ../frontend
npm install

# 2. Build the frontend
npm run build

# 3. Start the unified server
cd ..
npm start
```
Open **`http://localhost:5000`** in your browser.

### Development Mode (with Live Hot-Reloading)
To run frontend and backend simultaneously in dev mode:
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```
- Frontend Dev Server: `http://localhost:3000`
- Backend API Server: `http://localhost:5000`

### Optional: Google Gemini AI Integration
To enable live Gemini LLM extraction, copy `.env.example` to `.env` in the root or `backend/` folder:
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
```
*(If omitted, Sahaaya automatically falls back to the deterministic heuristic engine.)*

---

## 5. Automated Tests

Run the deterministic test suite verifying the engine across all 4 PRD personas:
```bash
# Run unit tests
cd backend
npm test

# Run multi-persona integration test
node tests/personas.test.js
```
Expected output: **All 17 tests passed! 4 test personas fully validated.**

---

## 6. Two-Minute Hackathon Demo Script

| Timestamp | Screen | Spoken Demo Narrative | Action on Screen |
| :--- | :--- | :--- | :--- |
| **0:00 – 0:15** | Screen 1 (Welcome) | *“India has hundreds of welfare schemes, but millions of eligible citizens miss out because online portals are complex and English-heavy.”* | Show Sahaaya welcome hero, Indian regional language selector, and tricolor theme. |
| **0:15 – 0:30** | Screen 1 (Welcome) | *“Sahaaya changes that: people simply speak their situation in their mother tongue.”* | Switch language to Tamil / Hindi / English. |
| **0:30 – 0:50** | Screen 1 ➔ Screen 2 | *“Let's test the official PRD persona: a 58-year-old widow farmer from Tamil Nadu with low income.”* | Click the microphone button or the **'Widow Farmer (Tamil Nadu)'** demo persona. Click **Discover Schemes**. |
| **0:50 – 1:05** | Screen 2 (Profile Preview) | *“Sahaaya extracts only explicitly stated facts—age 58, female, widow, farmer, small farm owner, low income—never inventing data.”* | Review the structured profile cards and press **Read Aloud** to hear speech synthesis. Click **Check Scheme Eligibility**. |
| **1:05 – 1:25** | Screen 4 (Results Dashboard) | *“Our deterministic rules engine instantly identifies ₹41,200+ in potential yearly support plus ₹5 Lakh healthcare cover across PM-KISAN, Widow Pension, Ayushman Bharat, and crop insurance.”* | Show the headline total, status tabs (`Likely Eligible`), and scheme cards. |
| **1:25 – 1:40** | Screen 5 (Scheme Modal) | *“Clicking on any scheme reveals why the citizen qualifies, official links, and exact Common Service Centre guidance.”* | Click **View Details & Steps** on PM-KISAN or IGNWPS. Press **Read Aloud**. |
| **1:40 – 1:55** | Screen 6 (Action Plan) | *“Finally, Sahaaya generates a consolidated document checklist and a 5-step concrete roadmap that citizens can print or share with a CSC operator.”* | Toggle document checkboxes (Aadhaar, Land Patta). Click **Print / Save PDF** or **Share Summary**. |
| **1:55 – 2:00** | Conclusion | *“Government benefits shouldn't depend on digital literacy. Sahaaya turns discovery into a conversation.”* | Conclude demo. |

---

## 7. Key Features & Accessibility

- **🎙️ Voice Input & Text Fallback**: Web Speech API for seamless microphone listening with animated waveform visuals, plus full keyboard typing support.
- **🗣️ Multi-Lingual Speech Synthesis (TTS)**: Reads results and action plans aloud with regional accent matching across 7 Indian languages.
- **⚖️ Trust & Responsible AI**:
  - Scheme rules remain separate from the LLM.
  - Results are clearly flagged as an initial eligibility check with government disclaimers.
  - Official government portal source and last-verified date shown for every scheme.
- **📄 Printable & Shareable Action Plan**:
  - Deduplicated checklist of required documents (Aadhaar, Bank Passbook, Land Patta).
  - WhatsApp-ready text sharing and clean `@media print` layout.
  - CSC Citizen Helpline integration (Dial 14599).

---

## 8. License & Acknowledgements
Built with ❤️ for **Tech for a Better Tomorrow** under the MIT License.
Data verified against official portals: *myscheme.gov.in*, *pmkisan.gov.in*, *nsap.nic.in*, and *nha.gov.in*.
