'use client';

import PageLoader from '@/components/general/PageLoader';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {getAllRentalShops} from '@/lib/services/rentalService';
import {useQuery} from '@tanstack/react-query';
import React, {useMemo, useState} from 'react';
import {RentalShop} from '../models/RentalShop';
import {Link} from '@/i18n/navigation';
import Image from 'next/image';
import {Badge} from '@/components/ui/badge';
import {isShopFeatured} from '@/lib/helper/isShopFeatured';
import {useTranslations} from 'next-intl';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Checkbox} from '@/components/ui/checkbox';
import {Icon} from '@iconify/react';

export interface RentalShopFilters {
  search: string;
  city: string;
  district: string;
  featuredOnly: boolean;
  minRating: number;
  sort:
  | "featured"
  | "rating"
  | "name"
  | "newest";
}

export default function AllShopsPage() {
  const {data: shops = [], isLoading, error, isError} = useQuery({
    queryKey: ['shops'],
    queryFn: getAllRentalShops
  });



  const [filters, setFilters] = useState<RentalShopFilters>({
    search: "",
    city: "",
    district: "",
    featuredOnly: false,
    minRating: 0,
    sort: "featured",
  });

  const filteredShops = useMemo(() => {
    let result = [...shops];

    if (filters.search) {
      const search = filters.search.toLowerCase();

      result = result.filter(shop =>
        shop.name.toLowerCase().includes(search) ||
        shop.description.toLowerCase().includes(search)
      );
    }

    if (filters.city) {
      result = result.filter(
        shop =>
          shop.city.toLowerCase() ===
          filters.city.toLowerCase()
      );
    }

    if (filters.district) {
      result = result.filter(
        shop =>
          shop.district.toLowerCase() ===
          filters.district.toLowerCase()
      );
    }

    if (filters.featuredOnly) {
      result = result.filter(shop => isShopFeatured({shop}));
    }

    if (filters.minRating > 0) {
      result = result.filter(
        shop => (shop.review?.overall ?? 0) >= filters.minRating
      );
    }

    switch (filters.sort) {
      case "rating":
        result.sort((a, b) => (b.review?.overall ?? 0) - (a.review?.overall ?? 0));
        break;

      case "name":
        result.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "featured":
        result.sort((a, b) => {
          return Number(isShopFeatured({shop: b})) -
            Number(isShopFeatured({shop: a}));
        });
        break;

      case "newest":
        result.sort(
          (a, b) =>
            b.createdAt.getTime() -
            a.createdAt.getTime()
        );
        break;
    }

    return result;

  }, [shops, filters]);

  const cities = React.useMemo(() => {
    return [
      ...new Set(
        shops
          .map((shop) => shop.city)
          .filter((city): city is string => !!city)
      ),
    ].sort((a, b) => a.localeCompare(b));
  }, [shops]);

  const districts = React.useMemo(() => {
    return [
      ...new Set(
        shops
          .filter(
            (shop) =>
              !filters.city || shop.city === filters.city
          )
          .map((shop) => shop.district)
          .filter(
            (district): district is string => !!district
          )
      ),
    ].sort((a, b) => a.localeCompare(b));
  }, [shops, filters.city]);

  if (isLoading) return <PageLoader />;

  if (isError) return <p className="">{error.message}</p>;

  const now = new Date();

  const featuredShops = shops.filter(shop => {
    if (!shop.isFeatured || shop.featured === null)
      return;

    const start = shop.featured!.startAt;
    const end = shop.featured!.endAt;

    if (shop.isFeatured) {
      if (now > start && now < end) {
        return shop;
      }
      else {return null;}
    } else {return null;}

  });

  return (
    <div className="space-y-8">
      <RentalShopsHero />

      {/* <RentalShopFilters /> */}
      <RentalShopFilters
        filters={filters}
        onChange={setFilters}
        cities={cities}
        districts={districts}
      />

      <FeaturedShops
        shops={featuredShops}
      />

      {/* <RentalShopGrid shops={shops} /> */}
      <RentalShopGrid shops={filteredShops} />
    </div>
  );
}

function RentalShopsHero() {
  const t = useTranslations('shops');
  return (
    <div className="rounded-2xl bg-k-primary text-white p-8 md:p-12" >
      <div className="max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-bold">
          {t('rentalCompanies')}
        </h1>

        <p className="mt-4 text-white/80">
          {t('discoverTrustedRentalCompanies')}
        </p>
      </div>
    </div>
  );
}

interface RentalShopFiltersProps {
  filters: RentalShopFilters;
  cities: string[],
  districts: string[],
  onChange: (
    filters: RentalShopFilters
  ) => void;
}

function RentalShopFilters({filters, onChange, cities, districts}: RentalShopFiltersProps) {
  const t = useTranslations('shops');

  const ratingLabels: Record<string, string> = {
    "0": t("anyRating"),
    "3": "⭐ 3+",
    "4": "⭐ 4+",
    "4.5": "⭐ 4.5+",
    "5": "⭐⭐⭐⭐⭐",
  };

  const sortLabels: Record<RentalShopFilters["sort"], string> = {
    featured: t("featuredFirst"),
    rating: t("highestRated"),
    name: t("alphabetical"),
    newest: t("newest"),
  };

  const normalizeSelectValue = (value: string | null): string => {
    if (value === null || value === "all") {
      return "";
    }

    return value;
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">
          <Input
            value={filters.search}
            onChange={(e) =>
              onChange({
                ...filters,
                search: e.target.value,
              })
            }
            placeholder={t("searchCompany")}
          />

          <Select
            value={filters.city || "all"}
            onValueChange={(value) =>
              onChange({
                ...filters,
                city: normalizeSelectValue(value),
                district: "", // Reset district when city changes
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                {filters.city || t("allCities")}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                {t("allCities")}
              </SelectItem>

              {cities.map((city) => (
                <SelectItem
                  key={city}
                  value={city}
                >
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.district || "all"}
            onValueChange={(value) =>
              onChange({
                ...filters,
                district: normalizeSelectValue(value),
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                {filters.district || t("allDistricts")}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                {t("allDistricts")}
              </SelectItem>

              {districts.map((district) => (
                <SelectItem
                  key={district}
                  value={district}
                >
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.minRating.toString()}
            onValueChange={(value) =>
              onChange({
                ...filters,
                minRating: Number(value),
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                {ratingLabels[filters.minRating.toString()]}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="0">
                {t("anyRating")}
              </SelectItem>

              <SelectItem value="3">
                ⭐ 3+
              </SelectItem>

              <SelectItem value="4">
                ⭐ 4+
              </SelectItem>

              <SelectItem value="4.5">
                ⭐ 4.5+
              </SelectItem>

              <SelectItem value="5">
                ⭐⭐⭐⭐⭐
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.sort}
            onValueChange={(value) =>
              onChange({
                ...filters,
                sort: value as RentalShopFilters["sort"],
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

              <SelectItem value="rating">
                {t("highestRated")}
              </SelectItem>

              <SelectItem value="name">
                {t("alphabetical")}
              </SelectItem>

              <SelectItem value="newest">
                {t("newest")}
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
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
              className="text-sm font-medium leading-none cursor-pointer"
            >
              {t("featuredOnly")}
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FeaturedShops({
  shops,
}: {
  shops: RentalShop[];
}) {
  const t = useTranslations('shops');
  if (!shops.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">
        {t('featuredCompanies')}
      </h2>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {shops.map((shop) => (
          <FeaturedShopCard
            key={shop.id}
            shop={shop}
          />
        ))}
      </div>
    </div>
  );
}

function FeaturedShopCard({
  shop,
}: {
  shop: RentalShop;
}) {
  return (
    <Link
      href={`/shops/${shop.id}`}
      className="min-w-[320px]"
    >
      <Card className='relative p-0 pb-3 overflow-hidden group transition-all hover:shadow-xl hover:-translate-y-1'>
        <div className="relative h-44">
          <Image
            src={shop.bannerUrl}
            alt={shop.name}
            fill
            sizes='100%'
            className="object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <CardContent className="pt-4">
          <div className="flex items-center gap-3">
            <Image
              src={shop.logoUrl}
              alt={shop.name}
              width={50}
              height={50}
              sizes='100%'
              className="rounded-full border"
            />

            <div>
              <h3 className="font-semibold">
                {shop.name}
              </h3>

              <p className="text-sm text-muted-foreground">
                {shop.city}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function RentalShopGrid({
  shops,
}: {
  shops: RentalShop[];
}) {
  const t = useTranslations('shops');
  if (!shops.length) {
    return (
      <p className="">{t('noCompaniesFound')}</p>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">
        {t('allRentalCompanies')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <RentalShopCard
            key={shop.id}
            shop={shop}
          />
        ))}
      </div>
    </div>
  );
}

function RentalShopCard({
  shop
}: {
  shop: RentalShop;

}) {
  const t = useTranslations('shops');
  return (
    <Link
      href={`/shops/${shop.id}`}
    >
      <Card className="relative overflow-hidden group transition-all hover:shadow-xl hover:-translate-y-1 p-0 pb-3">
        <div className="relative h-48">
          <Image
            src={shop.bannerUrl}
            alt={shop.name}
            fill
            sizes='100%'
            className="object-cover  transition-transform duration-300 group-hover:scale-105"
          />

          {isShopFeatured({shop: shop}) && (
            <Badge className="absolute top-3 right-3 bg-amber-500 font-semibold">
              {t('featured')}
            </Badge>
          )}
        </div>

        <CardContent className="pt-4">
          <div className="flex gap-4 items-center">
            <Image
              src={shop.logoUrl}
              alt={shop.name}
              width={60}
              height={60}
              sizes='100%'
              className="rounded-full border"
            />

            <div className="flex-1">
              <h3 className="font-semibold">
                {shop.name}
              </h3>

              <p className="text-sm text-muted-foreground">
                {shop.city},{" "}
                {shop.district}
              </p>

              <div className="flex items-center gap-2">
                <Icon
                  icon="material-symbols:star"
                  className="text-yellow-400"
                />
                {shop.review?.overall.toFixed(1) ?? 0}
                {' '}({shop.review?.totalReviews ?? 0})
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm line-clamp-3 text-muted-foreground">
            {shop.description}
          </p>

          <Button className="mt-4 w-full bg-k-primary">
            {t('viewCompany')}
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}