/**
 * ProfileActions component for ProfileScreen
 */

import React from 'react';
import { ViewStyle } from 'react-native';
import { Button } from 'react-native-elements';
import { ProfileAction } from '../models';

interface ProfileActionsProps {
  actions: ProfileAction[];
}

export const ProfileActions: React.FC<ProfileActionsProps> = ({ actions }) => {
  return (
    <>
      {actions.map((action) => (
        <Button
          key={action.id}
          title={action.title}
          onPress={action.onPress}
          containerStyle={action.containerStyle as ViewStyle}
          buttonStyle={action.buttonStyle}
        />
      ))}
    </>
  );
};
