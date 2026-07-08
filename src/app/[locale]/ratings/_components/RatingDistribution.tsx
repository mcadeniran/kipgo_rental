"use client";

import {DISTRIBUTION_ITEMS} from "@/lib/helper/defaultRating";
import DistributionRow from "./DistributionRow";
import {RatingDistribution} from "@/types/ratings";


interface RatingDistributionProps {
  distribution: RatingDistribution;
  totalReviews: number;
}

export default function RatingDistributionComponent({
  distribution,
  totalReviews,
}: RatingDistributionProps) {
  return (
    <div className="space-y-3">
      {DISTRIBUTION_ITEMS.map((item) => (
        <DistributionRow
          key={item.key}
          stars={item.stars}
          count={distribution[item.key]}
          total={totalReviews}
        />
      ))}
    </div>
  );
}