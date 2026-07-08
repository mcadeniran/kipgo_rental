'use client';

import RatingSummary from '@/app/[locale]/ratings/_components/RatingSummary';
import ReviewsSection from '@/app/[locale]/ratings/_components/ReviewsSection';
import PageLoader from '@/components/general/PageLoader';
import {getCarById} from '@/lib/services/carService';
import {useQuery} from '@tanstack/react-query';
import {useParams} from 'next/navigation';
import React from 'react';

export default function CarReviewsPage() {
  const params = useParams();
  const id = params.id as string;

  const {
    data: car,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["car-details", id],
    queryFn: () => getCarById(id),
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (error || !car) {
    return (
      <div className="text-center py-10">
        Unable to load car reviews.
      </div>
    );
  }



  return (
    <div className='space-y-4'>
      <RatingSummary
        average={car.review?.average ?? 0}
        totalReviews={car.review?.totalReviews ?? 0}
        recommendationRate={car.review?.recommendationRate ?? 0}
        distribution={car.review?.distribution ?? {
          five: 0, four: 0, three: 0, two: 0, one: 0
        }}
      />

      <ReviewsSection
        carId={id}
      />
    </div>
  );
}
