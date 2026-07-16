'use client';
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {Icon} from "@iconify/react";
import {Booking} from "../../models/Booking";
import {useDateTimeFormatter} from "@/lib/helper/formatDate";
import {CarSpecRow} from "@/components/general/CarSpecRow";
import {useTranslations} from "next-intl";
import {useRouter} from "@/i18n/navigation";

export function RentalVehicleCard({
  booking,
}: {
  booking: Booking;
}) {
  const t = useTranslations('bookings');
  const {formatCurrency} = useDateTimeFormatter();
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t('vehicleInformation')}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">

          <Image
            src={booking.car.carImage}
            alt={`${booking.car.brand} ${booking.car.model}`}
            width={500}
            height={300}
            className="
              rounded-lg
              object-cover
              w-full
              md:w-64
              h-48
            "
          />

          <div className="flex-1 space-y-3">

            <div>
              <h2 className="text-xl font-semibold cursor-pointer hover:underline" onClick={() => router.push(`/cars/${booking.carId}`)}>
                {booking.car.brand}{" "}
                {booking.car.model}
              </h2>

              <p className="text-muted-foreground">
                {booking.car.year}
              </p>
            </div>

            <CarSpecRow transmission={booking.car.transmission} fuel={booking.car.fuel} seats={booking.car.seats} />

            <div>
              <p className="text-muted-foreground">
                {t('dailyRate')}
              </p>

              <p className="font-semibold text-lg">
                {formatCurrency(booking.car.pricePerDay, booking.currency)}
              </p>
            </div>
            <p className="">{booking.status === 'completed' && booking.isRated ?
              <Icon
                icon="ic:sharp-star"
                width={18}
                className="text-amber-400"
              /> : booking.status === 'completed' && !booking.isRated ? t('notRated') : ''}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}