import {SITE_URL} from "@/lib/seo";

export default function KipgoStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",

    "@id": `${SITE_URL}/#organization`,

    name: "Kipgo",

    url: SITE_URL,

    logo: `${SITE_URL}/public/logo.png`,

    description:
      "Travel and transportation services in Northern Cyprus including car rentals, airport transfers, shuttle services, hotels and tours.",

    areaServed: {
      "@type": "Place",
      name: "Northern Cyprus",
    },

    sameAs: [
      "https://play.google.com/store/apps/details?id=com.kipgotaxi.app",
      "https://apps.apple.com/tr/app/kipgo/id6754942525",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}