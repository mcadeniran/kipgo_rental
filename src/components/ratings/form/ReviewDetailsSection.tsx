"use client";

import {Control, Controller, useWatch} from "react-hook-form";
import {Card, CardContent, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
import {Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet, } from "@/components/ui/field";
import {InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea, } from "@/components/ui/input-group";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {RadioGroup, RadioGroupItem, } from "@/components/ui/radio-group";
import {RatingFormValues} from "@/schemas";
import {MAX_REVIEW_LENGTH} from "@/constants/rating";


interface Props {
  control: Control<RatingFormValues>;
}

export default function ReviewDetailsSection({
  control,
}: Props) {
  const review =
    useWatch({
      control,
      name: "details.review",
    }) ?? "";

  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Review Details
        </CardTitle>

        <CardDescription>
          Tell future renters about your experience.
        </CardDescription>

      </CardHeader>

      <CardContent className="space-y-8">

        <FieldGroup>
          {/* Title */}
          <Controller
            control={control}
            name="details.title"
            render={({
              field,
              fieldState,
            }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-title">
                  Title
                </FieldLabel>
                <Input
                  {...field}
                  id="form-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Excellent experience"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Review */}
          <Controller
            control={control}
            name="details.review"
            render={({
              field,
              fieldState,
            }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-review">
                  Review
                </FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id="form-review"
                    placeholder="Share your experience..."
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {review.length}/{MAX_REVIEW_LENGTH}
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <FieldDescription>
                  Include steps to reproduce, expected behavior, and what
                  actually happened.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />


        </FieldGroup>


        {/* Recommendation */}

        <Controller
          control={control}
          name="details.wouldRecommend"
          render={({field}) => (
            <FieldSet>
              <FieldLegend variant="label">Would you recommend this rental?</FieldLegend>
              <RadioGroup
                value={field.value ? "yes" : "no"}
                onValueChange={(value) => field.onChange(value === "yes",)}
                className="flex gap-6"
              >
                <Field orientation="horizontal">
                  <RadioGroupItem value="yes" id="recommend-yes" />
                  <FieldLabel htmlFor="recommend-yes" className="font-normal">
                    Yes
                  </FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <RadioGroupItem value="no" id="recommend-no" />
                  <FieldLabel htmlFor="recommend-no" className="font-normal">
                    No
                  </FieldLabel>
                </Field>
              </RadioGroup>
            </FieldSet>
          )}
        />

        {/* Rent Again */}

        <Controller
          control={control}
          name="details.wouldRentAgain"
          render={({field}) => (
            <Field orientation="horizontal">
              <Checkbox
                checked={field.value}
                id={'form-checkbox'}
                onCheckedChange={
                  field.onChange
                }
              />
              <FieldLabel
                htmlFor={'form-checkbox'}
                className="font-normal"
              >
                I would rent from this company again.
              </FieldLabel>
            </Field>
          )}
        />

        {/* Anonymous */}

        <Controller
          control={control}
          name="details.isAnonymous"
          render={({field}) => (
            <Field orientation="horizontal">
              <Checkbox
                checked={field.value}
                id={'form-anon'}
                onCheckedChange={
                  field.onChange
                }
              />
              <FieldLabel
                htmlFor={'form-anon'}
                className="font-normal"
              >
                Submit anonymously
              </FieldLabel>
            </Field>
          )}
        />
      </CardContent>

    </Card>
  );
}