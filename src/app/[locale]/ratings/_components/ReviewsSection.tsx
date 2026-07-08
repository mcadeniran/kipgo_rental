"use client";

import useInfiniteReviews from "@/lib/helper/useInfiniteReviews";
import {ReviewSort} from "@/lib/services/ratings/getReviews";
import {cn} from "@/lib/utils";
import ReviewsLoading from "./ReviewSkeleton";
import ReviewsEmpty from "./ReviewsEmpty";
import ReviewsList from "./ReviewsList";
import LoadMoreTrigger from "./LoadMoreTrigger";


export interface ReviewsSectionProps {
  carId?: string;
  shopId?: string;

  pageSize?: number;

  sort?: ReviewSort;

  className?: string;

  emptyTitle?: string;

  emptyDescription?: string;
  showLoadMore?: boolean;

  limit?: number;
}

export default function ReviewsSection({
  carId,
  shopId,
  sort = "newest",
  pageSize = 10,
  className,
  emptyTitle,
  emptyDescription,
  showLoadMore,
  limit
}: ReviewsSectionProps) {
  const {
    reviews,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteReviews({
    carId,
    shopId,
    sort,
    pageSize,
  });

  if (isLoading) {
    return <ReviewsLoading />;
  }

  const displayedReviews = limit
    ? reviews.slice(0, limit)
    : reviews;

  if (isError) {
    return (
      <div className="rounded-xl border  border-destructive/20 bg-destructive/5 p-6 text-center">
        <p className="text-sm text-destructive">
          {error instanceof Error
            ? error.message
            : "Unable to load reviews."}
        </p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return <ReviewsEmpty
      title={emptyTitle}
      description={emptyDescription}
    />;
  }

  return (
    <div className={cn("space-y-2", className)}>
      <ReviewsList reviews={displayedReviews} />

      {showLoadMore && hasNextPage && (
        <>
          {isFetchingNextPage && (
            <ReviewsLoading count={1} />
          )}

          <LoadMoreTrigger
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        </>
      )}
    </div>
  );
}