import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Booking} from "../../models/Booking";
import {Item, ItemContent, ItemDescription, ItemTitle} from "@/components/ui/item";
import {useTranslations} from "next-intl";
import {GenderType} from "@/lib/translations/translatedGender";

export function DriverDetailsCard({
  booking,
}: {
  booking: Booking;
}) {
  const t = useTranslations('bookings');
  const c = useTranslations('cars');

  const label: Record<GenderType, string> = {
    Male: c('male'),
    Female: c('female'),
    Others: c('others'),
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t('driverInformation')}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <Info
          label={t('name')}
          value={booking.driver.name}
        />

        <Info
          label={t('email')}
          value={booking.driver.email}
        />

        <Info
          label={t('phone')}
          value={booking.driver.phone}
        />

        <Info
          label={t('gender')}
          value={label[booking.driver.gender as GenderType]}
        />

        <Info
          label={t('dateOfBirth')}
          value={booking.driver.dob}
        />

      </CardContent>
    </Card>
  );
}

function Info({label, value}: {label: string; value: string;}) {
  return <Item variant="outline">
    <ItemContent>
      <ItemTitle>{label}</ItemTitle>
      <ItemDescription>
        {value}
      </ItemDescription>
    </ItemContent>
  </Item>;
}