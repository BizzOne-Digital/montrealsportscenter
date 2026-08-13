import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import fr from './fr.json';

const STORAGE_KEY = 'msc_lang';

let savedLang = 'en';
try {
  savedLang = localStorage.getItem(STORAGE_KEY) || 'en';
} catch {
  savedLang = 'en';
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // ignore storage errors (e.g. private browsing)
  }
});

export default i18n;
