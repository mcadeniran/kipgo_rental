import {LoginForm} from '@/components/auth/LoginForm';
import React from 'react';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{callbackUrl?: string;}>;
}) {
  const params = await searchParams;
  return (
    <LoginForm callbackUrl={params.callbackUrl} />
  );
}
