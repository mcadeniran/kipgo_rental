"use client";

import Image from "next/image";
import Link from "next/link";
import {useTranslations} from "next-intl";

import {ArrowRight, Headphones, ShieldCheck, Tag, Zap, } from "lucide-react";

import {Button} from "@/components/ui/button";
import HomeCarSearch from "./HomeCarSearch";
import view from '../../../../public/view.jpeg';
import {Icon} from "@iconify/react";

interface HomeHeroProps {
  cities: string[];
  categories: string[];
  currencies: string[];
}

export default function HomeHero({
  cities,
  categories,
  currencies,
}: HomeHeroProps) {
  const t = useTranslations("home");

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-muted">
      {/* Background image */}

      <div className="absolute inset-0">
        <Image
          src={view}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Overall readability overlay */}

        {/* <div className="absolute inset-0 bg-black/10" /> */}

        {/* Left-side gradient */}

        {/* <div className=" absolute inset-y-0 left-0 w-full bg-linear-to-r  from-white/35  via-white/25 to-transparent" /> */}
      </div>


      {/* Hero content */}

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:min-h-120 lg:px-8 lg:py-8">
        <div className=" grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-8">

          {/* -------------------------------- */}
          {/* Hero introduction */}
          {/* -------------------------------- */}

          {/* <div className="rounded-3xl border   border-white/50  bg-white/60 p-4 shadow-sm backdrop-blur-sm  sm:p-4 lg:p-6"> */}
          <div className="">
            {/* Heading */}
            <div className="bg-white/50 max-w-sm p-2 rounded-sm backdrop-blur-sm ">
              {/* <h1 className=" max-w-sm text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[46px] lg:leading-[1.08]">
                {t("yourJourneyInNorthernCyprus")}
              </h1> */}
              <h1 className=" max-w-sm text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[46px] lg:leading-[1.08]">
                {t.rich("yourJourneyInNorthernCyprus", {
                  highlight: (chunks) => (
                    <span className="text-k-primary">
                      {chunks}
                    </span>
                  ),
                })}
              </h1>
            </div>


            {/* Description */}
            <div className="bg-white/50 max-w-sm p-2 mt-2 rounded-sm backdrop-blur-sm ">
              <p className="max-w-lg text-base leading-7">
                {t("airportTransfersCarRentalsHotelsAndMore")}
              </p>
            </div>

            {/* Benefits */}

            <div className="bg-white/50 p-2 rounded-sm mt-6 grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-4 backdrop-blur-sm ">
              <HeroBenefit
                icon={Zap}
                title={t("fastBooking")}
                description={t("bookInSeconds")}
              />

              <HeroBenefit
                icon={ShieldCheck}
                title={t("reliableService")}
                description={t("trustedByTravelers")}
              />

              <HeroBenefit
                icon={Tag}
                title={t("bestPrices")}
                description={t("noHiddenFees")}
              />

              <HeroBenefit
                icon={Headphones}
                title={t("support247")}
                description={t("wereHereForYou")}
              />
            </div>


            {/* Actions */}

            <div className="mt-6 flex gap-2 flex-col sm:flex-row">
              <Link href="/cars" className="flex items-center justify-center cursor-pointer">
                <Button className="bg-k-primary px-5 py-5 text-white hover:bg-k-primary/90 cursor-pointer">
                  {t("exploreCars")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link href="/download" className="flex items-center justify-center cursor-pointer">
                <Button
                  variant="outline"
                  className="border-k-primary px-5 py-5 bg-white/70 text-k-primary  hover:bg-white cursor-pointer"
                >
                  <Icon icon="entypo:mobile" className="h-4 w-4 fill-k-primary text-k-primary" />
                  {/* <FaMobile className="mr-2 h-4 w-4" /> */}
                  {t("downloadApp")}
                </Button>
              </Link>
            </div>
          </div>


          {/* -------------------------------- */}
          {/* Car search */}
          {/* -------------------------------- */}

          <div className="relative z-10">
            <HomeCarSearch
              cities={cities}
              categories={categories}
              currencies={currencies}
            />
          </div>

        </div>
      </div>
    </section>
  );
}


function HeroBenefit({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <div className=" flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-white shadow-sm">
        <Icon className=" h-6 w-6 text-k-primary" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold leading-4 text-foreground sm:text-[11px]">
          {title}
        </p>

        <p className="mt-0.5 text-[11px] leading-4  sm:text-[11px]">
          {description}
        </p>
      </div>
    </div>
  );
}