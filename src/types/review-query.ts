export type ReviewSort = 'newest' | 'oldest' | 'highest' | 'lowest';

export interface ReviewQuery {
  carId?: string;

  shopId?: string;

  /**
   * Filter by overall rating (1–5 stars).
   */
  rating?: number;

  /**
   * Show only recommended reviews.
   */
  recommendedOnly?: boolean;

  /**
   * Show only reviews with uploaded photos.
   */
  withPhotos?: boolean;

  /**
   * Show only reviews where the renter
   * says they'd rent again.
   */
  wouldRentAgain?: boolean;

  /**
   * Sort order.
   */
  sort: ReviewSort;

  /**
   * Number of reviews fetched per page.
   */
  limit: number;
}

export const defaultReviewQuery: Pick<ReviewQuery, 'sort' | 'limit'> = {
  sort: 'newest',
  limit: 10,
};
