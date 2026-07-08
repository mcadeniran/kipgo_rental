'use client';

import NavLink from "./nav-link";
import useAuth from "@/context/AuthContext";

export default function DesktopNav() {
  const {authStatus} = useAuth();

  const authenticated =
    authStatus === "user" ||
    authStatus === "admin";

  return (
    <div className="hidden lg:flex items-center gap-8">

      <NavLink href="/cars">
        Rentals
      </NavLink>

      {!authenticated && (
        <>
          <NavLink href="/about">
            About Us
          </NavLink>

          <NavLink href="/contact">
            Contact
          </NavLink>
        </>
      )}

      {authenticated && (
        <NavLink href="/bookings">
          My Bookings
        </NavLink>
      )}
    </div>
  );
}