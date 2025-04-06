import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome to our app!",
      change_language: "Change Language",
    },
  },
  fr: {
    translation: {
      welcome: "Bienvenue sur notre application!",
      change_language: "Changer de langue",
    },
  },
  ar: {
    translation: {
      welcome: "مرحبا بك في تطبيقنا!",
      change_language: "تغيير اللغة",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
