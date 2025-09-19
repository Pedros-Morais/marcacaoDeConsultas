/**
 * Services for ProfileScreen
 */

import { UserProfile, USER_ROLE_LABELS } from '../models';

export class ProfileService {
  /**
   * Returns user-friendly text for user role
   */
  static getRoleText(role: string): string {
    return USER_ROLE_LABELS[role] || role;
  }

  /**
   * Gets role-based background color for badge
   */
  static getRoleBadgeColor(role: string, theme: any): string {
    switch (role) {
      case 'admin':
        return theme.colors.primary + '20';
      case 'doctor':
        return theme.colors.success + '20';
      default:
        return theme.colors.secondary + '20';
    }
  }

  /**
   * Validates if user has specialty (for doctors)
   */
  static shouldShowSpecialty(user: UserProfile | null): boolean {
    return user?.role === 'doctor' && !!user?.specialty;
  }

  /**
   * Gets default avatar URL if user doesn't have one
   */
  static getAvatarUrl(user: UserProfile | null): string {
    return user?.image || 'https://via.placeholder.com/150';
  }
}
