/**
 * Models for ProfileScreen
 */

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
  image?: string;
  specialty?: string; // Only for doctors
}

export interface ProfileAction {
  id: string;
  title: string;
  onPress: () => void;
  buttonStyle?: any;
  containerStyle?: any;
}

export const USER_ROLE_LABELS: Record<string, string> = {
  admin: 'Administrador',
  doctor: 'Médico',
  patient: 'Paciente',
};
