import { useMutation } from '@tanstack/react-query';
import { initializeBooking } from '../services/bookingService';
// import { toast } from 'sonner';

// export function useCreateBooking() {
//   return useMutation({
//     mutationFn: initializeBooking,

//     onSuccess(result) {
//       toast.success('Booking created successfully.');
//       console.log(result.bookingId);
//       console.log(result.invoiceNumber);
//     },

//     onError(error) {
//       toast.error(error.message);
//       console.log(error.name);
//       console.log(error.message);
//     },
//   });
// }

export function useCreateBooking() {
  return useMutation({
    mutationFn: initializeBooking,
  });
}
