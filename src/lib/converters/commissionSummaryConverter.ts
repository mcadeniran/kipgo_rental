import { FirestoreDataConverter, Timestamp } from 'firebase/firestore';
import { CommissionSummary } from '@/app/[locale]/models/CommissionSummary';

export const commissionSummaryConverter: FirestoreDataConverter<CommissionSummary> =
  {
    toFirestore(summary: CommissionSummary) {
      return {
        ...summary,
        createdAt: summary.createdAt,
        updatedAt: summary.updatedAt ?? null,
      };
    },

    fromFirestore(snapshot, options) {
      const data = snapshot.data(options);

      return {
        id: snapshot.id,

        shopId: data.shopId,
        month: data.month,

        totalBookingAmount: data.totalBookingAmount,
        commissionPercentage: data.commissionPercentage,
        commissionAmount: data.commissionAmount,
        currency: data.currency ?? 'TRY',

        amountPaid: data.amountPaid,
        balance: data.balance,

        status: data.status,

        createdAt:
          data.createdAt instanceof Timestamp
            ? data.createdAt.toDate()
            : data.createdAt,

        updatedAt:
          data.updatedAt instanceof Timestamp
            ? data.updatedAt.toDate()
            : data.updatedAt,
      };
    },
  };
