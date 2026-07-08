"use client";

import * as React from "react";

import {cn} from "@/lib/utils";
import {Icon} from "@iconify/react";

type RatingSize = "sm" | "md" | "lg";

export interface RatingStarsProps {
  value: number;

  onChange?: (value: number) => void;

  readonly?: boolean;

  size?: RatingSize;

  showValue?: boolean;

  totalReviews?: number;

  className?: string;
}

const STAR_SIZES: Record<RatingSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-7 w-7",
};

export function RatingStars({
  value,
  onChange,
  readonly = false,
  size = "md",
  showValue = false,
  totalReviews,
  className,
}: RatingStarsProps) {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);

  const currentValue = hoverValue ?? value;

  const handleSelect = (rating: number) => {
    if (readonly) return;

    onChange?.(rating);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (readonly || !onChange) return;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp":
        event.preventDefault();
        onChange(Math.min(value + 1, 5));
        break;

      case "ArrowLeft":
      case "ArrowDown":
        event.preventDefault();
        onChange(Math.max(value - 1, 1));
        break;

      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
        event.preventDefault();
        onChange(Number(event.key));
        break;

      default:
        break;
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        className,
      )}
    >
      <div
        role="radiogroup"
        aria-label="Rating"
        tabIndex={readonly ? -1 : 0}
        onKeyDown={handleKeyDown}
        className="flex items-center"
      >
        {Array.from({length: 5}).map((_, index) => {
          const starValue = index + 1;

          const active = starValue <= currentValue;

          return (
            <button
              key={starValue}
              type="button"
              disabled={readonly}
              aria-label={`${starValue} star${starValue > 1 ? "s" : ""
                }`}
              aria-checked={value === starValue}
              role="radio"
              onClick={() => handleSelect(starValue)}
              onMouseEnter={() =>
                !readonly &&
                setHoverValue(starValue)
              }
              onMouseLeave={() =>
                !readonly &&
                setHoverValue(null)
              }
              className={cn(
                "rounded-md p-0.5 transition-all duration-150",
                !readonly &&
                "hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                readonly &&
                "cursor-default",
              )}
            >
              <Icon
                icon="ic:outline-star"
                className={cn(
                  STAR_SIZES[size],
                  "transition-colors duration-150",
                  active
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground",
                )}
              />
            </button>
          );
        })}
      </div>

      {(showValue || totalReviews !== undefined) && (
        <div className="text-sm text-muted-foreground">
          {showValue && (
            <span className="font-medium">
              {value.toFixed(1)}
            </span>
          )}

          {showValue &&
            totalReviews !== undefined && (
              <span className="mx-1">•</span>
            )}

          {totalReviews !== undefined && (
            <span>
              {totalReviews.toLocaleString()} review
              {totalReviews === 1 ? "" : "s"}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default RatingStars;