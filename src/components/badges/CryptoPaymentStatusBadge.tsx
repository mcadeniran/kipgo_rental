import {PaymentStatus} from "@/app/[locale]/models/Booking";
import {Badge} from "@/components/ui/badge";
import {useTranslations} from "next-intl";


export function CryptoPaymentStatusBadge({
  status
}: {status: PaymentStatus;}) {
  const c = useTranslations('common.status');

  const styles = {
    pending: "bg-yellow-100 text-yellow-700",
    unpaid: "bg-yellow-100 text-yellow-700",
    awaiting_verification: "bg-orange-100 text-orange-700",
    paid: "bg-blue-100 text-blue-700",
    failed: "bg-red-100 text-red-700",
    expired: "bg-red-100 text-red-700",
  };

  const labels: Record<PaymentStatus, string> = {
    pending: c('pending'),
    unpaid: c('unpaid'),
    awaiting_verification: c('awaitingVerification'),
    paid: c('paid'),
    failed: c('failed'),
    expired: c('expired')
  };

  return (
    <Badge className={styles[status]}>
      {labels[status]}
    </Badge>
  );
}