import { Notification } from '@/app/[locale]/models/Notification';
import { FirestoreDataConverter, Timestamp } from 'firebase/firestore';

export const notificationConverter: FirestoreDataConverter<Notification> = {
  toFirestore(notification: Notification) {
    return {
      ...notification,
      createadAt: notification.createdAt,
    };
  },

  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      audience: data.audience ?? null,
      title: data.title,
      body: data.body,
      type: data.type,
      bookingId: data.bookingId ?? null,
      status: data.status ?? null,
      isRead: data.isRead,
      createdAt:
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate()
          : data.createdAt,
    };
  },
};
