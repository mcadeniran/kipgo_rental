export type CommissionStatus = 'unpaid' | 'partial' | 'paid' | 'overdue';

export interface CommissionSummary {
  id: string;

  shopId: string;
  month: string; // "2026-04"

  totalBookingAmount: number;
  commissionPercentage: number;
  commissionAmount: number;
  currency: string;

  amountPaid: number;
  balance: number;

  status: CommissionStatus;

  createdAt: Date;
  updatedAt?: Date;
}
