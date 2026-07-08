import { FirebaseError } from 'firebase/app';

export function getFirebaseAuthError(error: unknown): string {
  if (!(error instanceof FirebaseError)) {
    return 'Something went wrong.';
  }

  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'An account already exists with this email.';

    case 'auth/invalid-email':
      return 'Please enter a valid email address.';

    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';

    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';

    default:
      return 'Unable to complete your request.';
  }
}
