import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import {
  getReviews,
  ReviewSort,
  ReviewsPage,
} from '../services/ratings/getReviews';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export interface UseInfiniteReviewsProps {
  carId?: string;
  shopId?: string;

  sort?: ReviewSort;

  enabled?: boolean;

  pageSize?: number;
}

type Cursor = QueryDocumentSnapshot<DocumentData> | null;

export function useInfiniteReviews({
  carId,
  shopId,
  sort = 'newest',
  enabled = true,
  pageSize = 10,
}: UseInfiniteReviewsProps) {
  const query = useInfiniteQuery<
    ReviewsPage,
    Error,
    InfiniteData<ReviewsPage>,
    (string | undefined)[],
    Cursor
  >({
    queryKey: ['reviews', carId, shopId, sort],

    enabled,

    initialPageParam: null,

    queryFn: ({ pageParam }: { pageParam: Cursor }) =>
      getReviews({
        carId,
        shopId,
        sort,
        limit: pageSize,
        lastDoc: pageParam,
      }),

    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.lastDoc : undefined,
  });

  // const reviews = query.data?.pages.flatMap((page) => page.reviews) ?? [];
  const reviews =
    query.data?.pages.flatMap((page: ReviewsPage) => page.reviews) ?? [];

  return {
    ...query,
    reviews,
  };
}

export default useInfiniteReviews;
