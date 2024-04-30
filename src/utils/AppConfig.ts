import type { LocalePrefix } from 'next-intl/dist/types/src/shared/types';

const localePrefix: LocalePrefix = 'as-needed';

export const AppConfig = {
  name: 'Hack the Lab 2024',
  locales: ['en'],
  defaultLocale: 'en',
  localePrefix,
};
