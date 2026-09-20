import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  AlertCircle,
  XCircle,
  Volume2,
  FileText,
  FileCheck,
  ArrowRight,
  Filter,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { UI_STRINGS, getHeadlineSpeechText, getSchemeCardSpeechText } from '../data/translations';

export default function ScreenResults({
  language,
  matchResults,
  onSelectScheme,
  onSelectSchemeForPlan,
  onViewActionPlan,
  onReadAloud,
  isSpeaking,
  speakingText,
  onBackToQuestions
}) {
  const strings = UI_STRINGS[language] || UI_STRINGS.en;
  const [activeTab, setActiveTab] = useState('likely_eligible');
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!matchResults || !matchResults.results) {
    return null;
  }

  const { summary, results } = matchResults;
  const likelyList = results.likely_eligible || [];
  const needsInfoList = results.needs_more_info || [];
  const notMatchingList = results.not_matching || [];

  // Filter based on active tab
  let currentList = [];
  if (activeTab === 'likely_eligible') currentList = likelyList;
  else if (activeTab === 'needs_more_info') currentList = needsInfoList;
  else if (activeTab === 'not_matching') currentList = notMatchingList;
  else currentList = results.all || [];

  // Filter based on category
  const categories = ['all', ...new Set((results.all || []).map(s => s.category))];
  if (selectedCategory !== 'all') {
    currentList = currentList.filter(s => s.category === selectedCategory);
  }

  const handleReadScheme = (scheme) => {
    const text = getSchemeCardSpeechText(scheme, language);
    onReadAloud(text);
  };

  const handleReadHeadline = () => {
    const text = getHeadlineSpeechText(summary, language);
    onReadAloud(text);
  };

  return (
    <div className="py-6 max-w-6xl mx-auto px-4">
      
      {/* Top Total Potential Benefits Banner (PRD Section 11) */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden mb-8 border border-amber-900/20">
        
        {/* Glow accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                {strings.resultsTitle}
              </span>
              <button
                onClick={handleReadHeadline}
                className="p-1.5 rounded-full hover:bg-white/10 text-amber-300 transition-colors"
                title={strings.readAloud}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight font-['Outfit']">
              {summary.headline_benefit}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl flex items-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mr-1.5 shrink-0" />
              {summary.disclaimer}
            </p>
          </div>

          {/* Quick Stat Pill & CTA */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 px-4 border border-white/10 text-center">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400">
                {summary.likely_eligible_count}
              </span>
              <p className="text-xs text-slate-300 font-semibold uppercase tracking-wider">
                Likely Eligible Schemes
              </p>
            </div>

            <button
              onClick={onViewActionPlan}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center space-x-2 transition-all transform active:scale-98"
            >
              <FileText className="w-4 h-4" />
              <span>Personalized Action Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs (Likely Eligible, Needs Info, Not Matching, All) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        
        {/* Status Tabs */}
        <div className="flex items-center space-x-1.5 bg-slate-200/70 p-1.5 rounded-2xl overflow-x-auto">
          <button
            onClick={() => setActiveTab('likely_eligible')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap ${
              activeTab === 'likely_eligible'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-300/60'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{strings.likelyEligibleTab}</span>
            <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === 'likely_eligible' ? 'bg-emerald-800 text-white' : 'bg-slate-300 text-slate-700'}`}>
              {likelyList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('needs_more_info')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap ${
              activeTab === 'needs_more_info'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-300/60'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            <span>{strings.needsInfoTab}</span>
            <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === 'needs_more_info' ? 'bg-amber-800 text-white' : 'bg-slate-300 text-slate-700'}`}>
              {needsInfoList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('not_matching')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap ${
              activeTab === 'not_matching'
                ? 'bg-slate-700 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-300/60'
            }`}
          >
            <XCircle className="w-4 h-4" />
            <span>{strings.notMatchingTab}</span>
            <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === 'not_matching' ? 'bg-slate-900 text-white' : 'bg-slate-300 text-slate-700'}`}>
              {notMatchingList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-1.5 transition-all whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-300/60'
            }`}
          >
            <span>{strings.allTab}</span>
            <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-300 text-slate-700'}`}>
              {results.all?.length || 0}
            </span>
          </button>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Scheme Cards Grid (PRD Section 12) */}
      {currentList.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-2xs">
          <Info className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No schemes found in this category</h3>
          <p className="text-sm text-slate-500 mt-1">
            Try switching filter tabs or check out our full scheme directory.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12">
          {currentList.map((scheme) => {
            const isCurrentlySpeaking = isSpeaking && speakingText.includes(scheme.short_name);
            const isEligible = scheme.status === 'likely_eligible';
            const isNeedsInfo = scheme.status === 'needs_more_info';

            return (
              <div
                key={scheme.scheme_id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Category & Status Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {scheme.category}
                    </span>

                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1 ${
                        isEligible
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : isNeedsInfo
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-slate-100 text-slate-600 border border-slate-300'
                      }`}
                    >
                      {isEligible && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {isNeedsInfo && <AlertCircle className="w-3 h-3 mr-1" />}
                      {scheme.status_label}
                    </span>
                  </div>

                  {/* Scheme Title */}
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-['Outfit'] mb-1.5 leading-snug">
                    {scheme.scheme_name}
                  </h3>

                  {/* Benefit amount badge */}
                  <div className="mb-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-2.5">
                    <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block">
                      {strings.potentialBenefit}:
                    </span>
                    <span className="text-sm sm:text-base font-black text-emerald-900 font-['Outfit']">
                      {scheme.benefit}
                    </span>
                  </div>

                  {/* Explanation of Why It Matches */}
                  <p className="text-xs sm:text-sm text-slate-600 mb-4 line-clamp-2">
                    <span className="font-semibold text-slate-700">
                      {isEligible ? strings.whyMatches : strings.whyConflict}:
                    </span>{' '}
                    {scheme.reason}
                  </p>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={() => handleReadScheme(scheme)}
                    className={`p-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                      isCurrentlySpeaking
                        ? 'bg-amber-500 text-white animate-pulse'
                        : 'bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900'
                    }`}
                    title={strings.readAloud}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span className="hidden sm:inline">{strings.readAloud}</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onSelectScheme(scheme)}
                      className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold flex items-center space-x-1 transition-colors"
                      title={strings.viewDetails}
                    >
                      <Info className="w-4 h-4" />
                      <span className="hidden sm:inline">{strings.viewDetails}</span>
                    </button>

                    <button
                      onClick={() => onSelectSchemeForPlan ? onSelectSchemeForPlan(scheme) : onSelectScheme(scheme)}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold flex items-center space-x-1.5 shadow-sm transition-all transform active:scale-95"
                    >
                      <FileCheck className="w-4 h-4" />
                      <span>{strings.selectSchemeAction || "Select Scheme & View Steps"}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Floating Bottom Action Bar to proceed to Action Plan */}
      <div className="sticky bottom-4 z-30 max-w-2xl mx-auto">
        <div className="glass-card bg-slate-900/95 backdrop-blur-xl text-white rounded-2xl p-3.5 px-6 shadow-2xl border border-white/10 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Ready to take action?
            </p>
            <p className="text-xs sm:text-sm text-slate-300">
              Personalized document checklist & CSC application roadmap
            </p>
          </div>

          <button
            onClick={onViewActionPlan}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs sm:text-sm shadow-md flex items-center space-x-1.5 shrink-0 transition-transform transform active:scale-95"
          >
            <span>View Checklist</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

    </div>
  );
}
