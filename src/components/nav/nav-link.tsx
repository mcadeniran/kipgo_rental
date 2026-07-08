'use client';

import {cn} from "@/lib/utils";
import {Link, usePathname} from "@/i18n/navigation";

interface Props {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({
  href,
  children,
}: Props) {
  const pathname = usePathname();

  const active =
    pathname === href ||
    (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      className={cn(
        "group relative py-2 text-sm font-medium transition-colors duration-300",

        active
          ? "text-k-primary"
          : "text-muted-foreground hover:text-k-primary"
      )}
    >
      {children}

      <span
        className={cn(
          "absolute left-0 -bottom-0.75 h-0.5 bg-k-primary transition-all duration-300",
          active
            ? "w-full"
            : "w-0 group-hover:w-full"
        )}
      />
    </Link>
  );
}