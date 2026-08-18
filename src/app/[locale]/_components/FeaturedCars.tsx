"use client";


import {CarRatingPreview} from "@/components/general/CarRatingPreview";
import {CarSpecRow} from "@/components/general/CarSpecRow";
import {Badge} from "@/components/ui/badge";
import {useDateTimeFormatter} from "@/lib/helper/formatDate";
import {CarWithShop} from "@/lib/services/CarWithShop";
import {useTranslations} from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface Props {
  cars: CarWithShop[];
}

export default function FeaturedCars({
  cars,
}: Props) {
  const {formatCurrency} = useDateTimeFormatter();
  const t = useTranslations('home');
  if (!cars.length) return null;


  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {t('featuredCars')}
        </h2>

        <Link
          href="/cars"
          className="text-sm underline"
        >
          {t('viewAll')}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.slice(0, 6).map(item => (
          <Link
            key={item.car.id}
            href={`/cars/${item.car.id}`}
            className="border rounded-xl overflow-hidden hover:shadow-lg transition bg-background">
            <div className="relative h-48 w-full">
              <Image
                src={item.car.images.find(i => i.isCover)?.url || item.car.images[0].url}
                alt={item.car.model}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4 space-y-2">
              <p className="font-semibold">
                {item.car.brand} {item.car.model}
              </p>

              <p className="text-sm text-muted-foreground">
                {item.shop.name}
              </p>

              <CarSpecRow transmission={item.car.transmission} fuel={item.car.fuel} seats={item.car.seats} />

              <div className="flex justify-between text-sm">
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
                <CarRatingPreview review={item.car.review} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}