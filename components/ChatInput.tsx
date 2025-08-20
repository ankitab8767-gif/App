import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, IconButton, useTheme } from 'react-native-paper';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const theme = useTheme();

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.nativeEvent.key === 'Enter' && !e.nativeEvent.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
          multiline
          maxLength={1000}
          style={styles.textInput}
          contentStyle={styles.textInputContent}
          disabled={isLoading}
          right={
            <TextInput.Icon
              icon="send"
              onPress={handleSend}
              disabled={!message.trim() || isLoading}
              color={message.trim() && !isLoading ? theme.colors.primary : '#ccc'}
            />
          }
        />
      </View>
      
      {isLoading && (
        <View style={styles.loadingIndicator}>
          <IconButton
            icon="loading"
            size={20}
            iconColor={theme.colors.primary}
            style={styles.loadingIcon}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    maxHeight: 100,
  },
  textInputContent: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  loadingIndicator: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  loadingIcon: {
    margin: 0,
  },
});

export default ChatInput;
