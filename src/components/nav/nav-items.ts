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
    label: 'nav.home',
    href: '/',
    icon: Home,
    guest: true,
    authenticated: true,
    admin: true,
  },

  {
    label: 'nav.rentals',
    href: '/cars',
    icon: CarFront,
    guest: true,
    authenticated: true,
    admin: true,
  },

  {
    label: 'nav.aboutUs',
    href: '/about',
    icon: Info,
    guest: true,
  },

  {
    label: 'nav.contact',
    href: '/contact',
    icon: Phone,
    guest: true,
  },

  {
    label: 'nav.myBookings',
    href: '/bookings',
    icon: CalendarDays,
    authenticated: true,
  },

  {
    label: 'nav.myProfile',
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
