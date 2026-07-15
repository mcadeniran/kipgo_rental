import React from 'react';
import {Car} from '../../models/Car';
import {Badge} from "@/components/ui/badge";
import {Icon} from '@iconify/react';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {useDateTimeFormatter} from '@/lib/helper/formatDate';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {CarWithShop} from '@/lib/services/CarWithShop';
import {RentalShop} from '../../models/RentalShop';
import {BookNowButton} from '@/components/BookNowButton';
import {CarSpecRow} from '@/components/general/CarSpecRow';
import {useTranslations} from 'next-intl';

export default function AvailableRentalCars({cars, shop}: {cars: Car[]; shop: RentalShop;}) {
  const t = useTranslations('cars');

  const router = useRouter();
  const {formatCurrency} = useDateTimeFormatter();

  if (!cars.length) return <p>{t('noAvailableCars')}</p>;

  const date = new Date();

  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h2 className="text-2xl font-bold">
          {t('availableCars')}
        </h2>

        <p className="text-muted-foreground">
          {t('numVehiclesAvailable', {num: cars.length})}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          cars.map(function(car) {
            const carShop = new CarWithShop(car, shop);
            return (
              <Card
                onClick={() => router.push(`/cars/${car.id}`)}
                className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden group transition-all hover:shadow-xl hover:-translate-y-1" key={car.id}>
                <div className="absolute inset-0 z-30 aspect-video" />
                <div className="relative aspect-16/10">
                  <Image
                    fill
                    src={car.images.find(i => i.isCover)?.url || car.images[0].url}
                    alt={`${car.brand} ${car.model}`}
                    sizes='100%'
                    className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  {carShop.hasDiscount && <Badge className="text-sm absolute bg-white text-red-500 top-3 right-3">{shop.discount?.type === 'fixed' ? `-${formatCurrency(carShop.discountAmount, car.currency ?? shop.currency)}` : carShop.discountLabel}</Badge>}
                </div>
                <CardHeader>
                  <CardAction>
                    <div className="flex flex-row gap-1 items-center">
                      <Icon icon="ic:outline-star" className='text-amber-400' width={14} height={14} />
                      {car.review?.average ?? 0}{' '}({car.review?.totalReviews ?? 0})
                    </div>
                  </CardAction>
                  <CardTitle>{car.brand} {car.model} {car.year}</CardTitle>
                  <CardDescription>
                    <div className="flex flex-row justify-between" >
                      <CarSpecRow fuel={car.fuel} transmission={car.transmission} seats={car.seats} size={12} />
                      {car.isFeatured && car.featured && date > car.featured?.startAt && date < car.featured?.endAt &&
                        <Badge variant='destructive'>{t('featured')}</Badge>}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardFooter className='flex justify-between items-center'>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t('pricePerDay')}
                    </p>
                    {
                      !carShop.hasDiscount &&
                      <p className="text-xl font-bold">
                        {formatCurrency(car.pricePerDay, car.currency)}
                      </p>
                    }
                    {
                      carShop.hasDiscount && <div className="flex gap-4 items-end">
                        <p className="text-base font-light text-red-500 line-through">
                          {formatCurrency(carShop.basePrice, car.currency)}
                        </p>
                        <div className="flex gap-1">
                          <p className="text-xl font-bold ">
                            {formatCurrency(carShop.finalPrice, car.currency)}
                          </p>

                        </div>
                      </div>
                    }

                  </div>
                  <BookNowButton label={t('bookNow')} url={`/bookings/new/${car.id}`} />
                </CardFooter>
              </Card>);
          })
        }
      </div>
    </div>
  );
}
