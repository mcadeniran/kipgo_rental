import {Booking} from "../../models/Booking";

import {Info} from "lucide-react";
import {cn} from "@/lib/utils";

type MessageConfig = {
  color:
  | "orange"
  | "blue"
  | "green"
  | "teal"
  | "indigo"
  | "red"
  | "redAccent"
  | "gray";
  title: string;
  message: string;
};

const colorMap = {
  orange: {
    border: "border-orange-300",
    bg: "bg-orange-50 dark:bg-orange-950/20",
    title: "text-orange-600",
    icon: "text-orange-600",
  },

  blue: {
    border: "border-blue-300",
    bg: "bg-blue-50 dark:bg-blue-950/20",
    title: "text-blue-600",
    icon: "text-blue-600",
  },

  green: {
    border: "border-green-300",
    bg: "bg-green-50 dark:bg-green-950/20",
    title: "text-green-600",
    icon: "text-green-600",
  },

  teal: {
    border: "border-teal-300",
    bg: "bg-teal-50 dark:bg-teal-950/20",
    title: "text-teal-600",
    icon: "text-teal-600",
  },

  indigo: {
    border: "border-indigo-300",
    bg: "bg-indigo-50 dark:bg-indigo-950/20",
    title: "text-indigo-600",
    icon: "text-indigo-600",
  },

  red: {
    border: "border-red-300",
    bg: "bg-red-50 dark:bg-red-950/20",
    title: "text-red-600",
    icon: "text-red-600",
  },

  redAccent: {
    border: "border-rose-300",
    bg: "bg-rose-50 dark:bg-rose-950/20",
    title: "text-rose-600",
    icon: "text-rose-600",
  },

  gray: {
    border: "border-gray-300",
    bg: "bg-gray-50 dark:bg-gray-900/30",
    title: "text-gray-600",
    icon: "text-gray-600",
  },
} as const;

export function UserBookingStatusMessage({booking}: {booking: Booking;}) {
  const config = getBookingStatusMessage(booking);

  if (!config) return null;

  return <MessageCard {...config} />;
}


function getBookingStatusMessage(
  booking: Booking,
): MessageConfig | null {
  const payment = booking.payment!;

  if (
    booking.status === "pending" &&
    payment.method === "crypto" &&
    ["unpaid", "pending"].includes(payment.status)
  ) {
    return {
      color: "orange",
      title: 'Waiting for payment.',
      message: 'Your booking request has been received. To continue, submit your crypto payment and transaction hash (TXID) before the payment window expires.'
    };
  }

  if (
    booking.status === "pending" &&
    payment.method === "payOnPickup"
  ) {
    return {
      color: "orange",
      title: 'Booking request submitted.',
      message: 'Your booking request is awaiting review by the rental company. You will be notified once a decision has been made.',
    };
  }

  if (
    booking.status === "payment_submitted" &&
    payment.method === "crypto" &&
    payment.status === "awaiting_verification"
  ) {
    return {
      color: "blue",
      title: 'Payment submitted successfully.',
      message: 'Your transaction hash has been received and is currently being verified. This process may take some time depending on network confirmations.',
    };
  }

  if (
    booking.status === "reserved" &&
    payment.method === "crypto" &&
    payment.status === "paid"
  ) {
    return {
      color: "green",
      title: 'Vehicle reserved.',
      message: 'Your payment has been verified and a vehicle has been reserved for your selected rental period. Your booking is awaiting final approval.',
    };
  }

  if (booking.status === "approved") {
    return {
      color: "teal",
      title: 'Booking approved',
      message: 'Your booking has been approved. Please arrive at the pickup location on the scheduled date with any required identification and documents.',
    };
  }

  if (booking.status === "ongoing") {
    return {
      color: "indigo",
      title: 'Rental in progress',
      message: 'Your rental period is currently active. Please ensure the vehicle is returned on or before the agreed return date.',
    };
  }

  if (booking.status === "completed") {
    return {
      color: "green",
      title: 'Rental completed.',
      message: booking.isRated
        ? 'This rental has been completed successfully. We would appreciate your feedback about your experience.'
        : 'This rental has been completed successfully. Thank you for choosing our service.',
    };
  }

  if (booking.status === "rejected") {
    return {
      color: "red",
      title: 'Booking request rejected.',
      message: 'Unfortunately, this booking request could not be approved. You may submit a new booking request or contact the rental company for more information.',
    };
  }

  if (booking.status === "cancelled") {
    return {
      color: "redAccent",
      title: 'Booking cancelled.',
      message: 'This booking has been cancelled and will not proceed further.',
    };
  }

  if (booking.status === "expired") {
    return {
      color: "gray",
      title: 'Booking expired.',
      message: 'The payment or confirmation period expired before the booking could be completed. A new booking will be required if you still wish to rent this vehicle.',
    };
  }

  if (
    payment.method === "crypto" &&
    payment.status === "failed"
  ) {
    const reason =
      payment.rejection?.reason ??
      payment.crypto?.txidRejectedReason ??
      'Unknown reason';

    return {
      color: "red",
      title: 'Payment verification failed.',
      message: `Reason: ${reason}\n\n'You may submit another valid transaction hash before the booking expires.'`,
    };
  }

  return null;
}

type MessageCardProps = {
  color: keyof typeof colorMap;
  title: string;
  message: string;
};

function MessageCard({
  color,
  title,
  message,
}: MessageCardProps) {
  const styles = colorMap[color];

  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        styles.bg,
        styles.border
      )}
    >
      <div className="flex items-start gap-3">
        <Info className={cn("mt-0.5 h-5 w-5", styles.icon)} />

        <div className="space-y-1">
          <h4 className={cn("font-semibold", styles.title)}>
            {title}
          </h4>

          <p className="text-sm text-muted-foreground whitespace-pre-line">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}