"use client";

import Image from "next/image";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

import {ReviewPhoto} from "@/types/ratings";
import {useState} from "react";
import {useTranslations} from "next-intl";

interface ReviewGalleryProps {
  photos?: ReviewPhoto[];
}

export default function ReviewGallery({
  photos = [],
}: ReviewGalleryProps) {
  const t = useTranslations('reviews');

  const [selected, setSelected] = useState<ReviewPhoto | null>(null);

  if (photos.length === 0) {
    return null;
  }


  return (
    <div className="space-y-4">
      <h4 className="font-semibold">
        {t('reviewPhotos')}
      </h4>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((photo) => (
          <div className="relative aspect-video w-full" key={photo.id}>
            <Image
              src={photo.url}
              alt={t('reviewPhoto')}
              fill
              className="rounded-lg object-contain"
              onClick={() => setSelected(photo)}
            />
          </div>
        ))}
      </div>
      {
        !!selected &&
        <Dialog open={!!selected}
          onOpenChange={() => setSelected(null)}>
          <DialogContent className="max-w-4xl border-none bg-transparent shadow-none">
            <div className="relative aspect-video w-full">
              <Image
                src={selected!.url}
                alt={t('reviewPhoto')}
                fill
                className="rounded-lg object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      }
    </div>
  );
}