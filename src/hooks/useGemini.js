import { useState } from 'react';
import { YUKTI_SYSTEM_PROMPT } from '../constants/prompts';

/**
 * Hook for interacting with the Gemini API.
 * Uses import.meta.env.VITE_GEMINI_API_KEY — never hardcoded.
 */
export const useGemini = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const sendMessage = async (userMessage, language = 'en', conversationHistory = []) => {
    if (!apiKey) {
      return {
        text: "Gemini API key is not configured. Please set VITE_GEMINI_API_KEY in your .env file.",
        error: true,
      };
    }

    setIsLoading(true);
    setError(null);

    try {
      const systemInstruction = language === 'hi'
        ? YUKTI_SYSTEM_PROMPT + '\n\nRespond in Hindi (Devanagari script).'
        : YUKTI_SYSTEM_PROMPT;

      // Gemini requires conversation to start with 'user'. Remove initial bot greeting.
      let formattedHistory = conversationHistory.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.text }],
      }));

      if (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
        formattedHistory.shift();
      }

      const contents = [
        ...formattedHistory,
        { role: 'user', parts: [{ text: userMessage }] },
      ];

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemInstruction }] },
            contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text
        || "I'm sorry, I couldn't generate a response. Please try again.";

      setIsLoading(false);
      return { text, error: false };
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      return {
        text: `I'm currently unable to connect to my AI backend. Error: ${err.message}`,
        error: true,
      };
    }
  };

  const generateComplaint = async (prompt) => {
    if (!apiKey) {
      return { text: 'API key not configured.', error: true };
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.3, maxOutputTokens: 2048 },
          }),
        }
      );

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      setIsLoading(false);
      return { text, error: false };
    } catch (err) {
      setIsLoading(false);
      return { text: err.message, error: true };
    }
  };

  return { sendMessage, generateComplaint, isLoading, error };
};
