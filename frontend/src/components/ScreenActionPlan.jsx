import React, { useState, useEffect } from 'react';
import {
  Printer,
  Download,
  Share2,
  CheckSquare,
  Square,
  ArrowLeft,
  Building2,
  PhoneCall,
  ShieldAlert,
  FileCheck,
  Volume2,
  ExternalLink,
  CheckCircle2,
  Layers,
  Sparkles,
  Check
} from 'lucide-react';
import {
  UI_STRINGS,
  ROADMAP_STEPS,
  translateDocument,
  getActionPlanSpeechText,
  getSchemeActionPlanSpeech,
  getStepSpeechText
} from '../data/translations';

export default function ScreenActionPlan({
  language,
  matchResults,
  selectedScheme,
  onSelectScheme,
  onBack,
  onReadAloud,
  isSpeaking,
  speakingText
}) {
  const strings = UI_STRINGS[language] || UI_STRINGS.en;
  const [checkedDocs, setCheckedDocs] = useState({});
  const [copied, setCopied] = useState(false);

  if (!matchResults || !matchResults.results) {
    return null;
  }

  const { profile, summary, results } = matchResults;
  const likely = results.likely_eligible || [];

  // Active scheme state: if a scheme is passed, select it; otherwise default to first likely eligible scheme
  const [activeSchemeId, setActiveSchemeId] = useState(
    selectedScheme
      ? (selectedScheme.scheme_id || selectedScheme.id)
      : (likely[0]?.scheme_id || 'all')
  );

  useEffect(() => {
    if (selectedScheme) {
      setActiveSchemeId(selectedScheme.scheme_id || selectedScheme.id);
    }
  }, [selectedScheme]);

  const activeScheme = activeSchemeId === 'all'
    ? null
    : (likely.find(s => (s.scheme_id || s.id) === activeSchemeId) ||
       (results.all || []).find(s => (s.scheme_id || s.id) === activeSchemeId) ||
       selectedScheme);

  // Determine which documents to show: specific scheme docs or consolidated
  const targetDocs = activeScheme && activeScheme.documents && activeScheme.documents.length > 0
    ? activeScheme.documents
    : (summary.consolidated_documents || []);

  // Multi-lingual roadmap steps
  const currentSteps = ROADMAP_STEPS[language] || ROADMAP_STEPS.en;

  // Toggle checklist
  const toggleDoc = (doc) => {
    setCheckedDocs(prev => ({
      ...prev,
      [doc]: !prev[doc]
    }));
  };

  // Listen to an individual step
  const handleListenStep = (stepItem) => {
    const textToSpeak = getStepSpeechText(stepItem.step, stepItem.title, stepItem.description, language);
    onReadAloud(textToSpeak);
  };

  // Top Full Plan Read Aloud
  const handleReadAloudPlan = () => {
    if (activeScheme) {
      const speech = getSchemeActionPlanSpeech(activeScheme, targetDocs, currentSteps, language);
      onReadAloud(speech);
    } else {
      const speech = getActionPlanSpeechText(summary, likely.length, language);
      onReadAloud(speech);
    }
  };

  // Print summary
  const handlePrint = () => {
    window.print();
  };

  // Download summary as text file in selected language
  const handleDownloadText = () => {
    const schemeTitle = activeScheme ? activeScheme.scheme_name : 'All Eligible Schemes';
    const lines = [
      "==================================================",
      "SAHAAYA: Voice-First Government Scheme Navigator",
      `Personalized Welfare Action Plan - ${schemeTitle}`,
      "==================================================",
      `Generated on: ${new Date().toLocaleDateString('en-IN')}`,
      `Language: ${language.toUpperCase()}`,
      "",
      "--- CITIZEN PROFILE ---",
      `Age: ${profile.age || 'Not specified'}`,
      `Gender: ${profile.gender || 'Not specified'}`,
      `State: ${profile.state || 'India'}`,
      `Occupation: ${profile.occupation || 'Not specified'}`,
      `Land Ownership: ${profile.land_owned ? 'Yes' : 'No'}`,
      `Income Group: ${profile.income_category || 'Low/BPL'}`,
      "",
      "--- SELECTED SCHEME & BENEFITS ---",
      activeScheme ? `${activeScheme.scheme_name} (${activeScheme.benefit})` : summary.headline_benefit,
      activeScheme?.official_source ? `Official Portal: ${activeScheme.official_source}` : '',
      "",
      `--- REQUIRED DOCUMENTS (${targetDocs.length}) ---`
    ];

    targetDocs.forEach((doc, idx) => {
      const translated = translateDocument(doc, language);
      const isDone = checkedDocs[doc] ? "[X] READY: " : "[ ] NEEDED: ";
      lines.push(`${isDone} ${translated} (${doc})`);
    });

    lines.push("");
    lines.push("--- 5-STEP APPLICATION ROADMAP ---");
    currentSteps.forEach(step => {
      lines.push(`${step.step}. ${step.title}: ${step.description}`);
    });

    lines.push("");
    lines.push("--- ASSISTANCE & CSC HELPLINE ---");
    lines.push(strings.cscHelp);
    lines.push("");
    lines.push("--- OFFICIAL DISCLAIMER ---");
    lines.push(summary.disclaimer);

    const blob = new Blob([lines.join("\n")], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sahaaya_Action_Plan_${activeScheme ? (activeScheme.short_name || 'Scheme').replace(/\s+/g, '_') : 'All_Schemes'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Share summary
  const handleShare = async () => {
    const schemeName = activeScheme ? activeScheme.scheme_name : 'Welfare Schemes';
    const benefit = activeScheme ? activeScheme.benefit : summary.headline_benefit;
    const shareText = `*SAHAAYA Welfare Summary*\nScheme: ${schemeName}\nBenefit: ${benefit}\n\nRequired Docs: ${targetDocs.slice(0, 3).map(d => translateDocument(d, language)).join(', ')}\n\nApply via official portal or nearest CSC.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sahaaya Welfare Plan',
          text: shareText
        });
        return;
      } catch (err) {}
    }

    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="py-6 max-w-4xl mx-auto px-4">
      
      {/* Top Controls Bar (No Print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <button
          onClick={onBack}
          className="self-start inline-flex items-center text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Scheme Results
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {/* Read aloud full plan */}
          <button
            onClick={handleReadAloudPlan}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors"
            title={strings.readAloud}
          >
            <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse' : ''}`} />
            <span>{strings.readAloud}</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold shadow-2xs"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-amber-600" />}
            <span>{copied ? 'Copied!' : strings.shareSummary}</span>
          </button>

          {/* Download Text */}
          <button
            onClick={handleDownloadText}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold shadow-2xs"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>{strings.downloadSummary}</span>
          </button>

          {/* Print PDF */}
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>{strings.printSummary}</span>
          </button>
        </div>
      </div>

      {/* Scheme Selector Tabs Bar */}
      <div className="no-print bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              {strings.selectedSchemeLabel || "Selected Scheme"}:
            </span>
          </div>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Select a scheme to view its specific documents & roadmap:
          </span>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          {likely.map((s) => {
            const sId = s.scheme_id || s.id;
            const isSelected = activeSchemeId === sId;
            return (
              <button
                key={sId}
                onClick={() => {
                  setActiveSchemeId(sId);
                  if (onSelectScheme) onSelectScheme(s);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-1.5 whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md scale-102'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                {isSelected && <CheckCircle2 className="w-4 h-4" />}
                <span>{s.short_name || s.scheme_name}</span>
              </button>
            );
          })}

          <button
            onClick={() => {
              setActiveSchemeId('all');
              if (onSelectScheme) onSelectScheme(null);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeSchemeId === 'all'
                ? 'bg-slate-900 text-white shadow-md scale-102'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
            }`}
          >
            <span>{strings.allSchemesOption || "All Eligible Schemes"}</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet Container */}
      <div className="printable-card bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
        
        {/* Document Header with Accent */}
        <div className="border-b-2 border-amber-600/30 pb-6 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-amber-600 text-white px-2.5 py-0.5 rounded-lg">
                स
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">
                SAHAAYA
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              {strings.actionPlanTitle}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-400 font-semibold block">
              {activeScheme ? activeScheme.short_name : 'Estimated Total Welfare Benefit'}:
            </span>
            <span className="text-lg sm:text-xl font-black text-emerald-700 font-['Outfit']">
              {activeScheme ? activeScheme.benefit : summary.headline_benefit}
            </span>
          </div>
        </div>

        {/* Selected Scheme Spotlight Card */}
        {activeScheme && (
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 rounded-2xl p-5 border border-emerald-200 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                {activeScheme.category}
              </span>
              {activeScheme.official_source && (
                <a
                  href={activeScheme.official_source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              )}
            </div>

            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 font-['Outfit']">
              {activeScheme.scheme_name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              {activeScheme.description}
            </p>
            <div className="mt-2 text-xs font-semibold text-emerald-800">
              💡 {activeScheme.reason}
            </div>
          </div>
        )}

        {/* User Profile Summary Box */}
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
            Citizen Profile Details
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div><span className="text-slate-400 font-medium">Age:</span> <strong className="text-slate-800">{profile.age || '—'} yrs</strong></div>
            <div><span className="text-slate-400 font-medium">Gender:</span> <strong className="text-slate-800 capitalize">{profile.gender || '—'}</strong></div>
            <div><span className="text-slate-400 font-medium">Marital Status:</span> <strong className="text-slate-800 capitalize">{profile.marital_status || '—'}</strong></div>
            <div><span className="text-slate-400 font-medium">State:</span> <strong className="text-slate-800">{profile.state || 'India'}</strong></div>
            <div><span className="text-slate-400 font-medium">Occupation:</span> <strong className="text-slate-800 capitalize">{profile.occupation || '—'}</strong></div>
            <div><span className="text-slate-400 font-medium">Land Owned:</span> <strong className="text-slate-800">{profile.land_owned ? 'Yes' : 'No'}</strong></div>
            <div><span className="text-slate-400 font-medium">Income Group:</span> <strong className="text-slate-800 capitalize">{profile.income_category || 'Low/BPL'}</strong></div>
            <div><span className="text-slate-400 font-medium">Category:</span> <strong className="text-slate-800 uppercase">{profile.social_category || 'General'}</strong></div>
          </div>
        </div>

        {/* Documents Checklist (Interactive, Localized & Respective to Selected Scheme) */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center">
                <FileCheck className="w-4 h-4 text-emerald-600 mr-2" />
                <span>
                  {activeScheme
                    ? `${strings.documentsForScheme || 'Required Documents for'} ${activeScheme.short_name || activeScheme.scheme_name}`
                    : (strings.documentsChecklist || 'Consolidated Document Checklist')}
                </span>
                <span className="ml-2 text-xs bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                  {targetDocs.length}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Presented in your selected language. Check off the items you have prepared:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {targetDocs.map((doc, idx) => {
              const isChecked = Boolean(checkedDocs[doc]);
              const translated = translateDocument(doc, language);

              return (
                <div
                  key={idx}
                  onClick={() => toggleDoc(doc)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between select-none ${
                    isChecked
                      ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950 shadow-2xs'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-start space-x-2.5">
                    <div className="mt-0.5">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-300 shrink-0" />
                      )}
                    </div>
                    <div>
                      <span className={`text-xs sm:text-sm font-bold block ${isChecked ? 'line-through text-emerald-800' : 'text-slate-900'}`}>
                        {translated}
                      </span>
                      {language !== 'en' && translated !== doc && (
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          {doc}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold shrink-0 ml-2 ${
                    isChecked ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isChecked ? 'Ready' : 'Needed'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5-Step Action Roadmap in Respective Selected Language */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center">
                <Building2 className="w-4 h-4 text-amber-600 mr-2" />
                <span>{strings.stepByStepRoadmap}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Step-by-step guidance in your language. Tap the listen button on any step to hear it spoken:
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {currentSteps.map((item) => {
              return (
                <div
                  key={item.step}
                  className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-amber-300 transition-colors"
                >
                  <div className="flex items-start space-x-3.5">
                    <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-slate-900 to-slate-800 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Individual Step Voice Read-Aloud Button */}
                  <button
                    onClick={() => handleListenStep(item)}
                    className="self-end sm:self-center shrink-0 flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-amber-100 text-amber-900 border border-slate-200 shadow-2xs text-xs font-semibold transition-colors"
                    title={strings.listenToStep || "Listen"}
                  >
                    <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>{strings.listenToStep || "Listen"}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Official CSC Helpline Box */}
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 mb-6 flex items-center space-x-3">
          <PhoneCall className="w-5 h-5 text-amber-700 shrink-0" />
          <div className="text-xs text-amber-900">
            <strong className="font-bold">Common Service Centre (CSC) Help:</strong>{' '}
            {strings.cscHelp}
          </div>
        </div>

        {/* Official Disclaimer Box */}
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start space-x-2.5">
          <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold text-slate-800">{strings.disclaimerTitle}:</strong>{' '}
            {summary.disclaimer}
          </div>
        </div>

      </div>

    </div>
  );
}
