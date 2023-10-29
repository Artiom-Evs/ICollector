import { LOCALES } from "./locales";

export const messages: Record<string, Record<string, string>> = {
    [LOCALES.ENGLISH]: {
        home_page: "Home",
        choose_language: "Choose language",
        choose_theme: "Choose theme",
        light_theme: "Light",
        dark_theme: "Dark",
        weather_forecast: "Weather forecast",
        wf_description: "This component demonstrates fetching data from the server."
    }, 
    [LOCALES.POLISH]: {
        home_page: "Główna",
        choose_language: "Wybierz język",
        choose_theme: "Wybierz motyw",
        light_theme: "Jasny",
        dark_theme: "Ciemny",
        weather_forecast: "Prognoza pogody",
        wf_description: "Ten komponent demonstruje pobieranie danych z servera."
    },
    [LOCALES.RUSSIAN]: {
        home_page: "Главная",
        choose_language: "Выберите язык",
        choose_theme: "Выберите тему",
        light_theme: "Светлая",
        dark_theme: "Тёмная",
        weather_forecast: "Прогноз погоды",
        wf_description: "Этот компонент демонстрирует получение данных с сервера."
    }
}