/**
 * Hooks for SettingsScreen
 */

import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../../contexts/AuthContext';
import { RootStackParamList } from '../../../types/navigation';
import { AppSettings, StorageInfo, SettingsAction } from '../models';
import { SettingsService } from '../services';
import theme from '../../../styles/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

export const useSettings = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation<NavigationProp>();
  
  const [settings, setSettings] = useState<AppSettings>({
    notifications: true,
    autoBackup: true,
    theme: 'light',
    language: 'pt-BR',
  });
  
  const [loading, setLoading] = useState(true);
  const [storageInfo, setStorageInfo] = useState<StorageInfo | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const loadSettings = async () => {
    try {
      // Skip async calls for now and use default values
      setSettings({
        notifications: true,
        autoBackup: true,
        theme: 'light',
        language: 'pt-BR',
      });
      setStorageInfo({ cacheSize: 0, totalKeys: 0 });
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: keyof AppSettings, value: any) => {
    try {
      const updatedSettings = { ...settings, [key]: value };
      setSettings(updatedSettings);
      await SettingsService.updateSetting(key, value);
    } catch (error) {
      console.error('Error updating setting:', error);
      // Revert the change if it failed
      setSettings(settings);
    }
  };

  const handleCreateBackup = async () => {
    try {
      setActionLoading('backup');
      await SettingsService.createBackup();
    } catch (error) {
      console.error('Error creating backup:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleClearCache = async () => {
    try {
      await SettingsService.clearCache();
      await loadSettings(); // Reload to update storage info
    } catch (error) {
      // Error handling is done in the service
    }
  };

  const handleClearAllData = async () => {
    try {
      await SettingsService.clearAllData(signOut);
    } catch (error) {
      // Error handling is done in the service
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const settingsActions: SettingsAction[] = [
    {
      id: 'backup',
      title: 'Criar Backup',
      onPress: handleCreateBackup,
      loading: actionLoading === 'backup',
      buttonStyle: {
        backgroundColor: theme.colors.success,
        paddingVertical: 12,
      },
      containerStyle: {
        marginBottom: 15,
        width: '100%',
      },
    },
    {
      id: 'cache',
      title: 'Limpar Cache',
      onPress: handleClearCache,
      buttonStyle: {
        backgroundColor: theme.colors.warning,
        paddingVertical: 12,
      },
      containerStyle: {
        marginBottom: 15,
        width: '100%',
      },
    },
    {
      id: 'danger',
      title: 'Apagar Todos os Dados',
      onPress: handleClearAllData,
      buttonStyle: {
        backgroundColor: theme.colors.error,
        paddingVertical: 12,
      },
      containerStyle: {
        marginBottom: 15,
        width: '100%',
      },
    },
    {
      id: 'back',
      title: 'Voltar',
      onPress: handleGoBack,
      buttonStyle: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 12,
      },
      containerStyle: {
        marginBottom: 15,
        width: '100%',
      },
    },
  ];

  useFocusEffect(
    useCallback(() => {
      loadSettings();
    }, [])
  );

  return {
    settings,
    loading,
    storageInfo,
    settingsActions,
    updateSetting,
  };
};
