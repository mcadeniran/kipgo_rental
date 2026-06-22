import { Review, UserProfile } from '@/app/[locale]/models/UserProfile';
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

export const userProfileConverter: FirestoreDataConverter<UserProfile> = {
  toFirestore(user: UserProfile): DocumentData {
    return { ...user };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): UserProfile {
    const data = snapshot.data(options)!;

    // Safely handle reviews
    const reviews: Review[] = (data.personal?.reviews ?? []) as Review[];

    // Calculate rating
    const rating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
        : 0;
    return {
      id: snapshot.id,
      ...data,
      personal: {
        ...data.personal,
        reviews,
        rating, // inject calculated rating here
      },
    } as UserProfile;
  },
};
