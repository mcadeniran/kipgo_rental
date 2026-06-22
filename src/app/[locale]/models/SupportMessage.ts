import { FirestoreDataConverter, Timestamp } from 'firebase/firestore';
export interface SupportMessage {
  id: string;
  email: string;
  message: string;
  status: string;
  userId: string;
  timestamp: Date;
}

export const supportMessageConverter: FirestoreDataConverter<SupportMessage> = {
  toFirestore(sm: SupportMessage) {
    return {
      id: sm.id,
      email: sm.email,
      message: sm.message,
      status: sm.status,
      userId: sm.userId,
      timestamp: sm.timestamp ?? new Date(),
    };
  },

  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      email: data.email,
      message: data.message,
      status: data.status,
      userId: data.userId,
      bannerUrl: data.bannerUrl,
      timestamp: data.timestamp
        ? (data.timestamp as Timestamp).toDate()
        : undefined,
    } as SupportMessage;
  },
};
