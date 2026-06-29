import Image from "next/image";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {Button} from "@/components/ui/button";
import {Booking} from "../../models/Booking";
import {useRouter} from "@/i18n/navigation";

export function RentalShopCard({
  booking,
}: {
  booking: Booking;
}) {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Rental Company
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        <div className="flex gap-3 items-center">

          <Image
            src={booking.shop.logo}
            alt={booking.shop.name}
            width={60}
            height={60}
            className="
              rounded-full
              object-cover
            "
          />

          <div>
            <h3 className="font-semibold">
              {booking.shop.name}
            </h3>

            <p className="text-sm text-muted-foreground">
              {booking.shop.city}
            </p>
          </div>

        </div>

        <div className="text-sm space-y-1">
          <p>
            {booking.shop.address}
          </p>

          <p>
            {booking.shop.district},{" "}
            {booking.shop.city}
          </p>
        </div>

        <Button
          onClick={() => router.push(`/shops/${booking.shopId}`)}
          className="w-full bg-k-primary text-white hover:bg-k-primary/80 hover:text-white/90 cursor-pointer"
        >
          View Company
        </Button>

      </CardContent>
    </Card>
  );
}