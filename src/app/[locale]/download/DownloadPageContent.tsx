"use client";

import Image, {StaticImageData} from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Smartphone,
} from "lucide-react";

import {Button} from "@/components/ui/button";
import google_en from '../../../../public/google_en.png';
import google_tr from '../../../../public/google_tr.png';
import google_ru from '../../../../public/google_ru.png';
import apple_en from '../../../../public/apple_en.svg';
import apple_ru from '../../../../public/apple_ru.svg';
import apple_tr from '../../../../public/apple_tr.svg';
import qr from '../../../../public/images/app/kipgo-download-qr.png';

import {useLocale} from "next-intl";

interface Props {
  title: string;
  description: string;
  scanToDownload: string;
  scanWithYourPhone: string;
  googlePlay: string;
  appStore: string;
  travelMadeEasy: string;
  backToHome: string;
}

const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.kipgotaxi.app";

const APP_STORE_URL =
  "https://apps.apple.com/tr/app/kipgo/id6754942525";

export default function DownloadPageContent({
  title,
  description,
  scanToDownload,
  scanWithYourPhone,
  googlePlay,
  appStore,
  travelMadeEasy,
  backToHome,
}: Props) {
  const locale = useLocale();
  return (
    <main className="py-6">
      <section className="relative overflow-hidden rounded-3xl bg-k-primary  text-white">
        {/* Decorative background */}

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full  bg-white/10 blur-3xl" />

        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full  bg-white/10 blur-3xl" />

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 md:px-10 lg:grid-cols-[1fr_400px] lg:items-center lg:px-16 lg:py-20">
          {/* Left content */}

          <div>
            <div className="inline-flex items-center gap-2 rounded-full  bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Smartphone className="h-4 w-4" />
              {travelMadeEasy}
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7  text-white/80 sm:text-lg">
              {description}
            </p>

            {/* Store buttons */}

            <div className="mt-8 flex flex-wrap gap-3">
              <StoreButton
                href={GOOGLE_PLAY_URL}
                image={locale === 'tr' ? google_tr : locale === 'ru' ? google_ru : google_en}
                alt={googlePlay}
              />

              <StoreButton
                href={APP_STORE_URL}
                image={locale === 'tr' ? apple_tr : locale === 'ru' ? apple_ru : apple_en}
                alt={appStore}
              />
            </div>

            {/* Back */}

            <Link href="/">
              <Button
                variant="ghost"
                className="mt-6 px-0  text-white hover:bg-transparent  hover:text-white/80"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {backToHome}
              </Button>
            </Link>
          </div>

          {/* QR card */}

          <div className="rounded-3xl  bg-white p-6 text-center text-foreground shadow-2xl sm:p-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-k-primary/10 text-k-primary">
              <Smartphone className="h-8 w-8" />
            </div>
            <h2 className="mt-5 text-xl font-bold">
              {scanToDownload}
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              {scanWithYourPhone}
            </p>

            {/* QR */}

            <div className="mx-auto mt-6 flex w-fit items-center justify-center rounded-2xl border  bg-white p-4">
              <Image
                src={qr}
                alt={scanToDownload}
                width={220}
                height={220}
                priority
                className="h-55 w-55"
              />
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <span>Android</span>
              <span>•</span>
              <span>iPhone</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


function StoreButton({
  href,
  image,
  alt,
}: {
  href: string;
  image: StaticImageData;
  alt: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={alt}
      className="block transition-opacity hover:opacity-80"
    >
      <Image
        src={image}
        alt={alt}
        width={160}
        height={48}
        className="h-12 w-auto"
      />
    </Link>
  );
}