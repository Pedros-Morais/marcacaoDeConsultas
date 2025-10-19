import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import { RootStackParamList } from '../types/navigation';
import theme from '../styles/theme';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import CreateAppointmentScreen from '../screens/CreateAppointmentScreen/index';
import ProfileScreen from '../screens/ProfileScreen/index';
import SettingsScreen from '../screens/SettingsScreen/index';
import EditProfileScreen from '../screens/EditProfileScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import DoctorDashboardScreen from '../screens/DoctorDashboardScreen';
import PatientDashboardScreen from '../screens/PatientDashboardScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

// Stack navigator instance
const Stack = createNativeStackNavigator<RootStackParamList>();

// Common screen options for a minimalist UI
const screenOptions = {
  headerShown: true,
  headerTitle: 'Pedro Consultas',
  headerStyle: {
    backgroundColor: theme.colors.background,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTintColor: theme.colors.primary,
  headerBackTitleVisible: false,
  headerShadowVisible: false,
  contentStyle: {
    backgroundColor: theme.colors.background,
  },
};

// Auth screen options (login/register)
const authScreenOptions = {
  ...screenOptions,
  headerShown: false,
};

// Main app navigator component
export const AppNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  // Show loading state
  if (loading) {
    return null; // Or a minimal loading component
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={screenOptions}
      >
        {!user ? (
          // Auth routes
          <>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={authScreenOptions}
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen} 
              options={authScreenOptions}
            />
          </>
        ) : (
          // Authenticated routes
          <>
            {/* Role-specific dashboard as initial screen */}
            {user.role === 'admin' && (
              <Stack.Screen 
                name="AdminDashboard" 
                component={AdminDashboardScreen}
              />
            )}
            {user.role === 'doctor' && (
              <Stack.Screen 
                name="DoctorDashboard" 
                component={DoctorDashboardScreen}
              />
            )}
            {user.role === 'patient' && (
              <Stack.Screen 
                name="PatientDashboard" 
                component={PatientDashboardScreen}
              />
            )}
            
            {/* Common routes for all authenticated users */}
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
            />
            <Stack.Screen 
              name="CreateAppointment" 
              component={CreateAppointmentScreen}
            />
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen}
            />
            <Stack.Screen 
              name="EditProfile" 
              component={EditProfileScreen}
            />
            <Stack.Screen 
              name="Notifications" 
              component={NotificationsScreen}
            />
            <Stack.Screen 
              name="Settings" 
              component={SettingsScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
// Exporta o AppNavigator para uso na raiz do app