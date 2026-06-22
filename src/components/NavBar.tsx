'use client';
import {Link} from '@/i18n/navigation';
import Image from 'next/image';
import logo from '../../public/logo.png';
import SearchBar from './SearchBar';
import LocaleSwitcher from './LocaleSwitcher';
import {LoginButton} from './auth/LoginButton';
import useAuth from '@/context/AuthContext';
import {BadgeCheckIcon, BellIcon, CreditCardIcon, LogOutIcon, } from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import NotificationBell from "@/components/Notification";
import {DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";

export default function NavBar() {
  const {currentUser, userDataObj, rentalDataObj, role, loading, logout} = useAuth();

  if (!loading && currentUser)
    console.log(currentUser);
  return (
    <nav className='sticky top-0 z-50 bg-background border-b border-k-border'>
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        {/* LEFT */}
        <Link href='/' className='flex flex-row items-center gap-2'>
          <Image src={logo} alt='logo' width={36} height={36} className='w-6 h-6 md:w-9 md:h-9 rounded-full' />
          <p className="hidden md:block text-md font-medium tracking-wider text-k-primary">KIPGO RENTALS</p>
        </Link>
        {/* CENTER */}
        <div className="flex gap-6 items-center">
          <Link href='/cars'>Rentals</Link>
          {
            (!currentUser && !role) && (<>
              <Link href='/about'>About Us</Link>
              <Link href='/contact'>Contact</Link>
            </>
            )
          }
          {
            (currentUser || role) && (
              <>
                <Link href='/about'>My Bookings</Link>
              </>
            )
          }
        </div>
        {/* RIGHT */}
        <div className="flex gap-6 items-center">
          <SearchBar />
          {
            (!currentUser && !role) &&
            <LoginButton >
              <Button variant='link'>Sign in</Button>
            </LoginButton>
          }
          <div className="flex gap-4 items-center justify-center">
            {(currentUser || role) && <NotificationBell />}
            <LocaleSwitcher />
          </div>
          {
            (currentUser || role) &&
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage src={userDataObj?.personal.photoUrl || rentalDataObj?.logoUrl} alt="shadcn" />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
              </Button>}>

              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheckIcon />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCardIcon />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BellIcon />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                  <LogOutIcon />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        </div>
      </div>
    </nav>
  );
}
