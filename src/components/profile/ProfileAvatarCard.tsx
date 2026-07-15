'use client';

import {useState} from "react";
import {Loader2} from "lucide-react";
import {Card, CardContent, } from "@/components/ui/card";
import useAuth from "@/context/AuthContext";
import {useUploadAvatar} from "@/lib/helper/useUploadAvatar";
import {toast} from "sonner";
import AvatarUpload from "./AvatarUpload";
import {useTranslations} from "next-intl";

export default function ProfileAvatarCard() {
  const t = useTranslations('profile');

  const {currentUser, userDataObj, refreshProfile} = useAuth();

  const uploadMutation = useUploadAvatar();

  const [preview, setPreview] = useState(userDataObj?.personal.photoUrl ?? "");

  async function handleSelect(file: File,) {
    if (!currentUser) return;
    // Save current image in case upload fails
    const previousImage = preview;

    // Instant preview
    const tempUrl = URL.createObjectURL(file);

    setPreview(tempUrl);

    try {
      const imageUrl = await uploadMutation.mutateAsync({
        uid: currentUser.uid,
        file,
        oldUrl: userDataObj?.personal.photoUrl,
      });
      // Replace temporary preview
      setPreview(imageUrl);

      toast.success(
        t('profilePictureUpdateSuccessfully')
      );
      await refreshProfile();
    } catch {
      setPreview(previousImage);
      toast.error(
        t('unableToUploadProfilePicture')
      );
    } finally {
      URL.revokeObjectURL(tempUrl);
    }
  }

  return (
    <Card>
      <CardContent className="flex flex-col items-center py-8 gap-5">
        <AvatarUpload
          image={preview}
          username={userDataObj?.username ?? "U"}
          disabled={uploadMutation.isPending}
          onSelect={handleSelect}
        />

        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            {userDataObj?.username}
          </h2>
          <p className="text-muted-foreground">
            {currentUser?.email}
          </p>
        </div>

        {uploadMutation.isPending && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            {t('uploadingImage')}
          </div>
        )}
      </CardContent>
    </Card>
  );
}