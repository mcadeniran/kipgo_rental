"use client";

import {RatingFormValues} from "@/schemas";
import {
  Controller,
  Control,
  FieldPathByValue
} from "react-hook-form";
import RatingGroup from "../shared/RatingGroup";
import {RENTAL_RATING_ITEMS} from "@/constants/rating";
import RatingRow from "../shared/RatingRow";
import {Field, FieldError} from "@/components/ui/field";
import {useTranslations} from "next-intl";
import {Translator} from "@/schemas/create-schema";


interface Props {
  control: Control<RatingFormValues>;
}

export default function RentalRatingSection({
  control,
}: Props) {
  const t = useTranslations('bookings');
  const m: Translator = useTranslations();

  return (
    <RatingGroup
      title={t('rentalCompanyRating')}
      description={t('tellUsAboutRental')}
    >
      {RENTAL_RATING_ITEMS(m).map((item) => (
        <Controller
          key={item.name}
          control={control}
          name={
            `rental.${item.name}` as FieldPathByValue<
              RatingFormValues,
              number
            >
          }
          render={({field, fieldState}) => (
            <Field data-invalid={fieldState.invalid}>
              <RatingRow
                required
                label={item.label}
                description={item.description}
                value={field.value}
                onChange={field.onChange}
              />

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />
      ))}
    </RatingGroup>
  );
}