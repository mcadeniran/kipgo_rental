'use client';

import {useParams} from "next/navigation";
import BookingWizard from "../BookingWizard";
import useAuth from "@/context/AuthContext";
import {useQueries} from "@tanstack/react-query";
import {getCarWithShop} from "@/lib/services/carService";
import {getCarBookings, getDriversByUserId} from "@/lib/services/bookingService";
import {getCarUnits} from "@/lib/services/carUnitService";
import {loadWallet} from "@/lib/services/walletService";
import PageLoader from "@/components/general/PageLoader";
import {CarWithShop} from "@/lib/services/CarWithShop";
import {useTranslations} from "next-intl";

export default function NewBookingPage() {
  const t = useTranslations('cars');
  const params = useParams();
  const id = params.id as string;

  const user = useAuth();

  const userId = user.userDataObj?.id || "";

  const results = useQueries(
    {
      queries: [
        {
          queryKey: ['car', id],
          queryFn: () => getCarWithShop(id),
        },
        {
          queryKey: ['bookings', id],
          queryFn: () => getCarBookings(id),
        },
        {
          queryKey: ['carUnits', id],
          queryFn: () => getCarUnits(id)
        },
        {
          queryKey: ['drivers', userId],
          queryFn: () => getDriversByUserId(userId),
          enabled: !!userId
        },
        {
          queryKey: ['wallet'],
          queryFn: loadWallet
        },
      ]
    }
  );

  const car = results[0].data || null;
  const bookings = results[1].data || [];
  const units = results[2].data || [];
  const drivers = results[3].data || [];
  const wallet = results[4].data || null;


  const isLoading = results.some((q) => q.isLoading);

  if (isLoading) {
    return <PageLoader />;
  }

  if (results.some((q) => q.isError)) {
    return (
      <div className="py-10 text-center">
        {t('somethingWentWrong')}
      </div>
    );
  }

  if (!car?.car || !car.shop || car.shop?.isActive === false || car.car.isVisible === false) {
    return (
      <div className="py-10 text-center">
        {t('notFound')}
      </div>
    );
  }

  const carShop = new CarWithShop(car!.car, car!.shop!);


  return (
    <div className="max-w-7xl mx-auto py-6">
      <BookingWizard
        carShop={carShop}
        profile={user.userDataObj!}
        bookings={bookings}
        units={units}
        drivers={drivers}
        wallet={wallet!}
      />
    </div>
  );
}
