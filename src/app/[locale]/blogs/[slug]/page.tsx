"use client";

import {useParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import Image from "next/image";
import {getBlogById} from "@/lib/services/blogService";
import {Badge} from "@/components/ui/badge";
import PageLoader from "@/components/general/PageLoader";
import TranslatedBlogCategories from "@/lib/translations/translatedBlogCategories";

export default function BlogDetailsPage() {
  const params = useParams();
  const id = params.slug as string;

  const {
    data: blog,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id),
    enabled: !!id,
  });

  if (isLoading) return <PageLoader />;

  if (isError || !blog) {
    return (
      <div className="p-6 text-red-500">
        {error?.message || "Blog not found"}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* HERO IMAGE */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
        <Image
          src={blog.coverUrl}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* META */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge className="capitalize">
            <TranslatedBlogCategories category={blog.category} />
          </Badge>

          <span className="text-xs text-muted-foreground">
            {blog.createdAt
              ? new Date(
                blog.createdAt
              ).toLocaleDateString()
              : ""}
          </span>

          {/* <span className="text-xs text-muted-foreground">
            • {blog.viewCount} views
          </span> */}
        </div>

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          {blog.title}
        </h1>

        {/* EXCERPT */}
        <p className="text-muted-foreground text-lg">
          {blog.excerpt}
        </p>
      </div>

      {/* CONTENT */}
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