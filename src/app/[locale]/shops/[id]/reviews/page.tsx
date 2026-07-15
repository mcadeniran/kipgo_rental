'use client';

import RatingSummary from '@/app/[locale]/ratings/_components/RatingSummary';
import ReviewsSection from '@/app/[locale]/ratings/_components/ReviewsSection';
import PageLoader from '@/components/general/PageLoader';
import {getRentalShopById} from '@/lib/services/rentalService';
import {useQuery} from '@tanstack/react-query';
import {useTranslations} from 'next-intl';
import {useParams} from 'next/navigation';
import React from 'react';

export default function ShopReviewsPage() {
  const t = useTranslations('reviews');
  const params = useParams();
  const id = params.id as string;

  const {
    data: shop,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["shop-details", id],
    queryFn: () => getRentalShopById(id),
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (error || !shop) {
    return (
      <div className="text-center py-10">
        {t('unableToLoadShopReviews')}
      </div>
    );
  }



  return (
    <div className='space-y-4'>
      <RatingSummary
        average={shop.review?.average ?? 0}
        totalReviews={shop.review?.totalReviews ?? 0}
        recommendationRate={shop.review?.recommendationRate ?? 0}
        distribution={shop.review?.distribution ?? {
          five: 0, four: 0, three: 0, two: 0, one: 0
        }}
      />

      <ReviewsSection
        shopId={id}
      />
    </div>
  );
}
