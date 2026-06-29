'use client';

import {usePathname, useRouter} from '@/i18n/navigation';
import {useLocale} from 'next-intl';

import en from '../../public/english.png';
import tr from '../../public/turkish.png';
import ru from '../../public/russian.png';
import Image from "next/image";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from './ui/select';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, {locale: newLocale});
      router.refresh();
    }
  };

  return (
    <Select
      value={locale.toUpperCase()}
      onValueChange={e => switchLocale(e!)}>
      <SelectTrigger >
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent align='start'>
        <SelectGroup>
          <SelectItem value="en"><Image alt="en" src={en} width={20} height={20} sizes='100%' /> EN</SelectItem>
          <SelectItem value="tr"><Image alt="tr" src={tr} width={20} height={20} sizes='100%' />TR</SelectItem>
          <SelectItem value="ru"><Image alt="ru" src={ru} width={20} height={20} sizes='100%' />RU</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}