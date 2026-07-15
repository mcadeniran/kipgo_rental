
import {BlogCategory} from '@/app/[locale]/models/Blog';
import {useTranslations} from 'next-intl';

export default function TranslatedBlogCategories({
  category
}: {
  category: BlogCategory;
}) {
  const c = useTranslations('blogCategories');

  const label: Record<BlogCategory, string> = {
    all: c('all'),
    general: c('general'),
    hotel: c('hotel'),
    rental: c('rental'),
    taxi: c('taxi'),
  };


  return (
    label[category]
  );
}
