import {ArrowRight, CheckCircle2} from "lucide-react";

import Link from "next/link";

import {Button} from "@/components/ui/button";

import {
  Badge,
} from "@/components/ui/badge";
import {useTranslations} from "next-intl";

interface HeroSectionProps {
  badge?: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function HeroSection({
  badge,
  title,
  description,
  buttonText,
  buttonHref,
}: HeroSectionProps) {
  const t = useTranslations('marketing');
  return (
    <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-k-primary via-k-primary to-k-primary/80 px-6 py-20 text-white shadow-xl md:px-12">

      {/* Decorative Blobs */}

      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">

        {badge && (
          <Badge className="mb-6 bg-white/20 px-4 py-1 text-white backdrop-blur-sm">
            {badge}
          </Badge>
        )}

        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          {title}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90">
          {description}
        </p>

        {buttonHref && buttonText && (
          <Button
            size="lg"
            className="mt-10 rounded-full bg-white text-k-primary hover:bg-white/90"
          >
            <Link href={buttonHref} className="flex gap-2 items-center justify-center">
              {buttonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

        )}

      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-white/90">

        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          {t('trustedServices')}
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          {t('localBusinesses')}
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          {t('northCyprus')}
        </div>

        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          {t('growingEveryday')}
        </div>
      </div>
    </section>
  );
}