import {useTranslations} from 'next-intl';

export type DeliveryMethod = 'pickup' | 'delivery';

export default function TranslatedDeliveryMethod(
  {
    method
  }: {
    method: DeliveryMethod;
  }
) {
  const c = useTranslations('cars');

  const label: Record<DeliveryMethod, string> = {
    pickup: c('pickupMethod'),
    delivery: c('homeMethod'),
  };

  return (
    label[method]
  );
}