import GuestRoute from '@/components/auth/GuestRoute';
import {LoginForm} from '@/components/auth/LoginForm';
import React from 'react';

interface Props {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
}

export default async function LoginPage({
  searchParams,
}: Props) {
  const params = await searchParams;
  return (
    <GuestRoute>
      <LoginForm callbackUrl={params.callbackUrl}
      />
    </GuestRoute>
  );
}
