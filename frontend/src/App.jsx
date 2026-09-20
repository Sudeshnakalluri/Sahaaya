import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ScreenWelcome from './components/ScreenWelcome';
import ScreenProfilePreview from './components/ScreenProfilePreview';
import ScreenFollowUp from './components/ScreenFollowUp';
import ScreenResults from './components/ScreenResults';
import ScreenActionPlan from './components/ScreenActionPlan';
import SchemeDetailModal from './components/SchemeDetailModal';
import { useVoice } from './hooks/useVoice';
import { LANGUAGES, UI_STRINGS } from './data/translations';

export default function App() {
  const [language, setLanguage] = useState('en');
  const [currentScreen, setCurrentScreen] = useState('welcome'); // 'welcome' | 'preview' | 'followup' | 'results' | 'actionplan'
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  // User profile and match data state
  const [profile, setProfile] = useState({});
  const [matchResults, setMatchResults] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  const [activePlanScheme, setActivePlanScheme] = useState(null);
  const [detailModalScheme, setDetailModalScheme] = useState(null);

  // Voice hook
  const {
    isListening,
    transcript,
    setTranscript,
    interimTranscript,
    isSpeaking,
    speakingText,
    speechError,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    clearTranscript
  } = useVoice(language);

  // Get current language object
  const currentLangObj = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];
  const strings = UI_STRINGS[language] || UI_STRINGS.en;

  // Handle Speech Recognition start for current language
  const handleStartVoice = () => {
    startListening(currentLangObj.speechCode);
  };

  // Handle preset selection
  const handleSelectPreset = (preset) => {
    const text = preset.speechText[language] || preset.speechText.en;
    setTranscript(text);
  };

  // Reset entire session
  const handleReset = () => {
    stopSpeaking();
    stopListening();
    clearTranscript();
    setProfile({});
    setMatchResults(null);
    setQuestionData(null);
    setActivePlanScheme(null);
    setDetailModalScheme(null);
    setCurrentScreen('welcome');
    setApiError(null);
  };

  // Select scheme specifically for Action Plan and Roadmap
  const handleSelectSchemeForPlan = (scheme) => {
    setActivePlanScheme(scheme);
    setDetailModalScheme(null);
    setCurrentScreen('actionplan');
  };

  // Primary Action: Analyze User Input (Voice or Text)
  const handleAnalyze = async (textToAnalyze) => {
    const input = textToAnalyze || transcript;
    if (!input || !input.trim()) return;

    setIsLoading(true);
    setApiError(null);

    try {
      // 1. Extract Profile from backend API
      const extractRes = await fetch('/api/profile/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, currentProfile: profile })
      });

      if (!extractRes.ok) {
        throw new Error('Could not extract profile. Please try again.');
      }

      const extractData = await extractRes.json();
      const newProfile = extractData.profile;
      setProfile(newProfile);

      // 2. Run Deterministic Match
      const matchRes = await fetch('/api/schemes/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: newProfile })
      });
      const matchData = await matchRes.json();
      setMatchResults(matchData);

      // 3. Check for targeted Follow-up questions
      const questionRes = await fetch('/api/profile/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: newProfile, lang: language })
      });
      const qData = await questionRes.json();

      if (qData.has_question && qData.question) {
        setQuestionData(qData.question);
      } else {
        setQuestionData(null);
      }

      // Navigate to Profile Preview (Step 2)
      setCurrentScreen('preview');
    } catch (err) {
      console.error('Analysis error:', err);
      setApiError(err.message || 'An error occurred while analyzing your input.');
    } finally {
      setIsLoading(false);
    }
  };

  // When user proceeds from Profile Preview
  const handleProceedFromPreview = () => {
    if (questionData) {
      setCurrentScreen('followup');
    } else {
      setCurrentScreen('results');
    }
  };

  // Handle Follow-up Answer
  const handleAnswerQuestion = async (field, value, label) => {
    setIsLoading(true);
    const updatedProfile = { ...profile, [field]: value };
    setProfile(updatedProfile);

    try {
      // Re-run deterministic matching with the new attribute
      const matchRes = await fetch('/api/schemes/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: updatedProfile })
      });
      const matchData = await matchRes.json();
      setMatchResults(matchData);

      // Check if another question is needed or go to results
      const questionRes = await fetch('/api/profile/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: updatedProfile, lang: language })
      });
      const qData = await questionRes.json();

      // Go directly to results after 1 clarification (PRD Section 17 & 21: "Ask only necessary follow-up questions")
      setCurrentScreen('results');
    } catch (err) {
      console.error('Follow-up error:', err);
      setCurrentScreen('results');
    } finally {
      setIsLoading(false);
    }
  };

  // Read aloud helper in selected language
  const handleReadAloud = (text) => {
    speak(text, currentLangObj.speechCode);
  };

  return (
    <div className="min-h-screen flex flex-col font-['Outfit'] bg-[#FBF8F3]">
      
      {/* Top Header Navbar */}
      <Navbar
        language={language}
        setLanguage={setLanguage}
        onSelectPreset={handleSelectPreset}
        onReset={handleReset}
        isSpeaking={isSpeaking}
        onStopSpeaking={stopSpeaking}
      />

      {/* Global Error Banner if any */}
      {apiError && (
        <div className="max-w-4xl mx-auto mt-4 px-4 w-full">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-between">
            <span>{apiError}</span>
            <button onClick={() => setApiError(null)} className="text-red-500 font-bold ml-3">✕</button>
          </div>
        </div>
      )}

      {/* Main Screen Views */}
      <main className="flex-1">
        {currentScreen === 'welcome' && (
          <ScreenWelcome
            language={language}
            isListening={isListening}
            transcript={transcript}
            setTranscript={setTranscript}
            interimTranscript={interimTranscript}
            onStartListening={handleStartVoice}
            onStopListening={stopListening}
            onAnalyze={handleAnalyze}
            onSelectPreset={handleSelectPreset}
            isLoading={isLoading}
            speechError={speechError}
          />
        )}

        {currentScreen === 'preview' && (
          <ScreenProfilePreview
            language={language}
            profile={profile}
            onProceed={handleProceedFromPreview}
            onReadAloud={handleReadAloud}
            isSpeaking={isSpeaking}
            onBack={() => setCurrentScreen('welcome')}
          />
        )}

        {currentScreen === 'followup' && (
          <ScreenFollowUp
            language={language}
            questionData={questionData}
            onAnswer={handleAnswerQuestion}
            onSkip={() => setCurrentScreen('results')}
            isListening={isListening}
            onStartListening={handleStartVoice}
            onStopListening={stopListening}
            transcript={transcript}
            onReadAloud={handleReadAloud}
            isSpeaking={isSpeaking}
          />
        )}

        {currentScreen === 'results' && (
          <ScreenResults
            language={language}
            matchResults={matchResults}
            onSelectScheme={(scheme) => setDetailModalScheme(scheme)}
            onSelectSchemeForPlan={handleSelectSchemeForPlan}
            onViewActionPlan={() => {
              setActivePlanScheme(null);
              setCurrentScreen('actionplan');
            }}
            onReadAloud={handleReadAloud}
            isSpeaking={isSpeaking}
            speakingText={speakingText}
            onBackToQuestions={() => setCurrentScreen('preview')}
          />
        )}

        {currentScreen === 'actionplan' && (
          <ScreenActionPlan
            language={language}
            matchResults={matchResults}
            selectedScheme={activePlanScheme}
            onSelectScheme={setActivePlanScheme}
            onBack={() => setCurrentScreen('results')}
            onReadAloud={handleReadAloud}
            isSpeaking={isSpeaking}
            speakingText={speakingText}
          />
        )}
      </main>

      {/* Scheme Detail Modal (Screen 5) */}
      {detailModalScheme && (
        <SchemeDetailModal
          language={language}
          scheme={detailModalScheme}
          onClose={() => setDetailModalScheme(null)}
          onSelectSchemeForPlan={handleSelectSchemeForPlan}
          onReadAloud={handleReadAloud}
          isSpeaking={isSpeaking}
        />
      )}

      {/* Footer */}
      <footer className="no-print border-t border-amber-900/10 py-6 bg-white/60 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-medium">
            <strong className="text-slate-800">Sahaaya</strong> • Voice-First Government Scheme Navigator • Tech for a Better Tomorrow
          </p>
          <p className="text-slate-400">
            Initial eligibility navigator. Final approval subject to respective Government departments.
          </p>
        </div>
      </footer>

    </div>
  );
}
