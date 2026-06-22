import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from '@/app/[locale]/firebase/config';
import { supportMessageConverter } from '@/app/[locale]/models/SupportChat';

export async function sendAdminMessage(userId: string, text: string) {
  if (!text.trim()) return;

  const messagesRef = collection(
    db,
    'supportChats',
    userId,
    'messages',
  ).withConverter(supportMessageConverter);

  // Add new message
  await addDoc(messagesRef, {
    sender: 'admin',
    text: text.trim(),
    timestamp: new Date(),
  });

  // Update parent chat doc
  const chatDocRef = doc(db, 'supportChats', userId);
  await setDoc(
    chatDocRef,
    {
      lastMessage: text.trim(),
      lastMessageSender: 'admin',
      lastMessageTime: serverTimestamp(),
    },
    { merge: true },
  );
}
