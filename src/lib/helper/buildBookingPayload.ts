import { Booking, BookingPayment } from '@/app/[locale]/models/Booking';
import { BookingStatus, BuildBookingPayloadInput } from './booking.types';
import { convertToUsdt } from './convertToUsdt';

export async function buildBookingPayload({
  draft,
  renter,
  profile,
  carShop,
  totals,
  invoiceNumber,
  wallet,
}: BuildBookingPayloadInput): Promise<Partial<Booking>> {
  const cryptoAmount = await convertToUsdt(
    totals.total,
    totals.currency,
    wallet.networkFee,
  );

  console.log('CRYPTO AMOUNT: ', cryptoAmount);

  const combineDateTime = (date?: Date, time?: string) => {
    if (!date || !time) return null;
    const [h, m] = time.split(':').map(Number);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m);
  };

  let bookingStatus = 'pending';

  let payment: BookingPayment;

  if (draft.paymentMethod === 'crypto') {
    bookingStatus = 'pending';

    payment = {
      method: draft.paymentMethod,
      status: 'pending',
      verified: false,
      completed: false,
      reference: null,
      transactionId: null,
      paidAt: null,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),

      crypto: {
        walletAddress: wallet.wallet,
        network: wallet.network,
        currency: wallet.currency,
        amount: cryptoAmount,
        networkFee: wallet.networkFee,
        txidVerified: false,
        txidRejectedReason: null,
        txidSubmittedAt: null,
        txid: null,
      },

      verification: {
        verifiedBy: null,
        verifiedAt: null,
      },
    };
  } else {
    bookingStatus = 'pending';

    payment = {
      method: draft.paymentMethod,
      status: 'unpaid',
      verified: false,
      completed: false,
      reference: null,
      transactionId: null,
      paidAt: null,
      expiresAt: null,
      crypto: null,
      verification: null,
    };
  }

  return {
    invoiceNumber,

    carId: carShop.car.id,

    shopId: carShop.shop.id,

    userId: profile.id,

    driverId: renter.id,

    unitId: null,

    source: 'app',

    createdBy: 'user',

    createdById: profile.id,

    status: bookingStatus as BookingStatus,

    payment: payment,

    car: {
      brand: carShop.car.brand,
      model: carShop.car.model,
      year: carShop.car.year,
      seats: carShop.car.seats,
      transmission: carShop.car.transmission,
      carType: carShop.car.carType,
      fuel: carShop.car.fuel,
      carImage:
        carShop.car.images.findLast((img) => img.isCover === true)?.url ??
        carShop.car.images[0].url,
      pricePerDay: carShop.finalPrice,
    },

    pickupDate: combineDateTime(draft.pickupDate!, draft.pickupTime!)!,

    dropoffDate: combineDateTime(draft.dropoffDate!, draft.dropoffTime!)!,

    deliveryType: draft.deliveryType,

    deliveryAddress: draft.deliveryAddress,

    rentalPrice: totals.rentalPrice,

    deliveryPrice: totals.deliveryPrice,

    deposit: totals.deposit,

    note: draft.note,

    taxRate: carShop.shop.taxRate,

    preTax: totals.preTax,

    tax: totals.tax,

    totalPrice: totals.total,

    currency: totals.currency,

    shop: {
      name: carShop.shop.name,
      logo: carShop.shop.logoUrl,
      address: carShop.shop.address,
      city: carShop.shop.city,
      district: carShop.shop.district,
      location: {
        lat: carShop.shop.location!.lat,
        lng: carShop.shop.location!.lng,
      },
    },

    driver: {
      name: renter.name,
      phone: renter.phone,
      email: renter.email,
      dob: renter.dob,
      gender: renter.gender,
      licenseFront: renter.licenseFront,
      licenseBack: renter.licenseBack,
      idCard: renter.idCard,
    },

    reservedAt: null,

    approvedAt: null,

    startedAt: null,

    completedAt: null,

    expiredAt: null,

    rejectedAt: null,

    createdAt: new Date(),
  };
}
