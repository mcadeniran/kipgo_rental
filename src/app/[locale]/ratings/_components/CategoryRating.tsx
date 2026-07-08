"use client";


import RatingStars from "@/components/ratings/shared/RatingStars";
import {cn} from "@/lib/utils";

interface CategoryRatingProps {
  label: string;
  value: number;
  className?: string;
}

export default function CategoryRating({
  label,
  value,
  className,
}: CategoryRatingProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 py-3",
        className,
      )}
    >
      <span className="text-sm font-medium">
        {label}
      </span>

      <div className="flex items-center gap-3">
        <RatingStars
          readonly
          value={value}
          size="sm"
        />

        <span className="w-8 text-right text-sm font-semibold">
          {value.toFixed(1)}
        </span>
      </div>
    </div>
  );
}