'use client';
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {BookingDraft} from "./BookingDraft";
import {CarWithShop} from "@/lib/services/CarWithShop";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {differenceInCalendarDays} from "date-fns";
import {Car} from "../../models/Car";
import {RentalShop} from "../../models/RentalShop";
import {Button} from "@/components/ui/button";
import {useDateTimeFormatter} from "@/lib/helper/formatDate";

import {Field, FieldContent, FieldDescription, FieldLabel, FieldTitle} from "@/components/ui/field";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {calculateBookingTotals} from "./bookingTotals";
import {useCreateBooking} from "@/lib/helper/useCreateBooking";
import {UserProfile} from "../../models/UserProfile";
import {Wallet} from "../../models/Wallet";
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from "@/components/ui/alert-dialog";
import {Loader} from "lucide-react";
import {useRouter} from "@/i18n/navigation";
import {toast} from "sonner";
import {FormError} from "@/components/general/FormError";
import {useTranslations} from "next-intl";
import TranslatedTransmissionType from "@/lib/translations/translatedTransmissionType";
import {TransmissionType} from "@/lib/carProperties";
import TranslatedGender, {GenderType} from "@/lib/translations/translatedGender";
import TranslatedDeliveryMethod from "@/lib/translations/translatedDeliveryMethod";

export const SummaryStep = ({
  carShop,
  draft,
  onBack,
  setDraft,
  profile,
  wallet,
}: {
  carShop: CarWithShop;
  draft: BookingDraft;
  setDraft: Dispatch<SetStateAction<BookingDraft>>,
  onBack: (value: SetStateAction<number>) => void;
  profile: UserProfile,
  wallet: Wallet;
}) => {

  const t = useTranslations('cars');

  const mutation = useCreateBooking();

  const router = useRouter();

  const [submitError, setSubmitError] = useState<string | undefined>(undefined);

  // const submitBooking = () => {mutation.mutate({draft, profile, carShop, wallet, });};

  const submitBooking = async () => {
    try {
      setSubmitError(undefined);
      const result = await mutation.mutateAsync({
        draft,
        profile,
        carShop,
        wallet,
      });

      toast.success(t('bookingCreatedSuccessfully'));

      if (draft.paymentMethod === "payOnPickup") {
        router.replace(`/bookings/${result.bookingId}`);
      } else {

        router.replace(
          `/bookings/payment/${result.bookingId}`
        );
      }

    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : t('unableToCreateBooking');
      setSubmitError(message);

    }
  };

  return <div className="grid lg:grid-cols-3 gap-8">

    {/* LEFT */}

    <div className="lg:col-span-2 space-y-6">
      <VehicleSummary car={carShop.car} shop={carShop.shop} />
      <ScheduleSummary draft={draft} />
      <DriverSummary draft={draft} />
      <DocumentsSummary draft={draft} />

      {draft.note && (
        <Card>
          <CardHeader>
            <CardTitle>
              {t('additionalNote')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {draft.note}
          </CardContent>
        </Card>
      )}
    </div>

    {/* RIGHT */}

    <div>
      <BookingCostSummary
        carShop={carShop}
        draft={draft}
        onBack={onBack}
        setDraft={setDraft}
        onSubmit={submitBooking}
        submitError={submitError}
        isSubmitting={mutation.isPending}
      />
    </div>
  </div>;
};

function VehicleSummary({car, shop, }: {car: Car; shop: RentalShop;}) {
  const t = useTranslations('cars');
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t('vehicle')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Image
            src={car.images.find(i => i.isCover)?.url ?? car.images[0].url}
            alt={car.model}
            width={160}
            height={120}
            className="rounded-lg object-cover w-40 h-30"
          />
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{car.brand} {car.model} </h3>
            <Badge>{car.year}</Badge>
            <p>{shop.name}</p>
            <p><TranslatedTransmissionType transmission={car.transmission as TransmissionType} /></p>
            <p>{t('numSeats', {count: car.seats})}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ScheduleSummary({draft, }: {draft: BookingDraft;}) {
  const t = useTranslations('cars');
  const combineDateTime = (date?: Date, time?: string) => {
    if (!date || !time) return null;
    const [h, m] = time.split(":").map(Number);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m);
  };

  const {formatDate, formatTime} = useDateTimeFormatter();

  const pickupDateTime = combineDateTime(draft.pickupDate, draft.pickupTime);
  const dropoffDateTime = combineDateTime(draft.dropoffDate, draft.dropoffTime);
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t('rentalSchedule')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span>{t('pickup')}</span>
          <span>{formatDate(pickupDateTime!.toISOString())} @ {formatTime(pickupDateTime!.toISOString())}</span>
        </div>
        <div className="flex justify-between">
          <span>{t('dropoff')}</span>
          <span>{formatDate(dropoffDateTime!.toISOString())} @ {formatTime(dropoffDateTime!.toISOString())}</span>
        </div>
        <div className="flex justify-between">
          <span>{t('rentalDays')}</span>
          <span>{differenceInCalendarDays(draft.dropoffDate!, draft.pickupDate!)}</span>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span>{t('deliveryMethod')}</span>
          <Badge><TranslatedDeliveryMethod method={draft.deliveryType} /></Badge>
        </div>

        {draft.deliveryType === "delivery" && (
          <>
            <Separator />
            <div>
              <p className="font-medium mb-1">{t('deliveryAddress')}</p>
              <p className="text-muted-foreground">{draft.deliveryAddress} </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function DocumentPreview({
  file,
  url,
  alt,
}: {
  file?: File;
  url?: string;
  alt: string;
}) {
  const [src, setSrc] = useState(url);

  useEffect(() => {
    if (!file) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSrc(url);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setSrc(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file, url]);

  if (!src) return null;

  return (
    <Image
      src={src}
      alt={alt}
      width={200}
      height={130}
      sizes="100%"
      className="rounded-lg border object-cover w-50 h-auto"
    />
  );
}

function DriverSummary({draft, }: {draft: BookingDraft;}) {
  const t = useTranslations('cars');
  const driver = draft.driver!;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('driver')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p><strong>{t('fullName')}:</strong> {driver.name}</p>
        <p><strong>{t('email')}:</strong> {driver.email}</p>
        <p><strong>{t('phone')}:</strong> {driver.phone}</p>
        <p><strong>{t('dateOfBirth')}:</strong> {driver.dob}</p>
        <p><strong>{t('gender')}:</strong><TranslatedGender gender={driver.gender as GenderType} /></p>
      </CardContent>
    </Card>
  );
}

function DocumentsSummary({draft, }: {draft: BookingDraft;}) {
  const t = useTranslations('cars');
  const docs = [
    {
      title: t('driverLicenseFront'),
      file: draft.driverDocuments?.licenseFront,
      url: draft.driverDocuments?.licenseFrontUrl,
    },
    {
      title: t('driverLicenseBack'),
      file: draft.driverDocuments?.licenseBack,
      url: draft.driverDocuments?.licenseBackUrl,
    },
    {
      title: t('governmentID'),
      file: draft.driverDocuments?.idCard,
      url: draft.driverDocuments?.idCardUrl,
    },
  ];


  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('documents')}</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-3 gap-4">
        {docs.map(doc => (
          <div
            key={doc.title}
            className="space-y-2"
          >
            <DocumentPreview file={doc.file}
              url={doc.url}
              alt={doc.title} />
            <p className="text-sm">{doc.title}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}


function BookingCostSummary({carShop, draft, onBack, setDraft, onSubmit, isSubmitting, submitError
}: {
  carShop: CarWithShop,
  draft: BookingDraft,
  onBack: (value: SetStateAction<number>) => void;
  setDraft: Dispatch<SetStateAction<BookingDraft>>;
  submitError: string | undefined,
  onSubmit: () => void;
  isSubmitting: boolean;
}) {
  const t = useTranslations('cars');

  const {formatCurrency} = useDateTimeFormatter();

  const totals = calculateBookingTotals(draft, carShop);

  const combineDateTime = (date?: Date, time?: string) => {
    if (!date || !time) return null;
    const [h, m] = time.split(":").map(Number);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m);
  };

  const {formatDate, formatTime} = useDateTimeFormatter();

  const pickupDateTime = combineDateTime(draft.pickupDate, draft.pickupTime);
  const dropoffDateTime = combineDateTime(draft.dropoffDate, draft.dropoffTime);


  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>{t('costSummary')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span>{t('rental')}</span>
          <span>{t('rentalDaysCount', {count: totals.rentalDays})} x {formatCurrency(totals.dailyPrice, totals.currency)}</span>
        </div>
        <div className="flex justify-between">
          <span></span>
          <span>{formatCurrency(totals.rentalPrice, totals.currency)}</span>
        </div>
        {
          draft.deliveryType === 'delivery' &&
          <div className="flex justify-between">
            <span>{t('delivery')}</span>
            <span>{formatCurrency(totals.deliveryPrice, totals.currency)}</span>
          </div>
        }


        <div className="flex justify-between">
          <span>{t('taxRate')}</span>
          <span>%{carShop.shop.taxRate}</span>
        </div>

        <div className="flex justify-between">
          <span>{t('tax')}</span>
          <span>{formatCurrency(totals.tax, totals.currency)}</span>
        </div>

        <div className="flex justify-between">
          <span>{t('deposit')}</span>
          <span>{formatCurrency(totals.deposit, totals.currency)}</span>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">

          <span>{t('total')}</span>

          <span>{formatCurrency(totals.total, totals.currency)}</span>

        </div>

        <Separator />
        <RadioGroup
          value={draft.paymentMethod}
          onValueChange={(value) =>
            setDraft(prev => ({
              ...prev,
              paymentMethod: value as "crypto" | "payOnPickup",
            }))
          }
          className="max-w-sm"
        >
          <FieldLabel
            htmlFor="crypto"
            className="block rounded-lg border border-border transition-all cursor-pointer has-[[data-slot=radio-group-item][data-checked]]:border-k-primary has-[[data-slot=radio-group-item][data-checked]]:bg-transparent has-[[data-slot=radio-group-item][data-checked]]:text-k-primary"
          >
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>{t('crypto')}</FieldTitle>
                <FieldDescription>
                  {t('payUsingCrypto')}
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem value="crypto" id="crypto" />
            </Field>
          </FieldLabel>
          <FieldLabel
            htmlFor="payOnPickup"
            className="block rounded-lg border border-border transition-all cursor-pointer has-[[data-slot=radio-group-item][data-checked]]:border-k-primary has-[[data-slot=radio-group-item][data-checked]]:bg-transparent has-[[data-slot=radio-group-item][data-checked]]:text-k-primary"
          >
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>{t('payOnPickup')}</FieldTitle>
                <FieldDescription>{t('payPhysically')}</FieldDescription>
              </FieldContent>
              <RadioGroupItem value="payOnPickup" id="payOnPickup" />
            </Field>
          </FieldLabel>
        </RadioGroup>
        <Separator />

        <div className="flex flex-col gap-2">

          <div className="flex gap-3 pt-2">
            <FormError message={submitError} />
            <Button
              variant="outline"
              className="flex-1 cursor-pointer"
              disabled={isSubmitting}
              onClick={() => onBack((prev: number) => prev - 1)}
            >
              {t('back')}
            </Button>
            <AlertDialog>
              <AlertDialogTrigger render={<Button className="flex-1 bg-k-primary text-white hover:bg-k-primary/90 hover:text-white cursor-pointer">{t('submitBooking')}</Button>}>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t('confirmBooking')}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t('youAreAboutToBook')}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex flex-col gap-2 p-0">
                  {carShop.car.brand}{' '}{carShop.car.model}{' '}{carShop.car.year}
                  <span className="text-sm text-slate-600">{t('pickup')}: {formatDate(pickupDateTime!.toISOString())} @{formatTime(pickupDateTime!.toISOString())}</span>
                  <span className="text-sm text-slate-600">{t('dropoff')}: {formatDate(dropoffDateTime!.toISOString())} @{formatTime(dropoffDateTime!.toISOString())}</span>
                  <span className="text-sm text-slate-600">{t('total')}: {formatCurrency(totals.total, totals.currency)}</span>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-k-primary text-white cursor-pointer hover:bg-k-primary/90 hover:text-white"
                    onClick={onSubmit}
                    disabled={isSubmitting}
                  >{isSubmitting ? <Loader className="animate-spin" /> : t('confirm')}</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

      </CardContent>

    </Card>
  );
}