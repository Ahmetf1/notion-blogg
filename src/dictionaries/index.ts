import { Dictionary } from '@/types/dictionary';
import { Language } from '@/config/languages';

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default as Dictionary),
  tr: () => import('./tr.json').then((module) => module.default as Dictionary),
};

export const getDictionary = async (locale: Language) => dictionaries[locale](); 