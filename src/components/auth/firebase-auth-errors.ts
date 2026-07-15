import { Translator } from '@/schemas/create-schema';
import { FirebaseError } from 'firebase/app';

export function getFirebaseAuthError(error: unknown, t: Translator): string {
  if (!(error instanceof FirebaseError)) {
    return t('auth.somethingWentWrong');
  }

  switch (error.code) {
    case 'auth/email-already-in-use':
      return t('auth.anAccountAlreadyExists');

    case 'auth/invalid-email':
      return t('auth.pleaseEnterValidEmail');

    case 'auth/weak-password':
      return t('auth.passwordShouldBe6Characters');

    case 'auth/network-request-failed':
      return t('auth.networkError');

    default:
      return t('auth.invalidEmailorPassword');
  }
}
