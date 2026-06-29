export interface BookingDraft {
  pickupDate?: Date;
  dropoffDate?: Date;
  pickupTime?: string;
  dropoffTime?: string;
  deliveryType: 'pickup' | 'delivery';
  deliveryAddress: string;
  driverId?: string;
  paymentMethod: 'crypto' | 'payOnPickup';
  note?: string;

  driver?: {
    id?: string;
    action?: 'existing' | 'create' | 'update';
    mode: 'saved' | 'new';
    name: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    licenseFront?: string;
    licenseBack?: string;
    idCard?: string;
  };

  driverDocuments?: {
    licenseFront?: File;
    licenseBack?: File;
    idCard?: File;
    licenseFrontUrl?: string;
    licenseBackUrl?: string;
    idCardUrl?: string;
  };
}
