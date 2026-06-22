import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
} from 'firebase/firestore';

export type Sender = 'user' | 'admin';

export interface SupportMessage {
  id?: string;
  sender: Sender;
  text: string;
  timestamp: Date;
}

export interface UserChatPreview {
  userId: string;
  username: string;
  avatarUrl?: string;
  role: 'driver' | 'rider';
  lastMessage?: string;
  lastMessageSender?: Sender;
  lastMessageTime?: Date;
}

export const supportMessageConverter: FirestoreDataConverter<SupportMessage> = {
  toFirestore(msg: SupportMessage) {
    return {
      sender: msg.sender,
      text: msg.text,
      timestamp: msg.timestamp,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): SupportMessage {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      sender: data.sender,
      text: data.text,
      timestamp:
        data.timestamp instanceof Timestamp
          ? data.timestamp.toDate()
          : (data.timestamp as Date),
    };
  },
};
