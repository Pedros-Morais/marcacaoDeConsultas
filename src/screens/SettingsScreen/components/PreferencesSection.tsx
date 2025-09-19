/**
 * PreferencesSection component for SettingsScreen
 */

import React from 'react';
import { Switch } from 'react-native-elements';
import { ListItem } from 'react-native-elements';
import styled from 'styled-components/native';
import theme from '../../../styles/theme';
import { AppSettings } from '../models';

interface PreferencesSectionProps {
  settings: AppSettings;
  onUpdateSetting: (key: keyof AppSettings, value: any) => void;
}

export const PreferencesSection: React.FC<PreferencesSectionProps> = ({
  settings,
  onUpdateSetting,
}) => {
  return (
    <>
      <SectionTitle>Preferências</SectionTitle>
      <SettingsCard>
        {/* Switch de notificações */}
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>Notificações</ListItem.Title>
            <ListItem.Subtitle>Receber notificações push</ListItem.Subtitle>
          </ListItem.Content>
          <Switch
            value={settings.notifications}
            onValueChange={(value) => onUpdateSetting('notifications', value)}
            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
          />
        </ListItem>

        {/* Switch de backup automático */}
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>Backup Automático</ListItem.Title>
            <ListItem.Subtitle>Criar backups automaticamente</ListItem.Subtitle>
          </ListItem.Content>
          <Switch
            value={settings.autoBackup}
            onValueChange={(value) => onUpdateSetting('autoBackup', value)}
            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
          />
        </ListItem>
      </SettingsCard>
    </>
  );
};

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 10px;
  margin-top: 20px;
`;

const SettingsCard = styled.View`
  background-color: ${theme.colors.white};
  border-radius: 8px;
  margin-bottom: 15px;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;
