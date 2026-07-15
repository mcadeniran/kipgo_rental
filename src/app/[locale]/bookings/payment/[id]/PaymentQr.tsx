'use client';
import {Booking} from "@/app/[locale]/models/Booking";

import QRCode from 'react-qr-code';
import {Check, Copy, Share2, } from 'lucide-react';
import {toast} from 'sonner';
import {Card, CardContent, CardHeader, CardTitle, } from '@/components/ui/card';

import {Button} from '@/components/ui/button';
import {useState} from "react";
import {useTranslations} from "next-intl";

export const PaymentQr = ({booking}: {booking: Booking;}) => {
  const t = useTranslations('payment');

  const crypto = booking.payment?.crypto;

  const [copiedAddress, setCopiedAddress] = useState(false);

  const [copiedAmount, setCopiedAmount] = useState(false);

  if (!crypto) return null;

  const copyWallet = async () => {
    await navigator.clipboard.writeText(crypto.walletAddress);
    setCopiedAddress(true);
    toast.success(t('walletCopied'));
    setTimeout(() => {
      setCopiedAddress(false);
    }, 2000);
  };

  const copyAmount = async () => {
    await navigator.clipboard.writeText(crypto.amount.toString());
    setCopiedAmount(true);
    toast.success(t('amountCopied'));
    setTimeout(() => {
      setCopiedAmount(false);
    }, 2000);
  };

  const share = async () => {
    const text = `Wallet: ${crypto.walletAddress} Amount: ${crypto.amount} USDT Network: ${crypto.network}`;

    if (navigator.share) {
      await navigator.share({title: t('cryptoPayment'), text, });
      return;
    }

    await navigator.clipboard.writeText(text);
    toast.success(t('paymentInformationCopied'));
  };

  return (

    <Card>
      <CardHeader>
        <CardTitle>{t('scanQRCode')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center rounded-xl border bg-white p-6">
          <QRCode
            value={crypto.walletAddress}
            size={220}
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">{t('walletAddress')}</p>
          <div className="rounded-lg bg-muted p-3 break-all font-mono text-xs">{crypto.walletAddress}</div>
          <Button variant="outline" className="w-full" onClick={copyWallet}>
            {
              copiedAddress
                ?
                <>
                  <Check className="mr-2 h-4 w-4" /> {t('copied')}
                </>
                :
                <>
                  <Copy className="mr-2 h-4 w-4" /> {t('copyWallet')}
                </>
            }
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">{t('amount')}</p>
          <div className="rounded-lg bg-muted p-3 text-center text-2xl font-bold">
            {crypto.amount.toFixed(2)} USDT
          </div>

          <Button variant="outline" className="w-full" onClick={copyAmount}>
            {
              copiedAmount
                ?
                <>
                  <Check className="mr-2 h-4 w-4" /> {t('copied')}
                </> : <>
                  <Copy className="mr-2 h-4 w-4" /> {t('copyAmount')}
                </>
            }
          </Button>
        </div>

        <Button className="w-full" onClick={share}>
          <Share2 className="mr-2 h-4 w-4" /> {t('sharePaymentDetails')}
        </Button>

      </CardContent>
    </Card>
  );
};