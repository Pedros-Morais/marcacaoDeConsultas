
// Importação de dependências, hooks e componentes visuais
import React from 'react';
import styled from 'styled-components/native';
import { Button, ListItem } from 'react-native-elements';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import theme from '../styles/theme';
import Header from '../components/Header';
import { ViewStyle } from 'react-native';


// Tipagem das props de navegação (não utilizada diretamente)
type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
};


// Tela de perfil do usuário, exibe dados pessoais e opções de ação
const ProfileScreen: React.FC = () => {
  // Obtém dados do usuário autenticado e função de logout
  const { user, signOut } = useAuth();
  // Hook de navegação para redirecionar entre telas
  const navigation = useNavigation<ProfileScreenProps['navigation']>();

  /**
   * Retorna texto amigável para o tipo de usuário
   */
  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'doctor':
        return 'Médico';
      case 'patient':
        return 'Paciente';
      default:
        return role;
    }
  };

  /**
   * Renderização principal da tela de perfil
   * Exibe dados do usuário, botões de ação e navegação
   */
  return (
    <Container>
      {/* Cabeçalho da tela */}
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Título */}
        <Title>Meu Perfil</Title>

        {/* Card com dados do usuário */}
        <ProfileCard>
          {/* Foto do usuário */}
          <Avatar source={{ uri: user?.image || 'https://via.placeholder.com/150' }} />
          {/* Nome do usuário */}
          <Name>{user?.name}</Name>
          {/* Email do usuário */}
          <Email>{user?.email}</Email>
          {/* Badge do tipo de usuário */}
          <RoleBadge role={user?.role || ''}>
            <RoleText>{getRoleText(user?.role || '')}</RoleText>
          </RoleBadge>
          {/* Exibe especialidade se for médico */}
          {user?.role === 'doctor' && (
            <SpecialtyText>Especialidade: {user?.specialty}</SpecialtyText>
          )}
        </ProfileCard>

        {/* Botão para editar perfil */}
        <Button
          title="Editar Perfil"
          onPress={() => navigation.navigate('EditProfile' as any)}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.editButton}
        />

        {/* Botão para voltar */}
        <Button
          title="Voltar"
          onPress={() => navigation.goBack()}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        {/* Botão para logout */}
        <Button
          title="Sair"
          onPress={signOut}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.logoutButton}
        />
      </ScrollView>
    </Container>
  );
};


// Estilos dos componentes visuais
const styles = {
  scrollContent: {
    padding: 20, // Espaçamento interno do ScrollView
  },
  button: {
    marginBottom: 20,
    width: '100%',
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary, // Cor principal
    paddingVertical: 12,
  },
  editButton: {
    backgroundColor: theme.colors.success, // Cor de sucesso
    paddingVertical: 12,
  },
  logoutButton: {
    backgroundColor: theme.colors.error, // Cor de erro
    paddingVertical: 12,
  },
};


// Container principal da tela de perfil
const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

// ScrollView para conteúdo da tela
const ScrollView = styled.ScrollView`
  flex: 1;
`;

// Título da tela
const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 20px;
  text-align: center;
`;

// Card visual com dados do usuário
const ProfileCard = styled.View`
  background-color: ${theme.colors.background};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  align-items: center;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;

// Foto do usuário
const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-bottom: 16px;
`;

// Nome do usuário
const Name = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 8px;
`;

// Email do usuário
const Email = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text};
  margin-bottom: 8px;
`;

// Badge visual do tipo de usuário
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

// Texto do tipo de usuário
const RoleText = styled.Text`
  color: ${theme.colors.text};
  font-size: 14px;
  font-weight: 500;
`;

// Texto da especialidade do médico
const SpecialtyText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text};
  margin-top: 8px;
`;

// Exporta o componente principal da tela de perfil
export default ProfileScreen;
