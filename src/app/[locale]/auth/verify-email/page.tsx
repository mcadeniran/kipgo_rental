import {VerifyEmailCard} from '@/components/auth/VerifyEmailCard';
import VerifyEmailRoute from '@/components/auth/VerifyEmailRoute';
import React from 'react';

export default function VerifyEmailPage() {
  return (
    <VerifyEmailRoute>
      <VerifyEmailCard />
    </VerifyEmailRoute>
  );
}
