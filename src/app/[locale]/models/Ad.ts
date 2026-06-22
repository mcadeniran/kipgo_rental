// lib/models/ad.ts
import { FirestoreDataConverter, Timestamp } from 'firebase/firestore';

export interface Ad {
  id: string;
  title: string;
  linkUrl: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  description?: string;
  bannerUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const adConverter: FirestoreDataConverter<Ad> = {
  toFirestore(ad: Ad) {
    return {
      title: ad.title,
      linkUrl: ad.linkUrl,
      startDate: ad.startDate,
      endDate: ad.endDate,
      isActive: ad.isActive,
      description: ad.description,
      bannerUrl: ad.bannerUrl,
      createdAt: ad.createdAt ?? new Date(),
      updatedAt: new Date(),
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      title: data.title,
      linkUrl: data.linkUrl,
      startDate: (data.startDate as Timestamp).toDate(),
      endDate: (data.endDate as Timestamp).toDate(),
      isActive: data.isActive,
      description: data.description,
      bannerUrl: data.bannerUrl,
      createdAt: data.createdAt
        ? (data.createdAt as Timestamp).toDate()
        : undefined,
      updatedAt: data.updatedAt
        ? (data.updatedAt as Timestamp).toDate()
        : undefined,
    } as Ad;
  },
};
