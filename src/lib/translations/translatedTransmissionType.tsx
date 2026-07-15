import {TransmissionType} from '@/lib/carProperties';
import {useTranslations} from 'next-intl';

export default function TranslatedTransmissionType({
  transmission
}: {
  transmission: TransmissionType;
}) {
  const c = useTranslations('cars.transmissionOptions');

  const label: Record<TransmissionType, string> = {
    Automatic: c('automatic'),
    Manual: c('manual'),
  };


  return (
    label[transmission]
  );
}
