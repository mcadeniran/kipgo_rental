'use client';
import PageLoader from '@/components/general/PageLoader';
import {Button} from '@/components/ui/button';
import {getAllBlogs} from '@/lib/services/blogService';
import {useQuery} from '@tanstack/react-query';
import React, {useMemo, useState} from 'react';
import BlogGridCard from './components/BlogGridCard';
import {BlogCategory} from '../models/Blog';
import FeaturedBlogCard from './components/featuredBlogCard';
import {useTranslations} from 'next-intl';
import TranslatedBlogCategories from '@/lib/translations/translatedBlogCategories';

type Category = BlogCategory;

export default function BlogsPage() {
  const t = useTranslations('blog');
  const [category, setCategory] =
    useState<Category>("all");

  const {
    data: blogs = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
  });

  const filteredBlogs = useMemo(() => {
    if (category === "all") {
      return blogs;
    }

    return blogs.filter(
      (blog) =>
        blog.category === category
    );
  }, [blogs, category]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return (
      <p className="text-red-500">
        {error.message}
      </p>
    );
  }

  const featured =
    filteredBlogs.find(
      (blog) => blog.featured
    ) ?? filteredBlogs[0];

  const gridBlogs =
    filteredBlogs.filter(
      (blog) => blog.id !== featured?.id
    );

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="rounded-2xl bg-k-primary text-white p-8 md:p-12">
        <h1 className="text-4xl font-bold">
          {t('latestNewsAndUpdates')}
        </h1>

        <p className="mt-4 text-white/80 max-w-2xl">
          {t('discoverTravelGuides')}
        </p>
      </div>

      {/* Featured */}
      {featured && (
        <FeaturedBlogCard
          blog={featured}
        />
      )}

      {/* Categories */}
      <div className="flex flex-wrap gap-2 justify-center">
        {[
          "all",
          "general",
          "rental",
          "hotel",
          "taxi",
        ].map((item) => (
          <Button
            key={item}
            variant={
              category === item
                ? "default"
                : "outline"
            }
            className='capitalize'
            onClick={() =>
              setCategory(
                item as Category
              )
            }
          >
            <TranslatedBlogCategories category={item as BlogCategory} />
          </Button>
        ))}
      </div>

      {/* Grid */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
      >
        {gridBlogs.map((blog) => (
          <BlogGridCard
            key={blog.id}
            blog={blog}
          />
        ))}
      </div>
    </div>
  );
}