import { db } from '@/app/[locale]/firebase/config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import { Car } from '@/app/[locale]/models/Car';
import { carConverter } from '../converters/carConverter';
import { getRentalShopById } from './rentalService';

// Get All Cars
export async function getAllCars(): Promise<Car[]> {
  const ref = collection(db, 'cars').withConverter(carConverter);

  const q = query(
    ref,
    where('isVisible', '==', true),
    where('availableUnits', '>', 0),
  );

  const snaps = await getDocs(q);

  return snaps.docs.map((doc) => doc.data());
}

// Get Cars by Shop
export async function getCarsByShop(shopId: string): Promise<Car[]> {
  const ref = collection(db, 'cars').withConverter(carConverter);

  const q = query(
    ref,
    where('shopId', '==', shopId),
    where('isVisible', '==', true),
    where('availableUnits', '>', 0),
  );

  const snaps = await getDocs(q);

  return snaps.docs.map((doc) => doc.data());
}

// Get Car by Id
export async function getCarById(id: string): Promise<Car | null> {
  const ref = doc(db, 'cars', id).withConverter(carConverter);

  const snap = await getDoc(ref);

  return snap.exists() ? snap.data() : null;
}

export async function getFeaturedCars(): Promise<Car[]> {
  const q = query(
    collection(db, 'cars'),
    where('isFeatured', '==', true),
    where('isVisible', '==', true),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Car[];
}

export async function getCarWithShop(carId: string) {
  const car = await getCarById(carId);

  if (!car) {
    throw new Error('Car not found');
  }

  const shop = await getRentalShopById(car.shopId);

  return {
    car,
    shop,
  };
}
