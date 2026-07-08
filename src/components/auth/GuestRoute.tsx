'use client';

import {ReactNode, useEffect} from "react";
import {useSearchParams} from "next/navigation";
import {useRouter} from "@/i18n/navigation";
import useAuth from "@/context/AuthContext";
import PageLoader from "../general/PageLoader";

interface Props {
  children: ReactNode;
}

export default function GuestRoute({children, }: Props) {
  const {authStatus, } = useAuth();

  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    if (authStatus === "user" || authStatus === "admin") {
      const callback = searchParams.get("callbackUrl");
      router.replace(callback || "/");
    }

    if (authStatus === "unverified") {
      router.replace("/auth/verify-email");
    }
  }, [authStatus, router, searchParams,]);

  if (authStatus === "loading") {
    return <PageLoader />;
  }

  if (authStatus === "user" || authStatus === "admin" || authStatus === "unverified") {
    return null;
  }

  return children;
}