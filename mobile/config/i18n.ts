import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "../assets/i18n/en/en.json";
import translationFR from "../assets/i18n/fr/fr.json";

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

export const initializeI18n = async (): Promise<void> => {
  await i18n.use(initReactI18next).init({
    lng: "en",
    debug: __DEV__,
    resources,
  });
};
