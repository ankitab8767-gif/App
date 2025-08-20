// Demo Configuration for Testing
// This file contains sample configurations for testing the app without real API keys

export const DEMO_CONFIG = {
  // Demo mode settings
  enableDemoMode: true,
  demoResponses: {
    quick: [
      "Hello! How can I help you today?",
      "That's an interesting question!",
      "I'd be happy to assist with that.",
      "Great question! Let me think about it.",
      "Thanks for asking! Here's what I know.",
    ],
    detailed: [
      "That's a fascinating question! Let me provide you with a comprehensive explanation. This topic involves several key concepts that are important to understand. Here's a detailed breakdown of the main points and how they relate to each other.",
      "Excellent question! This is a complex topic that deserves a thorough explanation. There are multiple aspects to consider, including historical context, current applications, and future implications. Let me walk you through each of these areas step by step.",
      "Great question! This topic has many layers and nuances that are worth exploring in detail. From the fundamental principles to the advanced applications, there's a lot to cover. Let me break this down systematically for you.",
    ],
  },
  
  // Sample API configurations (for reference only)
  sampleProviders: {
    huggingface: {
      name: "Hugging Face",
      apiUrl: "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
      model: "microsoft/DialoGPT-medium",
      tokenUrl: "https://huggingface.co/settings/tokens",
    },
    groq: {
      name: "Groq",
      apiUrl: "https://api.groq.com/openai/v1/chat/completions",
      model: "llama3-8b-8192",
      tokenUrl: "https://console.groq.com/keys",
    },
    together: {
      name: "Together.ai",
      apiUrl: "https://api.together.xyz/v1/chat/completions",
      model: "togethercomputer/llama-2-70b-chat",
      tokenUrl: "https://api.together.xyz/settings/api-keys",
    },
  },
  
  // Getting started instructions
  setupInstructions: [
    "1. Choose your preferred LLM provider from the settings",
    "2. Get an API key from the provider's website",
    "3. Enter the API key in the app settings",
    "4. Start chatting! The app will use your configured provider",
    "5. Toggle between Quick and Detailed modes for different response lengths",
  ],
  
  // Troubleshooting tips
  troubleshooting: [
    "If you get API key errors, check your key in settings",
    "For rate limiting issues, try a different provider",
    "If responses are slow, the model might be loading",
    "Check your internet connection if API calls fail",
  ],
};

export const getDemoResponse = (isDetailed: boolean): string => {
  const responses = isDetailed ? DEMO_CONFIG.demoResponses.detailed : DEMO_CONFIG.demoResponses.quick;
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};
