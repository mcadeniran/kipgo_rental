import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {Separator} from "@/components/ui/separator";
import {Booking} from "../../models/Booking";
import {useDateTimeFormatter} from "@/lib/helper/formatDate";
import {PaymentMethodBadge} from "@/components/badges/paymentMethodBadge";
import {CryptoPaymentStatusBadge} from "@/components/badges/CryptoPaymentStatusBadge";

export function PaymentSummaryCard({
  booking,
}: {
  booking: Booking;
}) {
  const {formatCurrency} = useDateTimeFormatter();
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Payment Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        <Row
          label="Rental"
          value={formatCurrency(booking.rentalPrice, booking.currency)}
        />

        <Row
          label="Delivery"
          value={formatCurrency(booking.deliveryPrice, booking.currency)}
        />

        <Row
          label="Deposit"
          value={formatCurrency(booking.deposit, booking.currency)}
        />

        <Row
          label={`Tax (${booking.taxRate}%)`}
          value={formatCurrency(booking.tax, booking.currency)}
        />

        <Separator />

        <Row
          label="Total"
          value={formatCurrency(booking.totalPrice, booking.currency)}
          bold
        />

        {booking.payment && (
          <>
            <Separator />
            <div className="flex justify-between">
              <span>Payment Method</span>

              <PaymentMethodBadge method={booking.payment.method} />
            </div>

            <div className="flex justify-between">
              <span>Payment Status</span>

              <CryptoPaymentStatusBadge status={booking.payment.status} />
            </div>

            {booking.payment.crypto?.txid && (
              <Row
                label="Transaction ID"
                value={booking.payment.crypto.txid}
              />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className="min-w-0 flex-1 wrap-break-word">{label}</span>

      <span
        className={
          bold ? "font-semibold" : "min-w-0 flex-1 wrap-break-word"
        }
      >
        {value}
      </span>
    </div>
  );
}