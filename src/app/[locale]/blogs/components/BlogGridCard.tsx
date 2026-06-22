import Image from "next/image";
import Link from "next/link";
import {Blog} from "@/app/[locale]/models/Blog";
import {Badge} from "@/components/ui/badge";

export default function BlogGridCard({
  blog,
}: {
  blog: Blog;
}) {
  return (
    <Link
      href={`/blogs/${blog.id}`}
      className="
        group
        flex
        flex-col
        overflow-hidden
        rounded-xl
        border
        bg-background
        transition-all
        duration-300
        hover:shadow-lg
        hover:-translate-y-1
      "
    >
      {/* Cover Image */}
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={blog.coverUrl}
          alt={blog.title}
          fill
          className="
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 gap-3">
        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className="capitalize"
          >
            {blog.category}
          </Badge>

          {blog.createdAt && (
            <span className="text-xs text-muted-foreground">
              {new Intl.DateTimeFormat(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }
              ).format(blog.createdAt)}
            </span>
          )}
        </div>

        <h3
          className="
            text-lg
            font-semibold
            line-clamp-2
            group-hover:text-k-primary
            transition-colors
          "
        >
          {blog.title}
        </h3>

        <p
          className="
            text-sm
            text-muted-foreground
            line-clamp-3
          "
        >
          {blog.excerpt}
        </p>

        <div className="mt-auto pt-2">
          <span
            className="
              text-sm
              font-medium
              text-k-primary
            "
          >
            Read More →
          </span>
        </div>
      </div>
    </Link>
  );
}