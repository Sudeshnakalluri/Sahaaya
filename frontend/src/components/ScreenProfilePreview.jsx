import React from 'react';
import { User, CheckCircle2, AlertCircle, ArrowRight, Volume2, ShieldCheck, MapPin, Briefcase, IndianRupee, HeartHandshake } from 'lucide-react';
import { UI_STRINGS, getProfileSpeechText } from '../data/translations';

export default function ScreenProfilePreview({
  language,
  profile,
  onProceed,
  onEditProfile,
  onReadAloud,
  isSpeaking,
  onBack
}) {
  const strings = UI_STRINGS[language] || UI_STRINGS.en;

  const profileItems = [
    { label: strings.age, value: profile.age ? `${profile.age} years` : 'Not specified', isKnown: profile.age !== null, icon: User },
    { label: strings.gender, value: profile.gender ? (profile.gender === 'female' ? 'Female' : 'Male') : 'Not specified', isKnown: profile.gender !== null, icon: User },
    { label: strings.maritalStatus, value: profile.marital_status ? profile.marital_status.toUpperCase() : 'Not specified', isKnown: profile.marital_status !== null, icon: HeartHandshake },
    { label: strings.state, value: profile.state || 'Not specified', isKnown: Boolean(profile.state), icon: MapPin },
    { label: strings.occupation, value: profile.occupation ? profile.occupation.replace('_', ' ').toUpperCase() : 'Not specified', isKnown: Boolean(profile.occupation), icon: Briefcase },
    { label: strings.landOwnership, value: profile.land_owned === true ? 'Yes (Agricultural Land)' : (profile.land_owned === false ? 'No (Landless)' : 'Not specified'), isKnown: profile.land_owned !== null, icon: CheckCircle2 },
    { label: strings.incomeCategory, value: profile.income_category ? profile.income_category.toUpperCase() : (profile.annual_income ? `₹${profile.annual_income.toLocaleString('en-IN')}` : 'Not specified'), isKnown: Boolean(profile.income_category || profile.annual_income), icon: IndianRupee },
    { label: strings.socialCategory, value: profile.social_category ? profile.social_category.toUpperCase() : 'General / Not specified', isKnown: Boolean(profile.social_category), icon: ShieldCheck }
  ];

  const profileSpeechSummary = getProfileSpeechText(profile, language);

  return (
    <div className="py-6 max-w-4xl mx-auto px-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
            Step 2 of 5 • Profile Extraction
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-['Outfit']">
            {strings.extractedProfileTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 flex items-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1.5" />
            {strings.profileVerifiedNotice}
          </p>
        </div>

        {/* Read Aloud Button */}
        <button
          onClick={() => onReadAloud(profileSpeechSummary)}
          className="self-start sm:self-auto flex items-center space-x-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold shadow-2xs"
        >
          <Volume2 className={`w-4 h-4 text-amber-600 ${isSpeaking ? 'animate-pulse' : ''}`} />
          <span>{strings.readAloud}</span>
        </button>
      </div>

      {/* Grid of Profile Attributes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {profileItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all ${
                item.isKnown
                  ? 'bg-white border-slate-200 shadow-2xs'
                  : 'bg-slate-50/70 border-dashed border-slate-300 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500">{item.label}</span>
                <Icon className={`w-4 h-4 ${item.isKnown ? 'text-emerald-600' : 'text-slate-300'}`} />
              </div>
              <p className={`text-sm sm:text-base font-bold ${item.isKnown ? 'text-slate-900' : 'text-slate-400 italic'}`}>
                {item.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Navigation Actions */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
        <button
          onClick={onBack}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-colors"
        >
          Back to Voice Input
        </button>

        <button
          onClick={onProceed}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm shadow-md flex items-center justify-center space-x-2 transition-transform transform active:scale-98"
        >
          <span>Check Scheme Eligibility</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>

    </div>
  );
}
