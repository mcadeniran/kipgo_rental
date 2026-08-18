import {CalendarCheck, ShieldCheck, Tag, UsersRound, } from "lucide-react";
import {useTranslations} from "next-intl";

interface TrustFeature {
  title: string;
  description: string;
  icon: React.ElementType;
}

export default function HomeTrustFeatures() {
  const t = useTranslations("home");

  const features: TrustFeature[] = [
    {
      title: t("safeAndSecure"),
      description: t("yourSafetyIsOurTopPriority"),
      icon: ShieldCheck,
    },
    {
      title: t("bestPriceGuarantee"),
      description: t("getTheBestValueForYourMoney"),
      icon: Tag,
    },
    {
      title: t("flexibleBooking"),
      description: t("freeCancellationOnSelectedOptions"),
      icon: CalendarCheck,
    },
    {
      title: t("trustedByThousands"),
      description: t("joinThousandsOfHappyTravelers"),
      icon: UsersRound,
    },
  ];

  return (
    <section className="overflow-hidden rounded-2xl  bg-blue-50/70">
      <div className="grid grid-cols-1 divide-y  divide-blue-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div key={feature.title} className="flex items-center gap-4 px-5 py-4 lg:px-6 lg:py-5">
              {/* Icon */}

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border  border-blue-100  bg-white">
                <Icon className="h-6 w-6 text-k-primary" />
              </div>

              {/* Content */}

              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-k-primary">
                  {feature.title}
                </h3>

                <p className="mt-0.5 text-xs leading-4 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}