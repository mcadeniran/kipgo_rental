"use client";

import {MessageSquareText} from "lucide-react";

interface ReviewsEmptyProps {
  title?: string;
  description?: string;
}

export default function ReviewsEmpty({
  title = "No reviews yet",
  description = "Be the first to share your experience with this vehicle.",
}: ReviewsEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-4 text-center">

      <div className="rounded-full bg-muted p-4">
        <MessageSquareText className="h-8 w-8 text-muted-foreground" />
      </div>

      <h3 className="mt-6 text-lg font-semibold">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}