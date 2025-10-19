
import React from 'react';
import styled from 'styled-components/native';
import { ViewStyle, TouchableOpacity } from 'react-native';
import { Card, Text, Avatar } from 'react-native-elements';
import theme from '../styles/theme';
import globalStyles from '../styles/globalStyles';

interface AppointmentCardProps {
  doctorName: string;
  date: string;
  time: string;
  specialty: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  onPress?: () => void;
  style?: ViewStyle;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  doctorName,
  date,
  time,
  specialty,
  status,
  onPress,
  style,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'confirmed':
        return theme.colors.success;
      case 'cancelled':
        return theme.colors.error;
      default:
        return theme.colors.primary;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Pending';
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <CardContainer style={style}>
        <CardHeader>
          <AvatarContainer>
            <Avatar
              size="small"
              rounded
              source={{ uri: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 10)}.jpg` }}
              containerStyle={styles.avatar}
            />
          </AvatarContainer>
          <HeaderInfo>
            <DoctorName>{doctorName}</DoctorName>
            <Specialty>{specialty}</Specialty>
          </HeaderInfo>
          <StatusBadge color={getStatusColor()}>
            <StatusText>{getStatusText()}</StatusText>
          </StatusBadge>
        </CardHeader>
        
        <CardDivider />
        
        <CardFooter>
          <DateTimeContainer>
            <DateTimeLabel>Date</DateTimeLabel>
            <DateTimeValue>{date}</DateTimeValue>
          </DateTimeContainer>
          <DateTimeContainer>
            <DateTimeLabel>Time</DateTimeLabel>
            <DateTimeValue>{time}</DateTimeValue>
          </DateTimeContainer>
        </CardFooter>
      </CardContainer>
    </TouchableOpacity>
  );
};

const styles = {
  avatar: {
    backgroundColor: theme.colors.surface,
  },
};

// Styled components
const CardContainer = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium}px;
  margin-vertical: ${theme.spacing.small}px;
  padding: ${theme.spacing.medium}px;
  shadow-color: ${theme.colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 1;
`;

const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AvatarContainer = styled.View`
  margin-right: ${theme.spacing.small}px;
`;

const HeaderInfo = styled.View`
  flex: 1;
`;

const DoctorName = styled.Text`
  font-size: ${theme.typography.subtitle.fontSize}px;
  font-weight: 500;
  color: ${theme.colors.text};
  margin-bottom: 2px;
`;

const Specialty = styled.Text`
  font-size: ${theme.typography.caption.fontSize}px;
  color: ${theme.colors.textSecondary};
`;

const StatusBadge = styled.View<{ color: string }>`
  background-color: ${props => props.color}20;
  padding-horizontal: ${theme.spacing.small}px;
  padding-vertical: ${theme.spacing.xs}px;
  border-radius: ${theme.borderRadius.full}px;
`;

const StatusText = styled.Text`
  font-size: 12px;
  color: ${props => props.color || theme.colors.primary};
  font-weight: 500;
`;

const CardDivider = styled.View`
  height: 1px;
  background-color: ${theme.colors.border};
  margin-vertical: ${theme.spacing.medium}px;
`;

const CardFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const DateTimeContainer = styled.View`
  align-items: flex-start;
`;

const DateTimeLabel = styled.Text`
  font-size: ${theme.typography.caption.fontSize}px;
  color: ${theme.colors.textSecondary};
  margin-bottom: 4px;
`;

const DateTimeValue = styled.Text`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.text};
  font-weight: 500;
`;

export default AppointmentCard;