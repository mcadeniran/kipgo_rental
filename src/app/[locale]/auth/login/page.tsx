import GuestRoute from '@/components/auth/GuestRoute';
import {LoginForm} from '@/components/auth/LoginForm';
import React from 'react';

export default async function LoginPage() {
  return (
    <GuestRoute>
      <LoginForm />
    </GuestRoute>
  );
}
