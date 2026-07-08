import GuestRoute from '@/components/auth/GuestRoute';
import {RegisterForm} from '@/components/auth/RegisterForm';
import React from 'react';

export default function LoginPage() {
  return (
    <GuestRoute>
      <RegisterForm />
    </GuestRoute>
  );
}
