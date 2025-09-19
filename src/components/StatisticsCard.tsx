import React from 'react';
import styled from 'styled-components/native';
import { ViewStyle, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import theme from '../styles/theme';

const { width: screenWidth } = Dimensions.get('window');

interface StatisticsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  subtitle,
  color = theme.colors.primary,
  icon,
  style,
}) => {
  return (
    <Container style={style} color={color}>
      <Header>
        <IconContainer color={color}>
          {icon || <MaterialIcons name="analytics" size={20} color={color} />}
        </IconContainer>
        <Title>{title}</Title>
      </Header>
      
      <ValueSection>
        <Value color={color}>{value}</Value>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </ValueSection>
      
      <AccentLine color={color} />
    </Container>
  );
};

const Container = styled.View<{ color: string }>`
  background-color: ${theme.colors.white};
  border-radius: 16px;
  padding: 18px;
  margin-bottom: 12px;
  width: 48%;
  min-height: 130px;
  justify-content: space-between;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 6;
  border-left-width: 4px;
  border-left-color: ${(props: { color: string }) => props.color};
  border-top-width: 1px;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-top-color: #f0f0f0;
  border-right-color: #f0f0f0;
  border-bottom-color: #f0f0f0;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const IconContainer = styled.View<{ color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background-color: ${(props: { color: string }) => props.color}20;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

const Title = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: ${theme.colors.text};
  flex: 1;
  line-height: 18px;
`;

const ValueSection = styled.View`
  align-items: flex-start;
  margin-bottom: 12px;
`;

const Value = styled.Text<{ color: string }>`
  font-size: 36px;
  font-weight: 800;
  color: ${(props: { color: string }) => props.color};
  margin-bottom: 2px;
  line-height: 40px;
`;

const Subtitle = styled.Text`
  font-size: 11px;
  color: ${theme.colors.secondary};
  font-weight: 500;
  opacity: 0.8;
`;

const AccentLine = styled.View<{ color: string }>`
  height: 4px;
  width: 50px;
  background-color: ${(props: { color: string }) => props.color};
  border-radius: 2px;
  opacity: 0.8;
  margin-top: 8px;
`;

export default StatisticsCard;
