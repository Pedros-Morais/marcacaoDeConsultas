/**
 * StorageSection component for SettingsScreen
 */

import React from 'react';
import styled from 'styled-components/native';
import theme from '../../../styles/theme';
import { StorageInfo } from '../models';

interface StorageSectionProps {
  storageInfo: StorageInfo | null;
}

export const StorageSection: React.FC<StorageSectionProps> = ({ storageInfo }) => {
  return (
    <>
      <SectionTitle>Dados e Armazenamento</SectionTitle>
      <SettingsCard>
        {storageInfo && (
          <>
            <InfoItem>
              <InfoLabel>Itens no Cache:</InfoLabel>
              <InfoValue>{storageInfo.cacheSize}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Total de Chaves:</InfoLabel>
              <InfoValue>{storageInfo.totalKeys}</InfoValue>
            </InfoItem>
          </>
        )}
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

const InfoItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`;

const InfoLabel = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text};
`;

const InfoValue = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.colors.primary};
`;
