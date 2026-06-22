import { Blog } from '@/app/[locale]/models/Blog';
import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from 'firebase/firestore';

export const blogConverter: FirestoreDataConverter<Blog> = {
  toFirestore(blog: Blog) {
    return {
      ...blog,
    };
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ): Blog {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,

      title: data.title,

      slug: data.slug ?? '',
      excerpt: data.excerpt ?? '',
      content: data.content ?? '',
      coverUrl: data.coverUrl ?? '',
      galleryImages: data.galleryImages ?? [],
      category: data.category ?? 'rental',
      tags: data.tags ?? [],
      featured: data.featured ?? false,
      isPublished: data.isPublished ?? false,
      authorId: data.authorId ?? '',
      authorName: data.authorName ?? '',
      viewCount: data.viewCount ?? 0,
      likeCount: data.likeCount ?? 0,
      commentCount: data.commentCount ?? 0,
      createdAt: parseTimestamp(data.createdAt) ?? new Date(),
      updatedAt: parseTimestamp(data.updatedAt),
      publishedAt: parseTimestamp(data.publishedAt),
    };
  },
};

const parseTimestamp = (value: Timestamp | Date): Date | undefined => {
  if (!value) return undefined;

  if (value instanceof Timestamp) {
    return value.toDate();
  }

  if (value instanceof Date) {
    return value;
  }

  return undefined;
};
