"use client";

import {MessageSquareText} from "lucide-react";
import {useTranslations} from "next-intl";

interface ReviewsEmptyProps {
  title?: string;
  description?: string;
}

export default function ReviewsEmpty({
  title,
  description,
}: ReviewsEmptyProps) {
  const t = useTranslations('reviews');

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-4 text-center">

      <div className="rounded-full bg-muted p-4">
        <MessageSquareText className="h-8 w-8 text-muted-foreground" />
      </div>

      <h3 className="mt-6 text-lg font-semibold">
        {title === null ? t('noReviewsYet') : title}
      </h3>

      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {description === null ? t('beTheFirst') : description}
      </p>
    </div>
  );
}