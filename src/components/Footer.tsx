import {Link} from '@/i18n/navigation';
import Image from 'next/image';
import logo from '../../public/kipgo_transparent.png';
import google_en from '../../public/google_en.png';
import google_tr from '../../public/google_tr.png';
import google_ru from '../../public/google_ru.png';
import apple_en from '../../public/apple_en.svg';
import apple_ru from '../../public/apple_ru.svg';
import apple_tr from '../../public/apple_tr.svg';
import React from 'react';
import {Icon} from '@iconify/react';
import {useLocale, useTranslations} from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="mt-20 bg-k-primary text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-5
            gap-10
          "
        >
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-block"
            >
              <Image
                src={logo}
                alt="Kipgo"
                width={140}
                height={140}
                sizes="100%"
                className='w-35 h-auto'
              />
            </Link>

            <p className="mt-4 text-sm text-white/70 max-w-md">
              {t('kipgoIsYourGoToPlatform')}
            </p>

            <div className="flex gap-4 mt-6">
              <Link
                href="https://www.facebook.com/profile.php?id=61583224523752"
                target="_blank"
              >
                <Icon
                  icon="logos:facebook"
                  className="h-7 w-7"
                />
              </Link>

              <Link
                href="https://www.instagram.com/kipgo.official/"
                target="_blank"
              >
                <Icon
                  icon="skill-icons:instagram"
                  className="h-7 w-7"
                />
              </Link>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4">
              {t('products')}
            </h3>

            <div className="space-y-3 flex flex-col text-sm text-white/70">
              <Link href="/cars">
                {t('carRentals')}
              </Link>

              <Link href="/shops">
                {t('rentalShops')}
              </Link>

              {/* <Link href="/hotels">
                Hotels
              </Link>

              <Link href="/taxi">
                Taxi
              </Link> */}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">
              {t('company')}
            </h3>

            <div className="space-y-3 text-sm flex flex-col text-white/70">
              <Link href="/blogs">
                {t('blog')}
              </Link>

              <Link href="/contact">
                {t('contact')}
              </Link>

              <Link href="/about">
                {t('aboutUs')}
              </Link>
            </div>
            <div className="mt-8 ">
              <h3 className="font-semibold mb-4">
                {t('legal')}
              </h3>

              <div className="space-y-3 text-sm text-white/70 flex flex-col">
                <Link href="/privacy">
                  {t('privacyPolicy')}
                </Link>

                <Link href="/terms">
                  {t('termsOfService')}
                </Link>
              </div>
            </div>
          </div>

          {/* Apps & Legal */}
          <div>
            <h3 className="font-semibold mb-4">
              {t('download')}
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                href='https://play.google.com/store/apps/details?id=com.kipgotaxi.app'
                target="_blank"
              >
                <Image
                  src={locale === 'tr' ? google_tr : locale === 'ru' ? google_ru : google_en}
                  alt="Get it on Google Play"
                  width={180}
                  height={54}
                  sizes="100%"
                  className='w-45 h-13.5'
                />
              </Link>

              <Link
                href='https://apps.apple.com/tr/app/kipgo/id6754942525'
                target="_blank"
              >
                <Image
                  src={locale === 'tr' ? apple_tr : locale === 'ru' ? apple_ru : apple_en}
                  alt="Download on the App Store"
                  width={180}
                  height={54}
                  sizes="100%"
                  className='w-45 h-13.5'
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="
            border-t
            border-white/10
            mt-10
            pt-6
            text-center
            text-sm
            text-white/60
          "
        >
          {t('copyright', {date: `${new Date().getFullYear()}`})}
        </div>
      </div>
    </footer>
  );
}
