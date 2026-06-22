"use client";

import {Bell} from "lucide-react";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {Button} from "@/components/ui/button";
import useAuth from "@/context/AuthContext";
import {getNotifications} from "@/lib/services/notificationService";

import {useIsMobile} from "@/hooks/use-mobile";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "./ui/sheet";
import NotificationList from "./notification-list";


export default function NotificationBell() {
  const {rentalDataObj: rental, userDataObj: user} = useAuth();

  const userId = rental?.id || user?.id;

  const [open, setOpen] = useState(false);

  const {data: notifications = [], isLoading} = useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => getNotifications(userId!),
    enabled: !!userId,
  });

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  return (
    useIsMobile() ?
      <Sheet>
        <SheetTrigger render={
          <Button
            variant="outline"
          >
            <Bell />
          </Button>
        }>

        </SheetTrigger>

        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription>

            </SheetDescription>
          </SheetHeader>
          <NotificationList
            notifications={notifications}
            isLoading={isLoading}
            userId={userId!}
            unreadCount={unreadCount}
          />
        </SheetContent>
      </Sheet> :
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger render={
          <Button
            variant="ghost"
            size="icon"
            className="relative"
          >
            <Bell className="h-5 w-5" />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </Button>
        }>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="w-95 p-0"
        >
          <NotificationList
            notifications={notifications}
            isLoading={isLoading}
            userId={userId!}
            unreadCount={unreadCount}
          />
        </PopoverContent>
      </Popover>
  );
}
