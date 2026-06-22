export interface CommissionPayment {
  id: string;

  shopId: string;
  summaryId: string;

  amount: number;
  paymentMethod: 'bank_transfer' | 'cash' | 'other';
  reference?: string;

  createdAt: Date;
}
