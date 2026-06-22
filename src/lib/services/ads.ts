import { db } from '@/app/[locale]/firebase/config';
import { Ad, adConverter } from '@/app/[locale]/models/Ad';
import { collection, getDocs } from 'firebase/firestore';

// const adsCollection = collection(db, 'ads').withConverter(adConverter);

export async function getAds(): Promise<Ad[]> {
  const now = new Date();

  const snapshot = await getDocs(
    collection(db, 'ads').withConverter(adConverter),
  );

  return snapshot.docs
    .map((doc) => doc.data())
    .filter((ad) => ad.isActive && ad.startDate <= now && ad.endDate >= now);
}
