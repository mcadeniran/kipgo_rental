import React from 'react';
import {RentalShop} from '../models/RentalShop';
import {Item, ItemContent, ItemDescription, ItemMedia, ItemTitle} from '@/components/ui/item';
import {Icon} from '@iconify/react';

export default function RentalRules({shop}: {shop: RentalShop;}) {

  const rules = [
    {
      title: "Security Deposit",
      value: shop.rules.securityDeposit !== '' ? shop.rules.securityDeposit : 'Not Stated',
      icon: "healthicons:ui-secure-outline"
    },
    {
      title: "Fuel Policy",
      value: shop.rules.fuelPolicy !== '' ? shop.rules.fuelPolicy : 'Not Stated',
      icon: "arcticons:mileage"
    },
    {
      title: "Mileage Limit",
      value: shop.rules.mileageLimit !== '' ? shop.rules.mileageLimit : 'Not Stated',
      icon: "material-symbols-light:speed-outline-rounded"
    },
    {
      title: "Insurance",
      value: shop.rules.insurance !== '' ? shop.rules.insurance : 'Not Stated',
      icon: "material-symbols-light:shield-outline"
    },
    {
      title: "Late Return",
      value: shop.rules.lateReturn !== '' ? shop.rules.lateReturn : 'Not Stated',
      icon: "material-symbols-light:timer-outline-rounded"
    },
    {
      title: "Cancellation",
      value: shop.rules.cancellation !== '' ? shop.rules.cancellation : 'Not Stated',
      icon: "material-symbols-light:cancel-outline-rounded"
    },
  ];

  return (
    <div className="w-full rounded-lg border gap-4 p-4">
      <p className="mb-4">Rental Rules</p>
      <div className="grid md:grid-cols-2 gap-4">
        {
          rules.map(rule =>
            <Item variant="outline" key={rule.title}>
              <ItemMedia variant="icon">
                <Icon
                  icon={rule.icon}
                  className="text-k-primary"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{rule.title}</ItemTitle>
                <ItemDescription>
                  {rule.value}
                </ItemDescription>
              </ItemContent>
            </Item>
          )
        }
      </div>
    </div>
  );
}
