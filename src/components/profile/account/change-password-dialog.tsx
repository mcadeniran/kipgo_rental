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
import {Button} from "@/components/ui/button";
import {usePasswordReset} from "@/lib/helper/usePasswordReset";

import {Loader, Mail} from "lucide-react";
import {useTranslations} from "next-intl";

interface Props {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  email: string;
}

export function ChangePasswordDialog({
  open,
  onOpenChange,
  email,
}: Props) {
  const t = useTranslations('profile');
  const mutation = usePasswordReset();

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <Mail />
          </AlertDialogMedia>
          <AlertDialogTitle>
            {t('resetPasswordQ')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t('weWillSendAPassword')}
            <br />
            <span className="font-semibold text-foreground">
              {email}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {t('cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            render={
              <Button
                className='bg-k-primary text-white hover:bg-k-primary/90 hover:text-white/90 cursor-pointer'
                disabled={mutation.isPending}
                onClick={(e) => {
                  e.preventDefault();
                  mutation.mutate(email, {
                    onSuccess() {
                      onOpenChange(false);
                    },
                  });
                }}
              >
                {mutation.isPending
                  ? <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    {t('sending')}
                  </>
                  : t('sendEmail')}
              </Button>

            } />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}