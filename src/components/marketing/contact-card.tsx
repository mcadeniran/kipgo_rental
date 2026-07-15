import Link from "next/link";
import {ArrowUpRight, LucideIcon} from "lucide-react";

import {Card, CardContent} from "@/components/ui/card";

interface ContactCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  href?: string;
  description?: string;
}

export default function ContactCard({
  icon: Icon,
  title,
  value,
  href,
  description,
}: ContactCardProps) {
  return (
    <Card className="group h-full border-0 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      <CardContent className="p-8">

        <div className="flex items-center justify-between">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-k-primary/10 text-k-primary transition-all duration-300 group-hover:bg-k-primary group-hover:text-white">

            <Icon className="h-7 w-7" />

          </div>

          {href && (
            <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
          )}

        </div>

        <h3 className="mt-8 text-xl font-semibold">
          {title}
        </h3>

        {description && (
          <p className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>
        )}

        {href ? (

          <Link
            href={href}
            className="mt-6 block break-all font-medium text-k-primary hover:underline"
          >
            {value}
          </Link>

        ) : (

          <p className="mt-6 font-medium">
            {value}
          </p>

        )}

      </CardContent>

    </Card>
  );
}