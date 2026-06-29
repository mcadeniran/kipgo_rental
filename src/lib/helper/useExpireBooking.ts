import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { expireBooking } from '../services/payment';

export function useExpireBooking() {
  return useMutation({
    mutationFn: expireBooking,
    onSuccess() {
      toast.error('Payment session expired.');
    },
  });
}
