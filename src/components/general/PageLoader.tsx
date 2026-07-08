"use client";

import {Loader} from "lucide-react";

export default function PageLoader({size = 40}: {size?: number;}) {
  return (
    <div className="h-screen flex flex-1 flex-col items-center justify-center gap-4 p-4  rounded-2xl">
      <Loader
        className="animate-spin text-k-primary"
        size={size} // customizable size
      />
    </div>
  );
}
