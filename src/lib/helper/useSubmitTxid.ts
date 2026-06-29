'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { submitBookingTxid } from '../services/payment';
import { useRouter } from '@/i18n/navigation';

export function useSubmitTxid() {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ bookingId, txid }: { bookingId: string; txid: string }) =>
      submitBookingTxid(bookingId, txid),
    onSuccess(_, variables) {
      toast.success('Your transaction hash has been submitted successfully.');
      router.replace(`/bookings/${variables.bookingId}`);
    },
    onError(error) {
      toast.error(error.message);
    },
  });
}
