import ProtectedRoute from "@/components/auth/ProtectedRoute";

interface Props {
  children: React.ReactNode;
}

export default function BookingsLayout({
  children,
}: Props) {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
}