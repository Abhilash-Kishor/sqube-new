import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

const LANG_NAMES: Record<Language, string> = {
  en: "English", hi: "Hindi", mr: "Marathi", ta: "Tamil", te: "Telugu", bn: "Bengali"
};

const insightCache = new Map<string, { text: string; expiry: number }>();
const pendingRequests = new Map<string, Promise<string>>();
const CACHE_DURATION = 1000 * 60 * 30; 
let lastRequestTime = 0;
const MIN_REQUEST_GAP = 5000; 

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Highly aggressive truncation to prevent MakerSuite Proxy 500 errors.
 */
const sanitizeData = (data: string): string => {
  return data.replace(/\s+/g, ' ').substring(0, 800);
};

export const getAIInsight = async (
  moduleName: string, 
  dataSummary: string, 
  targetLanguage: Language = 'en',
  retryCount = 0
): Promise<string> => {
  const sanitizedSummary = sanitizeData(dataSummary);
  const cacheKey = `${moduleName}-${targetLanguage}-${sanitizedSummary.substring(0, 50)}`;
  
  const cached = insightCache.get(cacheKey);
  if (cached && cached.expiry > Date.now()) {
    return cached.text;
  }

  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey)!;
  }

  const executeRequest = async (): Promise<string> => {
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
        contents: `Analyst: CBSE Advisor. Lang: ${LANG_NAMES[targetLanguage]}. Context: ${sanitizedSummary}. Goal: Brief executive insight (max 50 words). No markdown.`,
        config: { 
          temperature: 0.3,
          topP: 0.8
        },
      });

      const result = response.text?.trim() || "Strategic summary pending registry stabilization.";
      insightCache.set(cacheKey, { text: result, expiry: Date.now() + CACHE_DURATION });
      return result;
    } catch (error: any) {
      const errorMsg = error?.message || String(error);
      console.error(`Gemini Failure [${moduleName}]:`, errorMsg);
      
      // Handle Proxy 500 and rate limiting with exponential backoff
      if ((errorMsg.includes('500') || errorMsg.includes('429') || errorMsg.includes('503')) && retryCount < 2) {
        await sleep(4000 * (retryCount + 1));
        return getAIInsight(moduleName, dataSummary, targetLanguage, retryCount + 1);
      }

      return cached?.text || "Strategic engine optimizing. Metrics remain live in the registry below.";
    } finally {
      pendingRequests.delete(cacheKey);
    }
  };

  const requestPromise = executeRequest();
  pendingRequests.set(cacheKey, requestPromise);
  return requestPromise;
};

export const startStrategicChat = async (contextData: any) => {
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
  } catch (error: any) {
    console.error("Chat Init Error:", error?.message);
    return null;
  }
};