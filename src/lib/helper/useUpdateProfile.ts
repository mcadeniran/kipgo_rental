'use client';

import { useMutation } from '@tanstack/react-query';

import { updatePersonalInformation } from '@/lib/services/profile-service';

interface UpdateProfileInput {
  uid: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: (data: UpdateProfileInput) =>
      updatePersonalInformation(data.uid, {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
      }),
  });
}
