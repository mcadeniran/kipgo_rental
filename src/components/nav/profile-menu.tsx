'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  BadgeCheck,
  Bell,
  Calendar,
  CreditCard,
  LogOut,
  User,
} from "lucide-react";

import {Button} from "@/components/ui/button";
import useAuth from "@/context/AuthContext";
import {Link} from "@/i18n/navigation";

export default function ProfileMenu() {

  const {userDataObj, currentUser, logout, authStatus} = useAuth();

  const authenticated =
    authStatus === "user" ||
    authStatus === "admin";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={
        <Button variant="ghost" size="icon-sm"
          className="rounded-full hover:bg-k-primary/10 p-6"
        >
          <Avatar className="h-8 w-8 transition duration-300 hover:scale-105">
            <AvatarImage src={userDataObj?.personal.photoUrl} />
            <AvatarFallback>
              {userDataObj?.username?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Button>
      } />
      <DropdownMenuContent
        align="end"
        className="w-72"
      >
        {/* PROFILE */}
        {authenticated ? (
          <div className="m-4 rounded-2xl bg-linear-to-br from-k-primary to-k-primary/80 p-5 text-white">
            <div className="flex items-center gap-3">
              <Avatar className="h-14 w-14 border-2 border-white">
                <AvatarImage
                  src={userDataObj?.personal.photoUrl}
                />
                <AvatarFallback>
                  {userDataObj?.username?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">
                  {userDataObj?.username}
                </h3>
                <p className="text-sm opacity-90">
                  {currentUser?.email}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <BadgeCheck className="h-4 w-4" />
              <span className="text-sm">
                Verified Account
              </span>
            </div>
          </div>
        ) : (
          <div className="border-b p-5">
            <h3 className="font-semibold">
              Welcome
            </h3>
            <p className="text-sm text-muted-foreground">Sign in to manage bookings.</p>
          </div>
        )}
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <div className="space-y-1">
              <p className="font-semibold">
                {userDataObj?.username}
              </p>
              <p className="text-xs text-muted-foreground">{currentUser?.email}</p>

              <div className="flex items-center gap-1 pt-1 text-k-primary">
                <BadgeCheck className="h-4 w-4" />
                <span className="text-xs">
                  Verified Account
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              My Profile
            </DropdownMenuItem>
          </Link>
          <Link href="/bookings">
            <DropdownMenuItem>
              <Calendar className="mr-2 h-4 w-4" />
              My Bookings
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-red-500"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}