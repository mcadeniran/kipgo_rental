"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {TriangleAlert} from "lucide-react";
import {useTranslations} from "next-intl";

interface Props {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onContinue: () => void;
}

export function DeleteAccountWarning({
  open,
  onOpenChange,
  onContinue,
}: Props) {
  const t = useTranslations('profile');

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <TriangleAlert />
          </AlertDialogMedia>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive">
            {t('deleteAccount')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('thisActionIsPermanent')}{' '}
            {t('allOfYourAccountData')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {t('cancel')}
          </AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"

            onClick={() => {
              onOpenChange(false);
              onContinue();
            }}
          >
            {t('continue')}
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>

    </AlertDialog>
  );
}