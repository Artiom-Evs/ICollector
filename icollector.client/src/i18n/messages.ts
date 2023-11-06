import { LOCALES } from "./locales";

export const messages: Record<string, Record<string, string>> = {
    [LOCALES.ENGLISH]: {
        home_page: "Home",

        choose_language: "Choose language",
        choose_theme: "Choose theme",
        light_theme: "Light",
        dark_theme: "Dark",

        register: "Register",
        login: "Login",
        logout: "Logout",
        helloUser: "Hello, {n}!",
        registrationHeader: "Registration",
        loginHeader: "Login",
        email: "Email",
        password: "Password",
        confirmPassword: "Confirm password",
        invalidLoginOrPassword: "Invalid email or password.",
        userLockedOut: "User is blocked.",

        passwordsAreDifferent: "Passwords are different.",
        duplicateUserName: "User with this email already exists.",
        invalidEmail: "Email has uncorrect format.",
        passwordTooShort: "Password must be at least 6 characters.",
        passwordRequiresNonAlphanumeric: "Password must have at least one non alphanumeric character.",
        passwordRequiresDigit: "Password must have at least one digit ",
        passwordRequiresLower: "Password must have at least one lowercase character.",
        passwordRequiresUpper: "Password must have at least one uppercase character.",
        
        weather_forecast: "Weather forecast",
        wf_description: "This component demonstrates fetching data from the server."
    }, 
    [LOCALES.POLISH]: {
        home_page: "Główna",

        choose_language: "Wybierz język",
        choose_theme: "Wybierz motyw",
        light_theme: "Jasny",
        dark_theme: "Ciemny",

        register: "Zarejestruj się",
        login: "Zaloguj się",
        logout: "Wyloguj się",
        helloUser: "Cześć, {n}!",
        registrationHeader: "Rejestracja",
        loginHeader: "Logowanie",
        email: "Email",
        password: "Hasło",
        confirmPassword: "Powtórz hasłoпароль",
        invalidLoginOrPassword: "Niepoprawny email lub hasło.",
        userLockedOut: "Użytkownik jest zablokowany.",

        passwordsAreDifferent: "Hasła są różne.",
        duplicateUserName: "Użytkownik z takim loginem już istnieje.",
        invalidEmail: "Niepoprawny format emailu.",
        passwordTooShort: "Hasło musi mieć co najmniej 6 znaków.",
        passwordRequiresNonAlphanumeric: "Hasło musi mieć co najmniej jeden znak specjalny.",
        passwordRequiresDigit: "Hasło musi mieć co najmniej jedną cyfrę.",
        passwordRequiresLower: "Hasło musi mieć co najmniej jedną małą literę.",
        passwordRequiresUpper: "Hasło musi mieć co najmniej jedną dużą literę.",

        weather_forecast: "Prognoza pogody",
        wf_description: "Ten komponent demonstruje pobieranie danych z servera."
    },
    [LOCALES.RUSSIAN]: {
        home_page: "Главная",

        choose_language: "Выберите язык",
        choose_theme: "Выберите тему",
        light_theme: "Светлая",
        dark_theme: "Тёмная",

        register: "Зарегистрироваться",
        login: "Войти",
        logout: "Выйти",
        helloUser: "Привет, {n}!",
        registrationHeader: "Регистрация",
        loginHeader: "Вход",
        email: "Email",
        password: "Пароль",
        confirmPassword: "Повторите пароль",
        invalidLoginOrPassword: "Неверный логин или пароль.",
        userLockedOut: "Пользователь заблокирован.",

        passwordsAreDifferent: "Пароли различаются.",
        duplicateUserName: "Пользователь с данным email уже существует.",
        invalidEmail: "Неверный формат email.",
        passwordTooShort: "Пароль не может быть короче 6 символов.",
        passwordRequiresNonAlphanumeric: "Пароль должен иметь как минимум один специальный символ.",
        passwordRequiresDigit: "Пароль должен иметь как минимум одну цифру.",
        passwordRequiresLower: "Пароль должен иметь как минимум одну строчную букву.",
        passwordRequiresUpper: "Пароль должен иметь как минимум одну заглавную букву.",
        
        weather_forecast: "Прогноз погоды",
        wf_description: "Этот компонент демонстрирует получение данных с сервера."
    }
}