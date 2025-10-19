export default {
   colors: {
      primary: '#3A7BD5',      // Cor principal do app (mais suave que a anterior)
      secondary: '#8E9AAF',    // Cor secundária (mais suave e neutra)
      background: '#FFFFFF',   // Fundo branco para design mais limpo
      surface: '#F9FAFC',      // Cor para cards e superfícies elevadas
      text: '#2D3748',         // Cor de texto principal (menos intensa que preto)
      textSecondary: '#718096', // Cor para textos secundários
      error: '#E53E3E',        // Cor para mensagens de erro (mais suave)
      success: '#38A169',      // Cor para mensagens de sucesso (mais suave)
      warning: '#ECC94B',      // Cor para alertas/avisos (mais suave)
      white: '#FFFFFF',        // Branco
      border: '#E2E8F0',       // Cor para bordas (mais suave)
      shadow: 'rgba(0, 0, 0, 0.05)', // Sombra sutil para elevação
   },
   typography: {
      fontFamily: 'System',    // Fonte do sistema para melhor performance e consistência
      title: {
         fontSize: 22,         // Tamanho reduzido para título
         fontWeight: '600',    // Peso reduzido para design mais leve
         letterSpacing: -0.5,  // Espaçamento negativo para design moderno
      },
      subtitle: {
         fontSize: 17,         // Tamanho reduzido
         fontWeight: '500',    // Peso médio para hierarquia visual
         letterSpacing: -0.25, // Espaçamento sutil
      },
      body: {
         fontSize: 15,         // Tamanho reduzido para corpo de texto
         fontWeight: 'normal',
         lineHeight: 1.5,      // Melhor legibilidade
      },
      caption: {
         fontSize: 13,         // Tamanho reduzido
         fontWeight: 'normal',
         color: '#718096',     // Cor mais clara para textos secundários
      },
   },
   spacing: {
      xs: 4,                   // Espaçamento extra pequeno
      small: 8,                // Espaçamento pequeno
      medium: 16,              // Espaçamento médio
      large: 24,               // Espaçamento grande
      xlarge: 32,              // Espaçamento extra grande
   },
   borderRadius: {
      small: 4,                // Raio de borda pequeno
      medium: 8,               // Raio de borda médio
      large: 12,               // Raio de borda grande
      full: 9999,              // Raio de borda circular
   },
   elevation: {
      none: 'none',
      small: '0 1px 2px rgba(0, 0, 0, 0.05)',
      medium: '0 2px 4px rgba(0, 0, 0, 0.05)',
      large: '0 4px 6px rgba(0, 0, 0, 0.05)',
   },
};