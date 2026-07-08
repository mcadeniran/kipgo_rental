"use client";

import Link from "next/link";

import {Card, CardContent, CardTitle, } from "@/components/ui/card";

import Image from "next/image";
import {Booking, PaymentMethod, PaymentStatus} from "../../models/Booking";
import {Icon} from "@iconify/react";

import {useDateTimeFormatter} from '@/lib/helper/formatDate';
import {BookingStatusBadge} from "@/components/badges/bookingstatusBadge";
import {Separator} from "@/components/ui/separator";
import {CryptoPaymentStatusBadge} from "@/components/badges/CryptoPaymentStatusBadge";
import {PaymentMethodIconBadge} from "@/components/badges/PaymentMethodIconBadge";

export default function BookingCard({
  booking,
}: {
  booking: Booking;
}) {
  const {formatCurrency, formatShortDayWeekMonth, formatTime} = useDateTimeFormatter();
  return (
    <Link
      href={`/bookings/${booking.id}`}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all">
        <Image
          src={booking.car.carImage}
          alt={booking.car.brand}
          width={600}
          height={400}
          className="w-full h-52 object-cover"
        />

        <CardContent className="px-2 space-y-2">
          <CardTitle className="flex justify-between">
            <span>{booking.car.brand}{' '}{booking.car.model}{' '}{booking.car.year}</span>
            {
              booking.status === 'completed' && (booking.isRated ? <Icon
                icon="ic:sharp-star"
                width={18}
                className="text-amber-400"
              /> : <span className="text-sm font-light">Not Rated</span>
              )
            }
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {booking.shop.name}
          </p>

          <div className="text-sm">
            {formatShortDayWeekMonth(booking.pickupDate.toISOString())}{' • '}{formatTime(booking.pickupDate.toISOString())}
            {" → "}
            {formatShortDayWeekMonth(booking.dropoffDate.toISOString())}{' • '}{formatTime(booking.dropoffDate.toISOString())}
          </div>
          <Separator />
          <div className="flex w-full gap-2 items-center">
            <PaymentMethodIconBadge method={booking.payment?.method as PaymentMethod} />
            <CryptoPaymentStatusBadge status={booking.payment?.status as PaymentStatus} />
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold">
              {formatCurrency(booking.totalPrice, booking.currency)}
            </p>
            <BookingStatusBadge
              status={booking.status}
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
