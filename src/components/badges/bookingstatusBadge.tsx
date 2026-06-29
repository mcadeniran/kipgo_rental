import {BookingStatus} from "@/app/[locale]/models/Booking";
import {Badge} from "@/components/ui/badge";
import {useTranslations} from "next-intl";

export function BookingStatusBadge({
  status
}: {
  status: BookingStatus;
}) {

  const c = useTranslations('common.status');

  const styles = {
    pending: "bg-yellow-100 text-yellow-700 capitalize",
    payment_submitted: "bg-orange-100 text-orange-700 capitalize",
    reserved: "bg-teal-100 text-teal-700 capitalize",
    approved: "bg-blue-100 text-blue-700 capitalize",
    ongoing: "bg-purple-100 text-purple-700 capitalize",
    completed: "bg-green-100 text-green-700 capitalize",
    rejected: "bg-red-100 text-red-700 capitalize",
    cancelled: "bg-red-100 text-red-700 capitalize",
    expired: "bg-red-100 text-red-700 capitalize",
  };

  const labels: Record<BookingStatus, string> = {
    pending: c('pending'),
    payment_submitted: "Payment Submitted",
    reserved: "Reserved",
    approved: c('approved'),
    ongoing: c('ongoing'),
    completed: c('completed'),
    rejected: c('rejected'),
    cancelled: c('cancelled'),
    expired: c('expired')
  };

  return (
    <Badge className={styles[status]}>
      {labels[status]}
    </Badge>
  );
}