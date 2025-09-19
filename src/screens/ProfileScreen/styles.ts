/**
 * Styles for ProfileScreen
 */

import styled from 'styled-components/native';
import theme from '../../styles/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 20px;
  text-align: center;
`;

export const styles = {
  scrollContent: {
    padding: 20,
  },
};
