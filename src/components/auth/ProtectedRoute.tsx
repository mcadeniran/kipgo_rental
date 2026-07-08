// 'use client';

// import {ReactNode, useEffect, useState} from "react";
// import {usePathname} from "next/navigation";
// import {useRouter} from "@/i18n/navigation";
// import useAuth from "@/context/AuthContext";
// import PageLoader from "../general/PageLoader";
// import RentalPortalDialog from "./RentalPortalDialog";

// interface Props {
//   children: ReactNode;
// }

// export default function ProtectedRoute({children, }: Props) {
//   const {authStatus, logout, } = useAuth();
//   const [showRentalDialog, setShowRentalDialog] = useState(false);

//   const router = useRouter();

//   const pathname = usePathname();

//   useEffect(() => {
//     switch (authStatus) {
//       case "guest":
//         router.replace(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`);
//         break;

//       case "unverified":
//         router.replace("/auth/verify-email");
//         break;

//       // case "rental":
//       //   setShowRentalDialog(true);
//       //   break;
//     }

//   }, [authStatus, pathname, router, logout,]);

//   if (authStatus === "loading") {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <PageLoader />
//       </div>
//     );
//   }

//   if (authStatus === "rental") {
//     return (
//       <RentalPortalDialog
//         open={true}
//       />
//     );
//   }

//   if (authStatus === "guest" || authStatus === "unverified" || authStatus === "rental") {
//     return null;
//   }
//   return (<>
//     <RentalPortalDialog
//       open={showRentalDialog}
//     />;
//     {children}

//   </>);
// }

'use client';

import {useEffect} from 'react';
import {useRouter, usePathname} from '@/i18n/navigation';

import useAuth from '@/context/AuthContext';

import PageLoader from '@/components/general/PageLoader';
import RentalPortalDialog from '@/components/auth/RentalPortalDialog';

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: Props) {
  const {authStatus} = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  /**
   * Redirect only.
   * Don't update React state here.
   */
  useEffect(() => {
    if (authStatus === 'guest') {
      router.replace(
        `/auth/login?callbackUrl=${encodeURIComponent(pathname)}`
      );
      return;
    }

    if (authStatus === 'unverified') {
      router.replace(
        `/auth/verify-email?callbackUrl=${encodeURIComponent(pathname)}`
      );
    }
  }, [authStatus, pathname, router]);

  /**
   * Loading
   */
  if (authStatus === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  /**
   * Wait while redirecting
   */
  if (
    authStatus === 'guest' ||
    authStatus === 'unverified'
  ) {
    return null;
  }

  /**
   * Rental accounts are not allowed
   */
  if (authStatus === 'rental') {
    return (
      <RentalPortalDialog
        open={true}
      />
    );
  }

  /**
   * user/admin
   */
  return <>{children}</>;
}