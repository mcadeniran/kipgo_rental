import {getTranslations} from "next-intl/server";
import ShuttlePageHero from "./ShuttlePageHero";
import vito from '../../../../public/vito.png';

export default async function ShuttlePage() {
  const t = await getTranslations("shuttle");

  return (
    <ShuttlePageHero
      title={t("airportTransfersMadeEasy")}
      description={t("airportTransferDescription")}
      availableLabel={t("availableOnMobile")}
      mobileDescription={t("mobileAppDescription")}
      downloadLabel={t("downloadTheApp")}
      image={vito}
    />
  );
}