"use client";

import {Notification} from "@/app/[locale]/models/Notification";
import {Button} from "./ui/button";
import {Loader} from "lucide-react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {markAllNotificationsAsRead} from "@/lib/services/notificationService";
import useAuth from "@/context/AuthContext";
import NotificationItem from "./notification-item";
import {useTranslations} from "next-intl";

interface Props {
  notifications: Notification[];
  isLoading: boolean;
  userId: string;
  unreadCount: number;
}

export default function NotificationList({
  notifications,
  isLoading,
  unreadCount
}: Props) {
  const t = useTranslations('notification');

  const {rentalDataObj: rental, userDataObj: user} = useAuth();

  const userId = rental?.id || user?.id;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      await markAllNotificationsAsRead(userId!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["notifications", userId]});
    },
  });

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  const markAllAsRead = () => {
    mutation.mutate();
  };

  return (
    <>
      <div className="border-b p-2">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-semibold">
            {t('notifications')}
          </h3>

          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount < 1}
          >
            {t('markAllRead')}
          </Button>
        </div>
      </div>

      <div className="max-h-112.5 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-sm text-muted-foreground">
            {t('noNotifications')}
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))
        )}
      </div>
    </>
  );
}