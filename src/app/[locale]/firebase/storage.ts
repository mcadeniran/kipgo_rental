// lib/firebase/storage.ts
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { app } from './config';
import { v4 as uuid } from 'uuid';
// your firebase config

const storage = getStorage(app);

export async function uploadAdBanner(file: File, adId?: string) {
  const fileName = adId
    ? `ads/${adId}-${Date.now()}-${file.name}`
    : `ads/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, fileName);

  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

export async function uploadRentalBanner(file: File, rentalId: string) {
  const fileName = `rentals/${rentalId}/banner/${file.name}`;

  const storageRef = ref(storage, fileName);

  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

export async function uploadRentalLogo(file: File, rentalId: string) {
  const fileName = `rentals/${rentalId}/logo/${file.name}`;

  const storageRef = ref(storage, fileName);

  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

export async function uploadCarImages(
  files: File[],
  shopId: string,
): Promise<string[]> {
  const urls: string[] = [];

  for (const file of files) {
    const fileRef = ref(
      storage,
      `rentals/${shopId}/cars/${Date.now()}_${file.name}`,
    );

    await uploadBytes(fileRef, file);

    const url = await getDownloadURL(fileRef);

    urls.push(url);
  }

  return urls;
}

export async function deleteImageFromStorage(url: string) {
  try {
    const fileRef = ref(storage, url);
    await deleteObject(fileRef);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}

export async function uploadBlogImage(file: File) {
  const fileRef = ref(storage, `blog-images/${uuid()}-${file.name}`);

  await uploadBytes(fileRef, file);

  return await getDownloadURL(fileRef);
}
