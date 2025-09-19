/**
 * UserProfileCard component for ProfileScreen
 */

import React from 'react';
import styled from 'styled-components/native';
import theme from '../../../styles/theme';
import { UserProfile } from '../models';
import { ProfileService } from '../services';

interface UserProfileCardProps {
  user: UserProfile | null;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <ProfileCard>
      {/* User Avatar */}
      <Avatar source={{ uri: ProfileService.getAvatarUrl(user) }} />
      
      {/* User Name */}
      <Name>{user.name}</Name>
      
      {/* User Email */}
      <Email>{user.email}</Email>
      
      {/* Role Badge */}
      <RoleBadge role={user.role}>
        <RoleText>{ProfileService.getRoleText(user.role)}</RoleText>
      </RoleBadge>
      
      {/* Specialty for doctors */}
      {ProfileService.shouldShowSpecialty(user) && (
        <SpecialtyText>Especialidade: {user.specialty}</SpecialtyText>
      )}
    </ProfileCard>
  );
};

const ProfileCard = styled.View`
  background-color: ${theme.colors.background};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  align-items: center;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;

const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-bottom: 16px;
`;

const Name = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 8px;
`;

const Email = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text};
  margin-bottom: 8px;
`;

const RoleBadge = styled.View<{ role: string }>`
  background-color: ${(props: { role: string }) => {
    switch (props.role) {
      case 'admin':
        return theme.colors.primary + '20';
      case 'doctor':
        return theme.colors.success + '20';
      default:
        return theme.colors.secondary + '20';
    }
  }};
  padding: 4px 12px;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const RoleText = styled.Text`
  color: ${theme.colors.text};
  font-size: 14px;
  font-weight: 500;
`;

const SpecialtyText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text};
  margin-top: 8px;
`;
