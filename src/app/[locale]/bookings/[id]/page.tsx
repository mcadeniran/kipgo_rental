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

export default function BookingDetailsPage() {
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
    return <p>Booking not found</p>;
  }

  console.log(booking.rating);

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* HEADER */}
      <div className="space-y-3">
        <BookingStatusBadge status={booking.status} />

        <h1 className="text-3xl font-bold">
          Booking #{booking.invoiceNumber}
        </h1>

        <p className="text-muted-foreground">
          Created on {format(booking.createdAt, "PPP")}
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
            <UserBookingStatusMessage booking={booking} />
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
  const {formatDateShortMonth} = useDateTimeFormatter();

  const days =
    differenceInDays(
      booking.dropoffDate,
      booking.pickupDate
    ) || 1;

  return <Card>
    <CardHeader>
      <CardTitle>
        Rental Period
      </CardTitle>
    </CardHeader>

    <CardContent>
      <div className="space-y-3">

        <div>
          <p className="text-sm text-muted-foreground">
            Pickup
          </p>

          <p>
            {formatDateShortMonth(booking.pickupDate.toISOString())}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Return
          </p>

          <p>
            {formatDateShortMonth(booking.dropoffDate.toISOString())}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Duration
          </p>

          <p>
            {`${days} day${days > 1 ? "s" : ""
              }`}
          </p>
        </div>

      </div>
    </CardContent>
  </Card>;
}

function PaymentTimeline({
  booking,
}: {
  booking: Booking;
}) {
  if (!booking.payment) return null;

  const payment = booking.payment;

  const steps = [
    {
      key: "unpaid",
      label: "Awaiting Payment",
    },
    {
      key: "pending",
      label: "Payment Initiated",
    },
    {
      key: "awaiting_verification",
      label: "Awaiting Verification",
    },
    {
      key: "paid",
      label: "Payment Verified",
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
          Payment Progress
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
                  Payment Failed
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Actions
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">

        {booking.status ===
          "pending" && (
            <Button
              variant="destructive"
              className="w-full"
            >
              Cancel Request
            </Button>
          )}

        {booking.status ===
          "approved" && (
            <>
              <Button className="w-full  bg-k-primary text-white hover:bg-k-primary/80 hover:text-white/90 cursor-pointer">
                Contact Shop
              </Button>

              <Button
                variant="outline"
                className="w-full"
              >
                Pickup Details
              </Button>
            </>
          )}

        {booking.status ===
          "completed" && (
            <Button className="w-full  bg-k-primary text-white hover:bg-k-primary/80 hover:text-white/90 cursor-pointer">
              Leave Review
            </Button>
          )}

      </CardContent>
    </Card>
  );
}