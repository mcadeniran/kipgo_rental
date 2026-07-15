"use client";

import {Timestamp} from "firebase/firestore";
import RatingStars from "@/components/ratings/shared/RatingStars";
import {useDateTimeFormatter} from "@/lib/helper/formatDate";
import {useTranslations} from "next-intl";


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
  const {formatDateShortMonth} = useDateTimeFormatter();
  const t = useTranslations('reviews');

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <RatingStars
          readonly
          value={rating}
          size="sm"
        />

        <span className="text-sm text-muted-foreground">
          {formatDateShortMonth(createdAt.toDate().toISOString())}
        </span>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-semibold">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground">
          {t('reviewedBy')}{" "}
          {anonymous ? t('anonymousRenter') : reviewer}
        </p>
      </div>
    </div>
  );
}