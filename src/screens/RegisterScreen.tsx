
// Importação de dependências, hooks e componentes visuais
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
type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
};


// Tela de cadastro de paciente, responsável por criar nova conta
const RegisterScreen: React.FC = () => {
  // Obtém função de registro do contexto
  const { register } = useAuth();
  // Hook de navegação para redirecionar entre telas
  const navigation = useNavigation<RegisterScreenProps['navigation']>();
  // Estado para armazenar nome digitado
  const [name, setName] = useState('');
  // Estado para armazenar email digitado
  const [email, setEmail] = useState('');
  // Estado para armazenar senha digitada
  const [password, setPassword] = useState('');
  // Estado para controlar carregamento do botão
  const [loading, setLoading] = useState(false);
  // Estado para exibir mensagens de erro
  const [error, setError] = useState('');

  /**
   * Função chamada ao pressionar o botão "Cadastrar"
   * Realiza validação dos campos, registra usuário e trata erros
   */
  const handleRegister = async () => {
    try {
      setLoading(true);
      setError('');

      // Validação dos campos obrigatórios
      if (!name || !email || !password) {
        setError('Por favor, preencha todos os campos');
        return;
      }

      // Chama função de registro do contexto
      await register({
        name,
        email,
        password,
      });

      // Após o registro bem-sucedido, navega para o login
      navigation.navigate('Login');
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Renderização da interface de cadastro
  return (
    <Container>
      {/* Título da tela */}
      <Title>Cadastro de Paciente</Title>
      
      {/* Campo de nome completo */}
      <Input
        placeholder="Nome completo"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        containerStyle={styles.input}
      />

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

      {/* Botão para cadastrar novo paciente */}
      <Button
        title="Cadastrar"
        onPress={handleRegister}
        loading={loading}
        containerStyle={styles.button as ViewStyle}
        buttonStyle={styles.buttonStyle}
      />

      {/* Botão para voltar para tela de login */}
      <Button
        title="Voltar para Login"
        onPress={() => navigation.navigate('Login')}
        containerStyle={styles.backButton as ViewStyle}
        buttonStyle={styles.backButtonStyle}
      />
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
  backButton: {
    marginTop: 10,
    width: '100%',
  },
  backButtonStyle: {
    backgroundColor: theme.colors.secondary, // Cor secundária
    paddingVertical: 12,
  },
};


// Container principal da tela de cadastro
const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
  background-color: ${theme.colors.background};
`;

// Título da tela
const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  color: ${theme.colors.text};
`;

// Texto de erro exibido em caso de falha no cadastro
const ErrorText = styled.Text`
  color: ${theme.colors.error};
  text-align: center;
  margin-bottom: 10px;
`;

// Exporta o componente principal da tela de cadastro
export default RegisterScreen; 