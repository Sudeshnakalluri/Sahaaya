/**
 * Deterministic Eligibility Engine for Sahaaya
 * 
 * Implements strict, verifiable rule-matching for Indian welfare schemes.
 * Follows PRD specifications:
 * - The LLM is NEVER allowed to decide eligibility.
 * - Produces 3 deterministic states: 'likely_eligible', 'needs_more_info', 'not_matching'.
 * - Provides explainable reasons for every decision.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load schemes database
const schemesPath = path.join(__dirname, '../data/schemes.json');
const schemesData = JSON.parse(fs.readFileSync(schemesPath, 'utf8'));

/**
 * Normalizes user profile attributes
 */
export function normalizeProfile(rawProfile = {}) {
  const normalized = {
    age: rawProfile.age !== undefined && rawProfile.age !== null && !isNaN(Number(rawProfile.age))
      ? Number(rawProfile.age)
      : null,
    gender: rawProfile.gender ? String(rawProfile.gender).toLowerCase().trim() : null,
    marital_status: rawProfile.marital_status ? String(rawProfile.marital_status).toLowerCase().trim() : null,
    occupation: rawProfile.occupation ? String(rawProfile.occupation).toLowerCase().trim() : null,
    land_owned: rawProfile.land_owned !== undefined && rawProfile.land_owned !== null
      ? (typeof rawProfile.land_owned === 'boolean'
          ? rawProfile.land_owned
          : ['true', 'yes', 'small', 'marginal', 'own'].includes(String(rawProfile.land_owned).toLowerCase()))
      : null,
    income_category: rawProfile.income_category ? String(rawProfile.income_category).toLowerCase().trim() : null,
    annual_income: rawProfile.annual_income !== undefined && rawProfile.annual_income !== null && !isNaN(Number(rawProfile.annual_income))
      ? Number(rawProfile.annual_income)
      : null,
    social_category: rawProfile.social_category ? String(rawProfile.social_category).toLowerCase().trim() : null,
    state: rawProfile.state ? String(rawProfile.state).trim() : null,
    is_pregnant: rawProfile.is_pregnant !== undefined && rawProfile.is_pregnant !== null
      ? Boolean(rawProfile.is_pregnant)
      : null,
    has_girl_child: rawProfile.has_girl_child !== undefined && rawProfile.has_girl_child !== null
      ? Boolean(rawProfile.has_girl_child)
      : null
  };

  // Harmonize income category if annual_income is given
  if (normalized.annual_income !== null && !normalized.income_category) {
    if (normalized.annual_income <= 100000) normalized.income_category = 'bpl';
    else if (normalized.annual_income <= 300000) normalized.income_category = 'low';
    else if (normalized.annual_income <= 800000) normalized.income_category = 'medium';
    else normalized.income_category = 'high';
  }

  // Normalize occupations
  if (normalized.occupation) {
    const occ = normalized.occupation;
    if (occ.includes('farm') || occ.includes('kisan') || occ.includes('agri') || occ.includes('cultivat')) {
      normalized.occupation = 'farmer';
    } else if (occ.includes('study') || occ.includes('student') || occ.includes('college') || occ.includes('school')) {
      normalized.occupation = 'student';
    } else if (occ.includes('vendor') || occ.includes('hawker') || occ.includes('cart') || occ.includes('thela')) {
      normalized.occupation = 'street_vendor';
    } else if (occ.includes('wage') || occ.includes('labor') || occ.includes('labour') || occ.includes('coolie') || occ.includes('mazdoor')) {
      normalized.occupation = 'daily_wage';
    } else if (occ.includes('retire') || occ.includes('elder') || occ.includes('aged')) {
      normalized.occupation = 'retired';
    } else if (occ.includes('housewife') || occ.includes('homemaker')) {
      normalized.occupation = 'homemaker';
    }
  }

  // Normalize gender
  if (normalized.gender) {
    if (['female', 'woman', 'girl', 'lady', 'mahila', 'f'].includes(normalized.gender)) {
      normalized.gender = 'female';
    } else if (['male', 'man', 'boy', 'gentleman', 'purush', 'm'].includes(normalized.gender)) {
      normalized.gender = 'male';
    }
  }

  // Normalize marital status
  if (normalized.marital_status) {
    if (['widow', 'widowed', 'vidhwa'].includes(normalized.marital_status)) {
      normalized.marital_status = 'widow';
      if (!normalized.gender) normalized.gender = 'female';
    }
  }

  return normalized;
}

/**
 * Evaluates a single scheme against a normalized profile
 */
export function evaluateScheme(scheme, profile) {
  const rules = scheme.eligibility;
  const conflicts = [];
  const missingFields = [];
  const matchedCriteria = [];

  // 1. Age Check
  if (profile.age !== null) {
    if (rules.min_age !== null && profile.age < rules.min_age) {
      conflicts.push(`Applicant is ${profile.age} years old (minimum required: ${rules.min_age})`);
    } else if (rules.max_age !== null && profile.age > rules.max_age) {
      conflicts.push(`Applicant is ${profile.age} years old (maximum allowed: ${rules.max_age})`);
    } else if (rules.min_age !== null || rules.max_age !== null) {
      matchedCriteria.push(`Age ${profile.age} satisfies required range (${rules.min_age || 0} - ${rules.max_age || 'No limit'})`);
    }
  } else {
    if (rules.min_age !== null || rules.max_age !== null) {
      missingFields.push('age');
    }
  }

  // 2. Gender Check
  if (rules.gender && rules.gender !== 'any') {
    if (profile.gender !== null) {
      if (profile.gender !== rules.gender) {
        conflicts.push(`Scheme is reserved for ${rules.gender} applicants`);
      } else {
        matchedCriteria.push(`Gender matches ${rules.gender}`);
      }
    } else {
      missingFields.push('gender');
    }
  }

  // 3. Marital Status Check
  if (rules.marital_status && rules.marital_status !== 'any') {
    if (profile.marital_status !== null) {
      if (profile.marital_status !== rules.marital_status) {
        conflicts.push(`Requires marital status to be '${rules.marital_status}'`);
      } else {
        matchedCriteria.push(`Marital status matches '${rules.marital_status}'`);
      }
    } else {
      missingFields.push('marital_status');
    }
  }

  // 4. Occupation Check
  if (rules.occupation && rules.occupation !== 'any') {
    const allowedOccupations = Array.isArray(rules.occupation) ? rules.occupation : [rules.occupation];
    if (!allowedOccupations.includes('any')) {
      if (profile.occupation !== null) {
        if (!allowedOccupations.includes(profile.occupation)) {
          conflicts.push(`Intended for ${allowedOccupations.join(', ')} (applicant is registered as ${profile.occupation})`);
        } else {
          matchedCriteria.push(`Occupation (${profile.occupation}) is eligible`);
        }
      } else {
        missingFields.push('occupation');
      }
    }
  }

  // 5. Land Ownership Check
  if (rules.land_owned !== null && rules.land_owned !== undefined) {
    if (rules.land_owned === true) {
      if (profile.land_owned !== null) {
        if (profile.land_owned === false) {
          conflicts.push('Requires agricultural land ownership');
        } else {
          matchedCriteria.push('Owns agricultural land');
        }
      } else {
        missingFields.push('land_owned');
      }
    }
  }

  // 6. Income Category & Annual Income Check
  let incomeChecked = false;
  if (rules.max_annual_income !== null && rules.max_annual_income !== undefined) {
    if (profile.annual_income !== null) {
      incomeChecked = true;
      if (profile.annual_income > rules.max_annual_income) {
        conflicts.push(`Annual income ₹${profile.annual_income.toLocaleString('en-IN')} exceeds limit of ₹${rules.max_annual_income.toLocaleString('en-IN')}`);
      } else {
        matchedCriteria.push(`Annual income is within limit of ₹${rules.max_annual_income.toLocaleString('en-IN')}`);
      }
    }
  }

  if (rules.income_category && rules.income_category !== 'any') {
    const allowedCategories = Array.isArray(rules.income_category) ? rules.income_category : [rules.income_category];
    if (profile.income_category !== null) {
      incomeChecked = true;
      if (!allowedCategories.includes(profile.income_category)) {
        conflicts.push(`Scheme requires income group [${allowedCategories.join(', ')}], user is '${profile.income_category}'`);
      } else {
        matchedCriteria.push(`Income category (${profile.income_category}) qualifies`);
      }
    } else if (!incomeChecked && profile.annual_income === null) {
      missingFields.push('income_category');
    }
  }

  // 7. Social Category (Caste) Check
  if (rules.social_category && rules.social_category !== 'any') {
    const allowedCaste = Array.isArray(rules.social_category) ? rules.social_category : [rules.social_category];
    if (profile.social_category !== null) {
      if (!allowedCaste.includes(profile.social_category)) {
        conflicts.push(`Reserved for categories: ${allowedCaste.join(', ')}`);
      } else {
        matchedCriteria.push(`Social category (${profile.social_category}) qualifies`);
      }
    } else {
      missingFields.push('social_category');
    }
  }

  // Determine Status strictly adhering to PRD
  let status = 'not_matching';
  let reason = '';

  if (conflicts.length > 0) {
    status = 'not_matching';
    reason = conflicts[0];
  } else if (missingFields.length > 0) {
    status = 'needs_more_info';
    const readableFields = missingFields.map(f => {
      if (f === 'land_owned') return 'agricultural land ownership';
      if (f === 'income_category') return 'household income';
      if (f === 'marital_status') return 'marital status';
      if (f === 'social_category') return 'social category (caste)';
      return f;
    });
    reason = `Needs more information: please clarify ${readableFields.join(' and ')}.`;
  } else {
    status = 'likely_eligible';
    reason = matchedCriteria.length > 0
      ? `Likely eligible based on: ${matchedCriteria.slice(0, 3).join(', ')}.`
      : 'All standard conditions appear to match your profile.';
  }

  return {
    scheme_id: scheme.id,
    scheme_name: scheme.name,
    short_name: scheme.short_name,
    category: scheme.category,
    benefit: scheme.benefit,
    benefit_annual_inr: scheme.benefit_annual_inr || 0,
    benefit_type: scheme.benefit_type,
    description: scheme.description,
    status, // 'likely_eligible' | 'needs_more_info' | 'not_matching'
    status_label: status === 'likely_eligible'
      ? 'Likely Eligible'
      : status === 'needs_more_info'
        ? 'Needs More Info'
        : 'Does Not Appear to Match',
    reason,
    conflicts,
    missing_fields: [...new Set(missingFields)],
    matched_criteria: matchedCriteria,
    documents: scheme.documents || [],
    application_method: scheme.application_method,
    official_source: scheme.official_source,
    portal_name: scheme.portal_name,
    csc_guidance: scheme.csc_guidance,
    last_verified: scheme.last_verified
  };
}

/**
 * Runs deterministic matching for all schemes against user profile
 */
export function matchSchemes(rawProfile) {
  const profile = normalizeProfile(rawProfile);
  const results = schemesData.map(scheme => evaluateScheme(scheme, profile));

  const likelyEligible = results.filter(r => r.status === 'likely_eligible');
  const needsMoreInfo = results.filter(r => r.status === 'needs_more_info');
  const notMatching = results.filter(r => r.status === 'not_matching');

  // Compute potential financial benefits
  // Calculate direct annual cash / scholarship / pension sum
  const directCashSchemes = likelyEligible.filter(r =>
    ['Direct Cash Transfer', 'Monthly Pension', 'Senior Pension', 'Scholarship', 'Fee Reimbursement & Stipend', 'Guaranteed Wage Employment'].includes(r.benefit_type)
  );
  const totalDirectCash = directCashSchemes.reduce((sum, s) => sum + (s.benefit_annual_inr || 0), 0);

  // Calculate major healthcare & asset benefits
  const healthcareSchemes = likelyEligible.filter(r => r.benefit_type === 'Health Insurance Cover');
  const hasHealthCover = healthcareSchemes.length > 0;

  // Format headline potential benefit string
  let formattedBenefitHeadline = '';
  if (totalDirectCash > 0 && hasHealthCover) {
    formattedBenefitHeadline = `₹${totalDirectCash.toLocaleString('en-IN')}+ yearly support + ₹5 Lakh healthcare cover`;
  } else if (totalDirectCash > 0) {
    formattedBenefitHeadline = `₹${totalDirectCash.toLocaleString('en-IN')}+ potential yearly benefits`;
  } else if (hasHealthCover) {
    formattedBenefitHeadline = `Up to ₹5,00,000 healthcare coverage per year`;
  } else if (likelyEligible.length > 0) {
    const totalAll = likelyEligible.reduce((sum, s) => sum + (s.benefit_annual_inr || 0), 0);
    formattedBenefitHeadline = `₹${totalAll.toLocaleString('en-IN')}+ potential welfare assistance`;
  } else {
    formattedBenefitHeadline = 'Explore schemes based on your profile';
  }

  // Deduplicate required documents across likely eligible schemes
  const documentSet = new Set();
  likelyEligible.forEach(scheme => {
    scheme.documents.forEach(doc => documentSet.add(doc));
  });

  return {
    profile,
    summary: {
      total_schemes_checked: schemesData.length,
      likely_eligible_count: likelyEligible.length,
      needs_more_info_count: needsMoreInfo.length,
      not_matching_count: notMatching.length,
      potential_annual_cash_inr: totalDirectCash,
      has_health_cover: hasHealthCover,
      headline_benefit: formattedBenefitHeadline,
      consolidated_documents: Array.from(documentSet),
      disclaimer: "This result is an initial eligibility check. Final eligibility is determined by the relevant government authority."
    },
    results: {
      likely_eligible: likelyEligible,
      needs_more_info: needsMoreInfo,
      not_matching: notMatching,
      all: results
    }
  };
}

/**
 * Returns all schemes or single scheme by ID
 */
export function getAllSchemes() {
  return schemesData;
}

export function getSchemeById(id) {
  return schemesData.find(s => s.id === id) || null;
}
