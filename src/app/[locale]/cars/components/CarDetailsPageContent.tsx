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
import {Link, useRouter} from "@/i18n/navigation";

import {useDateTimeFormatter} from '@/lib/helper/formatDate';
import RentalRules from "../../_components/RentalRules";
import {CarWithShop} from "@/lib/services/CarWithShop";
import {BookNowButton} from "@/components/BookNowButton";
import RatingSummary from "../../ratings/_components/RatingSummary";
import RatingMetricsGrid from "../../ratings/_components/RatingMetricsGrid";
import useInfiniteReviews from "@/lib/helper/useInfiniteReviews";
import ReviewPreviewList from "../../ratings/_components/ReviewPreviewList";
import {useTranslations} from "next-intl";
import TranslatedTransmissionType from "@/lib/translations/translatedTransmissionType";
import {CarType, FuelType, TransmissionType} from "@/lib/carProperties";
import TranslatedFuelType from "@/lib/translations/translatedFuelType";
import TranslatedCarType from "@/lib/translations/translatedCarType";


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

  const router = useRouter();

  const {
    reviews,
    isLoading,
  } = useInfiniteReviews({
    carId: car.id,
    pageSize: 5,
  });

  return (
    <div className="space-y-6">
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

      {/* RATINGS */}
      <CarRating car={car} />

      {
        !isLoading &&
        <ReviewPreviewList
          reviews={reviews.slice(0, 5)}
          onReadMore={() =>
            router.push(`/cars/${car.id}/reviews`)
          }
        />
      }


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
  const t = useTranslations('cars');
  const {formatCurrency} = useDateTimeFormatter();
  return (
    <Card className="sticky top-24 h-fit">
      <CardContent className="space-y-6 pt-6">
        <div>
          <p className="text-sm text-muted-foreground">
            {t('pricePerDay')}
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
            <span>{t('deliveryMethod')}</span>
            <span>
              {t('officePickup')} {car.offersDelivery && <span>{" | "}{t('homeDelivery')}</span>}
            </span>
          </div>
        </div>
        <BookNowButton label={t('bookNow')} url={`/bookings/new/${car.id}`} size="lg" />
        <Link
          href={`/shops/${shop.id}`}
          className="block"
        >
          <Button
            variant="outline"
            className="w-full"
          >
            {t('viewShop')}
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
  const t = useTranslations('cars');
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold">
        {car.brand} {car.model} {car.year}
      </h1>

      <div className="flex flex-wrap gap-2">
        <Badge>
          <TranslatedTransmissionType transmission={car.transmission as TransmissionType} />
        </Badge>

        <Badge variant="secondary">
          <TranslatedFuelType fuel={car.fuel as FuelType} />
        </Badge>

        <Badge variant="outline">
          {t('numSeats', {count: car.seats})}
        </Badge>

        <Badge variant="outline">
          <TranslatedCarType carType={car.carType as CarType} />
        </Badge>
      </div>
    </div>
  );
}

function CarRating({car}: {car: Car;}) {
  const t = useTranslations('cars');
  return <div className=" flex flex-col sm:flex-row w-full gap-4">
    <div className="w-full max-w-2xl">
      <RatingSummary
        average={car.review?.average ?? 0}
        totalReviews={car.review?.totalReviews ?? 0}
        recommendationRate={car.review?.recommendationRate ?? 0}
        distribution={car.review?.distribution ?? {
          five: 0, four: 0, three: 0, two: 0, one: 0
        }}
      />
    </div>
    <div className="w-full max-w-2xl">

      <RatingMetricsGrid
        // title="Vehicle Ratings"
        metrics={[
          {
            label: t('cleanliness'),
            value: car.review?.cleanliness ?? 0,
          },
          {
            label: t("comfort"),
            value: car.review?.comfort ?? 0,
          },
          {
            label: t("condition"),
            value: car.review?.condition ?? 0,
          },
          {
            label: t('valueForMoney'),
            value: car.review?.valueForMoney ?? 0,
          },
        ]}
      />
    </div>
  </div>;
}

function CarFeatures({
  car,
}: {
  car: Car;
}) {
  const t = useTranslations('cars');
  if (!car.features?.length) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t('features')}
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
  const t = useTranslations('cars');
  const specs = [
    {
      label: t("transmission"),
      value: <TranslatedTransmissionType transmission={car.transmission as TransmissionType} />
    },
    {
      label: t("fuelLabel"),
      value: <TranslatedFuelType fuel={car.fuel as FuelType} />,
    },
    {
      label: t("seats"),
      value: car.seats,
    },
    {
      label: t("year"),
      value: car.year,
    },
    {
      label: t("type"),
      value: <TranslatedCarType carType={car.carType as CarType} />,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t("specifications")}
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
  const t = useTranslations('cars');
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t('aboutThisVehicle')}

        </CardTitle>
      </CardHeader>

      <CardContent>
        <p>
          {t('premium', {brand: `${car.brand}`, model: `${car.model}`, city: `${car.city}`})}
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
  const t = useTranslations('cars');

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t('rentalCompany')}
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
                {shop.review?.average ?? 0}  ({t('numOfReviews', {count: shop.review?.totalReviews ?? 0})})
              </span>
            </p>
          </div>

          <Link
            href={`/shops/${shop.id}`}
          >
            <Button>
              {t('viewShop')}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
