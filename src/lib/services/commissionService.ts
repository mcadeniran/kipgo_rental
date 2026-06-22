import { db } from '@/app/[locale]/firebase/config';
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';

export async function getCommissionDue({
  shopId,
  start,
  commissionPercentage,
}: {
  shopId: string;
  start: Date;
  commissionPercentage: number;
}) {
  const ref = collection(db, 'bookings');

  const formattedStart = new Date(
    Date.UTC(start.getFullYear(), start.getMonth(), 1),
  );

  const nextMonth = new Date(
    Date.UTC(start.getFullYear(), start.getMonth() + 1, 1),
  );

  const q = query(
    ref,
    where('shopId', '==', shopId),
    where('status', '==', 'completed'),
    where('completedAt', '>=', Timestamp.fromDate(formattedStart)),
    where('completedAt', '<', Timestamp.fromDate(nextMonth)),
  );

  const snap = await getDocs(q);
  let totalBase = 0;

  snap.forEach((doc) => {
    const b = doc.data();
    console.log({
      id: doc.id,
      status: b.status,
      completedAtType: b.completedAt?.constructor?.name,
      completedAt: b.completedAt,
    });

    const base = (b.rentalPrice || 0) + (b.deliveryPrice || 0);
    console.log(typeof b.completedAt, b.completedAt);

    totalBase += base;
  });

  const commission = (totalBase * commissionPercentage) / 100;
  console.log('COMMISSION: ', commission);

  return {
    totalBase,
    commission,
    count: snap.size,
  };
}
