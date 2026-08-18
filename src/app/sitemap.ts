import type { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';
import { getLocalizedUrl } from '@/lib/seo';

const publicPages = [
  {
    path: '',
    priority: 1,
    changeFrequency: 'daily' as const,
  },
  {
    path: '/cars',
    priority: 0.9,
    changeFrequency: 'daily' as const,
  },
  {
    path: '/shops',
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  },
  {
    path: '/shuttle',
    priority: 0.9,
    changeFrequency: 'weekly' as const,
  },
  {
    path: '/hotels',
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  },
  {
    path: '/tours',
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  },
  {
    path: '/blogs',
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  },
  {
    path: '/download',
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  },
  {
    path: '/about',
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  },
  {
    path: '/contact',
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    publicPages.map((page) => ({
      url: getLocalizedUrl(locale, page.path),

      lastModified: new Date(),

      changeFrequency: page.changeFrequency,

      priority: page.priority,
    })),
  );
}
