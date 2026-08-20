import type { MetadataRoute } from 'next';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '@/app/[locale]/firebase/config';
import { SITE_URL, SEO_LOCALES } from '@/lib/seo';
import { carConverter } from '@/lib/converters/carConverter';
import { rentalShopConverter } from '@/lib/converters/rentalShopConverter';
import { blogConverter } from '@/lib/converters/blogConverter';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /*
   * --------------------------------------------------
   * Static pages
   * --------------------------------------------------
   */

  const staticPaths = [
    '/',
    '/cars',
    '/shops',
    '/shuttle',
    '/hotels',
    '/tours',
    '/download',
    '/about',
    '/contact',
    '/blogs',
  ];

  /*
   * --------------------------------------------------
   * Static localized URLs
   * --------------------------------------------------
   */

  const staticUrls = SEO_LOCALES.flatMap((locale) =>
    staticPaths.map((path) => ({
      url:
        locale === 'en' ? `${SITE_URL}${path}` : `${SITE_URL}/${locale}${path}`,

      changeFrequency: path === '/' ? ('daily' as const) : ('weekly' as const),

      priority:
        path === '/' ? 1 : path === '/cars' || path === '/blogs' ? 0.9 : 0.7,
    })),
  );

  /*
   * --------------------------------------------------
   * Cars
   * --------------------------------------------------
   */

  const carsSnapshot = await getDocs(
    query(
      collection(db, 'cars').withConverter(carConverter),
      where('isVisible', '==', true),
    ),
  );

  const carUrls = carsSnapshot.docs.flatMap((doc) => {
    const car = doc.data();

    if (!car.isVisible) {
      return [];
    }

    return SEO_LOCALES.map((locale) => ({
      url:
        locale === 'en'
          ? `${SITE_URL}/cars/${car.id}`
          : `${SITE_URL}/${locale}/cars/${car.id}`,

      lastModified: car.createdAt,

      changeFrequency: 'weekly' as const,

      priority: 0.8,
    }));
  });

  /*
   * --------------------------------------------------
   * Rental shops
   * --------------------------------------------------
   */

  const shopsSnapshot = await getDocs(
    query(
      collection(db, 'rentalShops').withConverter(rentalShopConverter),
      where('isActive', '==', true),
    ),
  );

  const shopUrls = shopsSnapshot.docs.flatMap((doc) => {
    const shop = doc.data();

    if (!shop.isActive) {
      return [];
    }

    return SEO_LOCALES.map((locale) => ({
      url:
        locale === 'en'
          ? `${SITE_URL}/shops/${shop.id}`
          : `${SITE_URL}/${locale}/shops/${shop.id}`,

      lastModified: shop.createdAt,

      changeFrequency: 'weekly' as const,

      priority: 0.8,
    }));
  });

  /*
   * --------------------------------------------------
   * Published blogs
   * --------------------------------------------------
   */

  const blogsSnapshot = await getDocs(
    query(
      collection(db, 'blogs').withConverter(blogConverter),
      where('isPublished', '==', true),
    ),
  );

  const blogUrls = blogsSnapshot.docs.flatMap((doc) => {
    const blog = doc.data();

    if (!blog.isPublished || !blog.slug) {
      return [];
    }

    return SEO_LOCALES.map((locale) => ({
      url:
        locale === 'en'
          ? `${SITE_URL}/blogs/${blog.slug}`
          : `${SITE_URL}/${locale}/blogs/${blog.slug}`,

      lastModified: blog.updatedAt ?? blog.publishedAt ?? blog.createdAt,

      changeFrequency: 'monthly' as const,

      priority: 0.7,
    }));
  });

  /*
   * --------------------------------------------------
   * Final sitemap
   * --------------------------------------------------
   */

  return [...staticUrls, ...carUrls, ...shopUrls, ...blogUrls];
}
// import type { MetadataRoute } from 'next';

// import { routing } from '@/i18n/routing';
// import { getLocalizedUrl } from '@/lib/seo';

// const publicPages = [
//   {
//     path: '',
//     priority: 1,
//     changeFrequency: 'daily' as const,
//   },
//   {
//     path: '/cars',
//     priority: 0.9,
//     changeFrequency: 'daily' as const,
//   },
//   {
//     path: '/shops',
//     priority: 0.8,
//     changeFrequency: 'weekly' as const,
//   },
//   {
//     path: '/shuttle',
//     priority: 0.9,
//     changeFrequency: 'weekly' as const,
//   },
//   {
//     path: '/hotels',
//     priority: 0.8,
//     changeFrequency: 'weekly' as const,
//   },
//   {
//     path: '/tours',
//     priority: 0.8,
//     changeFrequency: 'weekly' as const,
//   },
//   {
//     path: '/blogs',
//     priority: 0.8,
//     changeFrequency: 'weekly' as const,
//   },
//   {
//     path: '/download',
//     priority: 0.8,
//     changeFrequency: 'monthly' as const,
//   },
//   {
//     path: '/about',
//     priority: 0.6,
//     changeFrequency: 'monthly' as const,
//   },
//   {
//     path: '/contact',
//     priority: 0.6,
//     changeFrequency: 'monthly' as const,
//   },
// ];

// export default function sitemap(): MetadataRoute.Sitemap {
//   return routing.locales.flatMap((locale) =>
//     publicPages.map((page) => ({
//       url: getLocalizedUrl(locale, page.path),

//       lastModified: new Date(),

//       changeFrequency: page.changeFrequency,

//       priority: page.priority,
//     })),
//   );
// }
