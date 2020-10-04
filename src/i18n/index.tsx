import i18next from "i18next";
import translationPt from "./locales/pt/translation.json";

/**
 * Documentação
 * https://react.i18next.com/
 */
i18next.init({
  resources: {
    pt: {
      traducao: translationPt,
    },
  },
  fallbackLng: "pt",
  ns: ["traducao"],
  defaultNS: "traducao",
  debug: false,

  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
  },

  react: {
    wait: true,
    useSuspense: false,
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ["br", "strong", "i"],
  },
});

export default i18next;
