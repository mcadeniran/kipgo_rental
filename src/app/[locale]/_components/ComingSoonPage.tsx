import Image, {StaticImageData} from "next/image";
import Link from "next/link";
import {ArrowLeft, Clock3} from "lucide-react";

import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";

interface ComingSoonPageProps {
  title: string;
  description: string;
  badge: string;
  image: StaticImageData;
  backHref?: string;
  // backLabel?: string;
}

export default function ComingSoonPage({
  title,
  description,
  badge,
  image,
  backHref = "/",
  // backLabel = "Back to Home",
}: ComingSoonPageProps) {
  const t = useTranslations('download');
  return (
    <main className="py-6">
      <section className="relative min-h-120 overflow-hidden rounded-3xl bg-muted">
        {/* Background */}

        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-linear-to-r  from-black/70  via-black/45  to-black/10" />

        {/* Content */}

        <div className="relative z-10 flex min-h-120 items-center px-6 py-12 sm:px-10 lg:px-16">
          <div className="max-w-xl text-white">
            {/* Badge */}

            <div className="inline-flex items-center gap-2 rounded-full  bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Clock3 className="h-4 w-4" />
              {badge}
            </div>

            {/* Heading */}

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
              {title}
            </h1>

            {/* Description */}

            <p className="mt-5 max-w-lg text-base leading-7  text-white/85 sm:text-lg">
              {description}
            </p>

            {/* Action */}

            <div className="mt-8">
              <Link href={backHref}>
                <Button className="rounded-xl  bg-white text-k-primary  hover:bg-white/90">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('backToHome')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}