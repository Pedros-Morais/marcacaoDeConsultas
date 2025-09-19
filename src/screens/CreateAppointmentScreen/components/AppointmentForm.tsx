/**
 * AppointmentForm component for CreateAppointmentScreen
 */

import React from 'react';
import { ViewStyle } from 'react-native';
import { Input, Button } from 'react-native-elements';
import styled from 'styled-components/native';
import theme from '../../../styles/theme';
import DoctorList from '../../../components/DoctorList';
import TimeSlotList from '../../../components/TimeSlotList';
import { CreateAppointmentForm, AVAILABLE_DOCTORS, Doctor } from '../models';

interface AppointmentFormProps {
  formData: CreateAppointmentForm;
  loading: boolean;
  error: string;
  onUpdateFormData: (field: keyof CreateAppointmentForm, value: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  formData,
  loading,
  error,
  onUpdateFormData,
  onSubmit,
  onCancel,
}) => {
  const handleSelectTime = (time: string) => {
    onUpdateFormData('selectedTime', time);
  };

  const handleSelectDoctor = (doctor: Doctor) => {
    onUpdateFormData('selectedDoctor', doctor);
  };

  const handleDateChange = (date: string) => {
    onUpdateFormData('date', date);
  };

  return (
    <FormContainer>
      <Title>Agendar Consulta</Title>

      {/* Campo para data da consulta */}
      <Input
        placeholder="Data (DD/MM/AAAA)"
        value={formData.date}
        onChangeText={handleDateChange}
        containerStyle={styles.input}
        keyboardType="numeric"
      />

      {/* Seleção de horário */}
      <SectionTitle>Selecione um Horário</SectionTitle>
      <TimeSlotList
        onSelectTime={handleSelectTime}
        selectedTime={formData.selectedTime}
      />

      {/* Seleção de médico */}
      <SectionTitle>Selecione um Médico</SectionTitle>
      <DoctorList
        doctors={AVAILABLE_DOCTORS}
        onSelectDoctor={handleSelectDoctor}
        selectedDoctorId={formData.selectedDoctor?.id}
      />

      {/* Exibe erro se houver */}
      {error ? <ErrorText>{error}</ErrorText> : null}

      {/* Botão para agendar consulta */}
      <Button
        title="Agendar"
        onPress={onSubmit}
        loading={loading}
        containerStyle={styles.button as ViewStyle}
        buttonStyle={styles.buttonStyle}
      />

      {/* Botão para cancelar e voltar */}
      <Button
        title="Cancelar"
        onPress={onCancel}
        containerStyle={styles.button as ViewStyle}
        buttonStyle={styles.cancelButton}
      />
    </FormContainer>
  );
};

const styles = {
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    width: '100%',
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
  },
  cancelButton: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 12,
  },
};

const FormContainer = styled.View`
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 20px;
  text-align: center;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 10px;
  margin-top: 10px;
`;

const ErrorText = styled.Text`
  color: ${theme.colors.error};
  text-align: center;
  margin-bottom: 10px;
`;
