/**
 * Styles for CreateAppointmentScreen
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

export const styles = {
  scrollContent: {
    padding: 20,
  },
};
