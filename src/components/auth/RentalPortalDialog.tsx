'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import useAuth from "@/context/AuthContext";
import {useTranslations} from "next-intl";

interface Props {
  open: boolean;
}

export default function RentalPortalDialog({
  open,
}: Props) {
  const t = useTranslations('auth');

  const {logout} = useAuth();

  async function handleClose() {
    await logout();
    window.location.replace("/");
  }

  async function goToPortal() {
    await logout();
    window.location.href = "https://www.kipgotaxi.com";
  }

  return (
    <AlertDialog open={open}>

      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>

            {t('rentalAccount')}

          </AlertDialogTitle>

          <AlertDialogDescription>
            {t('thisAccountBelongsToARental')}
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel
            onClick={handleClose}
          >
            {t('cancel')}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={goToPortal}
          >
            {t('goToRentalPortal')}
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>

  );

}