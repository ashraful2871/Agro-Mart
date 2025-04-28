import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import english from "../locales/English/translation.json"
import bangla from "../locales/Bangla/translation.json"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      english: { translation: english },
      bangla: { translation: bangla }
    },
    fallbackLng: 'bangla',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
