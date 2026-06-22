'use client';

import useAuth from "@/context/AuthContext";
import {Button} from "./ui/button";
import {useRouter} from "@/i18n/navigation";
import {Loader} from "lucide-react";


export const BookNowButton = ({label, url, size}: {label: string; url: string; size?: string;}) => {
  const {currentUser, role, loading} = useAuth();

  const router = useRouter();

  const handleBookNow = () => {
    if (!currentUser || !role) {
      router.push(
        `/auth/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`
      );
      return;
    }

    router.push(url);
  };


  return <Button
    size={size === 'lg' ? "lg" : 'sm'}
    onClick={(e) => {e.preventDefault(); handleBookNow();}}
    disabled={loading}
    className={`bg-k-primary text-white hover:bg-k-primary/80 hover:text-white cursor-pointer ${size === 'lg' && 'w-full'}`}>
    {loading ? <Loader className="animate-spin" /> : label}
  </Button>;
};