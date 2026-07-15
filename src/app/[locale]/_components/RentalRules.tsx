import React from 'react';
import {RentalShop} from '../models/RentalShop';
import {Item, ItemContent, ItemDescription, ItemMedia, ItemTitle} from '@/components/ui/item';
import {Icon} from '@iconify/react';
import {useTranslations} from 'next-intl';

export default function RentalRules({shop}: {shop: RentalShop;}) {
  const t = useTranslations('rentalRules');
  const rules = [
    {
      title: t('securityDeposit'),
      value: shop.rules.securityDeposit !== '' ? shop.rules.securityDeposit : t('notStated'),
      icon: "healthicons:ui-secure-outline"
    },
    {
      title: t('fuelPolicy'),
      value: shop.rules.fuelPolicy !== '' ? shop.rules.fuelPolicy : t('notStated'),
      icon: "arcticons:mileage"
    },
    {
      title: t('mileageLimit'),
      value: shop.rules.mileageLimit !== '' ? shop.rules.mileageLimit : t('notStated'),
      icon: "material-symbols-light:speed-outline-rounded"
    },
    {
      title: t('insurance'),
      value: shop.rules.insurance !== '' ? shop.rules.insurance : t('notStated'),
      icon: "material-symbols-light:shield-outline"
    },
    {
      title: t('lateReturn'),
      value: shop.rules.lateReturn !== '' ? shop.rules.lateReturn : t('notStated'),
      icon: "material-symbols-light:timer-outline-rounded"
    },
    {
      title: t('cancellation'),
      value: shop.rules.cancellation !== '' ? shop.rules.cancellation : t('notStated'),
      icon: "material-symbols-light:cancel-outline-rounded"
    },
  ];

  return (
    <div className="w-full rounded-lg border gap-4 p-4">
      <p className="mb-4">{t('rentalRules')}</p>
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
