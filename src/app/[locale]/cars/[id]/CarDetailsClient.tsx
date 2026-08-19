"use client";

import CarDetailsPageContent from "../components/CarDetailsPageContent";

interface CarDetailsClientProps {
  car: Parameters<typeof CarDetailsPageContent>[0]["car"];
  shop: Parameters<typeof CarDetailsPageContent>[0]["shop"];
}

export default function CarDetailsClient({car, shop, }: CarDetailsClientProps) {
  return (
    <CarDetailsPageContent car={car} shop={shop} />
  );
}