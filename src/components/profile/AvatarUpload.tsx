'use client';

import {Camera} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface AvatarUploadProps {
  image?: string;
  username: string;
  disabled?: boolean;
  onSelect: (file: File) => void;
}

export default function AvatarUpload({
  image,
  username,
  disabled,
  onSelect,
}: AvatarUploadProps) {
  function chooseImage() {
    if (disabled) return;

    document
      .getElementById("avatar-upload")
      ?.click();
  }

  return (
    <>
      <input
        id="avatar-upload"
        hidden
        type="file"
        accept="image/*"
        disabled={disabled}
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            onSelect(file);
          }

          // Allows selecting the same image again
          e.currentTarget.value = "";
        }}
      />

      <div
        onClick={chooseImage}
        className="relative cursor-pointer group"
      >
        <Avatar className="h-32 w-32 border-4 border-background shadow-lg">

          <AvatarImage src={image} />

          <AvatarFallback className="text-3xl">
            {username.charAt(0).toUpperCase()}
          </AvatarFallback>

        </Avatar>

        <div
          className=" absolute inset-0 rounded-full bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <Camera className="h-8 w-8 text-white" />
        </div>

        <div className=" absolute bottom-1 right-1 rounded-full bg-k-primary p-2 shadow-lg">
          <Camera className="h-4 w-4 text-white" />
        </div>

      </div>
    </>
  );
}