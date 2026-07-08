import { VehicleRating, VehicleRatingAggregate } from '@/types/ratings';
import { AggregateOperation, calculateAggregate } from './aggregateEngine';
import { updateDistribution } from './updateDistribution';

export function updateVehicleAggregate(
  aggregate: VehicleRatingAggregate,
  rating: VehicleRating,
  recommended: boolean,
  operation: AggregateOperation,
): VehicleRatingAggregate {
  const distribution = updateDistribution(
    aggregate.distribution,
    'create',
    rating.overall,
  );

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

  const cleanliness = calculateAggregate(
    aggregate.cleanlinessTotal,
    aggregate.totalReviews,
    rating.cleanliness,
    aggregate.cleanliness,
    operation,
  );

  const comfort = calculateAggregate(
    aggregate.comfortTotal,
    aggregate.totalReviews,
    rating.comfort,
    aggregate.comfort,
    operation,
  );

  const condition = calculateAggregate(
    aggregate.conditionTotal,
    aggregate.totalReviews,
    rating.condition,
    aggregate.condition,
    operation,
  );

  const valueForMoney = calculateAggregate(
    aggregate.valueForMoneyTotal,
    aggregate.totalReviews,
    rating.valueForMoney,
    aggregate.valueForMoney,
    operation,
  );

  return {
    totalReviews,
    recommendationCount,
    overallTotal: overall.total,
    cleanlinessTotal: cleanliness.total,
    comfortTotal: comfort.total,
    conditionTotal: condition.total,
    valueForMoneyTotal: valueForMoney.total,
    average: overall.average,
    recommendationRate:
      totalReviews === 0 ? 0 : (recommendationCount / totalReviews) * 100,
    overall: overall.average,
    cleanliness: cleanliness.average,
    comfort: comfort.average,
    condition: condition.average,
    valueForMoney: valueForMoney.average,
    distribution,
  };
}
