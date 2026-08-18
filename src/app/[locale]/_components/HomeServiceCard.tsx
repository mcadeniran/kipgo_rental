import Image, {StaticImageData} from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CarFront,
  MapPinned,
  Plane,
} from "lucide-react";

import {useTranslations} from "next-intl";
import airport from '../../../../public/airport.png';
import room from '../../../../public/hotel.png';
import bmw from '../../../../public/bmw.png';
import castle from '../../../../public/castle.png';

interface HomeServiceCardsProps {
  className?: string;
}

interface ServiceCard {
  title: string;
  description: string;
  action: string;
  href: string;
  image: StaticImageData;
  icon: React.ElementType;
  color: {
    icon: string;
    iconBackground: string;
    cta: string;
  };
}

export default function HomeServiceCards({
  className,
}: HomeServiceCardsProps) {
  const t = useTranslations("home");

  const services: ServiceCard[] = [
    {
      title: t("airportTransfer"),
      description: t("airportTransferDescription"),
      action: t("bookNow"),
      href: "/shuttle",
      image: airport,
      icon: Plane,
      color: {
        icon: "text-blue-600",
        iconBackground: "bg-blue-100",
        cta: "text-blue-600",
      },
    },
    {
      title: t("carRental"),
      description: t("carRentalDescription"),
      action: t("exploreCars"),
      href: "/cars",
      image: bmw,
      icon: CarFront,
      color: {
        icon: "text-green-600",
        iconBackground: "bg-green-100",
        cta: "text-green-600",
      },
    },
    {
      title: t("hotels"),
      description: t("hotelsDescription"),
      action: t("exploreHotels"),
      href: "/hotels",
      image: room,
      icon: Building2,
      color: {
        icon: "text-purple-600",
        iconBackground: "bg-purple-100",
        cta: "text-purple-600",
      },
    },
    {
      title: t("toursAndActivities"),
      description: t("toursDescription"),
      action: t("exploreTours"),
      href: "/tours",
      image: castle,
      icon: MapPinned,
      color: {
        icon: "text-orange-600",
        iconBackground: "bg-orange-100",
        cta: "text-orange-600",
      },
    },
  ];

  return (
    <section className={className}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold sm:text-3xl">
          {t("exploreOurServices")}
        </h2>

        <p className="mt-2 text-muted-foreground">
          {t("exploreOurServicesDescription")}
        </p>
      </div>
      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <ServiceCard
            key={service.title}
            service={service}
          />
        ))}
      </div>
    </section>
  );
}


interface ServiceCardProps {
  service: ServiceCard;
}

function ServiceCard({
  service,
}: ServiceCardProps) {
  const Icon = service.icon;
  const {icon, iconBackground, cta} = service.color;

  return (
    <Link
      href={service.href}
      className="group relative block aspect-1.75/1 overflow-hidden rounded-2xl border bg-muted shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      {/* Background image */}

      <Image
        src={service.image}
        alt={service.title}
        fill
        sizes=" (max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />

      {/* Content */}

      <div className="relative z-10 flex h-full w-[52%] flex-col justify-between  p-2 sm:p-3">
        {/* Icon */}

        <div className={`flex h-9 w-9 items-center justify-center rounded-full shadow-sm ${iconBackground}`}>
          <Icon className={`h-6 w-6 ${icon}`} />
        </div>

        {/* Text */}

        <div className="mt-auto">
          <h3 className="text-sm font-bold leading-tight text-foreground sm:text-base">
            {service.title}
          </h3>

          <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-slate-700 ">
            {service.description}
          </p>

          <div className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${cta}`}>
            {service.action}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>

      </div>
    </Link>
  );
}
