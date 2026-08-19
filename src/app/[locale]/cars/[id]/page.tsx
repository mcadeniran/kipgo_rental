import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {getCarPageData} from "@/lib/services/carService";
import {getLanguageAlternates, getLocalizedUrl, } from "@/lib/seo";
import CarDetailsClient from "./CarDetailsClient";
import CarStructuredData from "./CarStructuredData";
import {getTranslations} from "next-intl/server";

interface PageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export async function generateMetadata({params, }: PageProps): Promise<Metadata> {
  const {locale, id} = await params;

  const data = await getCarPageData(id);

  const t = await getTranslations({
    locale,
    namespace: "carSeo",
  });

  if (!data) {
    return {
      title: t('carNotFound'),
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const {car, shop} = data;

  const carName = `${car.brand} ${car.model} ${car.year}`;

  const location = car.city || shop?.city || t('nc');

  // const title = `${carName} Rental in ${location}`;
  const title = t('title', {carName: carName, location: location});

  // const description = `Rent a ${carName} in ${location}, Northern Cyprus with Kipgo. View prices, features, specifications and availability.`;
  const description = t('description', {carName: carName, location: location});

  const path = `/cars/${car.id}`;

  const image =
    car.images.find(
      (image) => image.isCover,
    )?.url ??
    car.images[0]?.url;

  return {
    title,
    description,
    alternates: {
      canonical: getLocalizedUrl(
        locale,
        path,
      ),
      languages: {
        ...getLanguageAlternates(path),
        "x-default":
          getLocalizedUrl(
            "en",
            path,
          ),
      },
    },

    openGraph: {
      type: "website",
      siteName: "Kipgo",
      title,
      description,
      url: getLocalizedUrl(
        locale,
        path,
      ),
      images: image
        ? [
          {
            url: image,
            alt: carName,
          },
        ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image
        ? [image]
        : undefined,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CarDetailsPage({params, }: PageProps) {
  const {id} = await params;

  const data = await getCarPageData(id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <CarStructuredData
        car={data.car}
        shop={data.shop!}
      />

      <CarDetailsClient
        car={data.car}
        shop={data.shop!}
      />
    </>
  );
}