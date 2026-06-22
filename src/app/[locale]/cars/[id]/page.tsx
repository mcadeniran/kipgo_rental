'use client';
import PageLoader from '@/components/general/PageLoader';
import {getCarWithShop} from '@/lib/services/carService';
import {useQuery} from '@tanstack/react-query';
import {useParams} from 'next/navigation';
import React from 'react';
import CarDetailsPageContent from '../components/CarDetailsPageContent';

export default function CarDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["car-details", id],
    queryFn: () => getCarWithShop(id),
  });



  if (isLoading) return <PageLoader />;

  if (error) return <p className="">{error.message}</p>;

  if (!data)
    return <p>Not found</p>;

  const {car, shop} = data;

  return (
    <div><CarDetailsPageContent car={car} shop={shop!} /></div>
  );
}
