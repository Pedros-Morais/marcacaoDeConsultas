import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/auth';
import { User, LoginCredentials, RegisterData, AuthContextData } from '../types/auth';

// Chaves utilizadas para persistência de dados do usuário e token
const STORAGE_KEYS = {
  USER: '@MedicalApp:user',
  TOKEN: '@MedicalApp:token',
};

// Criação do contexto de autenticação tipado
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Provider responsável por gerenciar autenticação e estado do usuário
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado do usuário autenticado
  const [user, setUser] = useState<User | null>(null);
  // Estado de carregamento (usado para splash/loading)
  const [loading, setLoading] = useState(true);

  // Efeito para carregar usuário e lista de usuários registrados ao iniciar o app
  useEffect(() => {
    loadStoredUser();
    loadRegisteredUsers();
  }, []);

  // Carrega usuário salvo no AsyncStorage
  const loadStoredUser = async () => {
    try {
      const storedUser = await authService.getStoredUser();
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  // Carrega lista de usuários registrados (mock/local)
  const loadRegisteredUsers = async () => {
    try {
      await authService.loadRegisteredUsers();
    } catch (error) {
      console.error('Erro ao carregar usuários registrados:', error);
    }
  };

  // Realiza login do usuário, salva dados e token
  const signIn = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.signIn(credentials);
      setUser(response.user);
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
    } catch (error) {
      throw error;
    }
  };

  // Realiza cadastro de novo usuário, salva dados e token
  const register = async (data: RegisterData) => {
    try {
      const response = await authService.register(data);
      setUser(response.user);
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
    } catch (error) {
      throw error;
    }
  };

  // Realiza logout, limpa dados do usuário e token
  const signOut = async () => {
    try {
      await authService.signOut();
      setUser(null);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // Atualiza dados do usuário autenticado
  const updateUser = async (updatedUser: User) => {
    try {
      setUser(updatedUser);
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  };

  // Retorna o provider com os métodos e estados disponíveis para o app
  return (
    <AuthContext.Provider value={{ user, loading, signIn, register, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acessar o contexto de autenticação em qualquer componente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
// Exporta o hook e provider para uso global