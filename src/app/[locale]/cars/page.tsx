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
import {useQueries} from "@tanstack/react-query";
import Image from "next/image";
import {useDateTimeFormatter} from '@/lib/helper/formatDate';
import {BookNowButton} from "@/components/BookNowButton";
import {CarSpecRow} from "@/components/general/CarSpecRow";
import {CarRatingPreview} from "@/components/general/CarRatingPreview";
import {useTranslations} from "next-intl";
import {useMemo, useState} from "react";
import React from "react";
import {Checkbox} from "@/components/ui/checkbox";

export interface CarFilters {
  search: string;
  city: string;
  category: string;
  currency: string;
  maxPrice: number | null;
  featuredOnly: boolean;
  sort:
  | "featured"
  | "price-low"
  | "price-high"
  | "rating"
  | "newest"
  | "name";
}

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

  const [filters, setFilters] =
    useState<CarFilters>({
      search: "",
      city: "",
      category: "",
      currency: "",
      maxPrice: null,
      featuredOnly: false,
      sort: "featured",
    });



  const isLoading = results.some((q) => q.isLoading);

  const carWithShop =
    buildCarsWithShop(cars, shops);

  const visibleCarsWithShop = carWithShop.filter(c => c.shop.isActive === true);

  const cities = useMemo(() => {
    return [
      ...new Set(
        visibleCarsWithShop.map(
          item => item.shop.city
        )
      ),
    ].sort((a, b) => a.localeCompare(b));
  }, [visibleCarsWithShop]);

  const categories = useMemo(() => {
    return [
      ...new Set(
        visibleCarsWithShop.map(
          item => item.car.carType
        )
      ),
    ].sort((a, b) => a.localeCompare(b));
  }, [visibleCarsWithShop]);

  const currencies = useMemo(() => {
    return [
      ...new Set(
        visibleCarsWithShop.map(
          item => item.car.currency
        )
      ),
    ].sort();
  }, [visibleCarsWithShop]);

  const filteredCars = React.useMemo(() => {
    let result = [...visibleCarsWithShop];

    //--------------------------------------------------
    // Search
    //--------------------------------------------------

    if (filters.search) {
      const search =
        filters.search.toLowerCase();

      result = result.filter(item =>
        item.car.brand
          .toLowerCase()
          .includes(search) ||

        item.car.model
          .toLowerCase()
          .includes(search) ||

        item.shop.name
          .toLowerCase()
          .includes(search)
      );
    }

    //--------------------------------------------------
    // City
    //--------------------------------------------------

    if (filters.city) {
      result = result.filter(
        item =>
          item.shop.city === filters.city
      );
    }

    //--------------------------------------------------
    // Category
    //--------------------------------------------------

    if (filters.category) {
      result = result.filter(
        item =>
          item.car.carType ===
          filters.category
      );
    }

    //--------------------------------------------------
    // Currency
    //--------------------------------------------------

    if (filters.currency) {
      result = result.filter(
        item =>
          item.car.currency ===
          filters.currency
      );
    }

    //--------------------------------------------------
    // Price
    //--------------------------------------------------

    if (
      filters.currency &&
      filters.maxPrice !== null
    ) {
      result = result.filter(
        item =>
          item.finalPrice <=
          filters.maxPrice!
      );
    }

    //--------------------------------------------------
    // Featured
    //--------------------------------------------------

    if (filters.featuredOnly) {
      result = result.filter(
        item => item.car.isFeatured
      );
    }

    //--------------------------------------------------
    // Sorting
    //--------------------------------------------------

    switch (filters.sort) {
      case "featured":
        result.sort((a, b) => {
          return (
            Number(b.car.isFeatured) -
            Number(a.car.isFeatured)
          );
        });
        break;

      case "price-low":
        result.sort(
          (a, b) =>
            a.finalPrice -
            b.finalPrice
        );
        break;

      case "price-high":
        result.sort(
          (a, b) =>
            b.finalPrice -
            a.finalPrice
        );
        break;

      case "rating":
        result.sort(
          (a, b) =>
            (b.car.review?.average ?? 0) -
            (a.car.review?.average ?? 0)
        );
        break;

      case "newest":
        result.sort(
          (a, b) =>
            b.car.createdAt.toMillis() -
            a.car.createdAt.toMillis()
        );
        break;

      case "name":
        result.sort((a, b) =>
          `${a.car.brand} ${a.car.model}`.localeCompare(
            `${b.car.brand} ${b.car.model}`
          )
        );
        break;
    }

    return result;

  }, [
    visibleCarsWithShop,
    filters,
  ]);


  if (isLoading) {
    return <PageLoader />;
  }

  if (carsHasError || shopsHasError) {
    return <p className="">{errors}</p>;
  }

  return (
    <div className="space-y-8">
      <CarsHero />

      <CarFilters
        filters={filters}
        onChange={setFilters}
        cities={cities}
        categories={categories}
        currencies={currencies}
      />

      <FeaturedCars cars={filteredCars} />

      <CarsGrid cars={filteredCars} />
    </div>
  );
}

function CarsHero() {
  const t = useTranslations('cars');
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
        {t('findYourPerfectRide')}
      </h1>

      <p className="mt-4 text-white/80 max-w-2xl">
        {t('browseHundredsOfRentalVehicles')}
      </p>
    </div>
  );
}

interface CarFiltersProps {
  filters: CarFilters;
  onChange: (
    filters: CarFilters
  ) => void;
  cities: string[];
  categories: string[];
  currencies: string[];
}

function CarFilters({filters, onChange, cities, categories, currencies, }: CarFiltersProps) {
  const t = useTranslations('cars');

  const normalizeSelectValue = (
    value: string | null
  ): string => {
    if (value === null || value === "all") {
      return "";
    }
    return value;
  };

  const sortLabels: Record<
    CarFilters["sort"],
    string
  > = {
    featured: t("featuredFirst"),
    "price-low": t("lowestPrice"),
    "price-high": t("highestPrice"),
    rating: t("highestRated"),
    newest: t("newest"),
    name: t("alphabetical"),
  };

  const pricePlaceholder =
    filters.currency
      ? `${t("maxPrice")} (${filters.currency})`
      : t("selectCurrencyFirst");

  return (
    <Card>
      <CardContent className="pt-6">

        <div
          className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-7
      gap-4"
        >

          {/* Search */}

          <Input
            value={filters.search}
            onChange={(e) =>
              onChange({
                ...filters,
                search: e.target.value,
              })
            }
            placeholder={t("searchVehicle")}
          />

          {/* City */}

          <Select
            value={filters.city || "all"}
            onValueChange={(value) =>
              onChange({
                ...filters,
                city: normalizeSelectValue(value),
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                {filters.city ||
                  t("allCities")}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>

              <SelectItem value="all">
                {t("allCities")}
              </SelectItem>

              {cities.map(city => (
                <SelectItem
                  key={city}
                  value={city}
                >
                  {city}
                </SelectItem>
              ))}

            </SelectContent>
          </Select>

          {/* Category */}

          <Select
            value={filters.category || "all"}
            onValueChange={(value) =>
              onChange({
                ...filters,
                category: normalizeSelectValue(value),
              })
            }
          >

            <SelectTrigger className="w-full">
              <SelectValue>
                {filters.category ||
                  t("allCategories")}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>

              <SelectItem value="all">
                {t("allCategories")}
              </SelectItem>

              {categories.map(category => (
                <SelectItem
                  key={category}
                  value={category}
                >
                  {category}
                </SelectItem>
              ))}

            </SelectContent>

          </Select>

          {/* Currency */}

          <Select
            value={filters.currency || "all"}
            onValueChange={(value) =>
              onChange({
                ...filters,
                currency: normalizeSelectValue(value),
                maxPrice: null,
              })
            }
          >

            <SelectTrigger className="w-full">
              <SelectValue>
                {filters.currency ||
                  t("allCurrencies")}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>

              <SelectItem value="all">
                {t("allCurrencies")}
              </SelectItem>

              {currencies.map(currency => (
                <SelectItem
                  key={currency}
                  value={currency}
                >
                  {currency}
                </SelectItem>
              ))}

            </SelectContent>

          </Select>

          {/* Max Price */}

          <Input
            type="number"
            disabled={!filters.currency}
            value={filters.maxPrice ?? ""}
            placeholder={pricePlaceholder}
            onChange={(e) =>
              onChange({
                ...filters,
                maxPrice:
                  e.target.value === ""
                    ? null
                    : Number(e.target.value),
              })
            }
          />

          {/* Sort */}

          <Select
            value={filters.sort}
            onValueChange={(value) =>
              onChange({
                ...filters,
                sort: value as CarFilters["sort"],
              })
            }
          >

            <SelectTrigger className="w-full">
              <SelectValue>
                {sortLabels[filters.sort]}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>

              <SelectItem value="featured">
                {t("featuredFirst")}
              </SelectItem>

              <SelectItem value="price-low">
                {t("lowestPrice")}
              </SelectItem>

              <SelectItem value="price-high">
                {t("highestPrice")}
              </SelectItem>

              <SelectItem value="rating">
                {t("highestRated")}
              </SelectItem>

              <SelectItem value="newest">
                {t("newest")}
              </SelectItem>

              <SelectItem value="name">
                {t("alphabetical")}
              </SelectItem>

            </SelectContent>

          </Select>

          {/* Clear */}

          <Button
            variant="outline"
            onClick={() =>
              onChange({
                search: "",
                city: "",
                category: "",
                currency: "",
                maxPrice: null,
                featuredOnly: false,
                sort: "featured",
              })
            }
          >
            {t("clearFilters")}
          </Button>

        </div>

        <div className="flex items-center gap-2 mt-5">

          <Checkbox
            id="featured"
            checked={filters.featuredOnly}
            onCheckedChange={(checked) =>
              onChange({
                ...filters,
                featuredOnly: checked === true,
              })
            }
          />

          <label
            htmlFor="featured"
            className="cursor-pointer text-sm"
          >
            {t("featuredOnly")}
          </label>

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
  const t = useTranslations('cars');
  const featured = cars.filter(
    (car) => car.car.isFeatured
  );

  if (!featured.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">
        {t('featuredVehicles')}
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
  const t = useTranslations('cars');
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          {t("availableVehicles")}
        </h2>

        <p className="text-sm text-muted-foreground">
          {t("vehiclesFound", {count: cars.length})}
        </p>
      </div>

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
  const t = useTranslations('cars');
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
              {t('featured')}
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
                  {t('pricePerDay')}
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
              <BookNowButton label={t('bookNow')} url={`/bookings/new/${item.car.id}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}