'use client';

import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {BookingDraft} from "./BookingDraft";
import {CarWithShop} from "@/lib/services/CarWithShop";
import {CarUnit} from "../../models/CarUnit";
import {Booking} from "../../models/Booking";
import {addDays, startOfDay} from "date-fns";
import {Controller, UseFormReturn} from 'react-hook-form';
import {Field, FieldError, FieldGroup, FieldLabel} from '@/components/ui/field';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Calendar} from "@/components/ui/calendar";
import {useCalendarLocale} from "@/lib/helper/useCalendarLocale";
import {Clock2Icon} from "lucide-react";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";
import {getAvailableUnitsForDate} from "@/lib/helper/getAvailableUnitsForDate";
import {hasAvailableUnitForRange} from "@/lib/helper/hasAvailableUnitForRange";
import {toast} from "sonner";
import {DateRange} from "react-day-picker";


export const ScheduleStep = ({
  carShop,
  units,
  bookings,
  setDraft,
  onNext,
  scheduleForm,
  draft
}: {
  carShop: CarWithShop;
  units: CarUnit[];
  draft: BookingDraft;
  bookings: Booking[];
  setDraft: Dispatch<SetStateAction<BookingDraft>>;
  onNext: (value: SetStateAction<number>) => void;
  scheduleForm: UseFormReturn<{
    pickupDate: Date;
    dropoffDate: Date;
    pickupTime: string;
    dropoffTime: string;
    deliveryType: "pickup" | "delivery";
    paymentMethod: "crypto" | "payOnPickup";
    deliveryAddress?: string | undefined;
    note?: string | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, any, {
    pickupDate: Date;
    dropoffDate: Date;
    pickupTime: string;
    dropoffTime: string;
    deliveryType: "pickup" | "delivery";
    paymentMethod: "crypto" | "payOnPickup";
    deliveryAddress?: string | undefined;
    note?: string | undefined;
  }>;
}) => {

  const calendarLocale = useCalendarLocale();

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: draft.pickupDate,
    to: draft.dropoffDate,
  });

  const tomorrow = addDays(
    startOfDay(new Date()),
    1
  );

  const pickupDate =
    scheduleForm.watch(
      "pickupDate"
    );

  useEffect(() => {

    if (!pickupDate)
      return;

    const minimumDropoff =
      addDays(
        pickupDate,
        3
      );

    const currentDropoff =
      scheduleForm.getValues(
        "dropoffDate"
      );

    if (
      currentDropoff <
      minimumDropoff
    ) {
      scheduleForm.setValue(
        "dropoffDate",
        minimumDropoff,
        {
          shouldValidate: true,
        }
      );
    }

  }, [pickupDate, scheduleForm]);

  // const minDropoffDate =
  //   pickupDate
  //     ? addDays(pickupDate, 3)
  //     : undefined;

  function isDateFullyBooked(
    date: Date
  ) {
    const availableUnits =
      getAvailableUnitsForDate(
        date,
        units,
        bookings
      );

    return availableUnits.length === 0;
  }

  async function handleStepOneNext() {
    const valid = await scheduleForm.trigger([
      "pickupDate",
      "dropoffDate",
      "deliveryType",
      "deliveryAddress",
    ]);

    if (!valid) {

      toast.error(
        "Please complete all required fields."
      );

      return;
    }

    const values =
      scheduleForm.getValues();

    const available =
      hasAvailableUnitForRange(
        values.pickupDate,
        values.dropoffDate,
        units,
        bookings
      );

    if (!available) {

      toast.error(
        "No vehicle available for the selected period."
      );

      return;
    }

    setDraft(prev => ({
      ...prev,
      pickupDate: values.pickupDate,
      dropoffDate: values.dropoffDate,
      pickupTime: values.pickupTime,
      dropoffTime: values.dropoffTime,
      deliveryType: values.deliveryType,
      deliveryAddress: values.deliveryAddress ?? "",
      paymentMethod: values.paymentMethod,
      note: values.note,
    }));

    onNext(1);
  }

  const deliveryType =
    scheduleForm.watch("deliveryType");

  return <div className="flex flex-col space-y-4">
    <form className='space-y-6'>

      <h2 className="text-xl font-semibold">
        Rental Schedule
      </h2>

      <Card className="shadow-none border-none">
        <CardHeader>
          <CardTitle>Rental Period</CardTitle>
        </CardHeader>

        <CardContent className="flex justify-center w-full">
          <Calendar
            locale={calendarLocale}
            mode="range"
            numberOfMonths={2}
            selected={dateRange}
            defaultMonth={dateRange?.from}
            min={3} // Minimum rental = 3 nights/days
            disabled={(date) =>
              date < tomorrow ||
              isDateFullyBooked(date)
            }
            className="w-full"
            classNames={{
              disabled: "text-red-700 opacity-100 line-through"
            }}

            onSelect={(range) => {
              setDateRange(range);

              // User cleared the selection
              if (!range?.from) {
                return;
              }

              // User has only selected the pickup date
              if (!range.to) {
                return;
              }


              scheduleForm.setValue("pickupDate", range.from!, {
                shouldValidate: true,
              });

              scheduleForm.setValue("dropoffDate", range.to!, {
                shouldValidate: true,
              });

              setDraft((prev) => ({
                ...prev,
                pickupDate: range.from,
                dropoffDate: range.to,
              }));
            }}
          />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 mt-6">

        <Controller
          control={scheduleForm.control}
          name="pickupTime"
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-pickupTime">
                Pickup Time
              </FieldLabel>
              <InputGroup id="form-pickupTime">
                <InputGroupInput type="time" {...field} />
                <InputGroupAddon>
                  <Clock2Icon className="text-muted-foreground" />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
        <Controller
          control={scheduleForm.control}
          name="dropoffTime"
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-dropoffTime">
                Dropoff Time
              </FieldLabel>
              <InputGroup id="form-dropoffTime">
                <InputGroupInput type="time" {...field} />
                <InputGroupAddon>
                  <Clock2Icon className="text-muted-foreground" />
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      </div>
      {
        carShop.shop.offersDelivery &&
        <FieldGroup>
          <Controller
            name='deliveryType'
            control={scheduleForm.control}
            render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-delivery">
                  Delivery Option
                </FieldLabel>
                <RadioGroup
                  value={field.value}
                  onValueChange={function(value) {
                    setDraft(prev => ({
                      ...prev,
                      deliveryType: value,
                    }));
                    return field.onChange(value);
                  }}
                  // onValueChange={field.onChange}
                  className="flex gap-4"
                  id='form-delivery'
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup">
                      Pickup
                    </Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery">
                      Delivery
                    </Label>
                  </div>

                </RadioGroup>

              </Field>
            )}
          />
        </FieldGroup>
      }
      {
        deliveryType === "delivery" && (
          <FieldGroup>
            <Controller
              name='deliveryAddress'
              control={scheduleForm.control}
              render={({field, fieldState}) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-address">
                    Delivery Address
                  </FieldLabel>
                  <Textarea
                    {...field}
                    placeholder="Enter delivery address"
                    id="form-address"
                  />
                </Field>
              )}
            />
          </FieldGroup>
        )
      }
      <FieldGroup>
        <Controller
          name='note'
          control={scheduleForm.control}
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-note">
                Special Request (Optional)
              </FieldLabel>
              <Textarea
                {...field}
                placeholder=" Child seat,
                      airport pickup,
                  late pickup etc."
                id="form-note"
              />
            </Field>
          )}
        />
      </FieldGroup>
      <div className="w-full flex justify-end">
        <Button
          onClick={handleStepOneNext}
          className="bg-k-primary text-white hover:bg-k-primary/90 hover:text-white cursor-pointer"
        >
          Continue
        </Button>

      </div>
    </form>
  </div>;
};