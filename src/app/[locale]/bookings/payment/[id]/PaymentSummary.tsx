'use client';

import {Booking} from "@/app/[locale]/models/Booking";
import {Banknote, Coins, ReceiptText, Wallet, } from 'lucide-react';

import {Card, CardContent, CardHeader, CardTitle, } from '@/components/ui/card';

import {Separator} from '@/components/ui/separator';
import {Badge} from '@/components/ui/badge';
import {useDateTimeFormatter} from "@/lib/helper/formatDate";


export const PaymentSummary = ({booking}: {booking: Booking;}) => {

  const {formatCurrency} = useDateTimeFormatter();

  const crypto = booking.payment?.crypto;

  if (!crypto) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Payment Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="rounded-xl border bg-muted/30 p-6 text-center">
          <p className="text-sm text-muted-foreground">Total Amount</p>

          <h2 className="mt-2 text-3xl font-bold"> {formatCurrency(booking.totalPrice, booking.currency)}</h2>

          <Badge className="mt-3" variant="secondary">{crypto.amount.toFixed(2)}{' '}USDT</Badge>

        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <InfoRow
            icon={<ReceiptText size={18} />}
            label="Invoice"
            value={booking.invoiceNumber}
          />

          <InfoRow
            icon={<Wallet size={18} />}
            label="Network"
            value={crypto.network}
          />

          <InfoRow
            icon={<Coins size={18} />}
            label="Currency"
            value={crypto.currency}
          />

          <InfoRow
            icon={<Banknote size={18} />}
            label="Network Fee"
            value={`${crypto.networkFee} USDT`}
          />
        </div>

        <Separator />

        <div className="space-y-2">
          <p className="font-medium">Receiving Address</p>
          <div className="rounded-lg bg-muted p-4 break-all font-mono text-sm">
            {crypto.walletAddress}
          </div>
        </div>


      </CardContent>
    </Card>
  );
};

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoRow({icon, label, value}: InfoRowProps) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-sm">
          {label}
        </span>
      </div>

      <p className="mt-2 font-semibold break-all">
        {value}
      </p>

    </div>
  );
}