'use client';
import PageLoader from "@/components/general/PageLoader";
import {getAllBlogs} from "@/lib/services/blogService";
import {useQueries} from "@tanstack/react-query";

import BlogGridCard from "./_components/BlogGridCard";
import {Link} from "@/i18n/navigation";
import {Button} from "@/components/ui/button";
import {getAds} from "@/lib/services/ads";
import AdCarousel from "./_components/AdCarousel";
import {getAllCars, getFeaturedCars} from "@/lib/services/carService";
import {getActiveRentalShops} from "@/lib/services/rentalService";
import FeaturedShops from "./_components/FeaturedShops";
import FeaturedCars from "./_components/FeaturedCars";
import {buildCarsWithShop} from "@/lib/services/buildCarsWithShop";
import {useTranslations} from "next-intl";
import HomeHero from "./_components/HomeHero";
import {useMemo} from "react";
import HomeServiceCard from "./_components/HomeServiceCard";
import PopularCars from "./_components/PopularCars";
import HomeTrustFeatures from "./_components/HomeTrustFeatures";
import HomeAppBanner from "./_components/HomeAppBanner";

export default function Home() {
  const t = useTranslations("home");

  const results = useQueries({
    queries: [
      {
        queryKey: ["blogs"],
        queryFn: getAllBlogs,
      },
      {
        queryKey: ["ads"],
        queryFn: getAds,
      },
      {
        queryKey: ["featuredCars"],
        queryFn: getFeaturedCars,
      },
      {
        queryKey: ["rentalShops"],
        queryFn: getActiveRentalShops,
      },
      {
        queryKey: ["allCars"],
        queryFn: getAllCars,
      },
    ],
  });

  const blogs = results[0].data || [];

  const ads = results[1].data || [];

  const cars = results[2].data || [];

  const shops = results[3].data || [];

  const allCars = results[4].data || [];

  const now = new Date();

  const featuredShops =
    shops.filter((shop) => {
      if (!shop.isFeatured || !shop.featured) {
        return false;
      }

      const start = shop.featured.startAt;

      const end = shop.featured.endAt;

      return (now > start && now < end);
    });


  const carWithShop = buildCarsWithShop(cars, shops);
  const allCarsWithShop = buildCarsWithShop(allCars, shops);

  const visibleCarsWithShop =
    allCarsWithShop.filter(
      (item) =>
        item.shop.isActive === true
    );


  const cities = useMemo(() => {
    return [
      ...new Set(
        visibleCarsWithShop.map(
          (item) =>
            item.shop.city
        )
      ),
    ].sort((a, b) =>
      a.localeCompare(b)
    );
  }, [
    visibleCarsWithShop,
  ]);


  const categories =
    useMemo(() => {
      return [
        ...new Set(
          visibleCarsWithShop.map(
            (item) =>
              item.car.carType
          )
        ),
      ].sort((a, b) =>
        a.localeCompare(b)
      );
    }, [
      visibleCarsWithShop,
    ]);


  const currencies =
    useMemo(() => {
      return [
        ...new Set(
          visibleCarsWithShop.map(
            (item) =>
              item.car.currency
          )
        ),
      ].sort();
    }, [
      visibleCarsWithShop,
    ]);

  if (results.some((query) => query.isError)) {
    return (
      <p className="text-center">
        {t("somethingWentWrong")}
      </p>
    );
  }

  const isLoading = results.some(
    (query) => query.isLoading
  );


  if (isLoading) {
    return <PageLoader />;
  }



  return (
    <main className="pb-16">
      <div className="-mt-2 space-y-12">
        {/* ---------------------------------------- */}
        {/* Hero */}
        {/* ---------------------------------------- */}

        <HomeHero
          cities={cities}
          categories={categories}
          currencies={currencies}
        />


        {/* ---------------------------------------- */}
        {/* Services */}
        {/* ---------------------------------------- */}
        <HomeServiceCard />

        {/* ---------------------------------------- */}
        {/* Advertisement */}
        {/* ---------------------------------------- */}

        <section
          className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,0.8fr)] lg:items-start">
          <PopularCars cars={visibleCarsWithShop} />
          {ads.length > 0 && (
            <div className="min-w-0">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  {t('advertisements')}
                </h2>
              </div>

              <AdCarousel ads={ads} />
            </div>
          )}
        </section>

        <HomeTrustFeatures />

        <HomeAppBanner />

        {/* ---------------------------------------- */}
        {/* Featured Cars */}
        {/* ---------------------------------------- */}

        {carWithShop.length > 0 && (
          <section className="mx-auto">
            <FeaturedCars cars={carWithShop} />
          </section>
        )}


        {/* ---------------------------------------- */}
        {/* Featured Shops */}
        {/* ---------------------------------------- */}

        {featuredShops.length > 0 && (
          <section className="mx-auto">
            <FeaturedShops
              shops={featuredShops}
            />
          </section>
        )}


        {/* ---------------------------------------- */}
        {/* Latest News */}
        {/* ---------------------------------------- */}

        {blogs.length > 0 && (
          <section className="mx-auto">
            <div
              className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className=" text-2xl font-bold sm:text-3xl">
                  {t("latestNews")}
                </h2>

                <p className="mt-2 text-muted-foreground">
                  {t("rentalTravelCompanyUpdates")}
                </p>
              </div>


              <Button
                variant="outline"
              >
                <Link href="/blogs">
                  {t("viewAll")}
                </Link>
              </Button>
            </div>


            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs
                .slice(0, 6)
                .map((blog) => (
                  <BlogGridCard
                    key={blog.id}
                    blog={blog}
                  />
                ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
