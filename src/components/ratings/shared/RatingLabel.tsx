"use client";

import {cn} from "@/lib/utils";

export interface RatingLabelProps {
  label: string;
  description?: string;
  required?: boolean;
  className?: string;
}

export function RatingLabel({
  label,
  description,
  required = false,
  className,
}: RatingLabelProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center gap-1">
        <p className="text-sm font-medium text-foreground">
          {label}
        </p>

        {required && (
          <span className="text-destructive">*</span>
        )}
      </div>

      {description && (
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

export default RatingLabel;