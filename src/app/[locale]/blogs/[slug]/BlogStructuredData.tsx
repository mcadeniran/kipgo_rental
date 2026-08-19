import {SITE_URL} from "@/lib/seo";
import {Blog} from "../../models/Blog";

interface BlogStructuredDataProps {
  blog: Blog;
}

export default function BlogStructuredData({
  blog,
}: BlogStructuredDataProps) {
  const url =
    `${SITE_URL}/blogs/${blog.slug}`;

  const structuredData = {
    "@context": "https://schema.org",

    "@type": "BlogPosting",

    "@id": `${url}#article`,

    headline: blog.title,

    description:
      blog.excerpt || undefined,

    image: blog.coverUrl,

    url,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },

    ...(blog.publishedAt
      ? {
        datePublished:
          blog.publishedAt.toISOString(),
      }
      : {}),

    ...(blog.updatedAt
      ? {
        dateModified:
          blog.updatedAt.toISOString(),
      }
      : blog.publishedAt
        ? {
          dateModified:
            blog.publishedAt.toISOString(),
        }
        : {}),

    ...(blog.authorName
      ? {
        author: {
          "@type": "Person",
          name: blog.authorName,
        },
      }
      : {}),

    publisher: {
      "@type": "Organization",

      name: "Kipgo",

      url: SITE_URL,
    },

    articleSection:
      blog.category,

    ...(blog.tags?.length
      ? {
        keywords:
          blog.tags.join(", "),
      }
      : {}),

    isPartOf: {
      "@type": "Blog",

      "@id": `${SITE_URL}/blogs#blog`,

      name: "Kipgo Travel Blog",

      url: `${SITE_URL}/blogs`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html:
          JSON.stringify(
            structuredData
          ),
      }}
    />
  );
}