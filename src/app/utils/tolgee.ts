import { Tolgee, DevTools, FormatSimple } from '@tolgee/react';

export function initTolgee() {
  const tolgee = Tolgee()
    .use(DevTools())
    .use(FormatSimple())
    .init({
      language: 'en',
      apiUrl: __TOLGEE_URL__,
      apiKey: __TOLGEE_API_KEY__,
      staticData: {
        en: () => import('src/i18n/en.json'),
        'ru-RU': () => import('src/i18n/ru-RU.json'),
        'lv-LV': () => import('src/i18n/lv-LV.json'),
        'de-DE': () => import('src/i18n/de-DE.json'),
      },
    });
  tolgee.run();
  return tolgee;
}
