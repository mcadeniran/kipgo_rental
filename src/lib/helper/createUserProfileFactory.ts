import { UserProfile } from '@/app/[locale]/models/UserProfile';

interface CreateUserProfileInput {
  uid: string;
  email: string;
  username: string;
  language?: string;
}

export function createUserProfileFactory({
  uid,
  email,
  username,
  language = 'en',
}: CreateUserProfileInput): UserProfile {
  return {
    id: uid,

    email,

    username,

    isAdmin: false,

    role: 'rider',

    drives: [],

    rides: [],

    token: '',

    newRideStatus: 'idle',

    language,

    personal: {
      firstName: '',
      lastName: '',
      photoUrl: '',
      reviews: [],
      phone: '',
      isPhoneVerified: false,
    },

    vehicle: {
      numberPlate: '',
      colour: '',
      licence: '',
      model: '',
      registrationUrl: '',
      selfieUrl: '',
      licenceUrl: '',
      registrationStatus: '',
      registrationText: '',
      licenceStatus: '',
      licenceText: '',
      selfieStatus: '',
      selfieText: '',
      carImage: '',
    },

    account: {
      isOnline: true,
      isProfileCompleted: false,
      isApproved: true,
      createdAt: {
        seconds: new Date(),
        nanoseconds: new Date(),
      },

      // NEW
      emailVerified: false,
    },
  };
}
