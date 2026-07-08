import GuestRoute from '@/components/auth/GuestRoute';
import {RegisterForm} from '@/components/auth/RegisterForm';
import React from 'react';

interface Props {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
}

export default async function RegisterPage({
  searchParams,
}: Props) {
  const params = await searchParams;
  return (
    <GuestRoute>
      <RegisterForm callbackUrl={params.callbackUrl} />
    </GuestRoute>
  );
}
