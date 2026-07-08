export interface Vehicle {
  model: string;
  carImage: string;
  numberPlate: string;
  colour: string;
  licence: string;
  registrationUrl: string;
  licenceUrl: string;
  selfieUrl: string;
  registrationStatus: string;
  licenceStatus: string;
  selfieStatus: string;
  registrationText: string;
  licenceText: string;
  selfieText: string;
}

export interface Account {
  isOnline: boolean;
  isProfileCompleted: boolean;
  isApproved: boolean;
  emailVerified: boolean;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface Review {
  rating: number;
  userName: string;
  details: string;
  reviewerId: string;
  reviewerName: string;
  reviewerPhotoUrl: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface Personal {
  firstName: string;
  lastName: string;
  photoUrl: string;
  rating?: number;
  phone: string;
  reviews: Review[];
  isPhoneVerified?: boolean;
}

export interface UserProfile {
  id: string;
  role: 'driver' | 'rider';
  email: string;
  username: string;
  isAdmin: boolean;
  token: string;
  vehicle: Vehicle;
  account: Account;
  personal: Personal;
  drives: [];
  rides: [];
}
