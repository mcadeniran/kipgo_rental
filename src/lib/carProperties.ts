export type CarType =
  | 'Economy'
  | 'Sedan'
  | 'SUV'
  | 'Luxury'
  | 'Sports'
  | 'Pickup'
  | 'Van';

export type TransmissionType = 'Manual' | 'Automatic';
export const carTypes = [
  'Economy',
  'Sedan',
  'SUV',
  'Luxury',
  'Sports',
  'Pickup',
  'Van',
];

export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';

export const fuelOptions = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];

export const transmissionOptions = [
  'Manual',
  'Automatic',
  // 'Continuously Variable',
  // 'Dual-Clutch',
  // 'Automated Manual Transmission',
  // 'Intelligent Manual Transmission',
];
