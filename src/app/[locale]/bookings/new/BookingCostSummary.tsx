import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {useDateTimeFormatter} from "@/lib/helper/formatDate";
import {calculateBookingTotals} from "./bookingTotals";
import {BookingDraft} from "./BookingDraft";
import {CarWithShop} from "@/lib/services/CarWithShop";

interface BookingCostSummaryProps {
  draft: BookingDraft;
  carShop: CarWithShop;
}

export function BookingCostSummary({
  draft,
  carShop,
}: BookingCostSummaryProps) {

  const {formatCurrency} = useDateTimeFormatter();

  const totals = calculateBookingTotals(draft, carShop);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Booking Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <Row
          label="Daily Price"
          value={formatCurrency(totals.dailyPrice, totals.currency)}
        />

        <Row
          label="Rental Days"
          value={totals.rentalDays.toString()}
        />

        <Row
          label="Rental Cost"
          value={formatCurrency(totals.rentalPrice, totals.currency)}
        />
        {
          draft.deliveryType === 'delivery' &&
          <Row
            label="Delivery"
            value={formatCurrency(totals.deliveryPrice, totals.currency)}
          />
        }

        <Row
          label="Tax"
          value={formatCurrency(totals.tax, totals.currency)}
        />

        <Row
          label="Security Deposit"
          value={formatCurrency(totals.deposit, totals.currency)}
        />

        <Separator />

        <Row
          label="Total"
          value={formatCurrency(totals.total, totals.currency)}
          bold
        />
      </CardContent>
    </Card>
  );
}

function Row({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>

      <span
        className={
          bold
            ? "font-bold"
            : ""
        }
      >
        {value}
      </span>
    </div>
  );
}