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

export default function NewBookingPage() {
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


  // const carErrorr = results[0].isError && results[0].error.message;
  // const bookingsErrorr = results[1].isError && results[1].error.message;
  // const unitsErrorr = results[2].isError && results[2].error.message;
  // const driversErrorr = results[3].isError && results[3].error.message;
  // const walletErrorr = results[4].isError && results[4].error.message;

  // console.log("CAR ERROR: ", carErrorr);
  // console.log("BOOKING ERROR: ", bookingsErrorr);
  // console.log("UNITS ERROR: ", unitsErrorr);
  // console.log("DRIVERS ERROR: ", driversErrorr);
  // console.log("WALLET ERROR: ", walletErrorr);


  if (results.some((q) => q.isError)) {
    return (
      <div className="py-10 text-center">
        Something went wrong while loading the page.
      </div>
    );
  }

  if (!car?.car || !car.shop || car.shop?.isActive === false || car.car.isVisible === false) {
    return (
      <div className="py-10 text-center">
        Car not found.
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
