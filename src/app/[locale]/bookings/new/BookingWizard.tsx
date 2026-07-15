'use client';

import * as z from 'zod';
import {useState} from "react";
import {BookingDraft} from "./BookingDraft";
import {BookingStepper} from "./BookingStepper";
import {ScheduleStep} from "./ScheduleStep";
import {DriverStep} from "./DriverStep";
import {DocumentsStep} from "./DocumentsStep";
import {SummaryStep} from "./SummaryStep";
import {Booking} from "../../models/Booking";
import {CarUnit} from "../../models/CarUnit";
import {Renter} from "../../models/Renter";
import {Wallet} from "../../models/Wallet";
import {CarWithShop} from "@/lib/services/CarWithShop";
import {BookingCostSummary} from "./BookingCostSummary";
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {BookingDriverFormSchema, BookingScheduleFormSchema, DriverDocumentsSchema} from '@/schemas/index';
import {useTranslations} from 'next-intl';
import {UserProfile} from '../../models/UserProfile';
import {Translator} from '@/schemas/create-schema';

export default function BookingWizard({
  carShop,
  bookings,
  profile,
  units,
  drivers,
  wallet
}: {
  carShop: CarWithShop,
  profile: UserProfile,
  bookings: Booking[],
  units: CarUnit[],
  drivers: Renter[],
  wallet: Wallet;
}) {

  const [step, setStep] = useState(0);

  const t: Translator = useTranslations();
  const scheduleSchema = BookingScheduleFormSchema(t);
  const driverSchema = BookingDriverFormSchema(t);


  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const initialDropoff = new Date(tomorrow);
  initialDropoff.setDate(initialDropoff.getDate() + 3);

  const [draft, setDraft] =
    useState<BookingDraft>({
      dropoffDate: initialDropoff,
      pickupDate: tomorrow,
      pickupTime: "09:00",
      dropoffTime: "09:00",
      deliveryType: "pickup",
      deliveryAddress: "",
      paymentMethod: "payOnPickup",
      driver: {
        mode: "new",
        action: "create",

        name: "",
        email: "",
        phone: "",
        dob: "",
        gender: "Male",
      }
    });

  const steps = [
    t('cars.steps.schedule'),
    t('cars.steps.driver'),
    t('cars.steps.documents'),
    t('cars.steps.summary'),
  ];


  const scheduleForm = useForm<z.infer<typeof scheduleSchema>>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      pickupDate: tomorrow,
      dropoffDate: initialDropoff,
      pickupTime: '09:00',
      dropoffTime: '09:00',
      deliveryType: "pickup",
      deliveryAddress: "",
      note: "",
      paymentMethod: "crypto",
    },
  });

  const driverForm = useForm<z.infer<typeof driverSchema>>({
    resolver: zodResolver(driverSchema),
    defaultValues: {
      selectedDriverId: draft.driver?.id ?? "",
      name: draft.driver?.name ?? `${profile.personal.firstName} ${profile.personal.lastName}`,
      email: draft.driver?.email ?? profile.email,
      phone: draft.driver?.phone ?? profile.personal.phone,
      dob: draft.driver?.dob ?? "",
      gender: (draft.driver?.gender as "Male" | "Female" | "Others") ?? "Male",
    },
  });

  const documentSchema = DriverDocumentsSchema(draft, t);

  const documentForm = useForm<z.infer<typeof documentSchema>>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      licenseFront: undefined,
      licenseBack: undefined,
      idCard: undefined,
    },
  });

  return (
    <div className={`${step !== 3 && "grid lg:grid-cols-[1fr_380px] gap-8"} `}>
      <div className="space-y-8">

        <BookingStepper
          currentStep={step}
          steps={steps}
        />

        {step === 0 && (
          <ScheduleStep
            carShop={carShop}
            units={units}
            bookings={bookings}
            draft={draft}
            setDraft={setDraft}
            scheduleForm={scheduleForm}
            onNext={() =>
              setStep(1)
            }
          />
        )}

        {step === 1 && (
          <DriverStep
            drivers={drivers}
            setDraft={setDraft}
            draft={draft}
            driverForm={driverForm}
            onBack={() =>
              setStep(0)
            }
            onNext={() =>
              setStep(2)
            }
          />
        )}

        {step === 2 && (
          <DocumentsStep
            draft={draft}
            setDraft={setDraft}
            onBack={() =>
              setStep(1)
            }
            onNext={() =>
              setStep(3)
            }
            documentForm={documentForm}
          />
        )}

        {step === 3 && (
          <SummaryStep
            carShop={carShop}
            draft={draft}
            setDraft={setDraft}
            onBack={() =>
              setStep(2)
            }
            wallet={wallet}
            profile={profile}
          />
        )}
      </div>
      {
        step !== 3 &&
        <div>
          <div className="sticky top-24">
            <BookingCostSummary
              carShop={carShop}
              draft={draft}
            />
          </div>
        </div>
      }
    </div>
  );
}