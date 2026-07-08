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

export function RentalVehicleCard({
  booking,
}: {
  booking: Booking;
}) {
  const {formatCurrency} = useDateTimeFormatter();
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Vehicle Information
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
              <h2 className="text-xl font-semibold">
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
                Daily Rate
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
              /> : booking.status === 'completed' && !booking.isRated ? "Not Rated" : ''}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}