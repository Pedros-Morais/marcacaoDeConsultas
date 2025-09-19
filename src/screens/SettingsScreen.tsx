
// Importação de dependências, hooks e componentes visuais
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, ViewStyle, Alert, Share } from 'react-native';
import { Button, ListItem, Switch, Text } from 'react-native-elements';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import theme from '../styles/theme';
import Header from '../components/Header';
import { storageService } from '../services/storage';


// Tipagem das props de navegação (não utilizada diretamente)
type SettingsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Settings'>;
};


// Tipagem das configurações do app
interface AppSettings {
  notifications: boolean;
  autoBackup: boolean;
  theme: 'light' | 'dark';
  language: string;
}


// Tela de configurações do app, permite alterar preferências, backup e limpar dados
const SettingsScreen: React.FC = () => {
  // Obtém dados do usuário autenticado e função de logout
  const { user, signOut } = useAuth();
  // Hook de navegação para redirecionar entre telas
  const navigation = useNavigation<SettingsScreenProps['navigation']>();
  // Estado para armazenar configurações do app
  const [settings, setSettings] = useState<AppSettings>({
    notifications: true,
    autoBackup: true,
    theme: 'light',
    language: 'pt-BR',
  });
  // Estado para controlar carregamento da tela
  const [loading, setLoading] = useState(true);
  // Estado para informações de armazenamento
  const [storageInfo, setStorageInfo] = useState<any>(null);

  /**
   * Carrega configurações e informações de armazenamento do app
   */
  const loadSettings = async () => {
    try {
      const appSettings = await storageService.getAppSettings();
      setSettings(appSettings);
      // Busca informações de armazenamento
      const info = await storageService.getStorageInfo();
      setStorageInfo(info);
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Atualiza configurações do app ao alterar switches
   */
  const updateSetting = async (key: keyof AppSettings, value: any) => {
    try {
      const updatedSettings = { ...settings, [key]: value };
      setSettings(updatedSettings);
      await storageService.updateAppSettings({ [key]: value });
    } catch (error) {
      console.error('Erro ao atualizar configuração:', error);
      Alert.alert('Erro', 'Não foi possível salvar a configuração');
    }
  };

  /**
   * Cria backup dos dados e compartilha arquivo
   */
  const handleCreateBackup = async () => {
    try {
      setLoading(true);
      const backup = await storageService.createBackup();
      const fileName = `backup_${new Date().toISOString().split('T')[0]}.json`;
      await Share.share({
        message: backup,
        title: `Backup do App - ${fileName}`,
      });
      Alert.alert('Sucesso', 'Backup criado e compartilhado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar backup:', error);
      Alert.alert('Erro', 'Não foi possível criar o backup');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Limpa o cache da aplicação após confirmação do usuário
   */
  const handleClearCache = async () => {
    Alert.alert(
      'Limpar Cache',
      'Isso irá limpar o cache da aplicação. Tem certeza?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: async () => {
            try {
              storageService.clearCache();
              await loadSettings();
              Alert.alert('Sucesso', 'Cache limpo com sucesso!');
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível limpar o cache');
            }
          },
        },
      ]
    );
  };

  /**
   * Apaga todos os dados do app após múltiplas confirmações do usuário
   */
  const handleClearAllData = async () => {
    Alert.alert(
      'Apagar Todos os Dados',
      'ATENÇÃO: Isso irá apagar TODOS os dados da aplicação permanentemente. Esta ação não pode ser desfeita!',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'APAGAR TUDO',
          style: 'destructive',
          onPress: async () => {
            Alert.alert(
              'Confirmação Final',
              'Tem certeza absoluta? Todos os dados serão perdidos!',
              [
                { text: 'Cancelar', style: 'cancel' },
                {
                  text: 'SIM, APAGAR',
                  style: 'destructive',
                  onPress: async () => {
                    try {
                      await storageService.clearAll();
                      Alert.alert('Concluído', 'Todos os dados foram apagados. O app será reiniciado.', [
                        { text: 'OK', onPress: () => signOut() }
                      ]);
                    } catch (error) {
                      Alert.alert('Erro', 'Não foi possível apagar os dados');
                    }
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  /**
   * Renderização principal da tela de configurações
   * Exibe switches, botões de ação, informações de armazenamento e ações perigosas
   */
  if (loading) {
    return (
      <Container>
        <Header />
        <LoadingContainer>
          <LoadingText>Carregando configurações...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      {/* Cabeçalho da tela */}
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Título */}
        <Title>Configurações</Title>

        {/* Seção de preferências do usuário */}
        <SectionTitle>Preferências</SectionTitle>
        <SettingsCard>
          {/* Switch de notificações */}
          <ListItem>
            <ListItem.Content>
              <ListItem.Title>Notificações</ListItem.Title>
              <ListItem.Subtitle>Receber notificações push</ListItem.Subtitle>
            </ListItem.Content>
            <Switch
              value={settings.notifications}
              onValueChange={(value) => updateSetting('notifications', value)}
              trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
            />
          </ListItem>

          {/* Switch de backup automático */}
          <ListItem>
            <ListItem.Content>
              <ListItem.Title>Backup Automático</ListItem.Title>
              <ListItem.Subtitle>Criar backups automaticamente</ListItem.Subtitle>
            </ListItem.Content>
            <Switch
              value={settings.autoBackup}
              onValueChange={(value) => updateSetting('autoBackup', value)}
              trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
            />
          </ListItem>
        </SettingsCard>

        {/* Seção de dados e armazenamento */}
        <SectionTitle>Dados e Armazenamento</SectionTitle>
        <SettingsCard>
          {storageInfo && (
            <>
              <InfoItem>
                <InfoLabel>Itens no Cache:</InfoLabel>
                <InfoValue>{storageInfo.cacheSize}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Total de Chaves:</InfoLabel>
                <InfoValue>{storageInfo.totalKeys}</InfoValue>
              </InfoItem>
            </>
          )}
        </SettingsCard>

        {/* Botão para criar backup */}
        <Button
          title="Criar Backup"
          onPress={handleCreateBackup}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.backupButton}
          loading={loading}
        />

        {/* Botão para limpar cache */}
        <Button
          title="Limpar Cache"
          onPress={handleClearCache}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.cacheButton}
        />

        {/* Seção de ações perigosas */}
        <SectionTitle>Ações Perigosas</SectionTitle>
        <Button
          title="Apagar Todos os Dados"
          onPress={handleClearAllData}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.dangerButton}
        />

        {/* Botão para voltar */}
        <Button
          title="Voltar"
          onPress={() => navigation.goBack()}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />
      </ScrollView>
    </Container>
  );
};


// Estilos dos componentes visuais
const styles = {
  scrollContent: {
    padding: 20, // Espaçamento interno do ScrollView
  },
  button: {
    marginBottom: 15,
    width: '100%',
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary, // Cor principal
    paddingVertical: 12,
  },
  backupButton: {
    backgroundColor: theme.colors.success, // Cor de sucesso
    paddingVertical: 12,
  },
  cacheButton: {
    backgroundColor: theme.colors.warning, // Cor de aviso
    paddingVertical: 12,
  },
  dangerButton: {
    backgroundColor: theme.colors.error, // Cor de erro
    paddingVertical: 12,
  },
};


// Container principal da tela de configurações
const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

// Container de carregamento
const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

// Texto de carregamento
const LoadingText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text};
`;

// Título da tela
const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 20px;
  text-align: center;
`;

// Título de seção
const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 10px;
  margin-top: 20px;
`;

// Card visual para agrupamento de configurações
const SettingsCard = styled.View`
  background-color: ${theme.colors.white};
  border-radius: 8px;
  margin-bottom: 15px;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;

// Item de informação de armazenamento
const InfoItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`;

// Label de informação
const InfoLabel = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text};
`;

// Valor de informação
const InfoValue = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.colors.primary};
`;

// Exporta o componente principal da tela de configurações
export default SettingsScreen;
