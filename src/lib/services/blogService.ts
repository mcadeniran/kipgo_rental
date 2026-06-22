import { db } from '@/app/[locale]/firebase/config';
import { Blog } from '@/app/[locale]/models/Blog';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { blogConverter } from '../converters/blogConverter';

const blogsRef = collection(db, 'blogs').withConverter(blogConverter);

export async function getAllBlogs(): Promise<Blog[]> {
  const q = query(
    blogsRef,
    where('isPublished', '==', true),
    orderBy('createdAt', 'desc'),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => doc.data());
}

export async function getBlogById(id: string): Promise<Blog | null> {
  const ref = doc(db, 'blogs', id).withConverter(blogConverter);

  const snap = await getDoc(ref);

  return snap.exists() ? snap.data() : null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateBlog(id: string, data: Record<string, any>) {
  await updateDoc(doc(db, 'blogs', id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}
