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

// ✅ Get ALL users
export async function getAllUsers(): Promise<UserProfile[]> {
  const ref = collection(db, 'profiles').withConverter(userProfileConverter);
  const snaps = await getDocs(ref);
  return snaps.docs.map((doc) => doc.data());
}

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

// ✅ Get only Drivers
export async function getDrivers(): Promise<UserProfile[]> {
  const ref = collection(db, 'profiles').withConverter(userProfileConverter);
  const q = query(ref, where('role', '==', 'driver'));
  const snaps = await getDocs(q);
  return snaps.docs.map((doc) => doc.data());
}

// Only approved drivers
export async function getApprovedDrivers(): Promise<UserProfile[]> {
  const ref = collection(db, 'profiles').withConverter(userProfileConverter);
  const q = query(
    ref,
    where('role', '==', 'driver'),
    where('account.isApproved', '==', true),
  );
  const snaps = await getDocs(q);
  return snaps.docs.map((doc) => doc.data());
}

// Only unapproved drivers
export async function getUnapprovedDrivers(): Promise<UserProfile[]> {
  const ref = collection(db, 'profiles').withConverter(userProfileConverter);
  const q = query(
    ref,
    where('role', '==', 'driver'),
    where('account.isApproved', '==', false),
  );
  const snaps = await getDocs(q);
  return snaps.docs.map((doc) => doc.data());
}

// ✅ Get only Riders
export async function getRiders(): Promise<UserProfile[]> {
  const ref = collection(db, 'profiles').withConverter(userProfileConverter);
  const q = query(ref, where('role', '==', 'rider'));
  const snaps = await getDocs(q);
  return snaps.docs.map((doc) => doc.data());
}

export async function getAdmins(): Promise<UserProfile[]> {
  const ref = collection(db, 'profiles').withConverter(userProfileConverter);
  const q = query(ref, where('isAdmin', '==', true));
  const snaps = await getDocs(q);
  return snaps.docs.map((doc) => doc.data());
}

export const makeAdmin = async (userId: string) => {
  const ref = doc(db, 'profiles', userId);
  await updateDoc(ref, { isAdmin: true });
};

export const removeAdmin = async (userId: string) => {
  const ref = doc(db, 'profiles', userId);
  await updateDoc(ref, { isAdmin: false });
};
