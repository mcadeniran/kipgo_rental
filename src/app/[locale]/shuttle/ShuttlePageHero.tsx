import Image, {StaticImageData} from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  MapPin,
  Users,
} from "lucide-react";

import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";

interface ShuttlePageHeroProps {
  title: string;
  description: string;
  availableLabel: string;
  mobileDescription: string;
  downloadLabel: string;
  image: StaticImageData;
}

export default function ShuttlePageHero({
  title,
  description,
  availableLabel,
  mobileDescription,
  downloadLabel,
  image,
}: ShuttlePageHeroProps) {
  const t = useTranslations('shuttle');
  return (
    <main className="py-6">
      <section className="relative min-h-125 overflow-hidden rounded-3xl bg-muted">
        {/* Background */}

        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-linear-to-r  from-black/75  via-black/50  to-black/10" />

        {/* Content */}

        <div className="relative z-10 flex min-h-125 items-center px-6 py-12 sm:px-10 lg:px-16">
          <div className="max-w-2xl text-white">
            {/* Availability */}

            <div className="inline-flex items-center gap-2 rounded-full bg-k-primary px-4 py-2 text-sm font-semibold">
              <CarFront className="h-4 w-4" />
              {availableLabel}
            </div>

            {/* Heading */}

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            {/* Description */}

            <p className="mt-5 max-w-xl text-base leading-7  text-white/85 sm:text-lg">
              {description}
            </p>

            {/* Mobile app notice */}

            <div className="mt-6 max-w-xl rounded-2xl border  border-white/20  bg-white/10 p-5 backdrop-blur-sm">
              <p className="font-semibold">
                {availableLabel}
              </p>

              <p className="mt-1 text-sm leading-6  text-white/75">
                {mobileDescription}
              </p>
            </div>

            {/* CTA */}

            <div className="mt-7">
              <Link href="/download">
                <Button className="rounded-xl  bg-white text-k-primary  hover:bg-white/90">
                  {downloadLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Features */}

      <section className="mt-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <ShuttleFeature
            icon={MapPin}
            title={t('flexibleRoute')}
            description={t('flexibleRouteDescription')}
          />

          <ShuttleFeature
            icon={CarFront}
            title={t('comfortableVehicles')}
            description={t('comfortableVehiclesDescription')}
          />

          <ShuttleFeature
            icon={CalendarDays}
            title={t('easyBooking')}
            description={t('easyBookingDescription')}
          />

          <ShuttleFeature
            icon={Users}
            title={t('forGroups')}
            description={t('forGroupsDescription')}
          />
        </div>
      </section>
    </main>
  );
}


function ShuttleFeature({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border bg-background p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl  bg-blue-50 text-k-primary">
        <Icon className="h-5 w-5" />
      </div>

      <h2 className="mt-4 font-semibold">
        {title}
      </h2>

      <p className="mt-1 text-sm leading-5 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}