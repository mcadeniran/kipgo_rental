'use client';

import DesktopNav from "./desktop-nav";
import NavbarLogo from "./navbar-logo";

import MobileNav from "./mobile-nav";

import {Button} from "../ui/button";


import useAuth from "@/context/AuthContext";
import LocaleSwitcher from "../LocaleSwitcher";
import NavbarSkeleton from "../NavbarSkeleton";
import NotificationBell from "../Notification";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {useRouter} from "@/i18n/navigation";
import ProfileMenu from "./profile-menu";
import {useTranslations} from "next-intl";

export default function Navbar() {
  const t = useTranslations();

  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const listener = () => {
      setScrolled(window.scrollY > 10);
    };

    listener();
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);

  }, []);

  const {authStatus} = useAuth();

  const authenticated =
    authStatus === "user" ||
    authStatus === "admin";

  return (

    <nav
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b shadow-sm bg-background/80 backdrop-blur-md"
          : "bg-background"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <NavbarLogo />
        <DesktopNav />
        <div className="hidden lg:flex items-center gap-4">
          <LocaleSwitcher />
          {authStatus === "loading"
            ?
            <NavbarSkeleton />
            :
            <>
              {authenticated &&
                <Button variant="ghost" size="icon" className="relative rounded-full"
                  render={<NotificationBell />}
                />
              }
              {authenticated
                ?
                <ProfileMenu />
                :
                <Button
                  variant='link'
                  className='hover:underline cursor-pointer hover:text-k-primary decoration-k-primary'
                  onClick={() => router.push('/auth/login')}
                >
                  {t('nav.signIn')}
                </Button>
              }
            </>
          }
        </div>
        <div className="flex lg:hidden items-center gap-4">
          <LocaleSwitcher />
          {authStatus === "loading"
            ?
            <NavbarSkeleton />
            :
            <>
              {authenticated &&
                <Button variant="ghost" size="icon" className="relative rounded-full"
                  render={<NotificationBell />}
                />
              }
              {/* {authenticated
                ?
                <ProfileMenu />
                :
                <Button
                  variant='link'
                  className='hover:underline cursor-pointer hover:text-k-primary decoration-k-primary'
                  onClick={() => router.push('/auth/login')}
                >
                  Sign In
                </Button>
              } */}
            </>
          }
          <MobileNav />
        </div>
      </div>
    </nav>

  );

}