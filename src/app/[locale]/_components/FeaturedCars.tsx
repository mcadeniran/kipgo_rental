"use client";


import {CarWithShop} from "@/lib/services/CarWithShop";
import Image from "next/image";
import Link from "next/link";

interface Props {
  cars: CarWithShop[];
}

export default function FeaturedCars({
  cars,
}: Props) {
  if (!cars.length) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Featured Cars
        </h2>

        <Link
          href="/cars"
          className="text-sm underline"
        >
          View all
        </Link>
      </div>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-6
      ">
        {cars.slice(0, 6).map(({car, shop}) => (
          <Link
            key={car.id}
            href={`/cars/${car.id}`}
            className="
              border
              rounded-xl
              overflow-hidden
              hover:shadow-lg
              transition
              bg-background
            "
          >
            <div className="relative h-48 w-full">
              <Image
                src={car.images.find(i => i.isCover)?.url || car.images[0].url}
                alt={car.model}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4 space-y-2">
              <p className="font-semibold">
                {car.brand} {car.model}
              </p>

              <p className="text-sm text-muted-foreground">
                {shop.name}
              </p>

              <div className="flex justify-between text-sm">
                <span>
                  ⭐ {shop.rating}
                </span>

                <span className="font-semibold">
                  {car.currency} {car.pricePerDay}/day
                </span>
              </div>

              <p className="text-xs text-muted-foreground">
                {car.seats} seats • {car.transmission}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}