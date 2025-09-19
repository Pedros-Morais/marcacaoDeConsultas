/**
 * Hooks for ProfileScreen
 */

import { useAuth } from '../../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/navigation';
import { ProfileAction } from '../models';
import theme from '../../../styles/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

export const useProfile = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  const handleEditProfile = () => {
    navigation.navigate('EditProfile' as any);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSignOut = () => {
    signOut();
  };

  const profileActions: ProfileAction[] = [
    {
      id: 'edit',
      title: 'Editar Perfil',
      onPress: handleEditProfile,
      buttonStyle: {
        backgroundColor: theme.colors.success,
        paddingVertical: 12,
      },
      containerStyle: {
        marginBottom: 20,
        width: '100%',
      },
    },
    {
      id: 'back',
      title: 'Voltar',
      onPress: handleGoBack,
      buttonStyle: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 12,
      },
      containerStyle: {
        marginBottom: 20,
        width: '100%',
      },
    },
    {
      id: 'logout',
      title: 'Sair',
      onPress: handleSignOut,
      buttonStyle: {
        backgroundColor: theme.colors.error,
        paddingVertical: 12,
      },
      containerStyle: {
        marginBottom: 20,
        width: '100%',
      },
    },
  ];

  return {
    user,
    profileActions,
  };
};
