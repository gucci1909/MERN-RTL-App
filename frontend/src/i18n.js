import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      illustration_alt: "Illustration",
      slogan: "Connect. Share. Repeat.",
      brand: "Connectify",
      subtitle: "Your social hub in the cloud ☁️",
      email: "Email",
      email_placeholder: "you@social.com",
      password: "Password",
      password_placeholder: "••••••••",
      show: "Show",
      hide: "Hide",
      remember_me: "Remember me",
      forgot_password: "Forgot password?",
      sign_in: "Sign In",
      signing_in: "Signing In...",
      new_here: "New here?",
      sign_up: "Sign up",
    },
  },
  ar: {
    translation: {
      illustration_alt: "رسم توضيحي",
      slogan: "تواصل. شارك. كرر.",
      brand: "كونيكتفاي",
      subtitle: "مركزك الاجتماعي في السحابة ☁️",
      email: "البريد الإلكتروني",
      email_placeholder: "you@social.com",
      password: "كلمة المرور",
      password_placeholder: "••••••••",
      show: "عرض",
      hide: "إخفاء",
      remember_me: "تذكرني",
      forgot_password: "نسيت كلمة المرور؟",
      sign_in: "تسجيل الدخول",
      signing_in: "جاري تسجيل الدخول...",
      new_here: "جديد هنا؟",
      sign_up: "سجّل الآن",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
