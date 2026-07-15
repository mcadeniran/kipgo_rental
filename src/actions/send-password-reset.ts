'use server';

import { auth } from '@/app/[locale]/firebase/config';
import { Translator } from '@/schemas/create-schema';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useTranslations } from 'next-intl';

export const sendPasswordReset = async (email: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t: Translator = useTranslations();
  try {
    await sendPasswordResetEmail(auth, email);

    return {
      success: true,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);

    switch (error.code) {
      case 'auth/user-not-found':
        return {
          success: false,
          message: t('profile.userNotFound'),
        };

      case 'auth/too-many-requests':
        return {
          success: false,
          message: t('profile.tooManyAttempts'),
        };

      default:
        return {
          success: false,
          message: t('profile.unableToSend'),
        };
    }
  }
};
