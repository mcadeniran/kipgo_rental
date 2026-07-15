import {useTranslations} from 'next-intl';

export type GenderType = 'Male' | 'Female' | 'Others';

export default function TranslatedGender(
  {
    gender
  }: {
    gender: GenderType;
  }
) {
  const c = useTranslations('cars');

  const label: Record<GenderType, string> = {
    Male: c('male'),
    Female: c('female'),
    Others: c('others'),
  };

  return (
    label[gender]
  );
}