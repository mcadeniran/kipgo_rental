import { db } from '@/app/[locale]/firebase/config';
import { Renter } from '@/app/[locale]/models/Renter';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';

export async function createRenter(
  renter: {
    name: string;
    licenseName: string;
    email: string;
    phone: string;
    gender: string;
    dob: string;
    licenseFront: string;
    licenseBack: string;
    idCard: string;
  },
  userId: string,
): Promise<Renter> {
  const ref = await addDoc(
    collection(db, 'profiles', userId, 'renters'),
    renter,
  );

  return {
    ...renter,
    id: ref.id,
  };
}

export async function updateRenter(
  userId: string,
  renterId: string,
  renter: Partial<Renter>,
): Promise<Renter> {
  await updateDoc(doc(db, 'profiles', userId, 'renters', renterId), renter);

  return {
    id: renterId,
    ...renter,
  } as Renter;
}
