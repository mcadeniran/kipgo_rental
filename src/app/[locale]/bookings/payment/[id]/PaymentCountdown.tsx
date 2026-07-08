'use client';

import {useEffect, useMemo, useRef, useState} from 'react';
import {differenceInMilliseconds} from 'date-fns';
import {Clock3, AlertTriangle} from 'lucide-react';

import {Card, CardContent} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';

import {Booking} from "@/app/[locale]/models/Booking";
import {useExpireBooking} from '@/lib/helper/useExpireBooking';

export const PaymentCountdown = ({booking}: {booking: Booking;}) => {
  const expireBooking = useExpireBooking();
  const expiresAt = booking.payment?.expiresAt;

  const [remaining, setRemaining] = useState<number | null>(null);

  const hasExpired = useRef(false);

  const remainingMs = remaining ?? 0;

  useEffect(() => {
    if (!expiresAt) return;
    const tick = () => {
      const now = new Date();

      // console.log("NOW:", now);
      // console.log("EXPIRES:", expiresAt);

      const diff = differenceInMilliseconds(expiresAt, now);

      // console.log("DIFF:", diff);

      setRemaining(Math.max(diff, 0));
      // const diff = differenceInMilliseconds(expiresAt, new Date(),);
      // setRemaining(Math.max(diff, 0));
    };
    tick();
    const interval = setInterval(tick, 1000,);
    return () => clearInterval(interval);
  }, [expiresAt]);

  useEffect(() => {
    if (remaining === null) return;
    if (!expiresAt) return;
    if (remaining > 0) return;
    if (booking.status !== 'pending')
      return;

    if (hasExpired.current) return;

    hasExpired.current = true;

    // console.log("EXPIRES AT: ", expiresAt);
    // console.log("REMAINING: ", remaining);
    // console.log("BOOKING STATUS: ", booking.status);

    expireBooking.mutate(booking.id);
  }, [remaining, expiresAt, booking.status, booking.id, expireBooking,]);

  const minutes = Math.floor(remainingMs / 60000);

  const seconds = Math.floor((remainingMs % 60000) / 1000);

  const timer = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const badgeVariant = useMemo(() => {
    if (remainingMs <= 0)
      return 'destructive';

    if (remainingMs < 5 * 60 * 1000)
      return 'destructive';

    if (remainingMs < 15 * 60 * 1000)
      return 'secondary';

    return 'default';
  }, [remainingMs]);

  const background = useMemo(() => {
    if (remainingMs <= 0)
      return 'border-red-500 bg-red-50';

    if (remainingMs < 5 * 60 * 1000)
      return 'border-red-400 bg-red-50';

    if (remainingMs < 15 * 60 * 1000)
      return 'border-orange-400 bg-orange-50';

    return 'border-green-500 bg-green-50';
  }, [remainingMs]);

  return (
    <Card className={`border ${background}`}>
      <CardContent className="flex items-center justify-between p-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Clock3 className="h-5 w-5" />
            <span className="font-semibold">Payment Countdown</span>
          </div>

          <p className="text-sm text-muted-foreground">Complete your payment before the timer reaches zero.</p>
        </div>

        <div className="text-right">
          <Badge variant={badgeVariant} className="mb-2" >
            {remainingMs <= 0 ? 'Expired' : 'Pending'}
          </Badge>

          <div className="text-4xl font-bold tabular-nums">
            {remainingMs <= 0 ? '00:00' : timer}
          </div>
        </div>
      </CardContent>

      {remainingMs < 5 * 60 * 1000 &&
        remainingMs > 0 && (
          <CardContent className="pt-0">
            <div className="flex items-center gap-2 rounded-lg bg-red-100 p-3 text-red-700">
              <AlertTriangle className="h-4 w-4" />Less than 5 minutes remaining.
            </div>
          </CardContent>
        )}
    </Card>
  );
};