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

interface ReviewDialogProps {
  bookingId: string;
}

export default function ReviewDialog({
  bookingId
}: ReviewDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger render={
        <Button className="w-full bg-k-primary text-white hover:bg-k-primary/90 hover:text-white/90 cursor-pointer">
          Leave Review
        </Button>
      } />

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Leave a Review
          </DialogTitle>

          <DialogDescription>
            Tell us about your experience with the vehicle and rental company. Your review helps future customers make informed decisions.
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