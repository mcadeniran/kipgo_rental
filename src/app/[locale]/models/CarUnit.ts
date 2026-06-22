import { Timestamp } from 'firebase/firestore';

export interface CarUnit {
  id: string;

  carId: string;

  numberPlate: string;

  colour: string;

  status: 'available' | 'maintenance';

  createdAt: Timestamp;
}
