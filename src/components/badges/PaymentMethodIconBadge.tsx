import {PaymentMethod} from "@/lib/helper/booking.types";
import {Icon} from "@iconify/react";

export function PaymentMethodIconBadge({
  method
}: {method: PaymentMethod;}) {
  return (
    <Icon
      icon={method === 'crypto' ? "cryptocurrency-color:usdt" : "streamline-cyber:cash-hand-1"}
      width={22}
      height={22}
      className={`${method === 'payOnPickup' && "text-green-600"}`}
    />
  );
}