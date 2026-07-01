"use client";

import {useRouter} from "next/navigation";
import {formatDistanceToNow} from "date-fns";
import {Notification} from "@/app/[locale]/models/Notification";
import useAuth from "@/context/AuthContext";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {markNotificationAsRead} from "@/lib/services/notificationService";

interface Props {
  notification: Notification;
}

export default function NotificationItem({
  notification,
}: Props) {
  const router = useRouter();
  const {rentalDataObj: rental, userDataObj: user} = useAuth();

  const userId = rental ? rental.id : user?.id;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      await markNotificationAsRead(notification.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["notifications", userId]});
    },
  });

  const handleClick = async () => {
    if (!notification.isRead) {
      mutation.mutate();
    }

    if (notification.audience === null) {
      if (rental !== null) {
        // eslint-disable-next-line react-hooks/immutability
        notification.audience = 'shop';
      }
      if (user !== null) {
        notification.audience = user.isAdmin ? 'admin' : 'customer';
      }

    }

    console.log("CASE: ", notification.audience);

    switch (notification.audience) {
      case "admin":

        // if (notification.type === 'cryptoVerification') {
        //   router.push(
        //     `/admin/rentals/bookings/payments`
        //   );
        // }
        // else if (notification.bookingId) {
        //   router.push(
        //     `/admin/rentals/bookings/${notification.bookingId}`
        //   );
        // }
        break;

      case 'shop':
      // router.push(`/rentals/bookings/${notification.bookingId}`);

      default:
        router.push(`/bookings/${notification.bookingId}`);
        break;
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full border-b p-4 text-left transition hover:bg-muted ${!notification.isRead
        ? "border-l-4 border-l-primary bg-muted/50"
        : ""
        }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-medium">
          {notification.title}
        </h4>

        {!notification.isRead && (
          <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
        )}
      </div>

      <p className="mt-1 text-sm text-muted-foreground">
        {notification.body}
      </p>

      <p className="mt-2 text-xs text-muted-foreground">
        {formatDistanceToNow(
          notification.createdAt.toUTCString(),
          {
            addSuffix: true,
          }
        )}
      </p>
    </button>
  );
}