import {getTranslations} from "next-intl/server";
import DownloadPageContent from "./DownloadPageContent";

export default async function DownloadPage() {
  const t = await getTranslations("download");

  return (
    <DownloadPageContent
      title={t("title")}
      description={t("description")}
      scanToDownload={t("scanToDownload")}
      scanWithYourPhone={t("scanWithYourPhone")}
      googlePlay={t("googlePlay")}
      appStore={t("appStore")}
      travelMadeEasy={t('travelMadeEasy')}
      backToHome={t("backToHome")}
    />
  );
}