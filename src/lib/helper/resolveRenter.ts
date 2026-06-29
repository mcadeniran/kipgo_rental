import { Renter } from '@/app/[locale]/models/Renter';
import { createRenter, updateRenter } from '../repositories/renter.repository';
import { BookingDraft } from '@/app/[locale]/bookings/new/BookingDraft';
import { UserProfile } from '@/app/[locale]/models/UserProfile';
import { UploadedDocuments } from './booking.types';
import { formatDobForFirestore } from './formatDobForFirestore';

export async function resolveRenter({
  draft,
  profile,
  documents,
}: {
  draft: BookingDraft;
  profile: UserProfile;
  documents: UploadedDocuments;
}): Promise<Renter> {
  const renterPayload = {
    name: draft.driver!.name,
    email: draft.driver!.email,
    phone: draft.driver!.phone,
    gender: draft.driver!.gender,

    dob: formatDobForFirestore(draft.driver!.dob),

    licenseFront: documents.licenseFront!,
    licenseBack: documents.licenseBack!,
    idCard: documents.idCard!,

    licenseName: draft.driver!.name,
  };

  switch (draft.driver!.action) {
    case 'existing':
      return {
        id: draft.driver!.id!,
        ...renterPayload,
      };

    case 'create':
      return await createRenter(renterPayload, profile.id);

    case 'update':
      return await updateRenter(profile.id, draft.driver!.id!, renterPayload);

    default:
      console.log(draft.driver?.action);
      throw new Error('Unknown driver action.');
  }
}
