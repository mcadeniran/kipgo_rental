import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";
import KipgoStructuredData from "./_components/KipgoStructuredData";

import {
  getLanguageAlternates,
  getLocalizedUrl,
} from "@/lib/seo";
import HomeClient from "./HomeClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string;}>;
}): Promise<Metadata> {
  const {locale} = await params;

  const t = await getTranslations({
    locale,
    namespace: "homeSeo",
  });

  return {
    title: t("title"),

    description: t("description"),

    alternates: {
      canonical: getLocalizedUrl(locale),

      languages: {
        ...getLanguageAlternates(),
        "x-default": getLocalizedUrl("en"),
      },
    },

    openGraph: {
      title: t("title"),
      description: t("description"),
      url: getLocalizedUrl(locale),
      type: "website",
    },
  };
}

export default function Page() {
  return (
    <>
      <KipgoStructuredData />
      <HomeClient />
    </>
  );
}