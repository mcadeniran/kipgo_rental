"use client";

import * as React from "react";
import Image from "next/image";
import {Trash2, Upload} from "lucide-react";

import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";

interface Props {
  value: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
}

export default function ReviewPhotoUpload({
  value,
  onChange,
  maxFiles = 6,
}: Props) {
  const t = useTranslations('bookings');
  const inputRef =
    React.useRef<HTMLInputElement>(null);

  function handleSelect(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const files = Array.from(
      event.target.files ?? [],
    );

    const merged = [
      ...value,
      ...files,
    ].slice(0, maxFiles);

    onChange(merged);
  }

  function remove(index: number) {
    onChange(
      value.filter(
        (_, i) => i !== index,
      ),
    );
  }

  return (
    <div className="space-y-4">

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          inputRef.current?.click()
        }
      >
        <Upload className="mr-2 h-4 w-4" />
        {t('uploadPhotos')}
      </Button>

      <input
        hidden
        multiple
        accept="image/*"
        ref={inputRef}
        type="file"
        onChange={handleSelect}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {value.map((file, index) => (
          <div
            key={index}
            className="relative aspect-square overflow-hidden rounded-lg border"
          >
            <Image
              fill
              alt={file.name}
              src={URL.createObjectURL(file)}
              className="object-cover"
            />

            <Button
              size="icon"
              variant="destructive"
              type="button"
              className="absolute right-2 top-2 h-8 w-8"
              onClick={() =>
                remove(index)
              }
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}