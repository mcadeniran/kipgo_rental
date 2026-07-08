"use client";

import {Rating} from "@/types/ratings";
import {cn} from "@/lib/utils";
import ReviewCard from "./ReviewCard";

export interface ReviewsListProps {
  reviews: Rating[];
  className?: string;
}

export default function ReviewsList({
  reviews,
  className,
}: ReviewsListProps) {
  return (
    <div
      className={cn(
        "space-y-2",
        className,
      )}
    >
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          className="rounded-2xl
        border-0
        px-0
py-0
        shadow-none
        animate-in
        fade-in
        duration-300"
        />
      ))}
    </div>
  );
}