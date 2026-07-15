import { auth } from '@/app/[locale]/firebase/config';
import {
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
} from 'firebase/auth';

export interface DeleteAccountInput {
  email: string;
  password: string;
}

export async function deleteAccount({ email, password }: DeleteAccountInput) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('noAuthenticatedUser');
  }

  const credential = EmailAuthProvider.credential(email, password);

  await reauthenticateWithCredential(user, credential);

  await deleteUser(user);

  return true;
}
