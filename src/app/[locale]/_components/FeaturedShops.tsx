"use client";

import Image from "next/image";
import Link from "next/link";
import {RentalShop} from "../models/RentalShop";
import {StarIcon} from "@heroicons/react/24/solid";

interface Props {
  shops: RentalShop[];
}

export default function FeaturedShops({
  shops,
}: Props) {
  if (!shops.length) return null;

  // console.log(shops);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Featured Shops
        </h2>

        <Link
          href="/shops"
          className="text-sm underline"
        >
          View all
        </Link>
      </div>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        gap-4
      ">
        {shops.slice(0, 4).map(shop => (
          <Link
            key={shop.id}
            href={`/shops/${shop.id}`}
            className="
              border
              rounded-xl
              p-4
              hover:shadow-md
              transition
              bg-background
            "
          >
            <div className="flex items-center gap-3">
              <Image
                src={shop.logoUrl}
                alt={shop.name}
                width={40}
                height={40}
                className="rounded-full"
              />

              <div>
                <p className="font-semibold">
                  {shop.name}
                </p>
                <p className="text-xs text-muted-foreground flex gap-1 items-center">
                  <StarIcon className="h-4 w-4 text-amber-400" /> {shop.rating} ({shop.totalRatings})
                </p>
              </div>
            </div>

            <p className="text-xs mt-3 text-muted-foreground">
              {shop.city}, {shop.district}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}