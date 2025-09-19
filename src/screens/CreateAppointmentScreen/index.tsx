/**
 * CreateAppointmentScreen - Refactored with modular pattern
 * Allows patients to schedule medical appointments
 */

import React from 'react';
import Header from '../../components/Header';
import { Container, ScrollContainer, styles } from './styles';
import { AppointmentForm } from './components';
import { useCreateAppointment } from './hooks';

const CreateAppointmentScreen: React.FC = () => {
  const {
    formData,
    loading,
    error,
    updateFormData,
    handleCreateAppointment,
    handleCancel,
  } = useCreateAppointment();

  return (
    <Container>
      <Header />
      <ScrollContainer contentContainerStyle={styles.scrollContent}>
        <AppointmentForm
          formData={formData}
          loading={loading}
          error={error}
          onUpdateFormData={updateFormData}
          onSubmit={handleCreateAppointment}
          onCancel={handleCancel}
        />
      </ScrollContainer>
    </Container>
  );
};

export default CreateAppointmentScreen;
