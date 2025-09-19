/**
 * Services for SettingsScreen
 */

import { Alert, Share } from 'react-native';
import { storageService } from '../../../services/storage';
import { AppSettings, DEFAULT_SETTINGS } from '../models';

export class SettingsService {
  /**
   * Loads app settings from storage
   */
  static async loadSettings(): Promise<AppSettings> {
    try {
      const settings = await storageService.getAppSettings();
      return { ...DEFAULT_SETTINGS, ...settings };
    } catch (error) {
      console.error('Error loading settings:', error);
      return DEFAULT_SETTINGS;
    }
  }

  /**
   * Updates a specific setting
   */
  static async updateSetting(key: keyof AppSettings, value: any): Promise<void> {
    try {
      await storageService.updateAppSettings({ [key]: value });
    } catch (error) {
      console.error('Error updating setting:', error);
      throw new Error('Não foi possível salvar a configuração');
    }
  }

  /**
   * Gets storage information
   */
  static async getStorageInfo() {
    try {
      const info = await storageService.getStorageInfo();
      return info || { cacheSize: 0, totalKeys: 0 };
    } catch (error) {
      console.error('Error getting storage info:', error);
      return { cacheSize: 0, totalKeys: 0 };
    }
  }

  /**
   * Creates and shares backup
   */
  static async createBackup(): Promise<void> {
    try {
      const backup = await storageService.createBackup();
      const fileName = `backup_${new Date().toISOString().split('T')[0]}.json`;
      
      await Share.share({
        message: backup,
        title: `Backup do App - ${fileName}`,
      });
      
      Alert.alert('Sucesso', 'Backup criado e compartilhado com sucesso!');
    } catch (error) {
      console.error('Error creating backup:', error);
      throw new Error('Não foi possível criar o backup');
    }
  }

  /**
   * Clears app cache with confirmation
   */
  static async clearCache(): Promise<void> {
    return new Promise((resolve, reject) => {
      Alert.alert(
        'Limpar Cache',
        'Isso irá limpar o cache da aplicação. Tem certeza?',
        [
          { text: 'Cancelar', style: 'cancel', onPress: () => reject(new Error('Cancelled')) },
          {
            text: 'Limpar',
            style: 'destructive',
            onPress: async () => {
              try {
                storageService.clearCache();
                Alert.alert('Sucesso', 'Cache limpo com sucesso!');
                resolve();
              } catch (error) {
                Alert.alert('Erro', 'Não foi possível limpar o cache');
                reject(error);
              }
            },
          },
        ]
      );
    });
  }

  /**
   * Clears all app data with multiple confirmations
   */
  static async clearAllData(signOut: () => void): Promise<void> {
    return new Promise((resolve, reject) => {
      Alert.alert(
        'Apagar Todos os Dados',
        'ATENÇÃO: Isso irá apagar TODOS os dados da aplicação permanentemente. Esta ação não pode ser desfeita!',
        [
          { text: 'Cancelar', style: 'cancel', onPress: () => reject(new Error('Cancelled')) },
          {
            text: 'APAGAR TUDO',
            style: 'destructive',
            onPress: () => {
              Alert.alert(
                'Confirmação Final',
                'Tem certeza absoluta? Todos os dados serão perdidos!',
                [
                  { text: 'Cancelar', style: 'cancel', onPress: () => reject(new Error('Cancelled')) },
                  {
                    text: 'SIM, APAGAR',
                    style: 'destructive',
                    onPress: async () => {
                      try {
                        await storageService.clearAll();
                        Alert.alert('Concluído', 'Todos os dados foram apagados. O app será reiniciado.', [
                          { text: 'OK', onPress: () => signOut() }
                        ]);
                        resolve();
                      } catch (error) {
                        Alert.alert('Erro', 'Não foi possível apagar os dados');
                        reject(error);
                      }
                    },
                  },
                ]
              );
            },
          },
        ]
      );
    });
  }
}
