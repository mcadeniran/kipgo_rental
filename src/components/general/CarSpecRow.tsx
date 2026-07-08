import {Icon} from "@iconify/react";

export function CarSpecRow({transmission, fuel, seats, size = 18}: {transmission: string, fuel: string, seats: number; size?: number;}) {
  return <div className="flex flex-wrap gap-4 text-sm">

    <div className="flex items-center gap-2">
      <Icon
        icon="mdi:car-shift-pattern"
        width={size}
      />
      {transmission}
    </div>

    <div className="flex items-center gap-2">
      <Icon
        icon="mdi:gas-station"
        width={size}
      />
      {fuel}
    </div>

    <div className="flex items-center gap-2">
      <Icon
        icon="mdi:seat-passenger"
        width={size}
      />
      {seats} Seats
    </div>

  </div>;
}
