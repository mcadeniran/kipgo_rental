import type {Metadata} from "next";
import {notFound} from "next/navigation";

import {getBlogBySlug} from "@/lib/services/blogService";

import {
  getLanguageAlternates,
  getLocalizedUrl,
} from "@/lib/seo";

import BlogDetailsClient from "./BlogDetailsClient";
import BlogStructuredData from "./BlogStructuredData";
import {getTranslations} from "next-intl/server";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const {locale, slug} = await params;

  const t = await getTranslations({
    locale,
    namespace: "blogSeo",
  });

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: t('blogNotFound'),

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = blog.title;

  const description =
    blog.excerpt?.trim() ||
    t('description', {blogTitle: blog.title});

  const path = `/blogs/${blog.slug}`;

  const url = getLocalizedUrl(
    locale,
    path
  );

  return {
    title,

    description,

    authors: blog.authorName
      ? [
        {
          name: blog.authorName,
        },
      ]
      : undefined,

    keywords:
      blog.tags?.length
        ? blog.tags
        : undefined,

    alternates: {
      canonical: url,

      languages: {
        ...getLanguageAlternates(path),

        "x-default":
          getLocalizedUrl(
            "en",
            path
          ),
      },
    },

    openGraph: {
      type: "article",

      siteName: "Kipgo",

      title,

      description,

      url,

      ...(blog.coverUrl
        ? {
          images: [
            {
              url: blog.coverUrl,
              alt: blog.title,
            },
          ],
        }
        : {}),

      ...(blog.publishedAt
        ? {
          publishedTime:
            blog.publishedAt.toISOString(),
        }
        : {}),

      ...(blog.updatedAt
        ? {
          modifiedTime:
            blog.updatedAt.toISOString(),
        }
        : {}),

      ...(blog.authorName
        ? {
          authors: [
            blog.authorName,
          ],
        }
        : {}),

      section: blog.category,
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      ...(blog.coverUrl
        ? {
          images: [blog.coverUrl],
        }
        : {}),
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogDetailsPage({
  params,
}: PageProps) {
  const {slug} = await params;

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <>
      <BlogStructuredData
        blog={blog}
      />

      <BlogDetailsClient
        blog={blog}
      />
    </>
  );
}