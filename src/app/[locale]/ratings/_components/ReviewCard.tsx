"use client";

import {Card, CardContent} from "@/components/ui/card";

import {cn} from "@/lib/utils";

import {Rating} from "@/types/ratings";
import ReviewHeader from "./ReviewHeader";
import ReviewBadges from "./ReviewBadges";
import ReviewTags from "./ReviewTags";
import ReviewGallery from "./ReviewGallery";


interface ReviewCardProps {
  review: Rating;
  className?: string;
}

export default function ReviewCard({
  review,
  className,
}: ReviewCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="space-y-4 p-4 sm:p-5">

        <ReviewHeader
          rating={review.vehicle.overall}
          title={review.details.title}
          reviewer={review.createdBy.name}
          anonymous={review.details.isAnonymous}
          createdAt={review.createdAt}
        />

        <ReviewBadges
          verified
          recommended={review.details.wouldRecommend}
          wouldRentAgain={review.details.wouldRentAgain}
        />

        <p className="whitespace-pre-line text-sm leading-6 text-muted-foreground">
          {review.details.review}
        </p>

        {(review.details.pros.length > 0 ||
          review.details.cons.length > 0) && (
            <ReviewTags
              pros={review.details.pros}
              cons={review.details.cons}
            />
          )}

        {review.details.photos.length > 0 && (
          <ReviewGallery
            photos={review.details.photos}
          />
        )}

      </CardContent>
    </Card>
  );
}