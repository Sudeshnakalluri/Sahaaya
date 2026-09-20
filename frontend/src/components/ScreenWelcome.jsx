import React, { useState } from 'react';
import { Mic, MicOff, ArrowRight, Sparkles, Keyboard, RefreshCw, Volume2 } from 'lucide-react';
import { UI_STRINGS, DEMO_PRESETS } from '../data/translations';

export default function ScreenWelcome({
  language,
  isListening,
  transcript,
  setTranscript,
  interimTranscript,
  onStartListening,
  onStopListening,
  onAnalyze,
  onSelectPreset,
  isLoading,
  speechError
}) {
  const strings = UI_STRINGS[language] || UI_STRINGS.en;
  const [showTypeInput, setShowTypeInput] = useState(false);

  const handleMicToggle = () => {
    if (isListening) {
      onStopListening();
    } else {
      onStartListening();
    }
  };

  const currentDisplay = transcript || interimTranscript;

  return (
    <div className="py-6 sm:py-10 max-w-4xl mx-auto px-4">
      
      {/* Hero Welcome Card */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300/80 text-amber-900 text-xs sm:text-sm font-semibold mb-4 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
          <span>{strings.theme}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight font-['Outfit'] mb-3">
          {strings.welcomeHeader}
        </h2>
        
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          {strings.welcomeSub}
        </p>
      </div>

      {/* Main Voice Interaction Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 shadow-xl border border-amber-900/10 relative overflow-hidden mb-8">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Big Animated Microphone Center */}
        <div className="flex flex-col items-center justify-center my-4">
          <div className="relative">
            {/* Pulsing rings when listening */}
            {isListening && (
              <>
                <div className="absolute inset-0 rounded-full bg-amber-500/30 animate-ping pointer-events-none" />
                <div className="absolute -inset-4 rounded-full border-2 border-amber-500/50 animate-voice-pulse pointer-events-none" />
              </>
            )}

            <button
              onClick={handleMicToggle}
              disabled={isLoading}
              className={`relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-300 transform active:scale-95 ${
                isListening
                  ? 'bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 text-white ring-8 ring-amber-300/50 scale-105'
                  : 'bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 hover:from-amber-600 hover:to-orange-500 text-white hover:shadow-amber-500/25'
              }`}
              aria-label={isListening ? strings.stopListening : strings.startListening}
            >
              {isListening ? (
                <>
                  <MicOff className="w-10 h-10 sm:w-12 sm:h-12 mb-1" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    {strings.stopListening}
                  </span>
                </>
              ) : (
                <>
                  <Mic className="w-10 h-10 sm:w-12 sm:h-12 mb-1" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    {strings.startListening}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Animated Waveform Bars when listening */}
          {isListening && (
            <div className="flex items-center space-x-1.5 mt-6 h-10">
              <span className="w-1.5 bg-amber-500 rounded-full animate-wave-1" />
              <span className="w-1.5 bg-orange-500 rounded-full animate-wave-2" />
              <span className="w-1.5 bg-amber-600 rounded-full animate-wave-3" />
              <span className="w-1.5 bg-emerald-500 rounded-full animate-wave-4" />
              <span className="w-1.5 bg-amber-500 rounded-full animate-wave-5" />
              <span className="w-1.5 bg-orange-600 rounded-full animate-wave-2" />
              <span className="w-1.5 bg-amber-400 rounded-full animate-wave-1" />
            </div>
          )}

          <p className="mt-4 text-sm font-semibold text-slate-700">
            {isListening ? (
              <span className="text-amber-700 animate-pulse flex items-center">
                <span className="w-2 h-2 rounded-full bg-amber-600 mr-2" />
                {strings.listening}
              </span>
            ) : (
              <span className="text-slate-500">
                {strings.motto}
              </span>
            )}
          </p>

          {speechError && (
            <div className="mt-3 text-xs bg-red-50 text-red-700 border border-red-200 px-4 py-2 rounded-xl">
              {speechError}
            </div>
          )}
        </div>

        {/* Live Speech Transcript & Editable Area */}
        <div className="mt-6 bg-slate-50/90 rounded-2xl p-4 sm:p-5 border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center">
              <Volume2 className="w-3.5 h-3.5 mr-1 text-slate-400" />
              Speech Transcript
            </span>
            <button
              onClick={() => setShowTypeInput(!showTypeInput)}
              className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center"
            >
              <Keyboard className="w-3.5 h-3.5 mr-1" />
              {showTypeInput ? "Hide text editor" : strings.typeInstead}
            </button>
          </div>

          {showTypeInput ? (
            <textarea
              rows={3}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder={strings.typePlaceholder}
              className="w-full bg-white rounded-xl p-3 border border-slate-300 text-slate-800 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          ) : (
            <div className="min-h-[72px] flex items-center">
              {currentDisplay ? (
                <p className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed">
                  “{transcript}”
                  {interimTranscript && (
                    <span className="text-amber-600 italic"> {interimTranscript}</span>
                  )}
                </p>
              ) : (
                <p className="text-sm sm:text-base text-slate-400 italic">
                  Tap the microphone and say: “I am 58 years old, a widow farmer from Tamil Nadu with low income...”
                </p>
              )}
            </div>
          )}

          {/* Action to proceed */}
          {transcript && (
            <div className="mt-4 pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => onAnalyze(transcript)}
                disabled={isLoading}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm shadow-md flex items-center justify-center space-x-2 transition-all transform active:scale-98"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                    <span>Analyzing your profile...</span>
                  </>
                ) : (
                  <>
                    <span>{strings.analyzeButton}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Preset Demo Persona Chips (PRD requirement & Hackathon judging speed) */}
      <div className="mt-8 bg-white/70 rounded-2xl p-5 border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs sm:text-sm font-bold text-slate-700 flex items-center">
            <Sparkles className="w-4 h-4 text-amber-600 mr-1.5" />
            {strings.demoPresetLabel}
          </p>
          <span className="text-[11px] text-slate-400 font-medium">Click to test instant flow</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DEMO_PRESETS.map((preset) => {
            const speech = preset.speechText[language] || preset.speechText.en;
            return (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className="group text-left p-3.5 rounded-xl bg-white hover:bg-amber-50/80 border border-slate-200 hover:border-amber-300 shadow-2xs hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-amber-800">
                    {preset.title}
                  </span>
                  <span className="text-[10px] font-semibold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                    {preset.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  “{speech}”
                </p>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
