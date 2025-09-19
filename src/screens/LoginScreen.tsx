
// Importação de dependências e componentes visuais
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Input, Button, Text } from 'react-native-elements';
import { useAuth } from '../contexts/AuthContext';
import theme from '../styles/theme';
import { ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';


// Tipagem das props de navegação (não utilizada diretamente)
type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};


// Tela de login do app, responsável pela autenticação do usuário
const LoginScreen: React.FC = () => {
  // Obtém função de autenticação do contexto
  const { signIn } = useAuth();
  // Hook de navegação para redirecionar entre telas
  const navigation = useNavigation<LoginScreenProps['navigation']>();
  // Estado para armazenar o email digitado
  const [email, setEmail] = useState('');
  // Estado para armazenar a senha digitada
  const [password, setPassword] = useState('');
  // Estado para controlar o carregamento do botão
  const [loading, setLoading] = useState(false);
  // Estado para exibir mensagens de erro
  const [error, setError] = useState('');

  /**
   * Função chamada ao pressionar o botão "Entrar"
   * Realiza autenticação e trata erros
   */
  const handleLogin = async () => {
    try {
      setLoading(true); // Inicia loading
      setError(''); // Limpa erro anterior
      await signIn({ email, password }); // Tenta autenticar
    } catch (err) {
      setError('Email ou senha inválidos'); // Exibe erro se falhar
    } finally {
      setLoading(false); // Finaliza loading
    }
  };

  // Renderização da interface de login
  return (
    <Container>
      {/* Título do app */}
      <Title>App Marcação de Consultas</Title>
      
      {/* Campo de email */}
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        containerStyle={styles.input}
      />

      {/* Campo de senha */}
      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        containerStyle={styles.input}
      />

      {/* Exibe mensagem de erro se houver */}
      {error ? <ErrorText>{error}</ErrorText> : null}

      {/* Botão para autenticar */}
      <Button
        title="Entrar"
        onPress={handleLogin}
        loading={loading}
        containerStyle={styles.button as ViewStyle}
        buttonStyle={styles.buttonStyle}
      />

      {/* Botão para navegar para tela de cadastro */}
      <Button
        title="Cadastrar Novo Paciente"
        onPress={() => navigation.navigate('Register')}
        containerStyle={styles.registerButton as ViewStyle}
        buttonStyle={styles.registerButtonStyle}
      />

      {/* Dica de credenciais de exemplo para testes */}
      <Text style={styles.hint}>
        Use as credenciais de exemplo:
      </Text>
      <Text style={styles.credentials}>
        Admin: admin@example.com / 123456{'Médicos: joao@example.com, maria@example.com, pedro@example.com / 123456'}
      </Text>
    </Container>
  );
};

// Estilos dos componentes visuais
const styles = {
  input: {
    marginBottom: 15, // Espaçamento entre campos
  },
  button: {
    marginTop: 10,
    width: '100%', // Botão ocupa toda largura
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary, // Cor principal
    paddingVertical: 12,
  },
  registerButton: {
    marginTop: 10,
    width: '100%',
  },
  registerButtonStyle: {
    backgroundColor: theme.colors.secondary, // Cor secundária
    paddingVertical: 12,
  },
  hint: {
    marginTop: 20,
    textAlign: 'center' as const,
    color: theme.colors.text,
  },
  credentials: {
    marginTop: 10,
    textAlign: 'center' as const,
    color: theme.colors.text,
    fontSize: 12,
  },
};


// Container principal da tela de login
const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
  background-color: ${theme.colors.background};
`;

// Título do app
const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  color: ${theme.colors.text};
`;

// Texto de erro exibido em caso de falha no login
const ErrorText = styled.Text`
  color: ${theme.colors.error};
  text-align: center;
  margin-bottom: 10px;
`;

// Exporta o componente principal da tela de login
export default LoginScreen; 