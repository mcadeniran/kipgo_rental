import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  QueryConstraint,
  QueryDocumentSnapshot,
  DocumentData,
  startAfter,
  where,
} from 'firebase/firestore';

import { db } from '@/app/[locale]/firebase/config';
import { Rating } from '@/types/ratings';

export type ReviewSort = 'newest' | 'oldest' | 'highest' | 'lowest';

export interface GetReviewsInput {
  carId?: string;
  shopId?: string;

  limit?: number;

  sort?: ReviewSort;

  lastDoc?: QueryDocumentSnapshot<DocumentData> | null;
}

export interface ReviewsPage {
  reviews: Rating[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}

function toRating(snapshot: QueryDocumentSnapshot<DocumentData>): Rating {
  return snapshot.data() as Rating;
}

function buildQuery(input: GetReviewsInput): QueryConstraint[] {
  const constraints: QueryConstraint[] = [];

  if (input.carId) {
    constraints.push(where('carId', '==', input.carId));
  }

  if (input.shopId) {
    constraints.push(where('shopId', '==', input.shopId));
  }

  switch (input.sort) {
    case 'oldest':
      constraints.push(orderBy('createdAt', 'asc'));
      break;

    case 'highest':
      constraints.push(orderBy('vehicle.overall', 'desc'));
      break;

    case 'lowest':
      constraints.push(orderBy('vehicle.overall', 'asc'));
      break;

    default:
      constraints.push(orderBy('createdAt', 'desc'));
      break;
  }

  return constraints;
}

export async function getReviews(input: GetReviewsInput): Promise<ReviewsPage> {
  const pageSize = input.limit ?? 10;

  const constraints = buildQuery(input);

  const reviewsRef = collection(db, 'carRatings');

  const q = query(
    reviewsRef,
    ...constraints,
    ...(input.lastDoc ? [startAfter(input.lastDoc)] : []),
    limit(pageSize),
  );

  const snapshot = await getDocs(q);

  const reviews = snapshot.docs.map(toRating);

  const lastDoc =
    snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;

  return {
    reviews,
    lastDoc,
    hasMore: snapshot.docs.length === pageSize,
  };
}
