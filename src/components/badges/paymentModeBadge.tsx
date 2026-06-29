import {Badge} from '@/components/ui/badge';
import {useTranslations} from 'next-intl';

export type PaymentModeType = 'cash' | 'bank_transfer' | 'other';

export default function PaymentModeBadge({
  mode
}: {
  mode: PaymentModeType;
}) {
  const t = useTranslations('adminRental.commissions.payment');

  const styles = {
    cash: "bg-purple-100 text-purple-700",
    bank_transfer: "bg-green-100 text-green-700",
    other: "bg-blue-100 text-blue-700",
  };

  const labels: Record<PaymentModeType, string> = {
    cash: t('cash'),
    bank_transfer: t('bank'),
    other: t('other'),
  };

  return (
    <Badge className={styles[mode]}>
      {labels[mode]}
    </Badge>
  );
}
