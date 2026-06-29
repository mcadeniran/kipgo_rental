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


interface Props {
  booking: Booking;
}

export default function BookingTimeline({
  booking,
}: Props) {
  const steps = [
    {
      key: "pending",
      label: "Booking Created",
    },
    {
      key: "payment_submitted",
      label: "Payment Submitted",
    },
    {
      key: "reserved",
      label: "Vehicle Reserved",
    },
    {
      key: "approved",
      label: "Booking Approved",
    },
    {
      key: "ongoing",
      label: "Rental Started",
    },
    {
      key: "completed",
      label: "Rental Completed",
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
          Booking Timeline
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
                Booking {booking.status}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}