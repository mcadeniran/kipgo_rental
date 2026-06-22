export type BlogCategory = 'all' | 'general' | 'hotel' | 'rental' | 'taxi';

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML from Tiptap
  coverUrl: string;
  galleryImages: string[];
  category: BlogCategory;
  tags: string[];
  featured: boolean;
  isPublished: boolean;
  authorId: string;
  authorName: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: Date;
  updatedAt?: Date;
  publishedAt?: Date;
}
