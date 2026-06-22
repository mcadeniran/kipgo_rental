import { Timestamp } from 'firebase/firestore';

export interface Car {
  id: string;

  shopId: string;

  brand: string;
  model: string;

  year: number;

  transmission: string;
  fuel: string;

  seats: number;

  carType: string;

  features?: string[];

  deposit: number;

  pricePerDay: number;

  images: {
    url: string;
    isCover: boolean;
  }[];

  city: string;
  district: string;
  address: string;

  location?: {
    lat: number;
    lng: number;
  };

  offersDelivery: boolean;
  deliveryPrice?: number;

  totalUnits: number;
  availableUnits: number;

  shop?: {
    name: string;
    rating: number;
    logo: string;
    rules: {
      securityDeposit: string;
      fuelPolicy: string;
      mileageLimit: string;
      insurance: string;
      lateReturn: string;
      cancellation: string;
    };
    email: string;
    phone: string;
  };

  currency: string;
  isVisible: boolean;
  isFeatured?: boolean;
  featured?: {
    startAt: Date;
    endAt: Date;
  };

  isApproved?: boolean;
  createdAt: Timestamp;

  rating: number;
  totalRatings: number;
}
