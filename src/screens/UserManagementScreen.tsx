
// Importação de dependências, hooks e componentes visuais
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, ViewStyle, TextStyle } from 'react-native';
import { Button, ListItem, Text } from 'react-native-elements';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import theme from '../styles/theme';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Tipagem das props de navegação (não utilizada diretamente)
type UserManagementScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UserManagement'>;
};


// Tipagem dos dados de usuário
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
}


// Tipagem para estilização condicional
interface StyledProps {
  role: string;
}


// Tela de gerenciamento de usuários, permite listar, editar e excluir usuários
const UserManagementScreen: React.FC = () => {
  // Obtém dados do usuário autenticado
  const { user } = useAuth();
  // Hook de navegação para redirecionar entre telas
  const navigation = useNavigation<UserManagementScreenProps['navigation']>();
  // Estado para armazenar lista de usuários
  const [users, setUsers] = useState<User[]>([]);
  // Estado para controlar carregamento da tela
  const [loading, setLoading] = useState(true);

  /**
   * Carrega lista de usuários do AsyncStorage
   * Filtra o usuário atual da lista
   */
  const loadUsers = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('@MedicalApp:users');
      if (storedUsers) {
        const allUsers: User[] = JSON.parse(storedUsers);
        // Remove o usuário logado da lista
        const filteredUsers = allUsers.filter(u => u.id !== user?.id);
        setUsers(filteredUsers);
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Exclui usuário pelo id e atualiza lista
   */
  const handleDeleteUser = async (userId: string) => {
    try {
      const storedUsers = await AsyncStorage.getItem('@MedicalApp:users');
      if (storedUsers) {
        const allUsers: User[] = JSON.parse(storedUsers);
        const updatedUsers = allUsers.filter(u => u.id !== userId);
        await AsyncStorage.setItem('@MedicalApp:users', JSON.stringify(updatedUsers));
        loadUsers(); // Recarrega a lista
      }
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  /**
   * Carrega os usuários toda vez que a tela recebe foco
   * Garante que os dados estejam sempre atualizados ao voltar para a tela
   */
  useFocusEffect(
    React.useCallback(() => {
      loadUsers();
    }, [])
  );

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
   * Renderização principal da tela de gerenciamento de usuários
   * Exibe botões de ação, lista de usuários e status
   */
  return (
    <Container>
      {/* Cabeçalho da tela */}
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Título */}
        <Title>Gerenciar Usuários</Title>

        {/* Botão para adicionar novo usuário */}
        <Button
          title="Adicionar Novo Usuário"
          onPress={() => {}}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        {/* Renderiza lista de usuários ou mensagens de status */}
        {loading ? (
          // Exibe mensagem de carregamento
          <LoadingText>Carregando usuários...</LoadingText>
        ) : users.length === 0 ? (
          // Exibe mensagem caso não haja usuários
          <EmptyText>Nenhum usuário cadastrado</EmptyText>
        ) : (
          // Renderiza cada usuário usando o componente UserCard
          users.map((user) => (
            <UserCard key={user.id}>
              <ListItem.Content>
                <ListItem.Title style={styles.userName as TextStyle}>
                  {user.name}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.userEmail as TextStyle}>
                  {user.email}
                </ListItem.Subtitle>
                {/* Badge do tipo de usuário */}
                <RoleBadge role={user.role}>
                  <RoleText role={user.role}>
                    {getRoleText(user.role)}
                  </RoleText>
                </RoleBadge>
                {/* Botões de ação para editar/excluir */}
                <ButtonContainer>
                  <Button
                    title="Editar"
                    onPress={() => {}}
                    containerStyle={styles.actionButton as ViewStyle}
                    buttonStyle={styles.editButton}
                  />
                  <Button
                    title="Excluir"
                    onPress={() => handleDeleteUser(user.id)}
                    containerStyle={styles.actionButton as ViewStyle}
                    buttonStyle={styles.deleteButton}
                  />
                </ButtonContainer>
              </ListItem.Content>
            </UserCard>
          ))
        )}

        {/* Botão para voltar */}
        <Button
          title="Voltar"
          onPress={() => navigation.goBack()}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.backButton}
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
  backButton: {
    backgroundColor: theme.colors.secondary, // Cor de retorno
    paddingVertical: 12,
  },
  actionButton: {
    marginTop: 8,
    width: '48%',
  },
  editButton: {
    backgroundColor: theme.colors.primary, // Cor de edição
    paddingVertical: 8,
  },
  deleteButton: {
    backgroundColor: theme.colors.error, // Cor de exclusão
    paddingVertical: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  },
  userEmail: {
    fontSize: 14,
    color: theme.colors.text,
    marginTop: 4,
  },
};


// Container principal da tela de gerenciamento de usuários
const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

// Título da tela
const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 20px;
  text-align: center;
`;

// Card visual de cada usuário
const UserCard = styled(ListItem)`
  background-color: ${theme.colors.background};
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 15px;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;

// Texto de carregamento
const LoadingText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: 20px;
`;

// Texto exibido quando não há usuários
const EmptyText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: 20px;
`;

// Badge visual do tipo de usuário
const RoleBadge = styled.View<StyledProps>`
  background-color: ${(props: StyledProps) => {
    switch (props.role) {
      case 'admin':
        return theme.colors.primary + '20';
      case 'doctor':
        return theme.colors.success + '20';
      default:
        return theme.colors.secondary + '20';
    }
  }};
  padding: 4px 8px;
  border-radius: 4px;
  align-self: flex-start;
  margin-top: 8px;
`;

// Texto do tipo de usuário
const RoleText = styled.Text<StyledProps>`
  color: ${(props: StyledProps) => {
    switch (props.role) {
      case 'admin':
        return theme.colors.primary;
      case 'doctor':
        return theme.colors.success;
      default:
        return theme.colors.secondary;
    }
  }};
  font-size: 12px;
  font-weight: 500;
`;

// Container dos botões de ação
const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;

// Exporta o componente principal da tela de gerenciamento de usuários
export default UserManagementScreen; 