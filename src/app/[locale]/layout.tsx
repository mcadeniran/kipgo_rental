import type {Metadata} from "next";
import {Open_Sans, Roboto} from "next/font/google";
import "./globals.css";
// import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import {NextIntlClientProvider, hasLocale} from "next-intl";
import {routing} from "@/i18n/routing";
import {notFound} from "next/navigation";
import {setRequestLocale} from "next-intl/server";
import {AuthProvider} from "@/context/AuthContext";
import QueryProvider from "@/components/QueryProvider";
import {TooltipProvider} from "@/components/ui/tooltip";
import {Toaster} from "sonner";
import Navbar from "@/components/nav/navbar";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Kipgo Rentals",
  description: "Your Simple Solution for Car Rentals in Northern Cyprus",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params
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
      lang="en"
      className={`${openSans.variable} ${roboto.variable}`}
    >
      <body className={`antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning={true}>
        <AuthProvider>
          <NextIntlClientProvider>
            <QueryProvider>
              <TooltipProvider>
                <Navbar />
                <main className="flex-1 w-full">
                  <div className="mx-auto p-4 max-w-7xl ">
                    {children}
                  </div>
                </main>
                <Footer />
                {/* <div id="recaptcha-container" /> */}
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
