/**
 * Custom hook for Web Speech Recognition (STT) and Web Speech Synthesis (TTS)
 * Designed for Indian regional languages with fallback support.
 */

import { useState, useEffect, useRef, useCallback } from 'react';

export function useVoice(currentLanguage = 'en') {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingText, setSpeakingText] = useState('');
  const [speechError, setSpeechError] = useState(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);

  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSpeechSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event) => {
        let currentInterim = '';
        let finalChunk = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalChunk += event.results[i][0].transcript;
          } else {
            currentInterim += event.results[i][0].transcript;
          }
        }

        if (finalChunk) {
          setTranscript(prev => (prev ? `${prev} ${finalChunk.trim()}` : finalChunk.trim()));
        }
        setInterimTranscript(currentInterim);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition event:', event.error);
        if (event.error !== 'no-speech') {
          setSpeechError(event.error);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimTranscript('');
      };

      recognitionRef.current = recognition;
    } catch (e) {
      console.warn('Speech recognition init error:', e);
      setIsSpeechSupported(false);
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (err) {}
      }
      if (synthRef.current) {
        try { synthRef.current.cancel(); } catch (err) {}
      }
    };
  }, []);

  // Start listening
  const startListening = useCallback((langCode = 'en-IN') => {
    if (!recognitionRef.current) {
      setSpeechError('Speech recognition is not supported in this browser. Please use the text input.');
      return;
    }
    try {
      if (synthRef.current) {
        synthRef.current.cancel();
        setIsSpeaking(false);
      }
      recognitionRef.current.lang = langCode;
      recognitionRef.current.start();
      setSpeechError(null);
    } catch (e) {
      console.warn('Failed to start recognition:', e);
    }
  }, []);

  // Stop listening
  const [availableVoices, setAvailableVoices] = useState([]);

  // Load and cache voices when available
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;

      const loadVoices = () => {
        const v = window.speechSynthesis.getVoices();
        if (v && v.length > 0) {
          setAvailableVoices(v);
        }
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn('Failed to stop recognition:', e);
      }
      setIsListening(false);
    }
  }, []);

  // Text to Speech
  const speak = useCallback((text, langCode = 'en-IN') => {
    if (!synthRef.current || !text) return;

    try {
      synthRef.current.cancel();

      const shortLang = langCode.slice(0, 2).toLowerCase();

      // Currency replacement appropriate for the language
      let currencyWord = 'Rupees ';
      if (shortLang === 'te') currencyWord = 'రూపాయలు ';
      else if (shortLang === 'hi' || shortLang === 'mr') currencyWord = 'रुपये ';
      else if (shortLang === 'ta') currencyWord = 'ரூபாய் ';
      else if (shortLang === 'kn') currencyWord = 'ರೂಪಾಯಿ ';
      else if (shortLang === 'bn') currencyWord = 'টাকা ';

      // Clean text for speaking (remove markdown links and raw symbols)
      const cleanText = text
        .replace(/₹/g, currencyWord)
        .replace(/https?:\/\/\S+/g, '')
        .replace(/[*_#`[\]]/g, ' ')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = langCode;
      utterance.rate = 0.92; // Slightly measured, clear pace for accessibility
      utterance.pitch = 1.0;

      // Find best regional voice from loaded voices
      const voices = availableVoices.length > 0 ? availableVoices : synthRef.current.getVoices();
      
      const matchedVoice = voices.find(v => {
        const vLang = v.lang.toLowerCase();
        const vName = v.name.toLowerCase();
        if (shortLang === 'te') {
          return vLang.includes('te') || vName.includes('telugu') || vName.includes('mohan');
        } else if (shortLang === 'hi') {
          return vLang.includes('hi') || vName.includes('hindi') || vName.includes('swara') || vName.includes('madhur');
        } else if (shortLang === 'ta') {
          return vLang.includes('ta') || vName.includes('tamil') || vName.includes('valluvar');
        } else if (shortLang === 'kn') {
          return vLang.includes('kn') || vName.includes('kannada');
        } else if (shortLang === 'bn') {
          return vLang.includes('bn') || vName.includes('bengali') || vName.includes('bangla');
        } else if (shortLang === 'mr') {
          return vLang.includes('mr') || vName.includes('marathi');
        } else {
          return vLang.includes('en-in') || vLang.includes('en');
        }
      });

      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setSpeakingText(text);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setSpeakingText('');
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis error:', e);
        setIsSpeaking(false);
        setSpeakingText('');
      };

      synthRef.current.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis failed:', e);
      setIsSpeaking(false);
    }
  }, [availableVoices]);

  // Stop reading aloud
  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
      setSpeakingText('');
    }
  }, []);

  const clearTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
  }, []);

  return {
    isListening,
    transcript,
    setTranscript,
    interimTranscript,
    isSpeaking,
    speakingText,
    speechError,
    isSpeechSupported,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    clearTranscript
  };
}
