"use client";

import {useState} from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import {Button} from "@/components/ui/button";
import SubmitRatingForm from "../form/SubmitRatingForm";
import {useTranslations} from "next-intl";

interface ReviewDialogProps {
  bookingId: string;
}

export default function ReviewDialog({
  bookingId
}: ReviewDialogProps) {
  const t = useTranslations('bookings');
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger render={
        <Button className="w-full bg-k-primary text-white hover:bg-k-primary/90 hover:text-white/90 cursor-pointer">
          {t('leaveReview')}
        </Button>
      } />

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {t('leaveAReview')}
          </DialogTitle>

          <DialogDescription>
            {t('tellUsAboutYourExperience')}
          </DialogDescription>
        </DialogHeader>

        <SubmitRatingForm
          bookingId={bookingId}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}