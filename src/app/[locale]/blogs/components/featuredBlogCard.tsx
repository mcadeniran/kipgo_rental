import Link from "next/link";
import Image from "next/image";
import {Blog} from "@/app/[locale]/models/Blog";

export default function FeaturedBlogCard({
  blog,
}: {
  blog: Blog;
}) {
  return (
    <Link
      href={`/blogs/${blog.id}`}
      className="
        group
        overflow-hidden
        rounded-xl
        border
      "
    >
      <div
        className="
          grid
          lg:grid-cols-2
        "
      >
        <div className="relative h-80">
          <Image
            src={blog.coverUrl}
            alt={blog.title}
            fill
            className="
              object-cover
              transition-transform
              duration-300
              group-hover:scale-105
            "
          />
        </div>

        <div className="p-8 flex flex-col justify-center">
          <p className="uppercase text-sm text-k-primary font-medium">
            {blog.category}
          </p>

          <h2 className="text-3xl font-bold mt-3">
            {blog.title}
          </h2>

          <p className="mt-4 text-muted-foreground">
            {blog.excerpt}
          </p>

          <span className="mt-6 text-k-primary font-medium">
            Read article →
          </span>
        </div>
      </div>
    </Link>
  );
}