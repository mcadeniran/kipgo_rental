import { Wallet } from '@/app/[locale]/models/Wallet';
import { walletConverter } from '../converters/walletConverter';
import { db } from '@/app/[locale]/firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export async function loadWallet(): Promise<Wallet | null> {
  const ref = doc(db, 'misc', 'wallet').withConverter(walletConverter);

  const snap = await getDoc(ref);

  return snap.exists() ? snap.data() : null;
}
