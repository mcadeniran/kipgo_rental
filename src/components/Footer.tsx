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
import {useLocale} from 'next-intl';

export default function Footer() {
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
              />
            </Link>

            <p className="mt-4 text-sm text-white/70 max-w-md">
              Kipgo is your go-to platform for car rentals in Northern Cyprus.
              Browse available vehicles, choose your pickup location, and enjoy a smooth and reliable rental experience from start to finish.
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
              Products
            </h3>

            <div className="space-y-3 flex flex-col text-sm text-white/70">
              <Link href="/cars">
                Car Rentals
              </Link>

              <Link href="/shops">
                Rental Shops
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
              Company
            </h3>

            <div className="space-y-3 text-sm flex flex-col text-white/70">
              <Link href="/blogs">
                Blog
              </Link>

              <Link href="/contact">
                Contact
              </Link>

              <Link href="/about">
                About Us
              </Link>
            </div>
            <div className="mt-8 ">
              <h3 className="font-semibold mb-4">
                Legal
              </h3>

              <div className="space-y-3 text-sm text-white/70 flex flex-col">
                <Link href="/privacy">
                  Privacy Policy
                </Link>

                <Link href="/terms">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>

          {/* Apps & Legal */}
          <div>
            <h3 className="font-semibold mb-4">
              Download
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
          © {new Date().getFullYear()} Kipgo.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
  // return (
  //   <footer className='mt-16 bg-k-primary text-white'>
  //     <div className=' mx-auto max-w-7xl p-8 flex flex-col gap-8 md:flex-row md:justify-between'>
  //       <div className="flex flex-col gap-4 items-center md:items-start">
  //         <Link href='/' className='flex flex-row items-center gap-2'>
  //           <Image src={logo} alt='logo' width={120} height={120} className='' />
  //         </Link>
  //         <p className="text-sm text-gray-400">© 2026, KIPGO</p>
  //         <p className="text-sm text-gray-400">All rights reserved.</p>
  //         <div className="flex gap-4">
  //           <Link href='https://www.facebook.com/profile.php?id=61583224523752' target='_blank'><Icon icon='logos:facebook' className='h-7 w-7' /></Link>
  //           <Link href='https://www.instagram.com/kipgo.official/' target='_blank'><Icon icon='skill-icons:instagram' className='h-7 w-7' /></Link>
  //         </div>
  //       </div>
  //       <div className="flex flex-col gap-4 text-sm text-gray-400  items-center md:items-start">
  //         <div className="flex gap-4">
  //           <Icon icon='logos:google-play-icon' className='h-10 w-10' />
  //           <Icon icon='logos:apple-app-store' className='h-10 w-10' />
  //         </div>
  //       </div>
  //       <div className="flex flex-col gap-4 text-sm text-gray-400  items-center md:items-start">
  //         <p className='text-sm text-amber-50'>Links</p>
  //         <Link href=''>Homepage</Link>
  //         <Link href=''>Contact</Link>
  //         <Link href=''>Terms of Service</Link>
  //         <Link href=''>Privacy Policy</Link>
  //       </div>
  //     </div>
  //   </footer>
  // );
}
