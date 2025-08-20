# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the App
```bash
npm start
```

### 3. Choose Your Platform
- **Web**: Press `w` in terminal or run `npm run web`
- **Android**: Press `a` in terminal or run `npm run android`
- **iOS**: Press `i` in terminal or run `npm run ios`

## 🔑 Configure LLM Provider

### Option 1: Hugging Face (Recommended for beginners)
1. Go to [Hugging Face Tokens](https://huggingface.co/settings/tokens)
2. Create a new token
3. In the app, tap the settings icon (⚙️)
4. Select "Hugging Face" and enter your token

### Option 2: Other Providers
- **Groq**: [Get API Key](https://console.groq.com/keys)
- **Together.ai**: [Get API Key](https://api.together.xyz/settings/api-keys)
- **OpenRouter**: [Get API Key](https://openrouter.ai/keys)
- **Google Gemini**: [Get API Key](https://makersuite.google.com/app/apikey)

## 💬 Start Chatting

1. **Quick Mode**: Get short, concise responses
2. **Detailed Mode**: Get comprehensive, in-depth responses
3. **Toggle**: Use the switch in the header to change modes
4. **Clear Chat**: Use the trash icon to clear conversation history

## 🎯 Features

- ✅ **Real-time Chat**: Modern chat interface
- ✅ **LLM Integration**: Multiple AI providers supported
- ✅ **Local Storage**: Chat history saved locally
- ✅ **Mode Toggle**: Quick vs Detailed responses
- ✅ **Settings**: Easy provider configuration
- ✅ **Cross-platform**: Works on web, iOS, and Android

## 🆘 Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Review the [config/llmProviders.ts](config/llmProviders.ts) for provider settings
- Look at [config/demoConfig.ts](config/demoConfig.ts) for sample configurations

## 🔧 Troubleshooting

- **API Key Errors**: Check your key in settings
- **Build Issues**: Clear cache with `npm cache clean --force`
- **Performance**: Limit chat history for very long conversations

---

**Happy Chatting! 🤖💬**
