
// Importação de dependências, hooks e componentes visuais
import React from 'react';
import styled from 'styled-components/native';
import { ViewStyle } from 'react-native';
import { Card, Text, Avatar } from 'react-native-elements';
import theme from '../styles/theme';


// Tipagem das props do card de consulta
interface AppointmentCardProps {
  doctorName: string;
  date: string;
  time: string;
  specialty: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  onPress?: () => void;
  style?: ViewStyle;
}


// Card visual para exibir informações de uma consulta
const AppointmentCard: React.FC<AppointmentCardProps> = ({
  doctorName,
  date,
  time,
  specialty,
  status,
  onPress,
  style,
}) => {
  /**
   * Retorna cor do status da consulta
   */
  const getStatusColor = () => {
    switch (status) {
      case 'confirmed':
        return theme.colors.success;
      case 'cancelled':
        return theme.colors.error;
      default:
        return theme.colors.primary;
    }
  };

  /**
   * Renderização principal do card de consulta
   * Exibe informações do médico, data/hora, especialidade e status
   */
  return (
    <Card containerStyle={[styles.card, style]}>
      <CardContent>
        {/* Informações do médico */}
        <DoctorInfo>
          <Avatar
            size="medium"
            rounded
            source={{ uri: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 10)}.jpg` }}
            containerStyle={styles.avatar}
          />
          <TextContainer>
            <DoctorName>{doctorName}</DoctorName>
            <Specialty>{specialty}</Specialty>
          </TextContainer>
        </DoctorInfo>

        {/* Informações de data/hora da consulta */}
        <AppointmentInfo>
          <InfoRow>
            <InfoLabel>Data:</InfoLabel>
            <InfoValue>{date}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Horário:</InfoLabel>
            <InfoValue>{time}</InfoValue>
          </InfoRow>
        </AppointmentInfo>

        {/* Status visual da consulta */}
        <StatusContainer>
          <StatusDot color={getStatusColor()} />
          <StatusText color={getStatusColor()}>
            {status === 'confirmed' ? 'Confirmada' : status === 'cancelled' ? 'Cancelada' : 'Pendente'}
          </StatusText>
        </StatusContainer>
      </CardContent>
    </Card>
  );
};


// Estilos dos componentes visuais do card
const styles = {
  card: {
    borderRadius: 10, // Borda arredondada do card
    marginHorizontal: 0,
    marginVertical: 8,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  avatar: {
    backgroundColor: theme.colors.primary, // Cor de fundo do avatar
  },
};


// Container do conteúdo do card
const CardContent = styled.View`
  padding: 10px;
`;

// Informações do médico
const DoctorInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

// Container dos textos do médico
const TextContainer = styled.View`
  margin-left: 15px;
`;

// Nome do médico
const DoctorName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.text};
`;

// Especialidade do médico
const Specialty = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text};
  opacity: 0.7;
`;

// Informações de data/hora da consulta
const AppointmentInfo = styled.View`
  margin-bottom: 15px;
`;

// Linha de informação
const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

// Label de informação
const InfoLabel = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text};
  opacity: 0.7;
`;

// Valor de informação
const InfoValue = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text};
  font-weight: 500;
`;

// Container do status visual
const StatusContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

// Ponto colorido do status
const StatusDot = styled.View<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${props => props.color};
  margin-right: 8px;
`;

// Texto do status
const StatusText = styled.Text<{ color: string }>`
  font-size: 14px;
  color: ${props => props.color};
  font-weight: 500;
`;

// Exporta o componente principal do card de consulta
export default AppointmentCard; 