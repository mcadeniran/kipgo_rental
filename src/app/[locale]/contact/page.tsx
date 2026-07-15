import HeroSection from "@/components/marketing/hero-section";
import SectionHeading from "@/components/marketing/section-heading";
import ContactCard from "@/components/marketing/contact-card";
import {Mail, Phone, MapPin, Clock3} from "lucide-react";
import {Card, CardContent, } from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useTranslations} from "next-intl";

export default function ContactPage() {
  const t = useTranslations('contact');
  return (
    <main className="container space-y-24 py-10">
      <HeroSection
        badge={t('contactKipgo')}
        title={t('weAreHereToHelp')}
        description={t('whetherYouHaveQuestions')}
      />

      <section>
        <SectionHeading
          title={t('letsConnect')}
          subtitle={t('ourTeamIsAlwaysHappy')}
        />

      </section>
      <section>
        <div className="grid gap-8 md:grid-cols-3">
          <ContactCard
            icon={Mail}
            title={t('email')}
            description={t('sendUsAnEmail')}
            value="kipgoonlinedriver@gmail.com"
            href="mailto:kipgoonlinedriver@gmail.com"
          />

          <ContactCard
            icon={Phone}
            title={t('phone')}
            description={t('speakDirectlyWithOurTeam')}
            value="+90 539 105 44 85"
            href="tel:+905391054485"
          />

          <ContactCard
            icon={MapPin}
            title={t('office')}
            description={t('comeSayHello')}
            value="Mağusa, İlarma Çember Karşısı, Karaali Dükkanları No: 7"
          />
        </div>
      </section>

      <section>
        <Card className="border-0 bg-muted/40">
          <CardContent className="py-16 text-center">
            <div className="mx-auto max-w-3xl">
              <Clock3 className="mx-auto h-12 w-12 text-k-primary" />
              <h2 className="mt-6 text-3xl font-bold">
                {t('needAssistance')}
              </h2>

              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                {t('whetherYouArePlanningYourTrip')}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col items-center">
        <SectionHeading
          title={t('visitOurOffice')}
          subtitle={t('ifYouAreNearby')}
        />

        <Card className="overflow-hidden w-sm">
          <CardContent className="space-y-6 p-8">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-6 w-6 text-k-primary" />
              <div>
                <h3 className="font-semibold">
                  {t('officeAddress')}
                </h3>

                <p className="mt-2 leading-8 text-muted-foreground">
                  Mağusa
                  <br />
                  İlarma Çember Karşısı
                  <br />
                  Karaali Dükkanları No: 7
                </p>
              </div>
            </div>

            <Button
              variant="outline"
            >
              <Link
                target="_blank"
                href="https://maps.google.com"
              >
                {t('openInMaps')}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="rounded-3xl bg-linear-to-r from-k-primary to-k-primary/80 px-8 py-16 text-center text-white">
          <h2 className="text-4xl font-bold">
            {t('letsMakeYourNextJourney')}
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90">
            {t('weAreCommitted')}
          </p>

          <Button
            size="lg"
            className="mt-10 bg-white text-k-primary hover:bg-white/90"
          >
            <Link href="/">
              {t('exploreKipgo')}
            </Link>
          </Button>
        </div>
      </section>

      <div className="py-12 text-center">
        <p className="text-muted-foreground">
          {t('thankYouForChoosingKipgo')}
        </p>
      </div>
    </main>
  );
}
