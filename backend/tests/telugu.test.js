import { extractProfileHeuristics } from '../services/nlpService.js';
import { matchSchemes } from '../services/eligibilityEngine.js';

console.log("==================================================");
console.log("🧪 TESTING TELUGU & INDIC SPEECH EXTRACTION");
console.log("==================================================\n");

const teluguInput1 = "నా వయస్సు 58 సంవత్సరాలు. నేను వితంతువును. తమిళనాడులో నివసిస్తున్నాను. నాకు చిన్న పొలం ఉంది, నా ఆదాయం తక్కువ.";
const res1 = extractProfileHeuristics(teluguInput1);
console.log("Test 1 (Telugu standard digits):", JSON.stringify(res1, null, 2));

const teluguInput2 = "నా వయస్సు ౫౮ సంవత్సరాలు. వితంతువు, రైతు, తమిళనాడు, చిన్న పొలం, తక్కువ ఆదాయం";
const res2 = extractProfileHeuristics(teluguInput2);
console.log("Test 2 (Telugu Indic numerals ౫౮):", JSON.stringify(res2, null, 2));

const teluguInput3 = "నాకు 58 ఏళ్ళు. నేను వితంతువును, వ్యవసాయం చేస్తున్నాను, నాది తమిళనాడు, ఆదాయం తక్కువ";
const res3 = extractProfileHeuristics(teluguInput3);
console.log("Test 3 (Telugu conversational):", JSON.stringify(res3, null, 2));

const pass1 = res1.age === 58 && res1.gender === "female" && res1.marital_status === "widow" && res1.occupation === "farmer" && res1.land_owned === true && res1.income_category === "low" && res1.state === "Tamil Nadu";
const pass2 = res2.age === 58 && res2.gender === "female" && res2.marital_status === "widow" && res2.occupation === "farmer";
const pass3 = res3.age === 58 && res3.gender === "female" && res3.marital_status === "widow" && res3.occupation === "farmer";

if (pass1 && pass2 && pass3) {
  console.log("\n🎉 ALL TELUGU EXTRACTION TESTS PASSED PERFECTLY!");
} else {
  console.error("\n❌ Telugu extraction test failed!");
  process.exit(1);
}

// Now test scheme matching with Telugu profile
const match = matchSchemes(res1);
console.log(`\nMatched Schemes for Telugu Persona:`);
console.log(`Headline: ${match.summary.headline_benefit}`);
console.log(`Likely Eligible Count: ${match.summary.likely_eligible_count}`);
const pmKisan = match.results.likely_eligible.find(s => s.scheme_id === 'pm-kisan');
const widowPension = match.results.likely_eligible.find(s => s.scheme_id === 'ignwps');
if (pmKisan && widowPension) {
  console.log("✅ PM-KISAN and Widow Pension matched deterministically from Telugu input!");
} else {
  console.error("❌ Matching failed!");
  process.exit(1);
}
