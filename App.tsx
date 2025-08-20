import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import SettingsModal from './components/SettingsModal';
import { Message } from './types';
import { getProviderConfig, DEFAULT_PROVIDER } from './config/llmProviders';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#007AFF',
    background: '#F2F2F7',
    surface: '#FFFFFF',
  },
};

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailedMode, setIsDetailedMode] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(DEFAULT_PROVIDER);
  const [settingsVisible, setSettingsVisible] = useState(false);

  useEffect(() => {
    loadChatHistory();
    loadSettings();
  }, []);

  const loadChatHistory = async () => {
    try {
      const savedMessages = await AsyncStorage.getItem('chatHistory');
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        
        // Clean up any corrupted messages
        const cleanedMessages = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
        }));
        
        setMessages(cleanedMessages);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
      // Clear corrupted data
      await AsyncStorage.removeItem('chatHistory');
    }
  };

  const loadSettings = async () => {
    try {
      const savedProvider = await AsyncStorage.getItem('selectedProvider');
      if (savedProvider) {
        setSelectedProvider(savedProvider);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveChatHistory = async (newMessages: Message[]) => {
    try {
      await AsyncStorage.setItem('chatHistory', JSON.stringify(newMessages));
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    saveChatHistory(newMessages);

    setIsLoading(true);

    try {
      const response = await fetchLLMResponse(text, isDetailedMode);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      const updatedMessages = [...newMessages, botMessage];
      setMessages(updatedMessages);
      saveChatHistory(updatedMessages);
    } catch (error) {
      Alert.alert('Error', 'Failed to get response from AI. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLLMResponse = async (text: string, detailed: boolean): Promise<string> => {
    const providerConfig = getProviderConfig(selectedProvider);
    
    try {
      // Get API key for the selected provider
      const apiKey = await AsyncStorage.getItem(`apiKey_${selectedProvider}`);
      
      if (!apiKey && providerConfig.requiresAuth) {
        throw new Error(`API key required for ${providerConfig.name}`);
      }

      let response: Response;
      let data: any;

      if (selectedProvider === 'huggingface') {
        // Hugging Face specific implementation
        response = await fetch(providerConfig.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            inputs: text,
            parameters: {
              max_length: detailed ? 200 : 100,
              temperature: detailed ? 0.7 : 0.9,
              do_sample: true,
            },
          }),
        });

        data = await response.json();
        
        if (data && data[0] && data[0].generated_text) {
          return data[0].generated_text;
        }
      } else if (selectedProvider === 'groq') {
        // Groq specific implementation
        response = await fetch(providerConfig.apiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: providerConfig.model,
            messages: [{ role: 'user', content: text }],
            max_tokens: detailed ? 200 : 100,
            temperature: detailed ? 0.7 : 0.9,
          }),
        });

        data = await response.json();
        
        if (data && data.choices && data.choices[0] && data.choices[0].message) {
          return data.choices[0].message.content;
        }
      } else if (selectedProvider === 'together') {
        // Together.ai specific implementation
        response = await fetch(providerConfig.apiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: providerConfig.model,
            messages: [{ role: 'user', content: text }],
            max_tokens: detailed ? 200 : 100,
            temperature: detailed ? 0.7 : 0.9,
          }),
        });

        data = await response.json();
        
        if (data && data.choices && data.choices[0] && data.choices[0].message) {
          return data.choices[0].message.content;
        }
      } else if (selectedProvider === 'openrouter') {
        // OpenRouter specific implementation
        response = await fetch(providerConfig.apiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: providerConfig.model,
            messages: [{ role: 'user', content: text }],
            max_tokens: detailed ? 200 : 100,
            temperature: detailed ? 0.7 : 0.9,
          }),
        });

        data = await response.json();
        
        if (data && data.choices && data.choices[0] && data.choices[0].message) {
          return data.choices[0].message.content;
        }
      } else if (selectedProvider === 'gemini') {
        // Google Gemini specific implementation
        const url = `${providerConfig.apiUrl}?key=${apiKey}`;
        response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: text
              }]
            }],
            generationConfig: {
              maxOutputTokens: detailed ? 200 : 100,
              temperature: detailed ? 0.7 : 0.9,
            },
          }),
        });

        data = await response.json();
        
        if (data && data.candidates && data.candidates[0] && data.candidates[0].content) {
          return data.candidates[0].content.parts[0].text;
        }
      }

      // Fallback response if API doesn't return expected format
      return detailed 
        ? `I understand you're asking about "${text}". This is a detailed response explaining the topic in depth with comprehensive information and examples.`
        : `Thanks for your message about "${text}"! Here's a quick response.`;

    } catch (error) {
      console.error('LLM API Error:', error);
      
      if (error instanceof Error && error.message.includes('API key required')) {
        Alert.alert(
          'API Key Required', 
          `Please configure your ${providerConfig.name} API key in settings.`,
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Settings', onPress: () => setSettingsVisible(true) },
          ]
        );
      }
      
      // Fallback response for demo purposes
      return detailed 
        ? `I understand you're asking about "${text}". This is a detailed response explaining the topic in depth with comprehensive information and examples.`
        : `Thanks for your message about "${text}"! Here's a quick response.`;
    }
  };

  const clearChat = async () => {
    Alert.alert(
      'Clear Chat',
      'Are you sure you want to clear all messages?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            setMessages([]);
            await AsyncStorage.removeItem('chatHistory');
          },
        },
      ]
    );
  };

  const clearCorruptedData = async () => {
    try {
      await AsyncStorage.removeItem('chatHistory');
      setMessages([]);
      console.log('Corrupted chat data cleared');
    } catch (error) {
      console.error('Error clearing corrupted data:', error);
    }
  };

  const handleProviderChange = (provider: string) => {
    setSelectedProvider(provider);
  };

  return (
    <PaperProvider theme={theme}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ChatHeader 
          onClearChat={clearChat}
          isDetailedMode={isDetailedMode}
          onToggleMode={() => setIsDetailedMode(!isDetailedMode)}
          onOpenSettings={() => setSettingsVisible(true)}
        />
        
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatMessage message={item} />}
          style={styles.messagesList}
          inverted={false}
        />
        
        <ChatInput 
          onSendMessage={sendMessage}
          isLoading={isLoading}
        />

        <SettingsModal
          visible={settingsVisible}
          onDismiss={() => setSettingsVisible(false)}
          onProviderChange={handleProviderChange}
          currentProvider={selectedProvider}
        />
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
