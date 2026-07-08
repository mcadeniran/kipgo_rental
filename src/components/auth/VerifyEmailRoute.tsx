'use client';

import {ReactNode, useEffect} from "react";
import {useRouter} from "@/i18n/navigation";
import useAuth from "@/context/AuthContext";
import PageLoader from "../general/PageLoader";

export default function VerifyEmailRoute({children, }: {children: ReactNode;}) {
  const {authStatus} = useAuth();
  const router = useRouter();

  useEffect(() => {
    switch (authStatus) {
      case "guest":
        router.replace("/auth/login");
        break;

      case "user":
      case "admin":
        router.replace("/");
        break;
    }
  }, [authStatus, router]);

  if (authStatus === "loading") {
    return <PageLoader />;
  }

  if (authStatus === "guest" || authStatus === "user" || authStatus === "admin") {
    return null;
  }

  return children;
}