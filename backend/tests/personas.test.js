import { matchSchemes, normalizeProfile } from '../services/eligibilityEngine.js';
import { extractProfileHeuristics, generateFollowUpQuestion } from '../services/nlpService.js';

const personas = [
  {
    name: "PRD Widow Farmer (Tamil Nadu)",
    text: "I am 58 years old. I am a widow. I live in Tamil Nadu. I have a small farm and my income is low.",
    expectedEligible: ["pm-kisan", "ignwps", "pm-jay"],
    expectedNotEligible: ["pragati-scholarship"]
  },
  {
    name: "Rural OBC Student (Uttar Pradesh)",
    text: "I am a 20-year-old female student from Uttar Pradesh. I belong to OBC category and my family annual income is 1.5 lakhs.",
    expectedEligible: ["pragati-scholarship", "post-matric-sc-st-obc", "pm-usp"],
    expectedNotEligible: ["pm-kisan"]
  },
  {
    name: "Senior Laborer (Karnataka)",
    text: "I am 62 years old living in Karnataka. I work as a daily wage laborer with no pension. My income is below poverty line.",
    expectedEligible: ["ignoaps", "pm-jay", "mgnrega"],
    expectedNotEligible: ["pragati-scholarship"]
  },
  {
    name: "Street Vendor (Maharashtra)",
    text: "I am 34 years old street vendor in Maharashtra. I sell vegetables on a handcart and need a working capital loan.",
    expectedEligible: ["pm-svanidhi"],
    expectedNotEligible: ["ignwps"]
  }
];

console.log("=== COMPREHENSIVE PERSONA VERIFICATION ===");
let allPassed = true;

for (const p of personas) {
  const profile = extractProfileHeuristics(p.text);
  const match = matchSchemes(profile);
  const likelyIds = match.results.likely_eligible.map(s => s.scheme_id);
  const notMatchingIds = match.results.not_matching.map(s => s.scheme_id);

  console.log(`\nTesting Persona: ${p.name}`);
  console.log(`Profile: age=${profile.age}, gender=${profile.gender}, occ=${profile.occupation}, land=${profile.land_owned}, inc=${profile.income_category}`);
  console.log(`Headline: ${match.summary.headline_benefit}`);
  console.log(`Likely eligible count: ${likelyIds.length}`);

  for (const exp of p.expectedEligible) {
    if (likelyIds.includes(exp)) {
      console.log(`  ✅ Expected likely eligible: ${exp}`);
    } else {
      console.error(`  ❌ Missing expected eligible: ${exp}`);
      allPassed = false;
    }
  }
  for (const expNot of p.expectedNotEligible) {
    if (notMatchingIds.includes(expNot)) {
      console.log(`  ✅ Expected non-match: ${expNot}`);
    } else {
      console.error(`  ❌ Expected non-match failed for: ${expNot}`);
      allPassed = false;
    }
  }
}

if (allPassed) {
  console.log("\n🎉 ALL 4 TEST PERSONAS FULLY VALIDATED!");
} else {
  console.error("\n❌ Some tests failed!");
  process.exit(1);
}
