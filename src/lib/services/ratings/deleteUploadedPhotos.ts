import { app } from '@/app/[locale]/firebase/config';
import { deleteObject, getStorage, ref } from 'firebase/storage';

const storage = getStorage(app);

export async function deleteUploadedPhotos(paths: string[]) {
  Promise.all(paths.map((path) => deleteObject(ref(storage, path))));
}
