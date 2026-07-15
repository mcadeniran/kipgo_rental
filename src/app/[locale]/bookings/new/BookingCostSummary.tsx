import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {useDateTimeFormatter} from "@/lib/helper/formatDate";
import {calculateBookingTotals} from "./bookingTotals";
import {BookingDraft} from "./BookingDraft";
import {CarWithShop} from "@/lib/services/CarWithShop";
import {useTranslations} from "next-intl";

interface BookingCostSummaryProps {
  draft: BookingDraft;
  carShop: CarWithShop;
}

export function BookingCostSummary({
  draft,
  carShop,
}: BookingCostSummaryProps) {
  const t = useTranslations('cars');

  const {formatCurrency} = useDateTimeFormatter();

  const totals = calculateBookingTotals(draft, carShop);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t('bookingSummary')}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <Row
          label={t('dailyPrice')}
          value={formatCurrency(totals.dailyPrice, totals.currency)}
        />

        <Row
          label={t('rentalDays')}
          value={totals.rentalDays.toString()}
        />

        <Row
          label={t('rentalCost')}
          value={formatCurrency(totals.rentalPrice, totals.currency)}
        />
        {
          draft.deliveryType === 'delivery' &&
          <Row
            label={t('delivery')}
            value={formatCurrency(totals.deliveryPrice, totals.currency)}
          />
        }

        <Row
          label={t('tax')}
          value={formatCurrency(totals.tax, totals.currency)}
        />

        <Row
          label={t('securityDeposit')}
          value={formatCurrency(totals.deposit, totals.currency)}
        />

        <Separator />

        <Row
          label={t('total')}
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