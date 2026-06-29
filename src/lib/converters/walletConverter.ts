import { Wallet } from '@/app/[locale]/models/Wallet';
import { FirestoreDataConverter } from 'firebase/firestore';

export const walletConverter: FirestoreDataConverter<Wallet> = {
  toFirestore(wallet: Wallet) {
    return {
      currency: wallet.currency,
      network: wallet.network,
      network_fee: wallet.networkFee,
      wallet: wallet.wallet,
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return {
      currency: data.currency,
      network: data.network,
      networkFee: data.network_fee,
      wallet: data.wallet,
    };
  },
};
