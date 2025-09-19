/**
 * Models for SettingsScreen
 */

export interface AppSettings {
  notifications: boolean;
  autoBackup: boolean;
  theme: 'light' | 'dark';
  language: string;
}

export interface StorageInfo {
  cacheSize: number;
  totalKeys: number;
}

export interface SettingsSection {
  id: string;
  title: string;
  items: SettingsItem[];
}

export interface SettingsItem {
  id: string;
  title: string;
  subtitle?: string;
  type: 'switch' | 'info' | 'button';
  value?: any;
  onPress?: () => void;
  onValueChange?: (value: any) => void;
}

export interface SettingsAction {
  id: string;
  title: string;
  onPress: () => void;
  buttonStyle: any;
  containerStyle: any;
  loading?: boolean;
}

export const DEFAULT_SETTINGS: AppSettings = {
  notifications: true,
  autoBackup: true,
  theme: 'light',
  language: 'pt-BR',
};
