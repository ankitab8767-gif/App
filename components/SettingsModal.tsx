import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Button, Text, TextInput, SegmentedButtons, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProviderConfig, getProviderNames, DEFAULT_PROVIDER } from '../config/llmProviders';

interface SettingsModalProps {
  visible: boolean;
  onDismiss: () => void;
  onProviderChange: (provider: string) => void;
  currentProvider: string;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  visible,
  onDismiss,
  onProviderChange,
  currentProvider,
}) => {
  const [selectedProvider, setSelectedProvider] = useState(currentProvider);
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();

  const providers = getProviderNames();

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Save API key for the selected provider
      if (apiKey.trim()) {
        await AsyncStorage.setItem(`apiKey_${selectedProvider}`, apiKey.trim());
      }
      
      // Save selected provider
      await AsyncStorage.setItem('selectedProvider', selectedProvider);
      
      onProviderChange(selectedProvider);
      onDismiss();
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadApiKey = async (provider: string) => {
    try {
      const key = await AsyncStorage.getItem(`apiKey_${provider}`);
      if (key) {
        setApiKey(key);
      } else {
        setApiKey('');
      }
    } catch (error) {
      console.error('Error loading API key:', error);
    }
  };

  const handleProviderChange = (provider: string) => {
    setSelectedProvider(provider);
    loadApiKey(provider);
  };

  React.useEffect(() => {
    if (visible) {
      loadApiKey(selectedProvider);
    }
  }, [visible, selectedProvider]);

  const providerConfig = getProviderConfig(selectedProvider);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <ScrollView style={styles.scrollView}>
          <Text variant="headlineSmall" style={styles.title}>
            LLM Settings
          </Text>
          
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Select Provider
            </Text>
            <SegmentedButtons
              value={selectedProvider}
              onValueChange={handleProviderChange}
              buttons={providers.map(provider => ({
                value: provider,
                label: getProviderConfig(provider).name,
              }))}
              style={styles.segmentedButtons}
            />
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Provider Info
            </Text>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                <Text style={styles.label}>Name:</Text> {providerConfig.name}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.label}>Model:</Text> {providerConfig.model}
              </Text>
              <Text style={styles.infoText}>
                <Text style={styles.label}>API URL:</Text> {providerConfig.apiUrl}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              API Key
            </Text>
            <TextInput
              mode="outlined"
              label={`${providerConfig.name} API Key`}
              value={apiKey}
              onChangeText={setApiKey}
              secureTextEntry
              placeholder="Enter your API key"
              style={styles.input}
            />
            <Text style={styles.helpText}>
              Get your API key from {providerConfig.name} website
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              mode="outlined"
              onPress={onDismiss}
              style={[styles.button, styles.cancelButton]}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleSave}
              loading={isLoading}
              disabled={!selectedProvider}
              style={[styles.button, styles.saveButton]}
            >
              Save
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 8,
    maxHeight: '80%',
  },
  scrollView: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    color: '#555',
    fontWeight: '600',
  },
  segmentedButtons: {
    marginBottom: 8,
  },
  infoContainer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
  },
  infoText: {
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  label: {
    fontWeight: '600',
    color: '#333',
  },
  input: {
    marginBottom: 8,
  },
  helpText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  cancelButton: {
    borderColor: '#ccc',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
});

export default SettingsModal;
