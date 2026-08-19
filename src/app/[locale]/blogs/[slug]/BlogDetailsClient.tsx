"use client";

import Image from "next/image";
import {Badge} from "@/components/ui/badge";

import TranslatedBlogCategories from "@/lib/translations/translatedBlogCategories";
import {Blog} from "../../models/Blog";

interface BlogDetailsClientProps {
  blog: Blog;
}

export default function BlogDetailsClient({
  blog,
}: BlogDetailsClientProps) {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-8">

      {/* HERO IMAGE */}

      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        <Image
          src={blog.coverUrl}
          alt={blog.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 896px"
          className="object-cover"
        />
      </div>

      {/* META */}

      <div className="space-y-3">

        <div className="flex flex-wrap items-center gap-2">

          <Badge className="capitalize">
            <TranslatedBlogCategories
              category={blog.category}
            />
          </Badge>

          {blog.publishedAt && (
            <time
              dateTime={blog.publishedAt.toISOString()}
              className="text-xs text-muted-foreground"
            >
              {new Date(
                blog.publishedAt
              ).toLocaleDateString()}
            </time>
          )}

        </div>

        {/* TITLE */}

        <h1 className="text-3xl font-bold leading-tight md:text-4xl">
          {blog.title}
        </h1>

        {/* EXCERPT */}

        {blog.excerpt && (
          <p className="text-lg text-muted-foreground">
            {blog.excerpt}
          </p>
        )}

        {/* AUTHOR */}

        {blog.authorName && (
          <p className="text-sm text-muted-foreground">
            {blog.authorName}
          </p>
        )}

      </div>

      {/* ARTICLE */}

      <article
        className="
          prose
          prose-lg
          max-w-none
          prose-headings:font-bold
          prose-img:rounded-lg
          prose-p:leading-relaxed
        "
        dangerouslySetInnerHTML={{
          __html: blog.content,
        }}
      />

    </div>
  );
}