import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  CheckCircle2,
  Circle,
  XCircle,
} from "lucide-react";
import {Booking} from "../../models/Booking";
import {useTranslations} from "next-intl";


interface Props {
  booking: Booking;
}

export default function BookingTimeline({
  booking,
}: Props) {
  const t = useTranslations('bookings');

  const steps = [
    {
      key: "pending",
      label: t('bookingCreated'),
    },
    {
      key: "payment_submitted",
      label: t('paymentSubmitted'),
    },
    {
      key: "reserved",
      label: t('vehicleReserved'),
    },
    {
      key: "approved",
      label: t('bookingApproved'),
    },
    {
      key: "ongoing",
      label: t('rentalStarted'),
    },
    {
      key: "completed",
      label: t('rentalCompleted'),
    },
  ];

  const failedStatuses = [
    "rejected",
    "cancelled",
    "expired",
  ];

  const currentIndex = steps.findIndex(
    (s) => s.key === booking.status
  );

  const isFailed =
    failedStatuses.includes(
      booking.status
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t('bookingTimeline')}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-5">
          {steps.map((step, index) => {
            const completed =
              currentIndex >= index;

            return (
              <div
                key={step.key}
                className="flex items-center gap-3"
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

                <span
                  className={
                    completed
                      ? "font-medium"
                      : "text-muted-foreground"
                  }
                >
                  {step.label}
                </span>
              </div>
            );
          })}

          {isFailed && (
            <div
              className="
              flex
              items-center
              gap-3
              text-red-500
            "
            >
              <XCircle className="h-5 w-5" />

              <span className="font-medium capitalize">
                {t('bookingWithStatus', {status: booking.status})}
                {/* Booking {booking.status} */}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}