import type {Metadata} from "next";
import {Open_Sans, Roboto} from "next/font/google";
import "./globals.css";
import {notFound} from "next/navigation";
import {hasLocale} from "next-intl";
import {getTranslations} from "next-intl/server";

import {NextIntlClientProvider} from "next-intl";
import {setRequestLocale} from "next-intl/server";

import {routing} from "@/i18n/routing";


import {AuthProvider} from "@/context/AuthContext";
import QueryProvider from "@/components/QueryProvider";
import {TooltipProvider} from "@/components/ui/tooltip";
import Navbar from "@/components/nav/navbar";
import Footer from "@/components/Footer";
import {Toaster} from "sonner";

import {getLanguageAlternates, getLocalizedUrl, SITE_URL, } from "@/lib/seo";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string;}>;
}): Promise<Metadata> {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({
    locale,
    namespace: "seo",
  });

  return {
    metadataBase: new URL(SITE_URL),

    title: {
      default: t("title"),
      template: `%s | Kipgo`,
    },

    description: t("description"),

    applicationName: "Kipgo",

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    alternates: {
      canonical: getLocalizedUrl(locale),
      languages: {
        ...getLanguageAlternates(),
        "x-default": SITE_URL,
      },
    },

    // openGraph: {
    //   type: "website",
    //   siteName: "Kipgo",

    //   title: t("title"),
    //   description: t("description"),

    //   url: getLocalizedUrl(locale),

    //   locale,

    //   images: [
    //     {
    //       url: "/images/og/kipgo-og.jpg",
    //       width: 1200,
    //       height: 630,
    //       alt: "Kipgo - Travel and transportation services in Northern Cyprus",
    //     },
    //   ],
    // },

    // twitter: {
    //   card: "summary_large_image",

    //   title: t("title"),

    //   description: t("description"),

    //   images: [
    //     "/images/og/kipgo-og.jpg",
    //   ],
    // },

    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string;}>;
}>) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${openSans.variable} ${roboto.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning={true}>
        <AuthProvider>
          <NextIntlClientProvider>
            <QueryProvider>
              <TooltipProvider>
                <Navbar />

                <main className="flex-1 w-full">
                  <div className="mx-auto p-4 max-w-7xl">
                    {children}
                  </div>
                </main>

                <Footer />

                <div
                  id="recaptcha-container"
                  className="absolute left-[-9999px] top-0"
                />
              </TooltipProvider>
            </QueryProvider>

            <Toaster />
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}