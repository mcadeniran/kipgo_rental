"use client";

import RatingStars from "@/components/ratings/shared/RatingStars";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {RatingDistribution} from "@/types/ratings";
import RatingDistributionComponent from "./RatingDistribution";

interface RatingSummaryProps {
  average: number;
  totalReviews: number;
  recommendationRate: number;
  distribution: RatingDistribution;
}

export default function RatingSummary({
  average,
  totalReviews,
  recommendationRate,
  distribution,
}: RatingSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Overall Rating
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {/* Overall */}

        <div className="flex flex-col items-center gap-2">
          <RatingStars
            value={average}
            readonly
            size="md"
          />

          <div className="text-2xl font-bold  leading-none">
            {average.toFixed(1)}
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Based on{" "}
            <span className="font-medium">
              {totalReviews}
            </span>{" "}
            verified reviews
          </p>
        </div>

        {/* Recommendation */}

        <div className="rounded-lg border bg-muted/40 p-2 text-center">
          <p className="text-sm font-medium">
            {recommendationRate.toFixed(0)}%
          </p>

          <p className="text-xs text-muted-foreground">
            would recommend this vehicle
          </p>
        </div>

        {/* Histogram */}

        <RatingDistributionComponent
          distribution={distribution}
          totalReviews={totalReviews}
        />
      </CardContent>
    </Card>
  );
}