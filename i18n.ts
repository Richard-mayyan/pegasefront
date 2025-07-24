"use client";
// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import frjson from "@/langs/fr.json";
// import enJson from "@/langs/en.json";

// i18n.use(initReactI18next).init({
//   resources: {
//     en: {
//       translation: enJson,
//     },
//     fr: {
//       translation: frjson,
//     },
//   },
//   lng: "fr", // default language
//   fallbackLng: "fr", // fallback language
//   interpolation: {
//     escapeValue: false, // react already safes from xss
//   },
// });

// // const trad = i18n;
// export default i18n;

import cookie from "js-cookie";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import frjson from "@/langs/fr.json";
import enJson from "@/langs/en.json";

// cookie.set("oauthToken", data.oauthToken, { expires: 1 });

// cookie.cookie(TOKEN)
// const storedLanguage = localStorage.getItem("language"); // Récupérer la langue stockée dans localStorage
const storedLanguage = cookie.get("language"); // Récupérer la langue stockée dans localStorage

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enJson,
    },
    fr: {
      translation: frjson,
    },
  },
  lng: storedLanguage || "fr", // Utiliser la langue stockée ou "fr" par défaut
  fallbackLng: "fr", // fallback language
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

// Écouter les changements de langue et les stocker dans localStorage
i18n.on("languageChanged", (lng) => {
  cookie.set("language", lng); // Stocker la langue dans localStorage
});

export default i18n;
