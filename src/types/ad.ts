// types/ad.ts
export interface Ad {
  id: string; // Firestore document ID
  title: string;
  description?: string;
  bannerUrl: string; // path in Firebase Storage or external URL
  linkUrl: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
