"use client";

import {RatingFormValues} from "@/schemas";
import {
  Controller,
  Control,
  FieldPathByValue
} from "react-hook-form";
import RatingGroup from "../shared/RatingGroup";
import {VEHICLE_RATING_ITEMS} from "@/constants/rating";
import RatingRow from "../shared/RatingRow";
import {Field, FieldError} from "@/components/ui/field";



interface Props {
  control: Control<RatingFormValues>;
}

export default function VehicleRatingSection({
  control,
}: Props) {
  return (
    <RatingGroup
      title="Vehicle Rating"
      description="Tell us about your experience with the vehicle."
    >
      {VEHICLE_RATING_ITEMS.map((item) => (
        <Controller
          key={item.name}
          control={control}
          name={
            `vehicle.${item.name}` as FieldPathByValue<
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