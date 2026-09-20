/**
 * Test Suite for Sahaaya Deterministic Eligibility Engine and Heuristic NLP
 */

import { matchSchemes, normalizeProfile } from '../services/eligibilityEngine.js';
import { extractProfileHeuristics, generateFollowUpQuestion } from '../services/nlpService.js';

console.log('==================================================');
console.log('🧪 RUNNING SAHAAYA DETERMINISTIC ENGINE TESTS');
console.log('==================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failCount++;
  }
}

// TEST 1: PRD Example User NLP Extraction
console.log('--- TEST 1: PRD Example User Profile Extraction ---');
const prdUserSpeech = "I am 58 years old. I am a widow. I live in Tamil Nadu. I have a small farm and my income is low.";
const extractedPRD = extractProfileHeuristics(prdUserSpeech);

assert(extractedPRD.age === 58, `Extracted Age should be 58 (got: ${extractedPRD.age})`);
assert(extractedPRD.gender === 'female', `Extracted Gender should be 'female' (got: ${extractedPRD.gender})`);
assert(extractedPRD.marital_status === 'widow', `Extracted Marital Status should be 'widow' (got: ${extractedPRD.marital_status})`);
assert(extractedPRD.state === 'Tamil Nadu', `Extracted State should be 'Tamil Nadu' (got: ${extractedPRD.state})`);
assert(extractedPRD.occupation === 'farmer', `Extracted Occupation should be 'farmer' (got: ${extractedPRD.occupation})`);
assert(extractedPRD.land_owned === true, `Extracted Land Ownership should be true (got: ${extractedPRD.land_owned})`);
assert(extractedPRD.income_category === 'low', `Extracted Income Category should be 'low' (got: ${extractedPRD.income_category})`);

// TEST 2: PRD Example User Deterministic Scheme Matching
console.log('\n--- TEST 2: Deterministic Scheme Matching for PRD User ---');
const matchPRD = matchSchemes(extractedPRD);

const pmKisan = matchPRD.results.all.find(s => s.scheme_id === 'pm-kisan');
assert(pmKisan && pmKisan.status === 'likely_eligible', `PM-KISAN status should be 'likely_eligible' (got: ${pmKisan?.status})`);

const widowPension = matchPRD.results.all.find(s => s.scheme_id === 'ignwps');
assert(widowPension && widowPension.status === 'likely_eligible', `Widow Pension (IGNWPS) status should be 'likely_eligible' (got: ${widowPension?.status})`);

const ayushmanBharat = matchPRD.results.all.find(s => s.scheme_id === 'pm-jay');
assert(ayushmanBharat && ayushmanBharat.status === 'likely_eligible', `Ayushman Bharat (PM-JAY) status should be 'likely_eligible' (got: ${ayushmanBharat?.status})`);

const studentScholarship = matchPRD.results.all.find(s => s.scheme_id === 'pragati-scholarship');
assert(studentScholarship && studentScholarship.status === 'not_matching', `Student Scholarship status should be 'not_matching' (got: ${studentScholarship?.status})`);

console.log(`Potential annual direct cash: ₹${matchPRD.summary.potential_annual_cash_inr.toLocaleString('en-IN')}`);
console.log(`Headline: ${matchPRD.summary.headline_benefit}`);
assert(matchPRD.summary.potential_annual_cash_inr >= 13200, `Potential direct cash should be at least ₹13,200 (got: ${matchPRD.summary.potential_annual_cash_inr})`);
assert(matchPRD.summary.consolidated_documents.length > 0, `Should produce consolidated document checklist (got ${matchPRD.summary.consolidated_documents.length} docs)`);

// TEST 3: Partial Profile & Follow-Up Question Generation
console.log('\n--- TEST 3: Incomplete Profile & Follow-Up Questions ---');
const incompleteSpeech = "I am a 22-year-old student living in Uttar Pradesh.";
const extractedIncomplete = extractProfileHeuristics(incompleteSpeech);
const matchIncomplete = matchSchemes(extractedIncomplete);

assert(matchIncomplete.results.needs_more_info.length > 0, `Should have schemes in 'needs_more_info' state (got: ${matchIncomplete.results.needs_more_info.length})`);

const followUp = generateFollowUpQuestion(extractedIncomplete, matchIncomplete, 'en');
assert(followUp !== null, 'Should generate a targeted follow-up question');
assert(followUp.options && followUp.options.length > 0, 'Follow-up question should have selectable options');
console.log(`Generated Follow-up question: "${followUp?.questionText}" for field '${followUp?.field}'`);

// TEST 4: Non-matching test
console.log('\n--- TEST 4: High-income conflict test ---');
const highIncomeProfile = { age: 35, occupation: 'engineer', annual_income: 1500000, income_category: 'high' };
const matchHighIncome = matchSchemes(highIncomeProfile);
const pmKisanHigh = matchHighIncome.results.all.find(s => s.scheme_id === 'pm-kisan');
assert(pmKisanHigh.status === 'not_matching', `High-income engineer should not match PM-KISAN (got: ${pmKisanHigh.status})`);

console.log('\n==================================================');
console.log(`TEST RESULTS: ${passCount} Passed, ${failCount} Failed`);
console.log('==================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL TESTS PASSED SUCCESSFULLY!');
}
