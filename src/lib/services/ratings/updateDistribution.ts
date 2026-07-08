import { RatingDistribution } from '@/types/ratings';
import { AggregateOperation } from './aggregateEngine';

export function updateDistribution(
  distribution: RatingDistribution,
  operation: AggregateOperation,
  newRating: number,
  oldRating?: number,
): RatingDistribution {
  const updated = { ...distribution };

  const increment = (rating: number) => {
    switch (rating) {
      case 1:
        updated.one++;
        break;
      case 2:
        updated.two++;
        break;
      case 3:
        updated.three++;
        break;
      case 4:
        updated.four++;
        break;
      case 5:
        updated.five++;
        break;
    }
  };

  const decrement = (rating: number) => {
    switch (rating) {
      case 1:
        updated.one--;
        break;
      case 2:
        updated.two--;
        break;
      case 3:
        updated.three--;
        break;
      case 4:
        updated.four--;
        break;
      case 5:
        updated.five--;
        break;
    }
  };

  if (operation === 'create') {
    increment(newRating);
  }

  if (operation === 'delete') {
    decrement(oldRating!);
  }

  if (operation === 'edit') {
    decrement(oldRating!);
    increment(newRating);
  }

  return updated;
}
