"use client";

import {cn} from "@/lib/utils";
import RatingLabel from "./RatingLabel";
import RatingStars from "./RatingStars";


export interface RatingRowProps {
  label: string;
  description?: string;
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  required?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function RatingRow({
  label,
  description,
  value,
  onChange,
  readonly = false,
  required = false,
  className,
  size = "md",
}: RatingRowProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <RatingLabel
        label={label}
        description={description}
        required={required}
      />

      <div className="flex justify-start sm:justify-end">
        <RatingStars
          value={value}
          onChange={onChange}
          readonly={readonly}
          size={size}
        />
      </div>
    </div>
  );
}

export default RatingRow;