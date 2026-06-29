"use client";

import {useState} from "react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";

import {Icon} from "@iconify/react";
import {Car} from "../../models/Car";
import {RentalShop} from "../../models/RentalShop";
import {Link} from "@/i18n/navigation";

import {useDateTimeFormatter} from '@/lib/helper/formatDate';
import RentalRules from "../../_components/RentalRules";
import {CarWithShop} from "@/lib/services/CarWithShop";
import {BookNowButton} from "@/components/BookNowButton";


interface Props {
  car: Car;
  shop: RentalShop;
}

export default function CarDetailsPageContent({
  car,
  shop,
}: Props) {
  const cover =
    car.images.find(i => i.isCover)?.url ??
    car.images[0]?.url;

  const [selectedImage, setSelectedImage] =
    useState(cover);

  const carshop = new CarWithShop(car, shop);

  return (
    <div className="space-y-8">
      {/* TOP SECTION */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* GALLERY */}
        <div className="lg:col-span-2 space-y-3">
          <div className="relative aspect-16/10 overflow-hidden rounded-xl border">
            <Image
              src={selectedImage}
              alt={car.model}
              sizes='100%'
              fill
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
            {car.images.map((image) => (
              <button
                key={image.url}
                onClick={() =>
                  setSelectedImage(image.url)
                }
                className={`
                  relative
                  aspect-square
                  overflow-hidden
                  rounded-lg
                  border
                  w-auto
                  h-auto
                  ${selectedImage === image.url
                    ? "ring-2 ring-k-primary"
                    : ""
                  }
                `}
              >
                <Image
                  src={image.url}
                  alt={car.model}
                  sizes='100%'
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* BOOKING CARD */}
        <CarBookingCard
          car={car}
          shop={shop}
          carshop={carshop}
        />
      </div>

      {/* HEADER */}
      <CarHeader car={car} />

      {/* FEATURES */}
      <CarFeatures car={car} />

      {/* SPECIFICATIONS */}
      <CarSpecifications car={car} />

      {/* DESCRIPTION */}
      <CarDescription car={car} />

      {/* RENTAL SHOP */}
      <RentalCompanyCard shop={shop} />

      {/* RULES */}
      <RentalRules shop={shop} />
    </div>
  );
}

function CarBookingCard({
  car,
  shop,
  carshop,
}: {
  car: Car;
  shop: RentalShop;
  carshop: CarWithShop;
}) {
  const {formatCurrency} = useDateTimeFormatter();
  return (
    <Card className="sticky top-24 h-fit">
      <CardContent className="space-y-6 pt-6">
        <div>
          <p className="text-sm text-muted-foreground">
            Price Per Day
          </p>
          {
            carshop.hasDiscount &&
            <div className="flex flex-col gap-2">
              <h3 className="text-xl text-red-500 line-through font-bold">
                {formatCurrency(carshop.basePrice, car.currency)}
              </h3>
              <div className="flex gap-2">
                <h2 className="text-3xl font-bold">
                  {formatCurrency(carshop.finalPrice, car.currency)}
                </h2>
                <Badge variant='destructive' className="text-sm">{shop.discount?.type === 'fixed' ? `-${formatCurrency(carshop.discountAmount, car.currency ?? shop.currency)} off` : carshop.discountLabel}</Badge>
              </div>
            </div>
          }
          {
            !carshop.hasDiscount &&
            <h2 className="text-3xl font-bold">
              {formatCurrency(car.pricePerDay, car.currency)}
            </h2>
          }
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>
              {car.offersDelivery
                ? "Available"
                : "Pickup Only"}
            </span>
          </div>
        </div>
        <BookNowButton label="Book Now" url={`/bookings/new/${car.id}`} size="lg" />
        <Link
          href={`/shops/${shop.id}`}
          className="block"
        >
          <Button
            variant="outline"
            className="w-full"
          >
            View Shop
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

function CarHeader({
  car,
}: {
  car: Car;
}) {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold">
        {car.brand} {car.model} {car.year}
      </h1>

      <div className="flex flex-wrap gap-2">
        <Badge>
          {car.transmission}
        </Badge>

        <Badge variant="secondary">
          {car.fuel}
        </Badge>

        <Badge variant="outline">
          {car.seats} Seats
        </Badge>

        <Badge variant="outline">
          {car.carType}
        </Badge>
      </div>
    </div>
  );
}

function CarFeatures({
  car,
}: {
  car: Car;
}) {
  if (!car.features?.length) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Features
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="
          grid
          grid-cols-2
          md:grid-cols-3
          gap-3
        ">
          {car.features.map(
            (feature) => (
              <div
                key={feature}
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <Icon
                  icon="mdi:check-circle"
                  className="text-green-500"
                />

                {feature}
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function CarSpecifications({
  car,
}: {
  car: Car;
}) {
  const specs = [
    {
      label: "Transmission",
      value: car.transmission,
    },
    {
      label: "Fuel",
      value: car.fuel,
    },
    {
      label: "Seats",
      value: car.seats,
    },
    {
      label: "Year",
      value: car.year,
    },
    {
      label: "Type",
      value: car.carType,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Specifications
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="divide-y">
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="
                flex
                justify-between
                py-3
              "
            >
              <span>
                {spec.label}
              </span>

              <span className="font-medium">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function CarDescription({
  car,
}: {
  car: Car;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          About This Vehicle
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p>
          Premium {car.brand}{" "}
          {car.model} available for
          rental in {car.city}.
        </p>
      </CardContent>
    </Card>
  );
}

function RentalCompanyCard({
  shop,
}: {
  shop: RentalShop;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Rental Company
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="
          flex
          flex-col
          md:flex-row
          gap-4
          items-center
        ">
          <Image
            src={shop.logoUrl}
            alt={shop.name}
            width={80}
            height={80}
            className="
              rounded-full
              object-cover
            "
          />

          <div className="flex-1">
            <h3 className="font-semibold">
              {shop.name}
            </h3>

            <p className="text-muted-foreground">
              {shop.city},{" "}
              {shop.district}
            </p>

            <p className="mt-2 flex items-center gap-1">
              <Icon
                icon="material-symbols:star"
                className="text-yellow-400"
              />
              <span>
                {shop.rating} ({shop.totalRatings} review{shop.totalRatings === 1 ? '' : 's'})
              </span>
            </p>
          </div>

          <Link
            href={`/shops/${shop.id}`}
          >
            <Button>
              View Shop
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

// function RentalRules({
//   shop,
// }: {
//   shop: RentalShop;
// }) {
//   const rules = [
//     {
//       title: "Security Deposit",
//       value:
//         shop.rules.securityDeposit,
//     },
//     {
//       title: "Fuel Policy",
//       value:
//         shop.rules.fuelPolicy,
//     },
//     {
//       title: "Insurance",
//       value:
//         shop.rules.insurance,
//     },
//     {
//       title: "Cancellation",
//       value:
//         shop.rules.cancellation,
//     },
//     {
//       title: "Mileage Limit",
//       value:
//         shop.rules.mileageLimit,
//     },
//     {
//       title: "Late Return",
//       value:
//         shop.rules.lateReturn,
//     },
//   ];

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>
//           Rental Rules
//         </CardTitle>
//       </CardHeader>

//       <CardContent>
//         <div className="
//           grid
//           md:grid-cols-2
//           gap-4
//         ">
//           {rules.map((rule) => (
//             <Card
//               key={rule.title}
//             >
//               <CardHeader>
//                 <CardTitle className="text-base">
//                   {rule.title}
//                 </CardTitle>
//               </CardHeader>

//               <CardContent>
//                 {rule.value}
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }