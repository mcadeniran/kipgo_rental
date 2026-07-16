import {Car} from "@/app/[locale]/models/Car";
import {Icon} from "@iconify/react";

export function CarRatingPreview({review}: {review: Car['review'];}) {
  if (!review)
    return;

  // console.log(review);

  return <div className="flex items-center gap-1 text-xs font-light">
    <Icon icon="ic:sharp-star"
      width={16}
      className="text-amber-400"
    />
    {review.average.toFixed(1)}{' '}({review.totalReviews})
  </div>;
}