import { useContext } from "react";
import { LOCALES } from "../i18n/locales";
import { LocaleContext } from "../providers/LocaleProvider";

const useLocale = (): [LOCALES, (locale: LOCALES) => void] => {
    const currentLocaleContext = useContext(LocaleContext);

    if (currentLocaleContext === null) {
        throw new Error("'useLocale' should be used within '<LocaleProvider>'.");
    }

    return [currentLocaleContext.locale, currentLocaleContext.setLocale];
}

export default useLocale;
