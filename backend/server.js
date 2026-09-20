/**
 * Sahaaya Backend API Server
 * 
 * Provides endpoints for voice/text extraction, deterministic scheme matching,
 * conversational follow-ups, and personalized action plans.
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  matchSchemes,
  getAllSchemes,
  getSchemeById,
  normalizeProfile
} from './services/eligibilityEngine.js';

import {
  extractProfileWithGemini,
  extractProfileHeuristics,
  generateFollowUpQuestion,
  explainSchemeSimple
} from './services/nlpService.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static frontend build if it exists
const distPath = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Sahaaya Voice-First Government Scheme Navigator API',
    mode: process.env.GEMINI_API_KEY ? 'gemini_ai_enabled' : 'local_heuristic_nlp',
    timestamp: new Date().toISOString()
  });
});

/**
 * POST /api/profile/extract
 * Extracts structured facts from user speech or text input.
 * Merges with existing profile if provided.
 */
app.post('/api/profile/extract', async (req, res) => {
  try {
    const { text, currentProfile = {} } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text input is required' });
    }

    // Try Gemini if available, else heuristic NLP
    const profile = await extractProfileWithGemini(text, currentProfile);
    
    // Run initial deterministic match with newly extracted profile
    const matchResult = matchSchemes(profile);

    res.json({
      success: true,
      extracted_text: text,
      profile,
      match_summary: matchResult.summary
    });
  } catch (err) {
    console.error('Error extracting profile:', err);
    res.status(500).json({ error: 'Failed to extract profile', details: err.message });
  }
});

/**
 * POST /api/profile/questions
 * Detects missing information in schemes needing more info and returns 1 targeted follow-up question.
 */
app.post('/api/profile/questions', (req, res) => {
  try {
    const { profile = {}, lang = 'en' } = req.body;
    const matchResult = matchSchemes(profile);
    const question = generateFollowUpQuestion(matchResult.profile, matchResult, lang);

    res.json({
      success: true,
      has_question: Boolean(question),
      question
    });
  } catch (err) {
    console.error('Error generating questions:', err);
    res.status(500).json({ error: 'Failed to generate question', details: err.message });
  }
});

/**
 * POST /api/schemes/match
 * Runs deterministic eligibility matching for the provided user profile.
 */
app.post('/api/schemes/match', (req, res) => {
  try {
    const { profile = {} } = req.body;
    const matchResult = matchSchemes(profile);

    res.json({
      success: true,
      ...matchResult
    });
  } catch (err) {
    console.error('Error matching schemes:', err);
    res.status(500).json({ error: 'Failed to match schemes', details: err.message });
  }
});

/**
 * GET /api/schemes
 * Returns all verified schemes in the database
 */
app.get('/api/schemes', (req, res) => {
  try {
    const schemes = getAllSchemes();
    res.json({
      success: true,
      count: schemes.length,
      schemes
    });
  } catch (err) {
    console.error('Error fetching schemes:', err);
    res.status(500).json({ error: 'Failed to fetch schemes', details: err.message });
  }
});

/**
 * GET /api/schemes/:id
 * Returns single scheme details by ID
 */
app.get('/api/schemes/:id', (req, res) => {
  try {
    const scheme = getSchemeById(req.params.id);
    if (!scheme) {
      return res.status(404).json({ error: 'Scheme not found' });
    }
    res.json({
      success: true,
      scheme
    });
  } catch (err) {
    console.error('Error fetching scheme details:', err);
    res.status(500).json({ error: 'Failed to fetch scheme', details: err.message });
  }
});

/**
 * POST /api/explain
 * Returns simple language explanation and next steps for a scheme
 */
app.post('/api/explain', (req, res) => {
  try {
    const { scheme, profile = {}, lang = 'en' } = req.body;
    if (!scheme) {
      return res.status(400).json({ error: 'Scheme details are required' });
    }

    const explanation = explainSchemeSimple(scheme, profile, lang);
    res.json({
      success: true,
      explanation
    });
  } catch (err) {
    console.error('Error explaining scheme:', err);
    res.status(500).json({ error: 'Failed to generate explanation', details: err.message });
  }
});

/**
 * POST /api/summary
 * Creates a comprehensive, personalized benefits summary and action plan.
 */
app.post('/api/summary', (req, res) => {
  try {
    const { profile = {} } = req.body;
    const matchResult = matchSchemes(profile);
    const likely = matchResult.results.likely_eligible;

    // Deduplicated documents
    const docSet = new Set();
    likely.forEach(s => s.documents.forEach(d => docSet.add(d)));
    const documentsList = Array.from(docSet);

    // Personalized Step-by-step action plan
    const actionPlanSteps = [
      {
        step: 1,
        title: "Collect Essential Identity & Financial Documents",
        description: "Gather your original Aadhaar card and Bank Passbook (ensure Aadhaar is linked to your bank account for Direct Benefit Transfer)."
      },
      {
        step: 2,
        title: "Gather Scheme-Specific Proofs",
        description: profile.occupation === 'farmer'
          ? "Obtain your land records (Patta / Chitta / 7/12 extract) from the Village Administrative Officer or Revenue Inspector."
          : "Obtain your Income Certificate or Category Certificate from the local Tahsildar / Taluk office."
      },
      {
        step: 3,
        title: "Visit Nearest Common Service Centre (CSC) or Panchayat Office",
        description: "Locate your nearest CSC operator or Gram Panchayat office. Present your personalized Sahaaya summary checklist to the operator."
      },
      {
        step: 4,
        title: "Complete Biometric e-KYC and Application",
        description: "Have the operator fill the online forms for the matched schemes and complete your fingerprint or iris biometric authentication."
      },
      {
        step: 5,
        title: "Retain Application Reference Numbers and Track Status",
        description: "Collect printed acknowledgement receipts and track approval on official government portals (e.g., pmkisan.gov.in, nsap.nic.in, nha.gov.in)."
      }
    ];

    const summaryData = {
      generated_at: new Date().toISOString(),
      user_profile: matchResult.profile,
      headline_benefit: matchResult.summary.headline_benefit,
      potential_annual_cash_inr: matchResult.summary.potential_annual_cash_inr,
      likely_eligible_schemes: likely.map(s => ({
        id: s.scheme_id,
        name: s.scheme_name,
        short_name: s.short_name,
        category: s.category,
        benefit: s.benefit,
        official_source: s.official_source,
        portal_name: s.portal_name,
        documents: s.documents
      })),
      document_checklist: documentsList.map(doc => ({
        name: doc,
        status: 'pending',
        required_for: likely.filter(s => s.documents.includes(doc)).map(s => s.short_name)
      })),
      action_plan: actionPlanSteps,
      csc_help_number: "Dial 14599 for CSC Citizen Helpline or visit locator.csccloud.in",
      disclaimer: "This document is an initial eligibility guidance summary generated by Sahaaya. Final approval and disbursement are subject to verification by the respective Government authorities."
    };

    res.json({
      success: true,
      summary: summaryData
    });
  } catch (err) {
    console.error('Error generating summary:', err);
    res.status(500).json({ error: 'Failed to generate summary', details: err.message });
  }
});

// Wildcard route for SPA
if (fs.existsSync(distPath)) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Start server
const server = app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Sahaaya Navigator running at: http://localhost:${PORT}`);
  console.log(`📡 Mode: ${process.env.GEMINI_API_KEY ? 'Google Gemini AI' : 'Deterministic Heuristic Engine (Offline Safe)'}`);
  console.log(`==================================================\n`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n⚠️ Port ${PORT} is currently in use by another process.`);
    console.error(`Try running on another port: $env:PORT=5001; npm start (PowerShell) or PORT=5001 npm start\n`);
    process.exit(1);
  } else {
    throw err;
  }
});
