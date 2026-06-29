import { db } from '@/app/[locale]/firebase/config';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from 'firebase/firestore';

import { CarUnit } from '@/app/[locale]/models/CarUnit';
import { carUnitConverter } from '../converters/carUnitConverter';

// Get all units for a car
export async function getCarUnits(carId: string): Promise<CarUnit[]> {
  const ref = collection(db, 'cars', carId, 'units').withConverter(
    carUnitConverter,
  );

  const q = query(ref, where('status', '==', 'available'));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.data());
}

// Get single unit
export async function getCarUnitById(
  carId: string,
  unitId: string,
): Promise<CarUnit | null> {
  const ref = doc(db, 'cars', carId, 'units', unitId).withConverter(
    carUnitConverter,
  );

  const snap = await getDoc(ref);

  return snap.exists() ? snap.data() : null;
}
