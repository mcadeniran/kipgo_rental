export interface Notification {
  id: string;
  audience?: string;

  title: string;
  body: string;
  type: string;
  bookingId?: string;
  status?: string;
  isRead: boolean;
  createdAt: Date;
}
