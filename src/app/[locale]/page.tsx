'use client';
import PageLoader from "@/components/general/PageLoader";
import {getAllBlogs} from "@/lib/services/blogService";
import {useQueries} from "@tanstack/react-query";

import BlogGridCard from "./_components/BlogGridCard";
import {Link} from "@/i18n/navigation";
import {Button} from "@/components/ui/button";
import {getAds} from "@/lib/services/ads";
import AdCarousel from "./_components/AdCarousel";
import {getFeaturedCars} from "@/lib/services/carService";
import {getActiveRentalShops} from "@/lib/services/rentalService";
import FeaturedShops from "./_components/FeaturedShops";
import FeaturedCars from "./_components/FeaturedCars";
import {buildCarsWithShop} from "@/lib/services/buildCarsWithShop";
import {useTranslations} from "next-intl";

export default function Home() {
  const t = useTranslations("home");

  const results = useQueries({
    queries: [
      {
        queryKey: ['blogs'],
        queryFn: getAllBlogs,
      },
      {
        queryKey: ["ads"],
        queryFn: getAds,
      },
      {
        queryKey: ['featuredCars'],
        queryFn: getFeaturedCars,
      },
      {
        queryKey: ['rentalShops'],
        queryFn: getActiveRentalShops
      }
    ]
  });

  const isLoading = results.some((q) => q.isLoading);

  if (isLoading) {
    return <PageLoader />;
  }

  const blogs = results[0].data || [];
  const ads = results[1].data || [];
  const cars = results[2].data || [];
  const shops = results[3].data || [];

  const now = new Date();

  const featuredShops = shops.filter((shop) => {
    if (!shop.isFeatured || !shop.featured) {
      return false;
    }

    const start = shop.featured.startAt;
    const end = shop.featured.endAt;

    return now > start && now < end;
  });


  const carWithShop =
    buildCarsWithShop(cars, shops);

  if (results.some((q) => q.isError)) {
    return (
      <div className="py-10 text-center">
        {t('somethingWentWrong')}
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8">
      {
        blogs.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">
                  {t('latestNews')}
                </h2>

                <p className="text-muted-foreground">
                  {t('rentalTravelCompanyUpdates')}
                </p>
              </div>

              <Link href="/blogs">
                <Button variant="outline">
                  {t('viewAll')}
                </Button>
              </Link>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
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
        )
      }
      {ads && ads.length > 0 && (
        <AdCarousel ads={ads} />
      )}

      {/* Featured Shops */}
      <FeaturedShops
        shops={featuredShops}
      />

      {/* Featured Cars */}
      <FeaturedCars
        cars={carWithShop}
      />

    </div>
  );
}
