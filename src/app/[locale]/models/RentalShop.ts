export interface RentalShop {
  id: string;
  name: string;
  email: string;
  bannerUrl: string;
  role: 'rental_admin';
  isActive: boolean;
  createdAt: Date;
  logoUrl: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  offersDelivery: boolean;
  description: string;
  rating: number;
  isFeatured?: boolean;
  currency: string;
  taxRate: number;
  commissionPercentage: number;
  totalRatings: number;
  featured?: {
    startAt: Date;
    endAt: Date;
  };
  discount?: {
    type: 'percentage' | 'fixed';
    value: number;
    isActive: boolean;
    startAt: Date;
    endAt: Date;
  };

  review?: {
    average: number;
    communication: number;
    communicationTotal: number;
    overall: number;
    overallTotal: number;
    pickupExperience: number;
    pickupExperienceTotal: number;
    professionalism: number;
    professionalismTotal: number;
    recommendationCount: number;
    recommendationRate: number;
    returnExperience: number;
    returnExperienceTotal: number;
    totalReviews: number;
    distribution: {
      five: number;
      four: number;
      three: number;
      two: number;
      one: number;
    };
  };

  location?: {
    lat: number;
    lng: number;
  };

  rules: {
    securityDeposit: string;
    fuelPolicy: string;
    mileageLimit: string;
    insurance: string;
    lateReturn: string;
    cancellation: string;
  };
}
