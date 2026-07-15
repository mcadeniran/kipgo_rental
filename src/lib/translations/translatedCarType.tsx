import {CarType} from '@/lib/carProperties';
import {useTranslations} from 'next-intl';

export default function TranslatedCarType({
  carType
}: {
  carType: CarType;
}) {
  const c = useTranslations('cars.types');

  const label: Record<CarType, string> = {
    Economy: c('economy'),
    Sedan: c('sedan'),
    SUV: c('suv'),
    Luxury: c('luxury'),
    Sports: c('sports'),
    Pickup: c('pickup'),
    Van: c('van')
  };


  return (
    label[carType]
  );
}
