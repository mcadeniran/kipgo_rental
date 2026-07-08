"use client";

import {Timestamp} from "firebase/firestore";
import {format} from "date-fns";
import RatingStars from "@/components/ratings/shared/RatingStars";


export interface ReviewHeaderProps {
  rating: number;
  title: string;
  reviewer: string;
  anonymous?: boolean;
  createdAt: Timestamp;
}

export default function ReviewHeader({
  rating,
  title,
  reviewer,
  anonymous = false,
  createdAt,
}: ReviewHeaderProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <RatingStars
          readonly
          value={rating}
          size="sm"
        />

        <span className="text-sm text-muted-foreground">
          {format(createdAt.toDate(), "dd MMM yyyy")}
        </span>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-semibold">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground">
          Reviewed by{" "}
          {anonymous ? "Anonymous Renter" : reviewer}
        </p>
      </div>
    </div>
  );
}