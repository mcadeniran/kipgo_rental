import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PersonalInformationCard from "@/components/profile/PersonalInformationCard";
import PhoneVerificationCard from "@/components/profile/PhoneVerificationCard";
import ProfileAvatarCard from "@/components/profile/ProfileAvatarCard";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="container py-8">

        <div className="mx-auto max-w-4xl space-y-6">

          <ProfileAvatarCard />

          <PersonalInformationCard />

          <PhoneVerificationCard />
        </div>

      </div>

    </ProtectedRoute>
  );
}