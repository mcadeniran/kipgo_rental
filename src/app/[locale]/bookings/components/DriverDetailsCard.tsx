import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Booking} from "../../models/Booking";
import {Item, ItemContent, ItemDescription, ItemTitle} from "@/components/ui/item";

export function DriverDetailsCard({
  booking,
}: {
  booking: Booking;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Driver Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <Info
          label="Name"
          value={booking.driver.name}
        />

        <Info
          label="Email"
          value={booking.driver.email}
        />

        <Info
          label="Phone"
          value={booking.driver.phone}
        />

        <Info
          label="Gender"
          value={booking.driver.gender}
        />

        <Info
          label="Date of Birth"
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