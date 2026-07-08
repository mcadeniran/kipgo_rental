'use client';

import {ChevronRight} from "lucide-react";
import {cn} from "@/lib/utils";
import {Link, usePathname} from "@/i18n/navigation";

interface Props {
  href: string;
  icon: React.ElementType;
  label: string;
  onNavigate?: () => void;
}

export default function MobileNavItem({href, icon: Icon, label, onNavigate, }: Props) {

  const pathname = usePathname();

  const active =
    pathname === href ||
    (href !== "/" &&
      pathname.startsWith(`${href}/`));

  return (

    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "group flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-300",
        active
          ? "bg-k-primary/10 text-k-primary"
          : "hover:bg-muted"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5" />
        <span className="font-medium">
          {label}
        </span>
      </div>

      <ChevronRight
        className="h-4 w-4 transition-transform group-hover:translate-x-1"
      />
    </Link>
  );
}