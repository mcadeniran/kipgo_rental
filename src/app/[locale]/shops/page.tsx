'use client';

import PageLoader from '@/components/general/PageLoader';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {getAllRentalShops} from '@/lib/services/rentalService';
import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {RentalShop} from '../models/RentalShop';
import {Link} from '@/i18n/navigation';
import Image from 'next/image';
import {Badge} from '@/components/ui/badge';
import {isShopFeatured} from '@/lib/helper/isShopFeatured';
import {useTranslations} from 'next-intl';

export default function AllShopsPage() {
  const {data: shops = [], isLoading, error, isError} = useQuery({
    queryKey: ['shops'],
    queryFn: getAllRentalShops
  });

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

      <RentalShopFilters />

      <FeaturedShops
        shops={featuredShops}
      />

      <RentalShopGrid shops={shops} />
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

function RentalShopFilters() {
  const t = useTranslations('shops');
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-4">
          <Input placeholder={t('searchCompany')} />

          <Input placeholder={t('city')} />

          <Button>
            {t('search')}
          </Button>
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

              <div className="flex items-center gap-1 mt-1">
                ⭐ {shop.rating}
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