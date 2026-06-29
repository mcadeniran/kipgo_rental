import { BookingDraft } from '@/app/[locale]/bookings/new/BookingDraft';
import { UploadedDocuments } from './booking.types';
import { uploadIfNeeded } from './uploadIfNeeded';

export async function uploadDriverDocuments(
  userId: string,
  documents?: BookingDraft['driverDocuments'],
): Promise<UploadedDocuments> {
  if (!documents) {
    return {};
  }

  const timestamp = Date.now();

  const [licenseFront, licenseBack, idCard] = await Promise.all([
    uploadIfNeeded(
      documents.licenseFront,
      documents.licenseFrontUrl,
      `users/${userId}/drivers/license-front-${timestamp}`,
    ),

    uploadIfNeeded(
      documents.licenseBack,
      documents.licenseBackUrl,
      `users/${userId}/drivers/license-back-${timestamp}`,
    ),

    uploadIfNeeded(
      documents.idCard,
      documents.idCardUrl,
      `users/${userId}/drivers/id-card-${timestamp}`,
    ),
  ]);

  return {
    licenseFront,

    licenseBack,

    idCard,
  };
}
