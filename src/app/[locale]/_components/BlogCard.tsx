import React from 'react';
import {Blog} from '../models/Blog';
import Image from 'next/image';

export default function BlogCard({blog}: {blog: Blog;}) {
  return (
    <div className=' flex w-full space-x-6 h-56'>
      <div className="basis-1/3 relative">
        <Image alt={blog.title} src={blog.coverUrl} fill className='rounded-lg' />
      </div>
      <div className="basis-2/3 flex flex-col space-y-4">
        <h1 className="">{blog.title}</h1>
        <p className="">{blog.excerpt}</p>
      </div>
    </div>
  );
}
