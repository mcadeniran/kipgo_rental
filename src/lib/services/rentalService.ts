import { db } from '@/app/[locale]/firebase/config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { rentalShopConverter } from '../converters/rentalShopConverter';
import { RentalShop } from '@/app/[locale]/models/RentalShop';

// ✅ Get All Rental Shops
export async function getAllRentalShops(): Promise<RentalShop[]> {
  const q = query(
    collection(db, 'rentalShops'),
    where('isActive', '==', true),
    orderBy('name', 'asc'),
  ).withConverter(rentalShopConverter);

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.data());
}

// ✅ Get Rental Shop By ID
export async function getRentalShopById(
  id: string,
): Promise<RentalShop | null> {
  const ref = doc(db, 'rentalShops', id).withConverter(rentalShopConverter);

  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

// ✅ Get Only Active Rental Shops
export async function getActiveRentalShops(): Promise<RentalShop[]> {
  const ref = collection(db, 'rentalShops').withConverter(rentalShopConverter);

  const q = query(ref, where('isActive', '==', true));
  const snaps = await getDocs(q);

  return snaps.docs.map((doc) => doc.data());
}

export async function getFeaturedShops(): Promise<RentalShop[]> {
  const q = query(
    collection(db, 'rentalShops'),
    where('isFeatured', '==', true),
    where('isActive', '==', true),
  ).withConverter(rentalShopConverter);

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.data());
}
