"use client";

import {Card, CardContent} from "@/components/ui/card";
import CategoryRating from "./CategoryRating";

interface Item {
  name: string;
  label: string;
  description: string;
}

interface CategoryRatingsProps {
  categories: readonly Item[];
  values: Record<string, number>;
}

export default function CategoryRatings({
  categories,
  values,
}: CategoryRatingsProps) {
  return (
    <Card>
      <CardContent className="divide-y p-6">
        {categories.map((category) => (
          <CategoryRating
            key={category.name}
            label={category.label}
            value={values[category.name]}
          />
        ))}
      </CardContent>
    </Card>
  );
}