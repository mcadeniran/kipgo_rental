"use client";

import {Badge} from "@/components/ui/badge";
import {ThumbsUp, TriangleAlert} from "lucide-react";
import {useTranslations} from "next-intl";

export interface ReviewTagsProps {
  pros?: string[];
  cons?: string[];
}

interface TagSectionProps {
  title: string;
  icon: React.ElementType;
  items: string[];
  variant: "secondary" | "outline";
}

function TagSection({
  title,
  icon: Icon,
  items,
  variant,
}: TagSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />

        <h4 className="text-sm font-semibold">
          {title}
        </h4>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge
            key={item}
            variant={variant}
            className="rounded-full px-3 py-1"
          >
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default function ReviewTags({
  pros = [],
  cons = [],
}: ReviewTagsProps) {
  const t = useTranslations('reviews');
  if (pros.length === 0 && cons.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <TagSection
        title={t('whatTheyLiked')}
        icon={ThumbsUp}
        items={pros}
        variant="secondary"
      />

      <TagSection
        title={t('couldBeImproved')}
        icon={TriangleAlert}
        items={cons}
        variant="outline"
      />
    </div>
  );
}