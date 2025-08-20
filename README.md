# AI Chat App with LLM Integration

A React Native chat application that integrates with Large Language Model (LLM) providers for intelligent conversations.

## Features

- 💬 **Real-time Chat Interface**: Modern chat UI with message bubbles
- 🤖 **LLM Integration**: Connect with various AI providers (Hugging Face, Groq, Together.ai, etc.)
- 💾 **Local Storage**: Persistent chat history using AsyncStorage
- 🔄 **Toggle Modes**: Switch between quick and detailed response modes
- 📱 **Cross-platform**: Works on iOS, Android, and Web
- 🎨 **Modern UI**: Built with React Native Paper components

## Tech Stack

- **Framework**: React Native + Expo
- **UI Components**: React Native Paper
- **Storage**: AsyncStorage for local data persistence
- **API Integration**: Fetch API for LLM communication
- **Language**: TypeScript

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ChatApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Expo CLI globally** (if not already installed)
   ```bash
   npm install -g @expo/cli
   ```

## Configuration

### LLM API Setup

The app is configured to use Hugging Face Inference API by default. To use it:

1. **Get a Hugging Face Token**:
   - Go to [Hugging Face](https://huggingface.co/settings/tokens)
   - Create a new token
   - Copy the token

2. **Update the API Configuration**:
   - Open `App.tsx`
   - Replace `YOUR_HUGGING_FACE_TOKEN` with your actual token
   - Optionally change the model URL to use different models

### Alternative LLM Providers

You can easily switch to other LLM providers by modifying the `fetchLLMResponse` function in `App.tsx`:

#### Groq
```typescript
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const headers = {
  'Authorization': 'Bearer YOUR_GROQ_API_KEY',
  'Content-Type': 'application/json',
};
```

#### Together.ai
```typescript
const API_URL = 'https://api.together.xyz/v1/chat/completions';
const headers = {
  'Authorization': 'Bearer YOUR_TOGETHER_API_KEY',
  'Content-Type': 'application/json',
};
```

#### OpenRouter
```typescript
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const headers = {
  'Authorization': 'Bearer YOUR_OPENROUTER_API_KEY',
  'Content-Type': 'application/json',
};
```

## Running the App

### Development Mode

1. **Start the development server**
   ```bash
   npm start
   ```

2. **Run on different platforms**:
   - **Web**: Press `w` in the terminal or run `npm run web`
   - **Android**: Press `a` in the terminal or run `npm run android`
   - **iOS**: Press `i` in the terminal or run `npm run ios` (macOS only)

### Building for Production

1. **Build for Android**
   ```bash
   expo build:android
   ```

2. **Build for iOS**
   ```bash
   expo build:ios
   ```

## Project Structure

```
ChatApp/
├── components/
│   ├── ChatHeader.tsx      # Header with mode toggle and clear chat
│   ├── ChatMessage.tsx     # Individual message component
│   └── ChatInput.tsx       # Message input component
├── types.ts                # TypeScript interfaces
├── App.tsx                 # Main application component
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Key Components

### ChatHeader
- App title and controls
- Toggle between Quick/Detailed modes
- Clear chat functionality

### ChatMessage
- Displays individual messages
- Different styling for user and bot messages
- Timestamp display

### ChatInput
- Text input for user messages
- Send button with loading state
- Multiline support

## Features Explained

### Quick vs Detailed Mode
- **Quick Mode**: Shorter, concise responses (max 100 tokens)
- **Detailed Mode**: Longer, comprehensive responses (max 200 tokens)
- Toggle affects both API parameters and fallback responses

### Local Storage
- Chat history is automatically saved to AsyncStorage
- Messages persist between app sessions
- Clear chat option removes all stored messages

### Error Handling
- Graceful fallback responses if API fails
- User-friendly error messages
- Loading states during API calls

## Customization

### Styling
- Modify the theme object in `App.tsx`
- Update component styles in individual component files
- Customize colors, fonts, and layouts

### LLM Models
- Change the model URL in the API configuration
- Adjust temperature and max_length parameters
- Implement different response parsing logic

### UI Components
- Replace React Native Paper components with custom ones
- Add animations and transitions
- Implement additional chat features (typing indicators, read receipts)

## Troubleshooting

### Common Issues

1. **API Key Errors**
   - Ensure your API key is correctly set
   - Check API provider documentation for correct endpoints

2. **Build Errors**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

3. **Performance Issues**
   - Limit chat history size for large conversations
   - Implement message pagination for very long chats

### Debug Mode

Enable debug logging by adding console.log statements in the `fetchLLMResponse` function to troubleshoot API issues.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions:
- Check the troubleshooting section
- Review API provider documentation
- Open an issue in the repository

---

**Note**: This app is designed for educational and assessment purposes. Ensure compliance with your chosen LLM provider's terms of service and usage policies.
