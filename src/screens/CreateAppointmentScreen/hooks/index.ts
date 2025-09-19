/**
 * Hooks for CreateAppointmentScreen
 */

import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { CreateAppointmentForm, Doctor } from '../models';
import { CreateAppointmentService } from '../services';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateAppointment'>;

export const useCreateAppointment = () => {
  const { user } = useAuth();
  const navigation = useNavigation<NavigationProp>();
  
  const [formData, setFormData] = useState<CreateAppointmentForm>({
    date: '',
    selectedTime: '',
    selectedDoctor: null,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateFormData = (field: keyof CreateAppointmentForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing/selecting
    if (error) setError('');
  };

  const handleCreateAppointment = async () => {
    try {
      setLoading(true);
      setError('');

      // Validate form data
      const validation = CreateAppointmentService.validateAppointmentData(formData);
      if (!validation.isValid) {
        setError(validation.error || 'Dados inválidos');
        return;
      }

      // Create appointment
      await CreateAppointmentService.createAppointment({
        patientId: user?.id || '',
        patientName: user?.name || '',
        doctorId: formData.selectedDoctor!.id,
        doctorName: formData.selectedDoctor!.name,
        date: formData.date,
        time: formData.selectedTime,
        specialty: formData.selectedDoctor!.specialty,
        status: 'pending',
      });

      alert('Consulta agendada com sucesso!');
      navigation.goBack();
    } catch (err: any) {
      setError(err.message || 'Erro ao agendar consulta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return {
    formData,
    loading,
    error,
    updateFormData,
    handleCreateAppointment,
    handleCancel,
  };
};
