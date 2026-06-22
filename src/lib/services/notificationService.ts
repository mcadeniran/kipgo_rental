import { db } from '@/app/[locale]/firebase/config';
import {
  collection,
  getDocs,
  where,
  query,
  orderBy,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { notificationConverter } from '../converters/notificationConverter';
import { Notification } from '@/app/[locale]/models/Notification';

export async function getNotifications(
  userId: string,
): Promise<Notification[]> {
  const ref = collection(db, 'notifications').withConverter(
    notificationConverter,
  );

  const q = query(
    ref,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
  );

  const snaps = await getDocs(q);

  return snaps.docs.map((doc) => doc.data());
}

export async function markNotificationAsRead(notificationId: string) {
  const ref = doc(db, 'notifications', notificationId);

  await updateDoc(ref, {
    isRead: true,
  });
}

export async function markAllNotificationsAsRead(userId: string) {
  const notifications = await getNotifications(userId);

  const promises = notifications
    .filter((n) => !n.isRead)
    .map((n) =>
      updateDoc(doc(db, 'users', userId, 'notifications', n.id), {
        isRead: true,
      }),
    );

  await Promise.all(promises);
}
