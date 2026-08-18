import Image from "next/image";
import Link from "next/link";
import {CalendarCheck, Headphones, Tag, } from "lucide-react";
import {useLocale, useTranslations} from "next-intl";
import googleEn from '../../../../public/google_en.png';
import googleTr from '../../../../public/google_tr.png';
import googleRu from '../../../../public/google_ru.png';

import appleEn from '../../../../public/apple_en.svg';
import appleTr from '../../../../public/apple_tr.svg';
import appleRu from '../../../../public/apple_ru.svg';

interface AppFeature {
  title: string;
  icon: React.ElementType;
}

export default function HomeAppBanner() {
  const t = useTranslations("home");

  const locale = useLocale();

  const features: AppFeature[] = [
    {
      title: t("easyBooking"),
      icon: Headphones,
    },
    {
      title: t("exclusiveOffers"),
      icon: Tag,
    },
    {
      title: t("fastAndSecure"),
      icon: CalendarCheck,
    },
  ];

  return (
    <section className="overflow-hidden rounded-2xl bg-k-primary  text-white">
      <div className="flex flex-col gap-6 px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-4">
        {/* -------------------------------- */}
        {/* Introduction */}
        {/* -------------------------------- */}

        <div className="shrink-0">
          <h2 className="text-lg font-bold sm:text-xl">
            {t("getTheKipgoApp")}
          </h2>

          <p className="mt-1 text-xs  text-white/80 sm:text-sm">
            {t("allYourTravelNeedsInYourPocket")}
          </p>
        </div>


        {/* -------------------------------- */}
        {/* Features */}
        {/* -------------------------------- */}

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 lg:gap-x-8">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.title}
                className="flex items-center gap-2 text-sm font-medium whitespace-nowrap">
                <Icon className="h-5 w-5 shrink-0  text-white/90" />
                <span>
                  {feature.title}
                </span>
              </div>
            );
          })}
        </div>


        {/* -------------------------------- */}
        {/* Store buttons */}
        {/* -------------------------------- */}

        <div className="flex shrink-0 items-center gap-3">
          {/* Google Play */}

          <Link
            href='https://play.google.com/store/apps/details?id=com.kipgotaxi.app'
            target="_blank"
            aria-label={t("downloadOnGooglePlay")}
            className="transition-opacity hover:opacity-80"
          >
            <Image
              src={locale === 'tr' ? googleTr : locale === 'ru' ? googleRu : googleEn}
              alt={t("downloadOnGooglePlay")}
              width={150}
              height={45}
              className="h-10.5 w-auto"
            />
          </Link>


          {/* App Store */}

          <Link
            href='https://apps.apple.com/tr/app/kipgo/id6754942525'
            target="_blank"
            aria-label={t("downloadOnAppStore")}
            className="transition-opacity hover:opacity-80">
            <Image
              src={locale === 'tr' ? appleTr : locale === 'ru' ? appleRu : appleEn}
              alt={t("downloadOnAppStore")}
              width={150}
              height={45}
              className="h-10.5 w-auto "
            />
          </Link>


          {/* QR */}

          {/* <div className="hidden h-12 w-12 shrink-0 rounded-md  bg-white p-1 sm:block">
            <Image
              src="/images/app/kipgo-app-qr.png"
              alt={t("scanToDownloadTheApp")}
              width={48}
              height={48}
              className="h-full w-full object-contain"
            />
          </div> */}
        </div>
      </div>
    </section>
  );
}