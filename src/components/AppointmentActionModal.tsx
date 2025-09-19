
// Importação de dependências, hooks e componentes visuais
import React from 'react';
import styled from 'styled-components/native';
import { Modal, ViewStyle } from 'react-native';
import { Button, Input } from 'react-native-elements';
import theme from '../styles/theme';


// Tipagem das props do modal de ação de consulta
interface AppointmentActionModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  actionType: 'confirm' | 'cancel';
  appointmentDetails: {
    patientName: string;
    doctorName: string;
    date: string;
    time: string;
    specialty: string;
  };
}


// Modal para confirmar ou cancelar uma consulta, exibindo detalhes e motivo
const AppointmentActionModal: React.FC<AppointmentActionModalProps> = ({
  visible,
  onClose,
  onConfirm,
  actionType,
  appointmentDetails,
}) => {
  // Estado para armazenar motivo do cancelamento
  const [reason, setReason] = React.useState('');

  /**
   * Confirma ação (cancelar ou confirmar) e fecha modal
   */
  const handleConfirm = () => {
    onConfirm(reason.trim() || undefined);
    setReason('');
    onClose();
  };

  /**
   * Fecha modal e limpa motivo
   */
  const handleClose = () => {
    setReason('');
    onClose();
  };

  // Verifica se ação é cancelamento
  const isCancel = actionType === 'cancel';

  /**
   * Renderização principal do modal de ação de consulta
   * Exibe detalhes da consulta, campo de motivo (se cancelamento) e botões de ação
   */
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <Overlay>
        <ModalContainer>
          {/* Cabeçalho do modal */}
          <Header>
            <Title>
              {isCancel ? 'Cancelar Consulta' : 'Confirmar Consulta'}
            </Title>
          </Header>

          {/* Conteúdo principal do modal */}
          <Content>
            {/* Informações da consulta */}
            <AppointmentInfo>
              <InfoRow>
                <InfoLabel>Paciente:</InfoLabel>
                <InfoValue>{appointmentDetails.patientName}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Médico:</InfoLabel>
                <InfoValue>{appointmentDetails.doctorName}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Especialidade:</InfoLabel>
                <InfoValue>{appointmentDetails.specialty}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Data/Hora:</InfoLabel>
                <InfoValue>{appointmentDetails.date} às {appointmentDetails.time}</InfoValue>
              </InfoRow>
            </AppointmentInfo>

            {/* Campo de motivo do cancelamento, se aplicável */}
            {isCancel && (
              <ReasonContainer>
                <Input
                  label="Motivo do cancelamento (opcional)"
                  placeholder="Digite o motivo..."
                  value={reason}
                  onChangeText={setReason}
                  multiline
                  numberOfLines={3}
                  containerStyle={styles.reasonInput}
                />
              </ReasonContainer>
            )}

            {/* Texto de confirmação da ação */}
            <ConfirmationText isCancel={isCancel}>
              {isCancel 
                ? 'Tem certeza que deseja cancelar esta consulta?'
                : 'Tem certeza que deseja confirmar esta consulta?'
              }
            </ConfirmationText>
          </Content>

          {/* Botões de ação do modal */}
          <ButtonContainer>
            <Button
              title="Cancelar"
              onPress={handleClose}
              containerStyle={styles.cancelButton as ViewStyle}
              buttonStyle={styles.cancelButtonStyle}
            />
            <Button
              title={isCancel ? 'Confirmar Cancelamento' : 'Confirmar'}
              onPress={handleConfirm}
              containerStyle={styles.confirmButton as ViewStyle}
              buttonStyle={[
                styles.confirmButtonStyle,
                { backgroundColor: isCancel ? theme.colors.error : theme.colors.success }
              ]}
            />
          </ButtonContainer>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
};


// Estilos dos componentes visuais do modal
const styles = {
  reasonInput: {
    marginBottom: 10, // Espaçamento abaixo do campo motivo
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  confirmButton: {
    flex: 1,
    marginLeft: 8,
  },
  cancelButtonStyle: {
    backgroundColor: theme.colors.secondary, // Cor do botão cancelar
    paddingVertical: 12,
  },
  confirmButtonStyle: {
    paddingVertical: 12,
  },
};


// Overlay escurecido do modal
const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

// Container principal do modal
const ModalContainer = styled.View`
  background-color: ${theme.colors.white};
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  shadow-color: ${theme.colors.text};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

// Cabeçalho do modal
const Header = styled.View`
  padding: 20px 20px 10px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`;

// Título do modal
const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.text};
  text-align: center;
`;

// Conteúdo principal do modal
const Content = styled.View`
  padding: 20px;
`;

// Informações da consulta
const AppointmentInfo = styled.View`
  background-color: ${theme.colors.background};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

// Linha de informação
const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

// Label de informação
const InfoLabel = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text};
  font-weight: 500;
`;

// Valor de informação
const InfoValue = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text};
  font-weight: 400;
  flex: 1;
  text-align: right;
`;

// Container do campo motivo
const ReasonContainer = styled.View`
  margin-bottom: 16px;
`;

// Texto de confirmação da ação
const ConfirmationText = styled.Text<{ isCancel: boolean }>`
  font-size: 16px;
  color: ${(props: { isCancel: boolean }) => props.isCancel ? theme.colors.error : theme.colors.success};
  text-align: center;
  margin-bottom: 20px;
  font-weight: 500;
`;

// Container dos botões de ação
const ButtonContainer = styled.View`
  flex-direction: row;
  padding: 0 20px 20px 20px;
`;

// Exporta o componente principal do modal de ação de consulta
export default AppointmentActionModal;
