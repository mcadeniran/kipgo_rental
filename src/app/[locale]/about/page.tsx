import HeroSection from "@/components/marketing/hero-section";
import FeatureCard from "@/components/marketing/feature-card";

import {Car, Hotel, Map, Handshake, } from "lucide-react";
import SectionHeading from "@/components/marketing/section-heading";
import StatCard from "@/components/marketing/stat-card";
import Link from "next/link";

import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";


export default function AboutPage() {
  const t = useTranslations('about');
  return (
    <main className="container space-y-24 py-10">
      <HeroSection
        badge={t('welcomeToKipgo')}
        title={t('exploreNothCyprus')}
        description={t('bringingTrustedTourismServices')}
        buttonText={t('contactUs')}
        buttonHref="/contact"
      />

      <section>
        <SectionHeading
          title={t('whoWeAre')}
          subtitle={t('connectingTravelers')}
        />
        <div className="mx-auto max-w-4xl space-y-8 text-lg leading-9 text-muted-foreground">
          <p>
            {t('kipgoIsADigitalPlatform')}
          </p>

          <p>
            {t('ourGoal')}
          </p>

          <p>
            {t('fromTransportation')}
          </p>

          <p>
            {t('atThesameTime')}
          </p>
        </div>
      </section>

      <section>

        <SectionHeading
          title={t('whatWeOffer')}
          subtitle={t('everythingYouNeed')}
        />

        <div className="grid auto-rows-fr gap-8 md:grid-cols-2">
          <FeatureCard
            icon={Car}
            title={t('transportation')}
            description={t('reliableTransportation')}
          />

          <FeatureCard
            icon={Hotel}
            title={t('accommodation')}
            description={t('discoverQualityHotels')}
          />

          <FeatureCard
            icon={Map}
            title={t('toursAndActivities')}
            description={t('experienceTheBestAttractions')}
          />

          <FeatureCard
            icon={Handshake}
            title={t('trustedLocalBusinesses')}
            description={t('weConnectTravelers')}
          />
        </div>
      </section>

      <section>
        <SectionHeading
          title={t('whyChooseKipgo')}
          subtitle={t('designedToMakeDiscovering')}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            value={t('allInOne')}
            label={t('tourismPlatform')}
          />

          <StatCard
            value={t('trusted')}
            label={t('localServices')}
          />

          <StatCard
            value={t('growing')}
            label={t('travelEcosystem')}
          />

          <StatCard
            value={t('futureReady')}
            label={t('digitalInnovation')}
          />
        </div>
      </section>

      <section>
        <div className="overflow-hidden rounded-3xl bg-linear-to-br from-k-primary to-k-primary/80 px-10 py-20 text-center text-white">
          <h2 className="text-4xl font-bold">
            {t('ourVision')}
          </h2>

          <p className="mx-auto mt-8 max-w-4xl text-xl leading-9 text-white/90">
            {t('ourVisionIsToBecome')}
          </p>

        </div>

      </section>

      <section className="py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            {t('discoverMore')}
            <br />
            <span className="text-k-primary">
              {t('travelSmarter')}
            </span>
            <br />
            {t('experienceBetter')}
          </h2>
        </div>
      </section>

      <section>

        <div className="rounded-3xl border bg-muted/40 px-8 py-16 text-center">
          <h2 className="text-3xl font-bold">
            {t('readyToExplore')}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            {t('whetherYouArePlanning')}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
            >
              <Link href="/contact">
                {t('contactUs')}
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
            >
              <Link href="/">
                {t('exploreKipgo')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}