'use client';

import {useEffect} from "react";
import {ClipboardPaste, Loader} from "lucide-react";
import * as z from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

import {Booking} from "@/app/[locale]/models/Booking";
import {useSubmitTxid} from "@/lib/helper/useSubmitTxid";
import {PaymentTxidSchema} from "@/schemas";
import {useTranslations} from "next-intl";
import {Field, FieldError, FieldGroup, FieldLabel} from "@/components/ui/field";

export const PaymentTxidForm = ({booking}: {booking: Booking;}) => {
  const mutation = useSubmitTxid();

  const t = useTranslations();
  const m = useTranslations('payment');

  const paymentSchema = PaymentTxidSchema(t);

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      txid: booking.payment?.crypto?.txid ?? "",
    },
  });

  useEffect(() => {
    if (booking.payment?.crypto?.txid) {
      form.reset({txid: booking.payment.crypto.txid, });
    }
  }, [booking, form]);

  const paste = async () => {
    const text = await navigator.clipboard.readText();
    form.setValue("txid", text, {shouldValidate: true, },);
  };

  const submit =
    form.handleSubmit(values => {
      mutation.mutate({
        bookingId: booking.id,
        txid: values.txid,
      });
    });

  if (booking.payment?.crypto?.txid) {
    return (
      <div className="rounded-xl border p-6">
        <h3 className="font-semibold">{m('transactionSubmitted')}</h3>
        <p className="text-sm text-muted-foreground mt-2">{m('waitingForPaymentVerification')}</p>
      </div>
    );
  }

  return <form onSubmit={submit} className="space-y-5">
    <FieldGroup>
      <Controller
        control={form.control}
        name="txid"
        render={({field, fieldState}) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor='form-txid'>{m('TXID')}</FieldLabel>
            <Input
              placeholder={m('pasteTronTransactionHash')}
              id="form-txid"
              disabled={mutation.isPending}
              {...field}
            />
            {fieldState.invalid && (
              <FieldError errors={[fieldState.error]} />
            )}
          </Field>
        )}
      />
      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={paste}>
          <ClipboardPaste className="size-4 mr-2" />  {m('paste')}
        </Button>

        <Button type="submit" className="bg-k-primary text-white hover:bg-k-primary/90 hover:text-white cursor-pointer" disabled={mutation.isPending}>
          {
            mutation.isPending ? <Loader className="animate-spin" /> : m('iHavePaid')
          }
        </Button>

      </div>
    </FieldGroup>
  </form>;
};