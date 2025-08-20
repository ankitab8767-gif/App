import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Switch, Text, useTheme } from 'react-native-paper';

interface ChatHeaderProps {
  onClearChat: () => void;
  isDetailedMode: boolean;
  onToggleMode: () => void;
  onOpenSettings: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  onClearChat, 
  isDetailedMode, 
  onToggleMode,
  onOpenSettings
}) => {
  const theme = useTheme();

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Content title="AI Chat Assistant" />
      
      <View style={styles.controls}>
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Quick</Text>
          <Switch
            value={isDetailedMode}
            onValueChange={onToggleMode}
            color={theme.colors.primary}
          />
          <Text style={styles.toggleLabel}>Detailed</Text>
        </View>
        
        <Appbar.Action 
          icon="cog" 
          onPress={onOpenSettings}
          color={theme.colors.primary}
        />
        
        <Appbar.Action 
          icon="delete" 
          onPress={onClearChat}
          color={theme.colors.error}
        />
      </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    elevation: 4,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  toggleLabel: {
    fontSize: 12,
    marginHorizontal: 4,
    color: '#666',
  },
});

export default ChatHeader;
