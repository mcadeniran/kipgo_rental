import {FuelType} from '@/lib/carProperties';
import {useTranslations} from 'next-intl';

export default function TranslatedFuelType(
  {
    fuel
  }: {
    fuel: FuelType;
  }
) {
  const c = useTranslations('cars.fuel');

  const label: Record<FuelType, string> = {
    Petrol: c('petrol'),
    Diesel: c('diesel'),
    Electric: c('electric'),
    Hybrid: c('hybrid')
  };

  return (
    label[fuel]
  );
}
