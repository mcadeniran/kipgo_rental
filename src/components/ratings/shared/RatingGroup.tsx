"use client";

import {cn} from "@/lib/utils";

export interface RatingGroupProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function RatingGroup({
  title,
  description,
  children,
  className,
}: RatingGroupProps) {
  return (
    <section
      className={cn(
        "space-y-6 rounded-xl border bg-card p-6",
        className,
      )}
    >
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">
          {title}
        </h2>

        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}

export default RatingGroup;