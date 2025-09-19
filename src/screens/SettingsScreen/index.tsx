/**
 * SettingsScreen - Refactored with modular pattern
 * Allows users to configure app preferences, manage data and storage
 */

import React from 'react';
import Header from '../../components/Header';
import { Container, ScrollContainer, Title, LoadingContainer, LoadingText, styles } from './styles';
import { PreferencesSection, StorageSection, SettingsActions } from './components';
import { useSettings } from './hooks';

const SettingsScreen: React.FC = () => {
  const {
    settings,
    loading,
    storageInfo,
    settingsActions,
    updateSetting,
  } = useSettings();

  if (loading) {
    return (
      <Container>
        <Header />
        <LoadingContainer>
          <LoadingText>Carregando configurações...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <ScrollContainer contentContainerStyle={styles.scrollContent}>
        <Title>Configurações</Title>
        
        <PreferencesSection 
          settings={settings} 
          onUpdateSetting={updateSetting} 
        />
        
        <StorageSection storageInfo={storageInfo} />
        
        <SettingsActions actions={settingsActions} />
      </ScrollContainer>
    </Container>
  );
};

export default SettingsScreen;
