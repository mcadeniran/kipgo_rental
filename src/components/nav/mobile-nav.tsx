'use client';

import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {Sheet, SheetContent, SheetTrigger, SheetClose, SheetFooter, } from "@/components/ui/sheet";
import {Menu, LogOut, LogIn, UserPlus, BadgeCheck, } from "lucide-react";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar";
import useAuth from "@/context/AuthContext";
import MobileNavItem from "./mobile-nav-item";
import {getNavigation} from "./nav-items";

import logo from "../../../public/logo.png";
import {useRouter} from "@/i18n/navigation";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const {authStatus, currentUser, userDataObj, logout, } = useAuth();

  const router = useRouter();

  const authenticated =
    authStatus === "user" ||
    authStatus === "admin";

  const navigation = getNavigation(authStatus);

  return (
    <div className="lg:hidden">
      <Sheet
        open={open}
        onOpenChange={setOpen}
      >
        <SheetTrigger render={
          <Button variant="ghost" size="icon">
            {
              authenticated ? <Avatar className="h-8 w-8 transition duration-300 hover:scale-105">
                <AvatarImage src={userDataObj?.personal.photoUrl} />
                <AvatarFallback>
                  {userDataObj?.username?.charAt(0)}
                </AvatarFallback>
              </Avatar> :
                <Menu className="h-6 w-6" />
            }
          </Button>
        }
        />

        <SheetContent side="left" className="flex w-[320px] flex-col p-0">
          {/* HEADER */}

          <div className="border-b p-4">
            <Link href="/" className="flex items-center gap-3" >
              <Image
                src={logo}
                alt="logo"
                width={40}
                height={40}
                className="rounded-full"
              />

              <div>
                <p className="font-semibold tracking-widest text-k-primary">KIPGO</p>
                <p className="text-xs text-muted-foreground">Rentals</p>
              </div>
            </Link>
          </div>

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

          {/* NAVIGATION */}

          <SheetClose>
            <div className="flex-1 space-y-2 overflow-y-auto ">
              {navigation.map((item) => (
                <MobileNavItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                />
              ))}
            </div>
          </SheetClose>

          {/* FOOTER */}
          <SheetFooter>
            {authenticated ? (
              <SheetClose render={
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-red-500"
                  onClick={logout}
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </Button>
              }>
              </SheetClose>
            ) : (

              <div className="space-y-2">
                <SheetClose render={
                  <Button size='lg' className="w-full bg-k-primary cursor-pointer text-white hover:bg-k-primary/90 hover:text-white/90" onClick={() => router.push("/auth/login")}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                }>

                </SheetClose>
                <SheetClose render={
                  <Button variant="outline" className="w-full" onClick={() => router.push("/auth/register")}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create Account
                  </Button>
                }>
                </SheetClose>
              </div>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}