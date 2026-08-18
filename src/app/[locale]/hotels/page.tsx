import {getTranslations} from "next-intl/server";
import ComingSoonPage from "../_components/ComingSoonPage";

import hotels from '../../../../public/hotel.jpg';

export default async function HotelsPage() {
  const t = await getTranslations("hotels");

  return (
    <ComingSoonPage
      title={t("hotelBooking")}
      badge={t("comingSoon")}
      description={t("hotelBookingComingSoonDescription")}
      image={hotels}
    />
  );
}