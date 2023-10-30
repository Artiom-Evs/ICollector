import { LOCALES } from "../i18n/locales"

export interface LocaleContextType {
    locale: LOCALES,
    setLocale: (locale: LOCALES) => void
}
