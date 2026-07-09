import {
  CarFront,
  CalendarDays,
  Info,
  Phone,
  Home,
  UserCog,
} from 'lucide-react';

import { AuthStatus } from '@/types/auth';

export interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  guest?: boolean;
  authenticated?: boolean;
  admin?: boolean;
}

export const navItems: NavItem[] = [
  {
    label: 'Home',
    href: '/',
    icon: Home,
    guest: true,
    authenticated: true,
    admin: true,
  },

  {
    label: 'Rentals',
    href: '/cars',
    icon: CarFront,
    guest: true,
    authenticated: true,
    admin: true,
  },

  {
    label: 'About Us',
    href: '/about',
    icon: Info,
    guest: true,
  },

  {
    label: 'Contact',
    href: '/contact',
    icon: Phone,
    guest: true,
  },

  {
    label: 'My Bookings',
    href: '/bookings',
    icon: CalendarDays,
    authenticated: true,
  },

  {
    label: 'Profile',
    href: '/profile',
    icon: UserCog,
    authenticated: true,
  },
];

export function getNavigation(authStatus: AuthStatus) {
  return navItems.filter((item) => {
    switch (authStatus) {
      case 'admin':
        return item.admin || item.authenticated;

      case 'user':
        return item.authenticated;

      default:
        return item.guest;
    }
  });
}
