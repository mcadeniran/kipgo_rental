import { app } from '@/app/[locale]/firebase/config';
import { ReviewPhoto } from '@/types/ratings';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuid } from 'uuid';

const storage = getStorage(app);

export interface UploadedPhoto {
  id: string;
  url: string;
  path: string;
}

export async function uploadReviewPhotos(
  ratingId: string,
  files: File[],
): Promise<ReviewPhoto[]> {
  const uploads = await Promise.all(
    files.map(async (file) => {
      const id = uuid();

      const path = `ratings/${ratingId}/${id}`;

      const storageRef = ref(storage, path);

      await uploadBytes(storageRef, file);

      const url = await getDownloadURL(storageRef);

      return {
        id,
        url,
        path,
        uploadedAt: new Date(),
      };
    }),
  );
  return uploads;
}
