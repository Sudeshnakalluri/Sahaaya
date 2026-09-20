import React, { useState } from 'react';
import { HelpCircle, Mic, MicOff, Volume2, ArrowRight, SkipForward, Check } from 'lucide-react';
import { UI_STRINGS } from '../data/translations';

export default function ScreenFollowUp({
  language,
  questionData,
  onAnswer,
  onSkip,
  isListening,
  onStartListening,
  onStopListening,
  transcript,
  onReadAloud,
  isSpeaking
}) {
  const strings = UI_STRINGS[language] || UI_STRINGS.en;
  const [selectedOption, setSelectedOption] = useState(null);
  const [customAnswer, setCustomAnswer] = useState('');

  if (!questionData) {
    return null;
  }

  const handleSelectOption = (opt) => {
    setSelectedOption(opt.value);
    onAnswer(questionData.field, opt.value, opt.label);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customAnswer.trim()) {
      onAnswer(questionData.field, customAnswer.trim(), customAnswer.trim());
    } else if (transcript.trim()) {
      onAnswer(questionData.field, transcript.trim(), transcript.trim());
    }
  };

  return (
    <div className="py-6 max-w-2xl mx-auto px-4">
      
      {/* Header Badge */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5 mr-1 text-amber-600" />
          {strings.followUpTitle}
        </span>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          {strings.followUpSub}
        </p>
      </div>

      {/* Main Question Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-lg border border-amber-900/10 mb-6">
        
        {/* Question Text & Read Aloud */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit'] leading-snug">
            {questionData.questionText}
          </h3>

          <button
            onClick={() => onReadAloud(questionData.questionText)}
            className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors shrink-0"
            title={strings.readAloud}
            aria-label={strings.readAloud}
          >
            <Volume2 className={`w-5 h-5 ${isSpeaking ? 'animate-pulse text-amber-600' : ''}`} />
          </button>
        </div>

        {/* Why needed note */}
        {questionData.whyNeeded && (
          <p className="text-xs text-amber-800 bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 mb-6">
            💡 <span className="font-semibold">Why we ask:</span> {questionData.whyNeeded}
          </p>
        )}

        {/* Quick Option Pills */}
        {questionData.options && questionData.options.length > 0 && (
          <div className="space-y-2.5 mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Select an option or speak:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {questionData.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                    selectedOption === opt.value
                      ? 'bg-amber-600 border-amber-600 text-white shadow-xs'
                      : 'bg-white hover:bg-amber-50/60 border-slate-200 text-slate-800 hover:border-amber-300'
                  }`}
                >
                  <span>{opt.label}</span>
                  {selectedOption === opt.value && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Spoken Answer section */}
        <div className="pt-4 border-t border-slate-200 flex flex-col items-center justify-center">
          <p className="text-xs font-medium text-slate-500 mb-3">
            Or tap to speak your answer:
          </p>

          <button
            onClick={isListening ? onStopListening : onStartListening}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md transition-all ${
              isListening
                ? 'bg-amber-600 text-white ring-4 ring-amber-300 animate-pulse'
                : 'bg-slate-900 hover:bg-amber-600 text-white'
            }`}
            aria-label={isListening ? strings.stopListening : strings.startListening}
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          {transcript && (
            <div className="mt-3 text-center">
              <p className="text-sm font-semibold text-slate-800">
                Recognized: “{transcript}”
              </p>
              <button
                onClick={handleCustomSubmit}
                className="mt-2 text-xs font-bold text-amber-700 hover:underline"
              >
                Use this answer & continue →
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Skip button */}
      <div className="text-center">
        <button
          onClick={onSkip}
          className="inline-flex items-center text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <SkipForward className="w-4 h-4 mr-1" />
          Skip this question and show current results
        </button>
      </div>

    </div>
  );
}
