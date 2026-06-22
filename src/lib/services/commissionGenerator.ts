import {
  createCommissionSummary,
  getSummaryByMonth,
} from './commissionSummaryService';
import { getAllRentalShops } from './rentalService';
import { getAllCompletedBookings } from './bookingService';
import { Booking } from '@/app/[locale]/models/Booking';

export async function generateMonthlyCommission(month: string) {
  const bookings = await getAllCompletedBookings();

  const filtered = bookings.filter((b: Booking) => {
    if (b.status !== 'completed' || !b.completedAt || b.source === 'manual')
      return false;

    const date = new Date(b.completedAt);
    const m = date.toISOString().slice(0, 7);

    return m === month;
  });

  const grouped: Record<string, Booking[]> = {};

  filtered.forEach((b) => {
    if (!grouped[b.shopId]) grouped[b.shopId] = [];
    grouped[b.shopId].push(b);
  });

  const shops = await getAllRentalShops();

  for (const shop of shops) {
    const existing = await getSummaryByMonth(shop.id, month);
    if (existing) continue; // ✅ prevent duplicates

    const shopBookings = grouped[shop.id] || [];

    const total = shopBookings.reduce((sum, b) => sum + b.totalPrice, 0);

    if (total === 0) continue;

    const commissionAmount = total * (shop.commissionPercentage / 100);

    await createCommissionSummary({
      id: `${shop.id}_${month}`,
      shopId: shop.id,
      month,

      totalBookingAmount: total,
      commissionPercentage: shop.commissionPercentage,
      commissionAmount,
      currency: shop.currency ?? 'TRY',

      amountPaid: 0,
      balance: commissionAmount,
      status: 'unpaid',

      createdAt: new Date(),
    });
  }
}
