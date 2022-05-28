import { initReactI18next } from 'react-i18next';
import transactionRu from './locales/ru.json';
import transactionEn from './locales/en.json';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: transactionEn,
  },
  ru: {
    translation: transactionRu,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'ru',
    whitelist: resources,
    detection: {
      order: ['localStorage', 'cookie', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      lookupSessionStorage: 'i18nextLng',
    },
  });
export default i18n;
