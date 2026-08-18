import Image from "next/image";
import Link from "next/link";
import {useTranslations} from "next-intl";
import {CarWithShop} from "@/lib/services/CarWithShop";
import {useDateTimeFormatter} from "@/lib/helper/formatDate";
import TranslatedTransmissionType from "@/lib/translations/translatedTransmissionType";
import {TransmissionType} from "@/lib/carProperties";

interface Props {
  cars: CarWithShop[];
}

export default function FeaturedCars({cars}: Props) {
  const t = useTranslations("home");
  const {formatCurrency} = useDateTimeFormatter();

  if (!cars.length) {
    return null;
  }

  const popularCars = cars.slice(0, 4);

  return (
    <section className="space-y-4">
      {/* Section header */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">
            {t("popularRentalCars")}
          </h2>
        </div>

        <Link
          href="/cars"
          className="text-sm font-medium text-k-primary hover:underline">
          {t("viewAll")}
        </Link>
      </div>


      {/* Cars */}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {popularCars.map(item => {
          const coverImage = item.car.images.find((image) => image.isCover)?.url ?? item.car.images[0]?.url;

          return (
            <Link
              key={item.car.id}
              href={`/cars/${item.car.id}`}
              className="group min-w-0 overflow-hidden rounded-xl border bg-background transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              {/* Image */}

              <div className="relative aspect-[1.35/1] w-full overflow-hidden bg-muted">
                {coverImage ? (
                  <Image
                    src={coverImage}
                    alt={`${item.car.brand} ${item.car.model}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    {t("noImage")}
                  </div>
                )}
              </div>


              {/* Details */}

              <div className="space-y-2 p-3">
                {/* Car name */}

                <h3 className="truncate text-sm font-semibold">
                  {item.car.brand} {item.car.model}
                </h3>


                {/* Specifications */}
                <p className="text-xs text-muted-foreground">
                  {t('numSeats', {count: item.car.seats})} • <TranslatedTransmissionType transmission={item.car.transmission as TransmissionType} />
                </p>

                {/* Price */}

                <p className="text-xs">
                  {t('fromPrice', {price: formatCurrency(item.finalPrice, item.car.currency)})}
                  {/* <span className="text-muted-foreground">
                    {t("from")}
                  </span>{" "}

                  <span className="font-bold text-k-primary">
                    {car.currency}{" "}
                    {car.pricePerDay.toLocaleString()}
                  </span>

                  <span className="text-muted-foreground">
                    {" "}
                    /{t("day")}
                  </span> */}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}