import { TranslationKey } from '@/types/i18n';

export type Translator = (key: TranslationKey) => string;

// helper so Zod stays clean
export const tKey = (t: Translator, key: TranslationKey) => t(key);
