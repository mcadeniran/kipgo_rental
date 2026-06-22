import { FirestoreDataConverter, Timestamp } from 'firebase/firestore';
import { CarUnit } from '@/app/[locale]/models/CarUnit';

export const carUnitConverter: FirestoreDataConverter<CarUnit> = {
  toFirestore(unit: CarUnit) {
    return {
      carId: unit.carId,
      numberPlate: unit.numberPlate,
      colour: unit.colour,
      status: unit.status,
      createdAt: unit.createdAt,
    };
  },

  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      carId: data.carId,
      numberPlate: data.numberPlate,
      colour: data.colour,
      status: data.status,
      createdAt: data.createdAt as Timestamp,
    };
  },
};
