"use client";

import {Skeleton} from "@/components/ui/skeleton";

export interface ReviewsLoadingProps {
  count?: number;
}

function ReviewSkeleton() {
  return (
    <div className="rounded-xl border p-6 space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-4 w-32" />
        </div>

        <Skeleton className="h-5 w-20" />
      </div>

      {/* Badges */}

      <div className="flex gap-2">
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="h-6 w-32 rounded-full" />
      </div>

      {/* Review */}

      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[92%]" />
        <Skeleton className="h-4 w-[85%]" />
      </div>

      {/* Pros */}

      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-7 w-20 rounded-full" />
        <Skeleton className="h-7 w-28 rounded-full" />
        <Skeleton className="h-7 w-24 rounded-full" />
      </div>

      {/* Photos */}

      <div className="grid grid-cols-3 gap-3">
        <Skeleton className="aspect-square rounded-lg" />
        <Skeleton className="aspect-square rounded-lg" />
        <Skeleton className="aspect-square rounded-lg" />
      </div>
    </div>
  );
}

export default function ReviewsLoading({
  count = 3,
}: ReviewsLoadingProps) {
  return (
    <div className="space-y-6">
      {Array.from({length: count}).map((_, index) => (
        <ReviewSkeleton key={index} />
      ))}
    </div>
  );
}