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

interface Props {
  open: boolean;
}

export default function RentalPortalDialog({
  open,
}: Props) {

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

            Rental Account

          </AlertDialogTitle>

          <AlertDialogDescription>

            This account belongs to a rental partner.

            Please use the Rental Portal instead.

          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel
            onClick={handleClose}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={goToPortal}
          >
            Go to Rental Portal
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>

  );

}