/**
 * Services for CreateAppointmentScreen
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { notificationService } from '../../../services/notifications';
import { Appointment } from '../models';

export class CreateAppointmentService {
  private static readonly STORAGE_KEY = '@MedicalApp:appointments';

  /**
   * Creates a new appointment and saves it to storage
   */
  static async createAppointment(appointmentData: Omit<Appointment, 'id'>): Promise<Appointment> {
    try {
      // Get existing appointments
      const storedAppointments = await AsyncStorage.getItem(this.STORAGE_KEY);
      const appointments: Appointment[] = storedAppointments ? JSON.parse(storedAppointments) : [];

      // Create new appointment with unique ID
      const newAppointment: Appointment = {
        ...appointmentData,
        id: Date.now().toString(),
      };

      // Add to appointments list
      appointments.push(newAppointment);
      
      // Save to storage
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(appointments));

      // Notify doctor about new appointment
      await notificationService.notifyNewAppointment(appointmentData.doctorId, newAppointment);

      return newAppointment;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw new Error('Erro ao agendar consulta. Tente novamente.');
    }
  }

  /**
   * Validates appointment form data
   */
  static validateAppointmentData(data: {
    date: string;
    selectedTime: string;
    selectedDoctor: any;
  }): { isValid: boolean; error?: string } {
    if (!data.date || !data.selectedTime || !data.selectedDoctor) {
      return {
        isValid: false,
        error: 'Por favor, preencha a data e selecione um médico e horário'
      };
    }

    // Additional validations can be added here
    return { isValid: true };
  }
}
