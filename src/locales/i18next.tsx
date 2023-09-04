/* eslint-disable no-void */
/* eslint-disable functional/no-expression-statements */
/* eslint-disable import/no-extraneous-dependencies */
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resources from './resources';

void i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    debug: true,
  });

export default i18next;
