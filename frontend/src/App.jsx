import { useEffect } from "react";
import AllRoutes from "./allRoutes/AllRoutes";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return <AllRoutes />;
}

export default App;
