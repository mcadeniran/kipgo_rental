import {Badge} from '@/components/ui/badge';
import {useTranslations} from 'next-intl';

export type CarStatus =
  | "available"
  | "maintenance";

interface Props {
  status: CarStatus;
}

export function CarStatusBadge({status}: Props) {
  const mt = useTranslations('carUnit');
  const av = useTranslations('common');

  const styles: Record<CarStatus, string> = {
    available: "bg-green-100 text-green-700 border-green-200",
    maintenance: "bg-red-100 text-red-700 border-red-200",
  };

  const labels: Record<CarStatus, string> = {
    available: av('available'),
    maintenance: mt('maintenance'),
  };

  return <Badge className={styles[status]}>{labels[status]}</Badge>;
}