import React from 'react';
import {Blog} from '../models/Blog';
import Image from 'next/image';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {useRouter} from '@/i18n/navigation';

export default function BlogGridCard({blog}: {blog: Blog;}) {

  const router = useRouter();

  return (
    <div onClick={() => router.push(`/blogs/${blog.id}`)} className='flex flex-col h-full overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-lg'>
      <div className="relative h-52 w-full">
        <Image
          src={blog.coverUrl}
          alt={blog.title}
          fill
          sizes='100%'
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <Badge variant='outline' className='capitalize'>{blog.category}</Badge>
        <p className="font-semibold text-lg  line-clamp-2">{blog.title}</p>
        <p className="text-muted-foreground line-clamp-3">{blog.excerpt}</p>
        <Button variant='link' size='sm' className='mt-auto self-start px-0'>Read More →</Button>
      </div>
    </div>
  );
}
