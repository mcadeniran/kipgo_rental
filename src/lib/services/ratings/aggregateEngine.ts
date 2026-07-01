export type AggregateOperation = 'create' | 'edit' | 'delete';

export interface AggregateField {
  total: number;
  average: number;
}

export function calculateAggregate(
  currentTotal: number,
  reviewCount: number,
  newValue: number,
  oldValue: number | null,
  operation: AggregateOperation,
) {
  let total = currentTotal;
  let count = reviewCount;

  if (operation === 'create') {
    total += newValue;
    count++;
  }

  if (operation === 'delete') {
    total -= oldValue!;
    count--;
  }

  if (operation === 'edit') {
    total = total - oldValue! + newValue;
  }

  const average = count === 0 ? 0 : total / count;

  return {
    total,
    average,
    count,
  };
}
