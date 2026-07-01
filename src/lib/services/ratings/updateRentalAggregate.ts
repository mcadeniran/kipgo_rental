import { RentalRating, RentalRatingAggregate } from '@/types/ratings';
import { AggregateOperation, calculateAggregate } from './aggregateEngine';

export function updateRentalAggregate(
  aggregate: RentalRatingAggregate,
  rating: RentalRating,
  recommended: boolean,
  operation: AggregateOperation,
): RentalRatingAggregate {
  let totalReviews = aggregate.totalReviews;
  let recommendationCount = aggregate.recommendationCount;

  if (operation === 'create') {
    totalReviews++;
    recommendationCount = recommendationCount + (recommended ? 1 : 0);
  } else if (operation === 'delete') {
    totalReviews--;
    recommendationCount = recommendationCount - (recommended ? 1 : 0);
  } else {
    totalReviews = totalReviews;
    // recommendationCount = (recommendationCount ) + (recommended ? 1 : 0);
  }

  const overall = calculateAggregate(
    aggregate.overallTotal,
    aggregate.totalReviews,
    rating.overall,
    aggregate.overall,
    operation,
  );

  const communication = calculateAggregate(
    aggregate.communicationTotal,
    aggregate.totalReviews,
    rating.communication,
    aggregate.communication,
    operation,
  );

  const pickupExperience = calculateAggregate(
    aggregate.pickupExperienceTotal,
    aggregate.totalReviews,
    rating.pickupExperience,
    aggregate.pickupExperience,
    operation,
  );

  const returnExperience = calculateAggregate(
    aggregate.returnExperienceTotal,
    aggregate.totalReviews,
    rating.returnExperience,
    aggregate.returnExperience,
    operation,
  );

  const professionalism = calculateAggregate(
    aggregate.professionalismTotal,
    aggregate.totalReviews,
    rating.professionalism,
    aggregate.professionalism,
    operation,
  );

  return {
    totalReviews,
    recommendationCount,
    overallTotal: overall.total,
    communicationTotal: communication.total,
    pickupExperienceTotal: pickupExperience.total,
    returnExperienceTotal: returnExperience.total,
    professionalismTotal: professionalism.total,
    average: overall.average,
    recommendationRate:
      totalReviews === 0 ? 0 : (recommendationCount / totalReviews) * 100,
    overall: overall.average,
    communication: communication.average,
    pickupExperience: pickupExperience.average,
    returnExperience: returnExperience.average,
    professionalism: professionalism.average,
  };
}
