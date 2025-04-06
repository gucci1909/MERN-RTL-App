import React, { useCallback, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import InputField from "../common/InputField";
import { useNavigate } from "react-router";

const InitialState = {
  email: "",
  password: "",
  remember: false,
};

const AuthForm = ({ onSubmit, loading, setError, error, language }) => {
  const [form, setForm] = useState(InitialState);
  const [showPassword, setShowPassword] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [lang, setLang] = useState(language || "en");

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
      document.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, [lang, i18n]);

  const handleLanguageToggle = () => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  };

  const handleChange = (e) => {
    if (error) setError("");
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLang("en");
      i18n.changeLanguage("en");
      onSubmit(form);
    },
    [form, onSubmit],
  );

  const handleSignupClick = () => {
    setLang("en");
    i18n.changeLanguage("en");
    navigate("/signup");
  };

  return (
    <div className="rtl w-full max-w-md rounded-3xl border border-white/40 bg-white/60 px-8 py-12 text-gray-800 shadow-2xl backdrop-blur-lg">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-blue-700">{t("brand")}</h1>
        <p className="mt-1 text-sm text-gray-600">{t("subtitle")}</p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 px-4 py-2 text-center text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Language toggle */}
      <div className="mb-6 flex items-center justify-end gap-2">
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={lang === "ar"}
            onChange={handleLanguageToggle}
          />
          <div className="peer h-6 w-11 rounded-full bg-gray-300 transition-all peer-checked:bg-blue-600">
            <div
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 ${
                lang === "ar" ? "right-0.5" : "left-0.5"
              }`}
            ></div>
          </div>
        </label>
        <span className="text-sm font-medium text-gray-700">
          {lang === "ar" ? "العربية" : "English"}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <InputField
          id="email"
          label={t("email")}
          type="email"
          name="email"
          placeholder={t("email_placeholder")}
          value={form.email}
          onChange={handleChange}
          language={lang}
        />

        <div className="relative">
          <InputField
            id="password"
            label={t("password")}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder={t("password_placeholder")}
            value={form.password}
            onChange={handleChange}
            language={lang}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute top-3/4 -translate-y-1/2 text-sm text-blue-600 hover:underline ${
              lang === "ar" ? "start-3" : "end-3"
            }`}
          >
            {showPassword ? t("hide") : t("show")}
          </button>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
              className="me-2"
            />
            {t("remember_me")}
          </label>
          <a href="/login" className="text-sky-600 hover:underline">
            {t("forgot_password")}
          </a>
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-sky-500 py-2.5 font-semibold text-white transition hover:bg-sky-600"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="me-2 h-5 w-5 animate-spin text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              {t("signing_in")}
            </div>
          ) : (
            t("sign_in")
          )}
        </button>

        <p className="text-center text-sm text-gray-600">
          {t("new_here")}{" "}
          <span
            onClick={handleSignupClick}
            className="relative cursor-pointer font-bold text-sky-600 transition-all duration-300 ease-in-out before:absolute before:start-0 before:bottom-0 before:h-[2px] before:w-0 before:bg-sky-500 before:transition-all before:duration-300 hover:-translate-y-0.5 hover:text-sky-700 hover:before:w-full"
          >
            {t("sign_up")}
          </span>
        </p>
      </form>
    </div>
  );
};

export default React.memo(AuthForm);
