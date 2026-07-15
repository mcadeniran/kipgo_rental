'use client';

import PageLoader from "@/components/general/PageLoader";
import {getBookingById} from "@/lib/services/bookingService";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "next/navigation";
import {Booking} from "../../models/Booking";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

import {useDateTimeFormatter} from '@/lib/helper/formatDate';
import {RentalVehicleCard} from "../components/RentalVehicleCard";
import {PaymentSummaryCard} from "../components/PaymentSummaryCard";
import {RentalShopCard} from "../components/RentalShopCard";
import {differenceInDays, format} from "date-fns";
import {DriverDetailsCard} from "../components/DriverDetailsCard";
import BookingTimeline from "../components/BookingTimeline";
import {CheckCircle2, Circle, XCircle} from "lucide-react";
import {UserBookingStatusMessage} from "../components/UserBookingStatusMessage";
import {BookingStatusBadge} from "@/components/badges/bookingstatusBadge";
import ReviewDialog from "@/components/ratings/display/ReviewDialog";
import TranslatedDeliveryMethod, {DeliveryMethod} from "@/lib/translations/translatedDeliveryMethod";
import {useTranslations} from "next-intl";

export default function BookingDetailsPage() {
  const t = useTranslations('bookings');
  const params = useParams();

  const id = params.id as string;

  const {data: booking, isLoading} =
    useQuery({
      queryKey: ["booking", id],
      queryFn: () => getBookingById(id),
    });

  if (isLoading) {
    return <PageLoader />;
  }

  if (!booking) {
    return <p>{t('bookingNotFound')}</p>;
  }

  // console.log(booking.rating);

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* HEADER */}
      <div className="space-y-3">
        <BookingStatusBadge status={booking.status} />

        <h1 className="text-3xl font-bold">
          {t('bookingInvoice', {invoice: booking.invoiceNumber})}
        </h1>

        <p className="text-muted-foreground">
          {t('createdOn', {date: format(booking.createdAt, "PPP")})}
        </p>
      </div>

      {/* BODY */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: Main journey */}
        <div className="lg:col-span-2 space-y-6">
          <RentalVehicleCard booking={booking} />
          <RentalShopCard booking={booking} />
          <RentalPeriodCard booking={booking} />
          <BookingTimeline booking={booking} />
          <PaymentTimeline booking={booking} />
        </div>

        {/* RIGHT: Summary + actions */}
        <div className="space-y-6">
          <div className="space-y-6 lg:sticky lg:top-20">
            <PaymentSummaryCard booking={booking} />
            <DriverDetailsCard booking={booking} />
            <BookingActions booking={booking} />
          </div>
        </div>
      </div>
    </div>
  );
}

function RentalPeriodCard({
  booking,
}: {
  booking: Booking;
}) {
  const t = useTranslations('bookings');
  const {formatDateShortMonth} = useDateTimeFormatter();

  const days =
    differenceInDays(
      booking.dropoffDate,
      booking.pickupDate
    ) || 1;

  return <Card>
    <CardHeader>
      <CardTitle>
        {t('rentalPeriod')}
      </CardTitle>
    </CardHeader>

    <CardContent>
      <div className="space-y-3">

        <div>
          <p className="text-sm text-muted-foreground">
            {t('pickup')}
          </p>

          <p>
            {formatDateShortMonth(booking.pickupDate.toISOString())}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            {t('return')}
          </p>

          <p>
            {formatDateShortMonth(booking.dropoffDate.toISOString())}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            {t("duration")}
          </p>

          <p>
            {t('rentalDaysCount', {count: days})}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            {t('deliveryMethod')}
          </p>

          <p>
            <TranslatedDeliveryMethod method={booking.deliveryType as DeliveryMethod} />
          </p>
        </div>

        {
          booking.deliveryType === 'delivery' &&
          <div>
            <p className="text-sm text-muted-foreground">
              {t('deliveryAddress')}
            </p>

            <p>
              {booking.deliveryAddress}
            </p>
          </div>
        }

      </div>
    </CardContent>
  </Card>;
}

function PaymentTimeline({
  booking,
}: {
  booking: Booking;
}) {
  const t = useTranslations('bookings');
  if (!booking.payment) return null;

  const payment = booking.payment;

  const steps = [
    {
      key: "unpaid",
      label: t('awaitingPayment'),
    },
    {
      key: "pending",
      label: t('paymentInitiated'),
    },
    {
      key: "awaiting_verification",
      label: t('awaitingVerification'),
    },
    {
      key: "paid",
      label: t('paymentVerified'),
    },
  ];

  const currentIndex =
    steps.findIndex(
      (s) =>
        s.key === payment.status
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t('paymentProgress')}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {steps.map(
            (step, index) => {
              const completed =
                currentIndex >=
                index;

              return (
                <div
                  key={step.key}
                  className="
                  flex
                  items-center
                  gap-3
                "
                >
                  {completed ? (
                    <CheckCircle2
                      className="
                      h-5
                      w-5
                      text-green-500
                    "
                    />
                  ) : (
                    <Circle
                      className="
                      h-5
                      w-5
                      text-muted-foreground
                    "
                    />
                  )}

                  <span>
                    {step.label}
                  </span>
                </div>
              );
            }
          )}

          {payment.status ===
            "failed" && (
              <div
                className="
              flex
              items-center
              gap-3
              text-red-500
            "
              >
                <XCircle className="h-5 w-5" />

                <span>
                  {t('paymentFailed')}
                </span>
              </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}

function BookingActions({
  booking,
}: {
  booking: Booking;
}) {
  const t = useTranslations('bookings');
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t('actions')}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <UserBookingStatusMessage booking={booking} />

        {booking.status ===
          "pending" && (
            <Button
              variant="destructive"
              className="w-full"
            >
              {t('cancelRequest')}
            </Button>
          )}

        {booking.status ===
          "approved" && (
            <>
              <Button className="w-full  bg-k-primary text-white hover:bg-k-primary/80 hover:text-white/90 cursor-pointer">
                {t('contactShop')}
              </Button>

              <Button
                variant="outline"
                className="w-full"
              >
                {t('pickupDetails')}
              </Button>
            </>
          )}

        {booking.status ===
          "completed" && !booking.isRated && (
            <ReviewDialog bookingId={booking.id} />
          )}

      </CardContent>
    </Card>
  );
}