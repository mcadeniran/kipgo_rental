'use client';

import { RatingFormValues } from '@/schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { createRating } from '../services/ratingService';
import { submitRating } from './submitRating';

export interface SubmitRatingInput {
  bookingId: string;
  rating: RatingFormValues;
}

export function useSubmitRating() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitRating,

    onSuccess: async (rating, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['booking', variables.bookingId],
        }),

        queryClient.invalidateQueries({
          queryKey: ['car', rating.carId],
        }),

        queryClient.invalidateQueries({
          queryKey: ['rental-shop', rating.shopId],
        }),
      ]);
    },
  });
}

export default useSubmitRating;
