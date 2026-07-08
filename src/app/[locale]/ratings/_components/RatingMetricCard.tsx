"use client";

import RatingStars from "@/components/ratings/shared/RatingStars";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {cn} from "@/lib/utils";

interface RatingMetricCardProps {
  label: string;
  value: number;
  className?: string;
}

export default function RatingMetricCard({
  label,
  value,
  className,
}: RatingMetricCardProps) {
  return (
    <Card className={cn("h-full", className)}>
      <CardContent className="flex h-full flex-col justify-between gap-4 px-4 py-0">
        <h4 className="text-sm font-medium text-muted-foreground">
          {label}
        </h4>

        <div className="space-y-2">
          <div className="text-3xl font-bold">
            {value.toFixed(1)}
          </div>

          <RatingStars
            readonly
            value={value}
            size="sm"
          />
        </div>
      </CardContent>
    </Card>
  );
}