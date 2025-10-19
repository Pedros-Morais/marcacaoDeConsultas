import { StyleSheet } from 'react-native';
import theme from './theme';

export const globalStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  
  // Card styles
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  // Text styles
  title: {
    ...theme.typography.title,
    color: theme.colors.text,
    marginBottom: theme.spacing.small,
  },
  subtitle: {
    ...theme.typography.subtitle,
    color: theme.colors.text,
    marginBottom: theme.spacing.small,
  },
  bodyText: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  caption: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  
  // Form styles
  formGroup: {
    marginBottom: theme.spacing.medium,
  },
  label: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.small,
    padding: theme.spacing.small,
    ...theme.typography.body,
    backgroundColor: theme.colors.white,
  },
  
  // Layout styles
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Spacing
  mt1: { marginTop: theme.spacing.xs },
  mt2: { marginTop: theme.spacing.small },
  mt3: { marginTop: theme.spacing.medium },
  mt4: { marginTop: theme.spacing.large },
  mb1: { marginBottom: theme.spacing.xs },
  mb2: { marginBottom: theme.spacing.small },
  mb3: { marginBottom: theme.spacing.medium },
  mb4: { marginBottom: theme.spacing.large },
  
  // Divider
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.medium,
  },
  
  // Status indicators
  success: {
    color: theme.colors.success,
  },
  error: {
    color: theme.colors.error,
  },
  warning: {
    color: theme.colors.warning,
  },
});

export default globalStyles;