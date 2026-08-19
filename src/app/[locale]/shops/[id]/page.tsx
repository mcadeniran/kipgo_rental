import type {Metadata} from "next";
import {notFound} from "next/navigation";

import {getShopPageData} from "@/lib/services/rentalService";
import {getLanguageAlternates, getLocalizedUrl, } from "@/lib/seo";
import ShopDetailsClient from "./ShopDetailsClient";
import ShopStructuredData from "./ShopStructuredData";
import {getTranslations} from "next-intl/server";

interface PageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export async function generateMetadata({params, }: PageProps): Promise<Metadata> {
  const {locale, id} = await params;

  const data = await getShopPageData(id);

  const t = await getTranslations({
    locale,
    namespace: "shopSeo",
  });

  if (!data) {
    return {
      title: t('shopNotFound'),

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const {shop} = data;

  const location = shop.city || t('nc');


  const title = t('title', {shopName: shop.name, location: location});

  const description =
    shop.description?.trim() ||
    t('description', {shopName: shop.name, location: location});

  const path = `/shops/${shop.id}`;

  const image =
    shop.bannerUrl ||
    shop.logoUrl;

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

      ...(image
        ? {
          images: [
            {
              url: image,
              alt: shop.name,
            },
          ],
        }
        : {}),
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      ...(image
        ? {
          images: [image],
        }
        : {}),
    },

    robots: {
      index: shop.isActive,
      follow: shop.isActive,
    },
  };
}

export default async function ShopDetailsPage({params, }: PageProps) {
  const {id} = await params;

  const data = await getShopPageData(id);

  if (!data) {
    notFound();
  }

  return (
    <>
      <ShopStructuredData
        shop={data.shop}
      />

      <ShopDetailsClient
        shop={data.shop}
        cars={data.cars}
        shopId={id}
      />
    </>
  );
}