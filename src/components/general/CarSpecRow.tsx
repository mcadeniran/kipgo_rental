import {FuelType, TransmissionType} from "@/lib/carProperties";
import TranslatedFuelType from "@/lib/translations/translatedFuelType";
import TranslatedTransmissionType from "@/lib/translations/translatedTransmissionType";
import {Icon} from "@iconify/react";
import {useTranslations} from "next-intl";

export function CarSpecRow({transmission, fuel, seats, size = 18}: {transmission: string, fuel: string, seats: number; size?: number;}) {
  const t = useTranslations('home');

  return <div className="flex flex-wrap gap-4 text-sm">

    <div className="flex items-center gap-2">
      <Icon
        icon="mdi:car-shift-pattern"
        width={size}
      />
      <TranslatedTransmissionType transmission={transmission as TransmissionType} />

    </div>

    <div className="flex items-center gap-2">
      <Icon
        icon="mdi:gas-station"
        width={size}
      />
      <TranslatedFuelType fuel={fuel as FuelType} />
    </div>

    <div className="flex items-center gap-2">
      <Icon
        icon="mdi:seat-passenger"
        width={size}
      />
      {t('numSeats', {count: `${seats}`})}
    </div>

  </div>;
}
