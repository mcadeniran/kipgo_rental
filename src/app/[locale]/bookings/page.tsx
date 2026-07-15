'use client';
import React, {useMemo} from 'react';
import useAuth from '@/context/AuthContext';
import PageLoader from '@/components/general/PageLoader';
import {useQuery} from '@tanstack/react-query';
import {getBookingsByUserId} from '@/lib/services/bookingService';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Booking} from '../models/Booking';
import BookingCard from './components/BookingCard';
import {useTranslations} from 'next-intl';

export default function BookingsPage() {
  const t = useTranslations('bookings');
  const {currentUser, role, loading, userDataObj: user} = useAuth();

  const userId = user?.id || "";

  const {data: bookings = [], isLoading, isError, error} = useQuery({
    queryKey: ['bookings', userId],
    queryFn: () => getBookingsByUserId(userId),
    enabled: !!userId
  });

  const upcoming = useMemo(() => {
    return bookings.filter((b) =>
      [
        "pending",
        "payment_submitted",
        "approved",
        "reserved",
      ].includes(b.status)
    );
  }, [bookings]);

  const active = useMemo(() => {
    return bookings.filter(
      (b) => b.status === "ongoing"
    );
  }, [bookings]);

  const history = useMemo(() => {
    return bookings.filter(
      (b) => b.status === "completed"
    );
  }, [bookings]);

  const cancelled = useMemo(() => {
    return bookings.filter((b) =>
      [
        "cancelled",
        "expired",
        "rejected",
      ].includes(b.status)
    );
  }, [bookings]);

  if (!loading && !currentUser && !role && !user) return;

  if (isLoading) return <PageLoader />;

  if (isError) return <p className="text-red-500">{error.message}</p>;

  return (
    <div className="max-w-7xl mx-auto w-full space-y-6">
      <div
        className="
        rounded-2xl
        bg-k-primary
        text-white
        p-8
        md:p-12
      "
      >
        <h1 className="text-4xl font-bold">
          {t('myBookings')}
        </h1>

        <p className="mt-4 text-white/80 max-w-2xl">
          {t("manageAllYourReservations")}
        </p>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">
            {t('upcoming')} ({upcoming.length})
          </TabsTrigger>

          <TabsTrigger value="active">
            {t('active')} ({active.length})
          </TabsTrigger>

          <TabsTrigger value="history">
            {t('history')} ({history.length})
          </TabsTrigger>

          <TabsTrigger value="cancelled">
            {t('cancelled')} ({cancelled.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <BookingGrid bookings={upcoming} />
        </TabsContent>

        <TabsContent value="active">
          <BookingGrid bookings={active} />
        </TabsContent>

        <TabsContent value="history">
          <BookingGrid bookings={history} />
        </TabsContent>

        <TabsContent value="cancelled">
          <BookingGrid bookings={cancelled} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function BookingGrid({
  bookings,
}: {
  bookings: Booking[];
}) {
  const t = useTranslations('bookings');
  if (!bookings.length) {
    return (
      <div className="py-16 text-center">
        <p className="text-muted-foreground">
          {t('noBookingsFound')}
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      "
    >
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
        />
      ))}
    </div>
  );
}
