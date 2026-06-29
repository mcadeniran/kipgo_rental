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

export default function ShopDetailsPage() {
  const params = useParams();
  const id = params.id as string;

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


  const isLoading = results.some((q) => q.isLoading);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isLoading) return <PageLoader />;

  if (!shop) return <div className="">Shop not found</div>;

  // const isError = results.some((q) => q.isError);

  // if (isError) return results.find(q => {
  //   <p className="">{q.error?.message}</p>;
  // });

  if (results.some((q) => q.isError)) {
    return (
      <div className="py-10 text-center">
        Something went wrong while loading the page.
      </div>
    );
  }

  if (!shop) return <p className="">Company not found</p>;


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
              {shop.rating}
              {' '}({shop.totalRatings})
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <Button variant="secondary">
          View Cars
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Item variant="outline">
          <ItemMedia variant="icon">
            <Icon
              icon="material-symbols:star"
              className="text-yellow-400"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{shop.rating} ({shop.totalRatings})</ItemTitle>
            <ItemDescription>
              {"Rental's Rating"}
            </ItemDescription>
          </ItemContent>
        </Item>
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
              Total Cars
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
              Location
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
            <ItemTitle>Office Pickup {shop.offersDelivery && " | Delivery"}</ItemTitle>
            <ItemDescription>
              Delivery Method
            </ItemDescription>
          </ItemContent>
        </Item>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            About Company
          </CardTitle>
        </CardHeader>

        <CardContent>
          {shop.description}
        </CardContent>
      </Card>
      <RentalRules shop={shop} />

      <AvailableRentalCars cars={cars} shop={shop} />

    </div>
  );
}