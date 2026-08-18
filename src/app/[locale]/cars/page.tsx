import {Suspense} from "react";

import CarsPageClient from "./CarsPageClient";


function CarsPageFallback() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Hero */}

      <div className="h-48 rounded-2xl bg-muted" />

      {/* Filters */}

      <div className="h-32 rounded-2xl bg-muted" />

      {/* Featured */}

      <div className="h-8 w-48 rounded bg-muted" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({length: 6}).map((_, index) => (
          <div
            key={index}
            className="h-80 rounded-2xl bg-muted"
          />
        ))}
      </div>
    </div>
  );
}

export default function CarsPage() {
  return (
    <Suspense fallback={<CarsPageFallback />}>
      <CarsPageClient />
    </Suspense>
  );
}