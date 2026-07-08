"use client";

import {Badge} from "@/components/ui/badge";
import {BadgeCheck, RotateCcw, ThumbsUp} from "lucide-react";

export interface ReviewBadgesProps {
  verified?: boolean;
  recommended?: boolean;
  wouldRentAgain?: boolean;
}

export default function ReviewBadges({
  verified = true,
  recommended = false,
  wouldRentAgain = false,
}: ReviewBadgesProps) {
  const badges = [
    verified && {
      label: "Verified Rental",
      icon: BadgeCheck,
    },

    recommended && {
      label: "Would Recommend",
      icon: ThumbsUp,
    },

    wouldRentAgain && {
      label: "Would Rent Again",
      icon: RotateCcw,
    },
  ].filter(Boolean) as {
    label: string;
    icon: React.ElementType;
  }[];

  if (badges.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map(({label, icon: Icon}) => (
        <Badge
          key={label}
          variant={label === "Verified Rental" ? "default" : "secondary"}
          className="gap-1.5 rounded-full px-3 py-1"
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </Badge>
      ))}
    </div>
  );
}