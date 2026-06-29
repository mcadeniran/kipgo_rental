import { uploadFile } from '@/app/[locale]/firebase/storage';

export async function uploadIfNeeded(
  file?: File,
  existingUrl?: string,
  path?: string,
) {
  if (existingUrl) return existingUrl;

  if (!file) return undefined;

  return uploadFile(path!, file);
}
