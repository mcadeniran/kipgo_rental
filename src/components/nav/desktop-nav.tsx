'use client';

import {useTranslations} from "next-intl";
import NavLink from "./nav-link";
import useAuth from "@/context/AuthContext";

export default function DesktopNav() {
  const t = useTranslations('nav');
  const {authStatus} = useAuth();

  const authenticated =
    authStatus === "user" ||
    authStatus === "admin";

  return (
    <div className="hidden lg:flex items-center gap-8">

      <NavLink href="/">
        {t('home')}
      </NavLink>

      <NavLink href="/shuttle">
        {t('shuttle')}
      </NavLink>

      <NavLink href="/cars">
        {t('carRental')}
      </NavLink>

      <NavLink href="/hotels">
        {t('hotels')}
      </NavLink>

      <NavLink href="/tours">
        {t('destinations')}
      </NavLink>

      {!authenticated && (
        <>
          <NavLink href="/about">
            {t('aboutUs')}
          </NavLink>

          <NavLink href="/contact">
            {t('contact')}
          </NavLink>
        </>
      )}

      {authenticated && (
        <NavLink href="/bookings">
          {t('myBookings')}
        </NavLink>
      )}
    </div>
  );
}