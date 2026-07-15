import {ArrowUpRight} from "lucide-react";
import {LucideIcon} from "lucide-react";

import {Card, CardContent} from "@/components/ui/card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card className="group h-full overflow-hidden border-0 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      <CardContent className="p-8">

        <div className="flex items-center justify-between">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-k-primary/10 text-k-primary transition-all duration-300 group-hover:bg-k-primary group-hover:text-white">

            <Icon className="h-7 w-7" />

          </div>

          <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />

        </div>

        <h3 className="mt-8 text-xl font-semibold">
          {title}
        </h3>

        <p className="mt-4 leading-7 text-muted-foreground">
          {description}
        </p>

      </CardContent>

    </Card>
  );
}