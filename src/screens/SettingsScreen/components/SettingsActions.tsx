/**
 * SettingsActions component for SettingsScreen
 */

import React from 'react';
import { ViewStyle } from 'react-native';
import { Button } from 'react-native-elements';
import styled from 'styled-components/native';
import theme from '../../../styles/theme';
import { SettingsAction } from '../models';

interface SettingsActionsProps {
  actions: SettingsAction[];
}

export const SettingsActions: React.FC<SettingsActionsProps> = ({ actions }) => {
  const dangerAction = actions.find(action => action.id === 'danger');
  const otherActions = actions.filter(action => action.id !== 'danger');

  return (
    <>
      {/* Regular actions */}
      {otherActions.map((action) => (
        <Button
          key={action.id}
          title={action.title}
          onPress={action.onPress}
          loading={action.loading}
          containerStyle={action.containerStyle as ViewStyle}
          buttonStyle={action.buttonStyle}
        />
      ))}

      {/* Danger section */}
      {dangerAction && (
        <>
          <SectionTitle>Ações Perigosas</SectionTitle>
          <Button
            key={dangerAction.id}
            title={dangerAction.title}
            onPress={dangerAction.onPress}
            containerStyle={dangerAction.containerStyle as ViewStyle}
            buttonStyle={dangerAction.buttonStyle}
          />
        </>
      )}
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
