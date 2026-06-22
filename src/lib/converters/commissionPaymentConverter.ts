import { FirestoreDataConverter, Timestamp } from 'firebase/firestore';
import { CommissionPayment } from '@/app/[locale]/models/CommissionPayment';

export const commissionPaymentConverter: FirestoreDataConverter<CommissionPayment> =
  {
    toFirestore(payment: CommissionPayment) {
      return {
        ...payment,
        createdAt: payment.createdAt,
      };
    },

    fromFirestore(snapshot, options) {
      const data = snapshot.data(options);

      return {
        id: snapshot.id,

        shopId: data.shopId,
        summaryId: data.summaryId,

        amount: data.amount,
        paymentMethod: data.paymentMethod,
        reference: data.reference,

        createdAt:
          data.createdAt instanceof Timestamp
            ? data.createdAt.toDate()
            : data.createdAt,
      };
    },
  };
