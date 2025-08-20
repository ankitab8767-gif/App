import { LLMProvider } from '../types';

export const LLM_PROVIDERS: Record<string, LLMProvider> = {
  huggingface: {
    name: 'Hugging Face',
    apiUrl: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
    model: 'microsoft/DialoGPT-medium',
    requiresAuth: true,
    authHeader: 'Authorization',
    authPrefix: 'Bearer',
  },
  groq: {
    name: 'Groq',
    apiUrl: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama3-8b-8192',
    requiresAuth: true,
    authHeader: 'Authorization',
    authPrefix: 'Bearer',
  },
  together: {
    name: 'Together.ai',
    apiUrl: 'https://api.together.xyz/v1/chat/completions',
    model: 'togethercomputer/llama-2-70b-chat',
    requiresAuth: true,
    authHeader: 'Authorization',
    authPrefix: 'Bearer',
  },
  openrouter: {
    name: 'OpenRouter',
    apiUrl: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'anthropic/claude-3.5-sonnet',
    requiresAuth: true,
    authHeader: 'Authorization',
    authPrefix: 'Bearer',
  },
  gemini: {
    name: 'Gemini',
    apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    model: 'gemini-pro',
    requiresAuth: true,
    authHeader: 'x-goog-api-key',
    authPrefix: '',
  },
};

export const DEFAULT_PROVIDER = 'huggingface';

export const getProviderConfig = (providerName: string): LLMProvider => {
  return LLM_PROVIDERS[providerName] || LLM_PROVIDERS[DEFAULT_PROVIDER];
};

export const getProviderNames = (): string[] => {
  return Object.keys(LLM_PROVIDERS);
};
