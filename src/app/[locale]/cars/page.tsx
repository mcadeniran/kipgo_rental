'use client';
import PageLoader from "@/components/general/PageLoader";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Link} from "@/i18n/navigation";
import {buildCarsWithShop} from "@/lib/services/buildCarsWithShop";
import {getAllCars} from "@/lib/services/carService";
import {CarWithShop} from "@/lib/services/CarWithShop";
import {getActiveRentalShops} from "@/lib/services/rentalService";
import {Icon} from "@iconify/react";
import {useQueries} from "@tanstack/react-query";
import Image from "next/image";
import {useDateTimeFormatter} from '@/lib/helper/formatDate';
import {BookNowButton} from "@/components/BookNowButton";
import {CarSpecRow} from "@/components/general/CarSpecRow";
import {CarRatingPreview} from "@/components/general/CarRatingPreview";

export default function CarsPage() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["cars"],
        queryFn: getAllCars,
      },
      {
        queryKey: ['rentalShops'],
        queryFn: getActiveRentalShops
      },
    ]
  });

  const cars = results[0].data || [];
  const shops = results[1].data || [];

  let errors = "";

  const carsHasError = results[0].isError;
  const shopsHasError = results[1].isError;

  errors += results[0].error?.message ?? '';
  errors += results[1].error?.message ?? '';

  const isLoading = results.some((q) => q.isLoading);

  if (isLoading) {
    return <PageLoader />;
  }

  if (carsHasError || shopsHasError) {
    return <p className="">{errors}</p>;
  }

  const carWithShop =
    buildCarsWithShop(cars, shops);

  const visibleCarsWithShop = carWithShop.filter(c => c.shop.isActive === true);

  return (
    <div className="space-y-8">
      <CarsHero />

      <CarFilters />

      <FeaturedCars cars={visibleCarsWithShop} />

      <CarsGrid cars={visibleCarsWithShop} />
    </div>
  );
}

function CarsHero() {
  return (
    <div
      className="
        rounded-2xl
        bg-k-primary
        text-white
        p-8
        md:p-12
      "
    >
      <h1 className="text-4xl font-bold">
        Find Your Perfect Ride
      </h1>

      <p className="mt-4 text-white/80 max-w-2xl">
        Browse hundreds of rental vehicles
        from trusted rental companies.
      </p>
    </div>
  );
}

function CarFilters() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div
          className="
            grid
            md:grid-cols-5
            gap-4
          "
        >
          <Input placeholder="Search vehicle" />

          <Input placeholder="City" />

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="sedan">
                Sedan
              </SelectItem>

              <SelectItem value="suv">
                SUV
              </SelectItem>

              <SelectItem value="luxury">
                Luxury
              </SelectItem>
            </SelectContent>
          </Select>

          <Input placeholder="Max Price" />

          <Button>
            Search
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function FeaturedCars({
  cars,
}: {
  cars: CarWithShop[];
}) {
  const featured = cars.filter(
    (car) => car.car.isFeatured
  );

  if (!featured.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">
        Featured Vehicles
      </h2>

      <div
        className="
          flex
          gap-4
          overflow-x-auto
          pb-2
        "
      >
        {featured.map((item) => (
          <FeaturedCarCard
            key={item.car.id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}

function FeaturedCarCard({
  item,
}: {
  item: CarWithShop;
}) {
  const cover =
    item.car.images.find(
      (i) => i.isCover
    )?.url;

  return (
    <Link
      href={`/cars/${item.car.id}`}
      className="min-w-85"
    >
      <Card>
        <div className="relative h-52 mx-auto w-full pt-0 overflow-hidden group transition-all hover:shadow-xl hover:-translate-y-1">
          <Image
            src={cover!}
            alt={item.car.model}
            fill
            sizes="100%"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <CardContent className="pt-4">
          <h3 className="font-semibold">
            {item.car.brand}{" "}
            {item.car.model}
          </h3>

          <p className="text-sm text-muted-foreground">
            {item.shop.name}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

function CarsGrid({
  cars,
}: {
  cars: CarWithShop[];
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">
        Available Vehicles
      </h2>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >
        {cars.map((item) => (
          <CarCard
            key={item.car.id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}

function CarCard({
  item,
}: {
  item: CarWithShop;
}) {
  const cover =
    item.car.images.find(
      (i) => i.isCover
    )?.url ??
    item.car.images[0]?.url;

  const {formatCurrency} = useDateTimeFormatter();

  return (
    <Link
      href={`/cars/${item.car.id}`}
    >
      <Card
        className="relative  pt-0 overflow-hidden group transition-all hover:shadow-xl hover:-translate-y-1" >
        <div className="relative h-56">
          <Image
            src={cover}
            alt={item.car.model}
            fill
            sizes="100%"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {item.car.isFeatured && (
            <Badge
              className="
                absolute
                top-3
                right-3
              "
            >
              Featured
            </Badge>
          )}
        </div>

        <CardContent className="pt-0">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">
                {item.car.brand}{" "}
                {item.car.model}
              </h3>
              <CarRatingPreview review={item.car.review} />
            </div>

            <p className="text-sm text-muted-foreground">
              {item.shop.name}
            </p>

            <CarSpecRow transmission={item.car.transmission} fuel={item.car.fuel} seats={item.car.seats} />



            <div className="flex justify-between items-center pt-2">
              <div>
                <p className="text-xs text-muted-foreground">
                  Price / Day
                </p>
                <div className="flex flex-col">
                  {item.hasDiscount && (
                    <>
                      <span className="line-through text-muted-foreground">
                        {formatCurrency(
                          item.basePrice,
                          item.car.currency
                        )}
                      </span>

                      <Badge
                        variant="destructive"
                        className="w-fit"
                      >
                        {item.discountLabel}
                      </Badge>
                    </>
                  )}

                  <span className="font-bold text-xl text-k-primary">
                    {formatCurrency(
                      item.finalPrice,
                      item.car.currency
                    )}
                  </span>
                </div>
              </div>
              <BookNowButton label="Book Now" url={`/bookings/new/${item.car.id}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}