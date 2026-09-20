import React from 'react';
import { LANGUAGES, DEMO_PRESETS, UI_STRINGS } from '../data/translations';
import { Volume2, VolumeX, RotateCcw, Globe, Sparkles, ShieldCheck } from 'lucide-react';

export default function Navbar({
  language,
  setLanguage,
  onSelectPreset,
  onReset,
  isSpeaking,
  onStopSpeaking
}) {
  const strings = UI_STRINGS[language] || UI_STRINGS.en;

  return (
    <header className="glass-header sticky top-0 z-40 shadow-xs border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onReset}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-600 via-emerald-600 to-slate-900 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                <span className="text-xl font-bold bg-gradient-to-r from-amber-400 via-orange-300 to-emerald-400 bg-clip-text text-transparent">
                  स
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 font-['Outfit']">
                  SAHAAYA
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  Civic AI
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500 hidden md:block">
                {strings.appTagline} • <span className="text-amber-700 font-semibold">{strings.motto}</span>
              </p>
            </div>
          </div>

          {/* Right Actions: TTS Status, Presets, Language, Reset */}
          <div className="flex items-center space-x-2 sm:space-x-3">

            {/* Speaking audio status badge */}
            {isSpeaking && (
              <button
                onClick={onStopSpeaking}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-500 text-white text-xs font-medium shadow-sm animate-pulse hover:bg-amber-600 transition-colors"
                title={strings.stopAudio}
              >
                <VolumeX className="w-4 h-4" />
                <span className="hidden sm:inline">{strings.stopAudio}</span>
              </button>
            )}

            {/* Demo Personas Selector */}
            <div className="relative group">
              <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs sm:text-sm font-semibold border border-amber-200 shadow-2xs transition-colors">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="hidden md:inline">Demo Personas</span>
                <span className="md:hidden">Demo</span>
              </button>
              
              <div className="absolute right-0 mt-1 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-1">
                <div className="px-3 py-1.5 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Instant Demo Scenarios
                  </p>
                </div>
                {DEMO_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => onSelectPreset(preset)}
                    className="w-full text-left px-3 py-2.5 hover:bg-amber-50/80 transition-colors flex flex-col"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">{preset.title}</span>
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-medium">
                        {preset.badge}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 mt-0.5">{preset.subtitle}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selector */}
            <div className="flex items-center bg-white rounded-xl border border-slate-200 px-2 py-1 shadow-2xs">
              <Globe className="w-4 h-4 text-slate-400 mr-1.5" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer pr-1"
                aria-label={strings.switchLanguage}
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Reset / New Session */}
            <button
              onClick={onReset}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title={strings.resetSession}
              aria-label={strings.resetSession}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}
