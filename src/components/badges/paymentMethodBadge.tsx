import {PaymentMethod} from "@/app/[locale]/models/Booking";
import {Badge} from "@/components/ui/badge";
import {useTranslations} from "next-intl";

export function PaymentMethodBadge({
  method
}: {method: PaymentMethod;}) {
  const c = useTranslations('common.status');

  const styles = {
    payOnPickup: "bg-blue-100 text-blue-700",
    crypto: "bg-green-100 text-green-700",
  };

  const labels: Record<PaymentMethod, string> = {
    crypto: c('cryptoPayment'),
    payOnPickup: c('payOnPickup'),
  };

  return (
    <Badge className={styles[method]}>
      {labels[method]}
    </Badge>
  );
}