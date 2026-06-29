import { Renter } from '@/app/[locale]/models/Renter';
import { FirestoreDataConverter } from 'firebase/firestore';

export const renterConverter: FirestoreDataConverter<Renter> = {
  toFirestore(renter: Renter) {
    return {
      id: renter.id,
      name: renter.name,
      licenseName: renter.licenseName,
      email: renter.email,
      phone: renter.phone,
      gender: renter.gender,
      dob: renter.dob,
      licenseFrontUrl: renter.licenseFront,
      licenseBack: renter.licenseBack,
      idCard: renter.idCard,
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data.name,
      licenseName: data.licenseName,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      dob: data.dob,
      licenseFront: data.licenseFront,
      licenseBack: data.licenseBack,
      idCard: data.idCard,
    };
  },
};
