"use client";
import { createContext, useContext, useState } from "react";

import en_US from "../i18n/en_US.json";
import es_NI from "../i18n/es_NI.json";

const translations = { en_US, es_NI };
const LocaleContext = createContext();

export function LocaleProvider({ children }) {
    const [locale, setLocale] = useState("en_US");

    const t = (key) => translations[locale][key] || key;

    return (
        <LocaleContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LocaleContext.Provider>
    );
}

export const useLocale = () => useContext(LocaleContext);