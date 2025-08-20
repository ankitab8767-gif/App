export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface LLMProvider {
  name: string;
  apiUrl: string;
  model: string;
  requiresAuth: boolean;
  authHeader: string;
  authPrefix: string;
}

export interface ChatSettings {
  isDetailedMode: boolean;
  maxTokens: number;
  temperature: number;
  selectedProvider: string;
}
