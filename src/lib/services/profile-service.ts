import { db } from '@/app/[locale]/firebase/config';

import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

import { UserProfile } from '@/app/[locale]/models/UserProfile';
import {
  deleteImageFromStorage,
  uploadFile,
} from '@/app/[locale]/firebase/storage';
import { getUserProfileById } from './userService';
import { unlinkPhoneNumber } from './phoneVerificationService';

export async function updateProfile(uid: string, data: Partial<UserProfile>) {
  const ref = doc(db, 'profiles', uid);

  await updateDoc(ref, data);
}

export async function updatePersonalInformation(
  uid: string,
  input: {
    firstName: string;
    lastName: string;
    phone: string;
  },
) {
  const profile = await getUserProfileById(uid);
  if (!profile) throw new Error('Profile not found.');

  const phoneChanged = profile.personal.phone !== input.phone;

  if (phoneChanged) {
    await unlinkPhoneNumber();
  }

  await updateDoc(doc(db, 'profiles', uid), {
    'personal.firstName': input.firstName,
    'personal.lastName': input.lastName,
    'personal.phone': input.phone,
    ...(phoneChanged && {
      'personal.isPhoneVerified': false,
    }),
  });
}

export async function uploadAvatar(uid: string, file: File, oldUrl?: string) {
  const url = await uploadFile(`files/${uid}`, file);

  await updateDoc(doc(db, 'profiles', uid), {
    'personal.photoUrl': url,
  });

  if (oldUrl) {
    try {
      await deleteImageFromStorage(oldUrl);
    } catch {
      // Ignore cleanup errors
    }
  }

  return url;
}

export async function verifyPhoneNumber(uid: string) {
  await updateDoc(doc(db, 'profiles', uid), {
    'personal.isPhoneVerified': true,
  });
}

export async function markPhoneVerified(uid: string) {
  await updateDoc(doc(db, 'profiles', uid), {
    'personal.isPhoneVerified': true,
    'personal.phoneVerifiedAt': serverTimestamp(),
  });
}
