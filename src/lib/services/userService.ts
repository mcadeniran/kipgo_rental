import { db } from '@/app/[locale]/firebase/config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { userProfileConverter } from '../converters/userProfileConverter';
import { UserProfile } from '@/app/[locale]/models/UserProfile';
import { getAuth } from 'firebase/auth';

// Get Current User Profile
export async function getCurrentUserProfile(): Promise<UserProfile | null> {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return null;

  const ref = doc(db, 'profiles', user.uid).withConverter(userProfileConverter);
  const snap = await getDoc(ref);

  return snap.exists() ? snap.data() : null;
}

// Get User Profile by UID
export async function getUserProfileById(
  uid: string,
): Promise<UserProfile | null> {
  if (!uid) return null;

  const ref = doc(db, 'profiles', uid).withConverter(userProfileConverter);
  const snap = await getDoc(ref);

  return snap.exists() ? snap.data() : null;
}
