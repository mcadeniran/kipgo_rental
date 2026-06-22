import { getStorage, ref, deleteObject } from 'firebase/storage';

/**
 * Deletes a file from Firebase Storage using its URL.
 * @param fileUrl - Full download URL stored in your Firestore document.
 */
export async function deleteFileFromUrl(fileUrl: string) {
  if (!fileUrl) return;

  try {
    const storage = getStorage();
    const decodedUrl = decodeURIComponent(fileUrl);

    // Extract path after `/o/` and before `?`
    const match = decodedUrl.match(/\/o\/(.+)\?/);
    const filePath = match ? match[1] : null;

    if (!filePath) {
      console.warn('Could not extract file path from URL:', fileUrl);
      return;
    }

    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);

    console.log('File deleted:', filePath);
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}
