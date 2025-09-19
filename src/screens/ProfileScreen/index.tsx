/**
 * ProfileScreen - Refactored with modular pattern
 * Displays user profile information and actions
 */

import React from 'react';
import Header from '../../components/Header';
import { Container, ScrollContainer, Title, styles } from './styles';
import { UserProfileCard, ProfileActions } from './components';
import { useProfile } from './hooks';

const ProfileScreen: React.FC = () => {
  const { user, profileActions } = useProfile();

  return (
    <Container>
      <Header />
      <ScrollContainer contentContainerStyle={styles.scrollContent}>
        <Title>Meu Perfil</Title>
        
        <UserProfileCard user={user} />
        
        <ProfileActions actions={profileActions} />
      </ScrollContainer>
    </Container>
  );
};

export default ProfileScreen;
