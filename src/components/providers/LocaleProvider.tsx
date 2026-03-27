"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { Locale, Translations } from "@/lib/i18n";
import { getT } from "@/lib/i18n";

interface LocaleContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  t: getT("en"),
  setLocale: () => {},
});

export function useLocale() {
  return useContext(LocaleContext);
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Read saved locale from cookie on mount
  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)locale=(en|fr)/);
    if (match) setLocaleState(match[1] as Locale);
  }, []);

  function setLocale(l: Locale) {
    document.cookie = `locale=${l}; path=/; max-age=31536000; SameSite=Lax`;
    setLocaleState(l);
  }

  return (
    <LocaleContext.Provider value={{ locale, t: getT(locale), setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}
