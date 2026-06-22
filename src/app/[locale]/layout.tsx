import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import {NextIntlClientProvider, hasLocale} from "next-intl";
import {routing} from "@/i18n/routing";
import {notFound} from "next/navigation";
import {setRequestLocale} from "next-intl/server";
import {AuthProvider} from "@/context/AuthContext";
import QueryProvider from "@/components/QueryProvider";
import {TooltipProvider} from "@/components/ui/tooltip";
import {Toaster} from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    >
      <AuthProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
          suppressHydrationWarning={true}>
          <NextIntlClientProvider>
            <QueryProvider>
              <TooltipProvider>
                <NavBar />
                <main className="flex-1 w-full">
                  <div className="mx-auto p-4 max-w-7xl">
                    {children}
                  </div>

                </main>
                <Footer />
              </TooltipProvider>
            </QueryProvider>
            <Toaster />
          </NextIntlClientProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
