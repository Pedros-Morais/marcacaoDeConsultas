
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
type PatientDashboardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PatientDashboard'>;
};


// Tipagem dos dados de consulta
interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  specialty: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}


// Tipagem para estilização condicional
interface StyledProps {
  status: string;
}


// Retorna cor de acordo com o status da consulta
const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return theme.colors.success;
    case 'cancelled':
      return theme.colors.error;
    default:
      return theme.colors.warning;
  }
};


// Retorna texto de acordo com o status da consulta
const getStatusText = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'Confirmada';
    case 'cancelled':
      return 'Cancelada';
    default:
      return 'Pendente';
  }
};


// Tela principal do paciente, exibe consultas agendadas e opções de navegação
const PatientDashboardScreen: React.FC = () => {
  // Obtém dados do usuário autenticado e função de logout
  const { user, signOut } = useAuth();
  // Hook de navegação para redirecionar entre telas
  const navigation = useNavigation<PatientDashboardScreenProps['navigation']>();
  // Estado para armazenar consultas do paciente
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  // Estado para controlar carregamento da tela
  const [loading, setLoading] = useState(true);

  /**
   * Carrega as consultas do paciente logado
   * Filtra as consultas pelo id do paciente
   */
  const loadAppointments = async () => {
    try {
      const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
      if (storedAppointments) {
        const allAppointments: Appointment[] = JSON.parse(storedAppointments);
        const userAppointments = allAppointments.filter(
          (appointment) => appointment.patientId === user?.id
        );
        setAppointments(userAppointments);
      }
    } catch (error) {
      console.error('Erro ao carregar consultas:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Carrega as consultas toda vez que a tela recebe foco
   * Garante que os dados estejam sempre atualizados ao voltar para a tela
   */
  useFocusEffect(
    React.useCallback(() => {
      loadAppointments();
    }, [])
  );

  /**
   * Renderização principal da tela do paciente
   * Exibe botões de navegação, lista de consultas e status
   */
  return (
    <Container>
      {/* Cabeçalho da tela */}
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Título */}
        <Title>Minhas Consultas</Title>

        {/* Botão para agendar nova consulta */}
        <Button
          title="Agendar Nova Consulta"
          onPress={() => navigation.navigate('CreateAppointment')}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        {/* Botão para acessar perfil */}
        <Button
          title="Meu Perfil"
          onPress={() => navigation.navigate('Profile')}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        {/* Botão para acessar configurações */}
        <Button
          title="Configurações"
          onPress={() => navigation.navigate('Settings')}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.settingsButton}
        />

        {/* Renderiza lista de consultas ou mensagens de status */}
        {loading ? (
          // Exibe mensagem de carregamento
          <LoadingText>Carregando consultas...</LoadingText>
        ) : appointments.length === 0 ? (
          // Exibe mensagem caso não haja consultas
          <EmptyText>Nenhuma consulta agendada</EmptyText>
        ) : (
          // Renderiza cada consulta usando o componente AppointmentCard
          appointments.map((appointment) => (
            <AppointmentCard key={appointment.id}>
              <ListItem.Content>
                <ListItem.Title style={styles.patientName as TextStyle}>
                  Paciente: {appointment.patientName}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.dateTime as TextStyle}>
                  {appointment.date} às {appointment.time}
                </ListItem.Subtitle>
                <Text style={styles.doctorName as TextStyle}>
                  {appointment.doctorName}
                </Text>
                <Text style={styles.specialty as TextStyle}>
                  {appointment.specialty}
                </Text>
                {/* Badge de status da consulta */}
                <StatusBadge status={appointment.status}>
                  <StatusText status={appointment.status}>
                    {getStatusText(appointment.status)}
                  </StatusText>
                </StatusBadge>
              </ListItem.Content>
            </AppointmentCard>
          ))
        )}

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
  logoutButton: {
    backgroundColor: theme.colors.error, // Cor de erro
    paddingVertical: 12,
  },
  settingsButton: {
    backgroundColor: theme.colors.secondary, // Cor secundária
    paddingVertical: 12,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  },
  specialty: {
    fontSize: 14,
    color: theme.colors.text,
    marginTop: 4,
  },
  dateTime: {
    fontSize: 14,
    color: theme.colors.text,
    marginTop: 4,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
  },
};


// Container principal da tela do paciente
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

// Card visual de cada consulta
const AppointmentCard = styled(ListItem)`
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

// Texto exibido quando não há consultas
const EmptyText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  font-size: 16px;
  margin-top: 20px;
`;

// Badge visual do status da consulta
const StatusBadge = styled.View<StyledProps>`
  background-color: ${(props: StyledProps) => getStatusColor(props.status) + '20'};
  padding: 4px 8px;
  border-radius: 4px;
  align-self: flex-start;
  margin-top: 8px;
`;

// Texto do status da consulta
const StatusText = styled.Text<StyledProps>`
  color: ${(props: StyledProps) => getStatusColor(props.status)};
  font-size: 12px;
  font-weight: 500;
`;

// Exporta o componente principal da tela do paciente
export default PatientDashboardScreen; 