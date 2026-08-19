import {SITE_URL} from "@/lib/seo";
import {RentalShop} from "../../models/RentalShop";

interface ShopStructuredDataProps {
  shop: RentalShop;
}

export default function ShopStructuredData({
  shop,
}: ShopStructuredDataProps) {
  const image =
    shop.bannerUrl ||
    shop.logoUrl;

  const structuredData = {
    "@context": "https://schema.org",

    "@type": "LocalBusiness",

    "@id": `${SITE_URL}/shops/${shop.id}#business`,

    name: shop.name,

    description:
      shop.description ||
      `Car rental company in ${shop.city}, Northern Cyprus.`,

    url: `${SITE_URL}/shops/${shop.id}`,

    ...(image
      ? {
        image,
      }
      : {}),

    ...(shop.logoUrl
      ? {
        logo: shop.logoUrl,
      }
      : {}),

    ...(shop.phone
      ? {
        telephone: shop.phone,
      }
      : {}),

    ...(shop.email
      ? {
        email: shop.email,
      }
      : {}),

    address: {
      "@type": "PostalAddress",

      streetAddress: shop.address,

      addressLocality: shop.district
        ? `${shop.district}, ${shop.city}`
        : shop.city,

      addressCountry: "CY",
    },

    ...(shop.location
      ? {
        geo: {
          "@type": "GeoCoordinates",

          latitude:
            shop.location.lat,

          longitude:
            shop.location.lng,
        },
      }
      : {}),

    areaServed: {
      "@type": "Place",
      name: "Northern Cyprus",
    },

    ...(shop.rating > 0 &&
      shop.totalRatings > 0
      ? {
        aggregateRating: {
          "@type": "AggregateRating",

          ratingValue:
            shop.rating,

          reviewCount:
            shop.totalRatings,

          bestRating: 5,

          worstRating: 1,
        },
      }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html:
          JSON.stringify(
            structuredData,
          ),
      }}
    />
  );
}