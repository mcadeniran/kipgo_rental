'use client';
import React, {useEffect} from 'react';

import {useParams} from "next/navigation";
import {useQuery} from '@tanstack/react-query';
import {getBookingById} from '@/lib/services/bookingService';
import PageLoader from '@/components/general/PageLoader';
import {toast} from 'sonner';
import {useRouter} from '@/i18n/navigation';
import {PaymentCountdown} from './PaymentCountdown';
import {PaymentSummary} from './PaymentSummary';
// import {PaymentWarning} from './PaymentWarning';
import {PaymentQr} from './PaymentQr';
import {PaymentTxidForm} from './PaymentTxidForm';
import {useTranslations} from 'next-intl';

export default function CryptoPaymentPage() {
  const t = useTranslations('payment');
  const params = useParams();

  const id = params.id as string;

  const router = useRouter();

  const {data: booking, isLoading, isError, error, } = useQuery({
    queryKey: ['booking', id],
    queryFn: () => getBookingById(id),
    refetchInterval(query) {
      const status = query.state.data?.payment?.status;
      if (
        status === 'pending' ||
        status === 'awaiting_verification'
      ) {
        return 5000;
      }
      return false;
    },
  });

  useEffect(() => {
    if (
      booking?.payment?.status === 'paid'
    ) {
      toast.success(
        t('paymentVerifiedSuccessfully')
      );
      router.replace(
        `/bookings/${booking.id}`
      );
    }
  }, [booking?.payment?.status, booking?.id, router, t]);

  if (isLoading) return <PageLoader />;

  if (isError)
    return (
      <ErrorCard
        title={t('unableToLoadBooking')}
        message={error.message}
      />
    );

  if (!booking)
    return (
      <ErrorCard
        title={t('bookingNotFound')}
        message={t('theBookingDoesNotExist')}
      />
    );

  if (
    booking.payment?.method !== 'crypto'
  ) {
    router.replace(
      `/bookings/${booking.id}`
    );

    return null;
  }

  return (
    <div className="container py-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* LEFT */}
        <div className="space-y-6 lg:col-span-2">
          <PaymentCountdown booking={booking} />
          <PaymentSummary booking={booking} />
          {/* <PaymentWarning /> */}
        </div>

        {/* RIGHT */}

        <div className="space-y-6">
          <PaymentQr booking={booking} />
          <PaymentTxidForm booking={booking} />
        </div>
      </div>
    </div>
  );

}

export const ErrorCard = ({title, message}: {title: string, message: string;}) => {
  return <div className="">{title} {message}</div>;
};