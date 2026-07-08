'use client';

import Image from "next/image";
import Link from "next/link";

import logo from "../../../public/logo.png";

export default function NavbarLogo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 shrink-0"
    >
      <Image
        src={logo}
        alt="KipGo Rentals"
        width={40}
        height={40}
        priority
        className="rounded-full transition duration-300 group-hover:rotate-6 group-hover:scale-105"
      />

      <div className="hidden md:block">
        <h2 className="font-semibold tracking-widest text-k-primary">
          KIPGO
        </h2>

        <p className="text-xs text-muted-foreground">
          Rentals
        </p>
      </div>
    </Link>
  );
}