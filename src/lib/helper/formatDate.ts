import { parseISO } from 'date-fns';
import { useLocale } from 'next-intl';

export const useDateTimeFormatter = () => {
  const locale = useLocale(); // dynamically gets the current locale, e.g., 'tr', 'en', 'ru'

  const formatDate = (dateString: string) => {
    const date = parseISO(dateString);
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const formatDateShortMonth = (dateString: string) => {
    const date = parseISO(dateString);
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const formatTime = (dateString: string) => {
    const date = parseISO(dateString);
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // or false for 24h format
    }).format(date);
  };

  const formatCurrency = (value: number, currencyCode = 'TRY') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol',
      trailingZeroDisplay: 'stripIfInteger',
    }).format(value);
  };

  const formatShortDate = (dateString: string) => {
    const date = parseISO(dateString);

    return new Intl.DateTimeFormat(locale, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const formatShortDayWeekMonth = (dateString: string) => {
    const date = parseISO(dateString);

    return new Intl.DateTimeFormat(locale, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const formatShortDayMonth = (dateString: string) => {
    const date = parseISO(dateString);

    return new Intl.DateTimeFormat(locale, {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return {
    formatDate,
    formatTime,
    formatCurrency,
    formatShortDate,
    formatShortDayMonth,
    formatDateShortMonth,
    formatShortDayWeekMonth,
  };
};
