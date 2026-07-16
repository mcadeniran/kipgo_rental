'use client';
import PageLoader from '@/components/general/PageLoader';
import {AspectRatio} from '@/components/ui/aspect-ratio';
import {getRentalShopById} from '@/lib/services/rentalService';
import {useQueries} from '@tanstack/react-query';
import Image from 'next/image';
import {useParams} from 'next/navigation';
import {Icon} from '@iconify/react';
import AvailableRentalCars from '../components/AvailableRentalCars';
import {getCarsByShop} from '@/lib/services/carService';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Item, ItemContent, ItemDescription, ItemMedia, ItemTitle} from "@/components/ui/item";
import RentalRules from '../../_components/RentalRules';
import {RentalShop} from '../../models/RentalShop';
import RatingSummary from '../../ratings/_components/RatingSummary';
import RatingMetricsGrid from '../../ratings/_components/RatingMetricsGrid';
import useInfiniteReviews from '@/lib/helper/useInfiniteReviews';
import ReviewPreviewList from '../../ratings/_components/ReviewPreviewList';
import {useRouter} from '@/i18n/navigation';
import {useTranslations} from 'next-intl';

export default function ShopDetailsPage() {
  const t = useTranslations('shops');

  const params = useParams();
  const id = params.id as string;

  const router = useRouter();

  const results = useQueries({
    queries: [
      {
        queryKey: ["shop", id],
        queryFn: () => getRentalShopById(id),
      },
      {
        queryKey: ["shopAvailableCars"],
        queryFn: () => getCarsByShop(id),
        enabled: !!id
      }
    ]
  });

  const shop = results[0].data || null;
  const cars = results[1].data || [];

  const {
    reviews,
    isLoading: isReviewLoading,
  } = useInfiniteReviews({
    shopId: id,
    pageSize: 5,
  });



  const isLoading = results.some((q) => q.isLoading);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isLoading) return <PageLoader />;

  if (!shop) return <div className="">Shop not found</div>;


  if (results.some((q) => q.isError)) {
    return (
      <div className="py-10 text-center">
        {t('somethingWentWrong')}
      </div>
    );
  }

  if (!shop) return <p className="">{t('companyNotFound')}</p>;


  return (
    <div className='flex flex-col space-y-6'>
      <div className="relative">
        <AspectRatio ratio={21 / 7}>
          <Image
            src={shop.bannerUrl}
            alt={shop.name}
            fill
            sizes='100%'
            className="object-cover rounded-xl"
          />
        </AspectRatio>

        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent rounded-xl " />

        <div className="absolute bottom-6 left-6 flex items-center gap-4">
          <Image
            src={shop.logoUrl}
            alt={shop.name}
            width={96}
            height={96}
            sizes='100%'
            className="rounded-full border-4 border-white bg-white"
          />

          <div className="text-white">
            <h1 className="text-4xl font-bold">
              {shop.name}
            </h1>

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
      </div>

      <div className="flex gap-3 flex-wrap">
        <Button variant="secondary">
          {t('viewCars')}
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <Item variant="outline">
          <ItemMedia variant="icon">
            <Icon
              icon="ri:car-line"
              className="text-k-primary"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{cars.length}</ItemTitle>
            <ItemDescription>
              {t('totalCars')}
            </ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <Icon
              icon="bytesize:location"
              className="text-red-500"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{shop.district}, {shop.city}</ItemTitle>
            <ItemDescription>
              {t('location')}
            </ItemDescription>
          </ItemContent>
        </Item>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <Icon
              icon="solar:delivery-linear"
              className="text-teal-500"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{t('officePickup')} {shop.offersDelivery && <span>{" | "}{t('delivery')}</span>}</ItemTitle>
            <ItemDescription>
              {t('deliveryMethod')}
            </ItemDescription>
          </ItemContent>
        </Item>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {t('aboutCompany')}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {shop.description}
        </CardContent>
      </Card>

      <ShopRating shop={shop} />

      {
        !isReviewLoading &&
        <ReviewPreviewList
          reviews={reviews.slice(0, 5)}
          onReadMore={() =>
            router.push(`/shops/${id}/reviews`)
          }
        />
      }


      <RentalRules shop={shop} />

      <AvailableRentalCars cars={cars} shop={shop} />

    </div>
  );
}

function ShopRating({shop}: {shop: RentalShop;}) {
  const t = useTranslations('shops');
  return <div className=" flex flex-col sm:flex-row w-full gap-4">
    <div className="w-full max-w-2xl">
      <RatingSummary
        average={shop.review?.average ?? 0}
        totalReviews={shop.review?.totalReviews ?? 0}
        recommendationRate={shop.review?.recommendationRate ?? 0}
        distribution={shop.review?.distribution ?? {
          five: 0, four: 0, three: 0, two: 0, one: 0
        }}
      />
    </div>
    <div className="w-full max-w-2xl">

      <RatingMetricsGrid
        // title="Vehicle Ratings"
        metrics={[
          {
            label: t('communication'),
            value: shop.review?.communication ?? 0,
          },
          {
            label: t('professionalism'),
            value: shop.review?.professionalism ?? 0,
          },
          {
            label: t('pickupExperience'),
            value: shop.review?.pickupExperience ?? 0,
          },
          {
            label: t('returnExperience'),
            value: shop.review?.returnExperience ?? 0,
          },
        ]}
      />
    </div>
  </div>;
}