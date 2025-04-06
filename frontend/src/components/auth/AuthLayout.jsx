import React from "react";
import { useTranslation } from "react-i18next";

const AuthLayout = ({ children }) => {
  const { t } = useTranslation();

  return (
    <section
      className="flex min-h-screen w-full"
      dir={t("dir", { defaultValue: "ltr" })}
    >
      <div className="relative hidden w-3/5 items-center justify-center bg-gradient-to-br from-sky-200 via-blue-100 to-sky-300 md:flex">
        <div className="max-w-lg p-10">
          <img
            src="/Blog post-rafiki.png"
            alt={t("illustration_alt")}
            className="w-full object-contain"
          />
        </div>
        <div className="absolute bottom-10 left-10 text-2xl font-extrabold tracking-wider text-blue-700 opacity-30 select-none">
          {t("slogan")}
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white px-6 py-12 md:w-2/5">
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
