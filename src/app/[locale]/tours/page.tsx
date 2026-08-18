import {getTranslations} from "next-intl/server";
import ComingSoonPage from "../_components/ComingSoonPage";
import tours from '../../../../public/tours.webp';

export default async function ToursPage() {
  const t = await getTranslations("tours");

  return (
    <ComingSoonPage
      title={t("toursAndActivities")}
      badge={t("comingSoon")}
      description={t("toursComingSoonDescription")}
      image={tours}
    />
  );
}