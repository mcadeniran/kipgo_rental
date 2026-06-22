import { db } from '@/app/[locale]/firebase/config';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  serverTimestamp,
  Timestamp,
  runTransaction,
} from 'firebase/firestore';

import { CarUnit } from '@/app/[locale]/models/CarUnit';
import { carUnitConverter } from '../converters/carUnitConverter';
import { Car } from '@/app/[locale]/models/Car';

// Create Car Unit
export async function createCarUnit(
  carId: string,
  unit: Omit<CarUnit, 'id' | 'createdAt' | 'carId'>,
) {
  const carRef = doc(db, 'cars', carId);
  const unitRef = doc(collection(db, 'cars', carId, 'units'));

  await runTransaction(db, async (transaction) => {
    const carSnap = await transaction.get(carRef);

    if (!carSnap.exists()) {
      throw new Error('Car not found');
    }

    const carData = carSnap.data();

    const totalUnits = carData.totalUnits || 0;
    const availableUnits = carData.availableUnits || 0;

    const newUnit: CarUnit = {
      ...unit,
      id: unitRef.id,
      carId,
      createdAt: serverTimestamp() as Timestamp,
    };

    transaction.set(unitRef, newUnit);

    if (unit.status === 'available') {
      transaction.update(carRef, {
        totalUnits: totalUnits + 1,
        availableUnits: availableUnits + 1,
      });
    } else {
      transaction.update(carRef, {
        totalUnits: totalUnits + 1,
      });
    }
  });

  return unitRef.id;
}

export async function updateCarUnit(
  carId: string,
  unitId: string,
  updates: Partial<Omit<CarUnit, 'id' | 'carId' | 'createdAt'>>,
) {
  const carRef = doc(db, 'cars', carId);
  const unitRef = doc(db, 'cars', carId, 'units', unitId);

  await runTransaction(db, async (transaction) => {
    const [carSnap, unitSnap] = await Promise.all([
      transaction.get(carRef),
      transaction.get(unitRef),
    ]);

    if (!carSnap.exists()) {
      throw new Error('Car not found');
    }

    if (!unitSnap.exists()) {
      throw new Error('Unit not found');
    }

    const carData = carSnap.data();
    const unitData = unitSnap.data() as CarUnit;

    // const totalUnits = carData.totalUnits || 0;
    const availableUnits = carData.availableUnits || 0;

    const oldStatus = unitData.status;
    const newStatus = updates.status ?? oldStatus;

    let availableChange = 0;

    if (oldStatus !== newStatus) {
      if (oldStatus === 'available' && newStatus !== 'available') {
        availableChange = -1;
      }

      if (oldStatus !== 'available' && newStatus === 'available') {
        availableChange = +1;
      }
    }

    transaction.update(unitRef, {
      ...updates,
      updatedAt: serverTimestamp() as Timestamp,
    });

    if (availableChange !== 0) {
      transaction.update(carRef, {
        availableUnits: availableUnits + availableChange,
      });
    }
  });
}

export async function deleteCarUnit(carId: string, unitId: string) {
  const carRef = doc(db, 'cars', carId);
  const unitRef = doc(db, 'cars', carId, 'units', unitId);

  await runTransaction(db, async (transaction) => {
    const [carSnap, unitSnap] = await Promise.all([
      transaction.get(carRef),
      transaction.get(unitRef),
    ]);

    if (!carSnap.exists()) {
      throw new Error('Car not found');
    }

    if (!unitSnap.exists()) {
      throw new Error('Unit not found');
    }

    const carData = carSnap.data();
    const unitData = unitSnap.data() as CarUnit;

    const totalUnits = carData.totalUnits || 0;
    const availableUnits = carData.availableUnits || 0;

    const updates: Partial<Car> = {
      totalUnits: totalUnits - 1,
    };

    if (unitData.status === 'available') {
      updates.availableUnits = availableUnits - 1;
    }

    transaction.delete(unitRef);

    transaction.update(carRef, updates);
  });
}

// Get all units for a car
export async function getCarUnits(carId: string): Promise<CarUnit[]> {
  const ref = collection(db, 'cars', carId, 'units').withConverter(
    carUnitConverter,
  );

  const snaps = await getDocs(ref);

  return snaps.docs.map((doc) => doc.data());
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
