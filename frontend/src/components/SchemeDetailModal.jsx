import React from 'react';
import {
  X,
  Volume2,
  ExternalLink,
  CheckCircle2,
  Building2,
  Calendar,
  FileCheck,
  Award,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { UI_STRINGS, getSchemeDetailSpeechText, translateDocument } from '../data/translations';

export default function SchemeDetailModal({
  language,
  scheme,
  onClose,
  onSelectSchemeForPlan,
  onReadAloud,
  isSpeaking
}) {
  const strings = UI_STRINGS[language] || UI_STRINGS.en;

  if (!scheme) return null;

  const isEligible = scheme.status === 'likely_eligible';
  const isNeedsInfo = scheme.status === 'needs_more_info';

  const speechContent = getSchemeDetailSpeechText(scheme, language);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                {scheme.category}
              </span>

              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center ${
                  isEligible
                    ? 'bg-emerald-100 text-emerald-800'
                    : isNeedsInfo
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-600'
                }`}
              >
                {scheme.status_label}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit']">
              {scheme.scheme_name}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Benefit Box */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-2xl p-4 flex items-start justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center">
                <Award className="w-4 h-4 mr-1 text-emerald-600" />
                {strings.potentialBenefit}
              </span>
              <p className="text-lg sm:text-xl font-extrabold text-emerald-950 font-['Outfit'] mt-1">
                {scheme.benefit}
              </p>
            </div>

            <button
              onClick={() => onReadAloud(speechContent)}
              className="p-2.5 rounded-xl bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-2xs transition-colors shrink-0"
              title={strings.readAloud}
            >
              <Volume2 className={`w-5 h-5 ${isSpeaking ? 'animate-pulse text-amber-600' : ''}`} />
            </button>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              What this scheme is
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {scheme.description}
            </p>
          </div>

          {/* Why User Matches */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1.5" />
              {isEligible ? strings.whyMatches : 'Eligibility Status Notes'}
            </h4>
            <p className="text-sm text-slate-800 font-medium">
              {scheme.reason}
            </p>
          </div>

          {/* Documents Required */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center">
              <FileCheck className="w-4 h-4 mr-1 text-amber-600" />
              {strings.documentsRequired}
            </h4>
            <ul className="space-y-2.5">
              {scheme.documents && scheme.documents.map((doc, idx) => {
                const translated = translateDocument(doc, language);
                return (
                  <li key={idx} className="text-sm text-slate-700 flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-slate-900">{translated}</span>
                      {language !== 'en' && translated !== doc && (
                        <span className="block text-xs text-slate-400 mt-0.5">{doc}</span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* How to Apply */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              {strings.howToApply}
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-amber-50/50 p-3.5 rounded-xl border border-amber-200/60">
              {scheme.application_method}
            </p>
          </div>

          {/* CSC / Panchayat Guidance */}
          {scheme.csc_guidance && (
            <div className="bg-slate-900 text-white rounded-2xl p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5 flex items-center">
                <Building2 className="w-4 h-4 mr-1.5" />
                {strings.cscGuidance}
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {scheme.csc_guidance}
              </p>
            </div>
          )}

          {/* Official Source & Verification Metadata */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
            <a
              href={scheme.official_source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-amber-700 hover:text-amber-800 font-bold hover:underline"
            >
              <span>{scheme.portal_name || strings.officialPortal}</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>

            {scheme.last_verified && (
              <span className="flex items-center text-slate-400">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                {strings.lastVerified} {scheme.last_verified}
              </span>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              if (onSelectSchemeForPlan) {
                onSelectSchemeForPlan(scheme);
              }
            }}
            className="px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold flex items-center space-x-1.5 shadow-md transition-all transform active:scale-95"
          >
            <FileCheck className="w-4 h-4 mr-1" />
            <span>{strings.viewActionPlanForScheme || "Get Documents & Application Roadmap"}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs sm:text-sm font-bold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
