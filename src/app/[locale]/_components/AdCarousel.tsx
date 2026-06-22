"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {Ad} from "../models/Ad";

export default function AdCarousel({
  ads,
}: {ads: Ad[];}) {
  if (!ads.length) return null;

  return (
    <Carousel
      className="w-full"
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {ads.map((ad) => (
          <CarouselItem key={ad.id}>
            <Link
              href={ad.linkUrl}
              target="_blank"
            >
              <div className="relative h-55 md:h-80 overflow-hidden rounded-2xl">
                {ad.bannerUrl && (
                  <Image
                    src={ad.bannerUrl}
                    alt={ad.title}
                    fill
                    className="object-cover"
                  />
                )}

                <div className="
                  absolute inset-0
                  bg-linear-to-r
                  from-black/70
                  to-black/20
                " />

                <div className="
                  absolute inset-0
                  flex flex-col
                  justify-center
                  p-8
                  text-white
                ">
                  <h2 className="text-2xl md:text-4xl font-bold">
                    {ad.title}
                  </h2>

                  {ad.description && (
                    <p className="mt-2 max-w-xl text-sm md:text-base">
                      {ad.description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      {ads.length > 1 && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
}