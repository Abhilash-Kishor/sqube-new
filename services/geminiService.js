
import { GoogleGenAI } from "@google/genai";

const LANG_NAMES = {
  en: "English", hi: "Hindi", mr: "Marathi", ta: "Tamil", te: "Telugu", bn: "Bengali"
};

const insightCache = new Map();
const pendingRequests = new Map();
const CACHE_DURATION = 1000 * 60 * 30; 
let lastRequestTime = 0;
const MIN_REQUEST_GAP = 5000; 

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Highly aggressive truncation to prevent MakerSuite Proxy 500 errors.
 */
const sanitizeData = (data) => {
  return data.replace(/\s+/g, ' ').substring(0, 800);
};

export const getAIInsight = async (
  moduleName, 
  dataSummary, 
  targetLanguage = 'en',
  retryCount = 0
) => {
  const sanitizedSummary = sanitizeData(dataSummary);
  const cacheKey = `${moduleName}-${targetLanguage}-${sanitizedSummary.substring(0, 50)}`;
  
  const cached = insightCache.get(cacheKey);
  if (cached && cached.expiry > Date.now()) {
    return cached.text;
  }

  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey);
  }

  const executeRequest = async () => {
    const now = Date.now();
    const timeSinceLast = now - lastRequestTime;
    
    if (timeSinceLast < MIN_REQUEST_GAP) {
      await sleep(MIN_REQUEST_GAP - timeSinceLast);
    }
    
    try {
      lastRequestTime = Date.now();
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyst: CBSE Advisor. Lang: ${LANG_NAMES[targetLanguage] || 'English'}. Context: ${sanitizedSummary}. Goal: Brief executive insight (max 50 words). No markdown.`,
        config: { 
          temperature: 0.3,
          topP: 0.8
        },
      });

      const result = response.text?.trim() || "National summary pending registry stabilization.";
      insightCache.set(cacheKey, { text: result, expiry: Date.now() + CACHE_DURATION });
      return result;
    } catch (error) {
      const errorMsg = error?.message || String(error);
      console.error(`Gemini Failure [${moduleName}]:`, errorMsg);
      
      // Handle Proxy 500 and rate limiting with exponential backoff
      if ((errorMsg.includes('500') || errorMsg.includes('429') || errorMsg.includes('503')) && retryCount < 2) {
        await sleep(4000 * (retryCount + 1));
        return getAIInsight(moduleName, dataSummary, targetLanguage, retryCount + 1);
      }

      return cached?.text || "Analytical engine optimizing. Metrics remain live in the registry below.";
    } finally {
      pendingRequests.delete(cacheKey);
    }
  };

  const requestPromise = executeRequest();
  pendingRequests.set(cacheKey, requestPromise);
  return requestPromise;
};

export const startNationalChat = async (contextData) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    // Aggressive context trimming for chat to avoid 500 errors
    const trimmedContext = JSON.stringify(contextData).substring(0, 800);
    return ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: `You are S³, the AI advisor for CBSE. Data: ${trimmedContext}`,
        thinkingConfig: { thinkingBudget: 8000 }
      }
    });
  } catch (error) {
    console.error("Chat Init Error:", error?.message);
    return null;
  }
};
