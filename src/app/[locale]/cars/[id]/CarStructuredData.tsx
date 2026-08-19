import {SITE_URL} from "@/lib/seo";
import {Car} from "../../models/Car";
import {RentalShop} from "../../models/RentalShop";

interface CarStructuredDataProps {
  car: Car;
  shop: RentalShop;
}

export default function CarStructuredData({
  car,
  shop,
}: CarStructuredDataProps) {
  const image =
    car.images?.find(
      (image: {isCover?: boolean;}) =>
        image.isCover,
    )?.url ??
    car.images?.[0]?.url;

  const structuredData = {
    "@context": "https://schema.org",

    "@type": "Product",

    name: `${car.brand} ${car.model} ${car.year}`,

    description:
      `Rent a ${car.brand} ${car.model} in ${car.city}, Northern Cyprus with Kipgo.`,

    ...(image
      ? {
        image: [image],
      }
      : {}),

    brand: {
      "@type": "Brand",
      name: car.brand,
    },

    model: car.model,

    category: car.carType,

    ...(car.pricePerDay != null
      ? {
        offers: {
          "@type": "Offer",

          url: `${SITE_URL}/cars/${car.id}`,

          priceCurrency: car.currency,

          price: car.pricePerDay,

          availability:
            "https://schema.org/InStock",

          ...(shop
            ? {
              seller: {
                "@type": "Organization",
                name: shop.name,
              },
            }
            : {}),
        },
      }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          structuredData,
        ),
      }}
    />
  );
}