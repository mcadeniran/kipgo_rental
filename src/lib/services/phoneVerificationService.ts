import {
  RecaptchaVerifier,
  linkWithPhoneNumber,
  ConfirmationResult,
  unlink,
} from 'firebase/auth';

import { auth } from '@/app/[locale]/firebase/config';

let confirmationResult: ConfirmationResult | null = null;

export function formatPhoneNumber(phone: string) {
  let value = phone.trim();

  if (value.startsWith('0')) {
    value = '+90' + value.substring(1);
  }

  return value;
}

export async function sendPhoneOTP(phone: string, verifier: RecaptchaVerifier) {
  if (!auth.currentUser) {
    throw new Error('User not authenticated.');
  }

  await auth.currentUser.reload();

  confirmationResult = await linkWithPhoneNumber(
    auth.currentUser,
    formatPhoneNumber(phone),
    verifier,
  );

  return true;
}

export async function confirmPhoneOTP(code: string) {
  if (!confirmationResult) {
    throw new Error('No verification request found.');
  }

  await confirmationResult.confirm(code);

  confirmationResult = null;
}

export async function unlinkPhoneNumber() {
  const user = auth.currentUser;

  if (!user) return;

  const hasPhoneProvider = user.providerData.some(
    (provider) => provider.providerId === 'phone',
  );

  if (!hasPhoneProvider) return;

  await unlink(user, 'phone');
}
