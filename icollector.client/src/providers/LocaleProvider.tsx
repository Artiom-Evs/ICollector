import { createContext, FunctionComponent, PropsWithChildren, useMemo, useState } from "react";
import { IntlProvider } from "react-intl";
import { messages } from "../i18n/messages";
import { LOCALES } from "../i18n/locales";
import { LocaleContextType } from "../@types/LocaleContextType";

function getStoredLocale(): LOCALES | null {
    const storedLocale = localStorage.getItem('locale');
    return storedLocale as LOCALES | null;
}

function setStoredLocale(locale: LOCALES) {
    localStorage.setItem("locale", locale);
}

export const LocaleContext = createContext<LocaleContextType | null>(null);

const defaultLocale: LOCALES = LOCALES.ENGLISH;

const LocaleProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const [locale, setLocale] = useState<LOCALES>(getStoredLocale() ?? defaultLocale);
    const contextValue = useMemo(() => ({ locale, setLocale } as LocaleContextType), [locale]);

    if (locale !== getStoredLocale()) {
        setStoredLocale(locale);
    }

    return (
        <IntlProvider messages={messages[locale]} locale={locale} defaultLocale={locale}>
            <LocaleContext.Provider value={contextValue}>
                {children}
            </LocaleContext.Provider>
        </IntlProvider>
    );
}

export default LocaleProvider;
