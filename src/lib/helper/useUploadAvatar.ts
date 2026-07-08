'use client';

import { useMutation } from '@tanstack/react-query';
import { uploadAvatar } from '@/lib/services/profile-service';

interface UploadAvatarInput {
  uid: string;
  file: File;
  oldUrl?: string;
}

export function useUploadAvatar() {
  return useMutation({
    mutationFn: ({ uid, file, oldUrl }: UploadAvatarInput) =>
      uploadAvatar(uid, file, oldUrl),
  });
}
