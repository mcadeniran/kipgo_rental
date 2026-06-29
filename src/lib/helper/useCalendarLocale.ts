import { enUS, tr, ru } from 'date-fns/locale';
import { useLocale } from 'next-intl';

export function useCalendarLocale() {
  const locale = useLocale();

  if (locale === 'tr') return tr;
  if (locale === 'ru') return ru;

  return enUS;
}
