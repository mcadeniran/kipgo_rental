import { db } from '@/app/[locale]/firebase/config';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where,
  updateDoc,
} from 'firebase/firestore';
import { commissionSummaryConverter } from '../converters/commissionSummaryConverter';
import { CommissionSummary } from '@/app/[locale]/models/CommissionSummary';

// Create summary
export async function createCommissionSummary(summary: CommissionSummary) {
  console.log('IN CREATING COMMISSION SUMMARY');
  const ref = doc(db, 'commissionSummaries', summary.id).withConverter(
    commissionSummaryConverter,
  );

  await setDoc(ref, summary);
}

// Get all summaries
export async function getAllCommissionSummaries(): Promise<
  CommissionSummary[]
> {
  const ref = collection(db, 'commissionSummaries').withConverter(
    commissionSummaryConverter,
  );

  const snaps = await getDocs(ref);
  return snaps.docs.map((doc) => doc.data());
}

// Get by company
export async function getCompanySummaries(shopId: string) {
  const ref = collection(db, 'commissionSummaries').withConverter(
    commissionSummaryConverter,
  );

  const q = query(ref, where('shopId', '==', shopId));
  const snaps = await getDocs(q);

  return snaps.docs.map((doc) => doc.data());
}

// Get by month
export async function getSummaryByMonth(
  shopId: string,
  month: string,
): Promise<CommissionSummary | null> {
  const ref = collection(db, 'commissionSummaries').withConverter(
    commissionSummaryConverter,
  );

  const q = query(
    ref,
    where('shopId', '==', shopId),
    where('month', '==', month),
  );

  const snaps = await getDocs(q);
  return snaps.empty ? null : snaps.docs[0].data();
}

// Update summary (for payments)
export async function updateCommissionSummary(
  id: string,
  data: Partial<CommissionSummary>,
) {
  const ref = doc(db, 'commissionSummaries', id);

  await updateDoc(ref, {
    ...data,
    updatedAt: new Date(),
  });
}
