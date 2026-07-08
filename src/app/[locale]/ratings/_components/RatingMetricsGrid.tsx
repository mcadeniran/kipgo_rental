"use client";

import RatingMetricCard from "./RatingMetricCard";


interface Metric {
  label: string;
  value: number;
}

interface RatingMetricsGridProps {
  title?: string;
  metrics: Metric[];
}

export default function RatingMetricsGrid({
  title,
  metrics,
}: RatingMetricsGridProps) {
  return (
    <section className="space-y-5">
      {title && (
        <div>
          <h2 className="text-xl font-semibold">
            {title}
          </h2>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => (
          <RatingMetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
          />
        ))}
      </div>
    </section>
  );
}