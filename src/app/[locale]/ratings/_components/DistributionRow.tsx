"use client";

import {Progress} from "@/components/ui/progress";
import {cn} from "@/lib/utils";
import {Icon} from "@iconify/react";

interface DistributionRowProps {
  stars: number;
  count: number;
  total: number;
  className?: string;
}

export default function DistributionRow({
  stars,
  count,
  total,
  className,
}: DistributionRowProps) {
  const percentage =
    total === 0 ? 0 : (count / total) * 100;

  return (
    <div
      className={cn(
        "grid grid-cols-[56px_1fr_36px] items-center gap-3",
        className,
      )}
    >
      {/* Stars */}

      <div className="flex items-center gap-1 text-sm">
        <span>{stars}</span>

        <Icon
          icon="ic:round-star"
          className="h-4 w-4 fill-amber-400 text-amber-400"
        />
      </div>

      {/* Progress */}

      <Progress value={percentage} />

      {/* Count */}

      <span className="text-right text-sm text-muted-foreground">
        {count}
      </span>
    </div>
  );
}