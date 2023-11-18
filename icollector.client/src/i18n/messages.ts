import { LOCALES } from "./locales";

export const messages: Record<string, Record<string, string>> = {
    [LOCALES.ENGLISH]: {
        home_page: "Home",
        collections_page: "Collections",

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
        
        largest_collections: "Largest collections",
        lastAddedItems: "Last added items",

        "created_with_date": "Created: { d, date }",
        "edited_with_date": "Edited: { d, date }",
        "author_with_name": "Author: { n }",
        "likes_with_number": "{ n, number } likes",
        "comments_with_number": "{ n, number } comments",
        "items_with_number": "{ n, number } items",
        "collection_with_name": "Collection: { n }",

        "identifier": "ID",
        "name": "Name",
        "description": "Description",
        "author": "Author",
        "save": "Save",
        "create": "Create",
        "edit": "Edit",
        "delete": "Delete",
        "cancel": "Cancel",
        "back": "Back",
        "loading": "Loading...",

        "create_new_collection": "Create new collection",
        "edit_collection": "Edit collection",
        "delete_collection": "Delete collection",
        "collection_name": "Collection name",
        "collection_description": "Collection description",

        "no_collections": "No collections.",
        "no_collection": "Collection not found.",
        "items_count": "Items count",
        "warning_before_collection_deletion": "Are you sure you want to delete this collection?"
    }, 
    [LOCALES.POLISH]: {
        home_page: "Główna",
        collections_page: "Kolekcje",

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

        largest_collections: "Największe kolekcje",
        lastAddedItems: "Ostatnio dodane itemy",

        "created_with_date": "Utworzone: { d, date }",
        "edited_with_date": "Zmienione: { d, date }",
        "author_with_name": "Autor: { n }",
        "likes_with_number": "{ n, number } polubień",
        "comments_with_number": "{ n, number } komentarzy",
        "items_with_number": "{ n, number } elementów",
        "collection_with_name": "Kolekcja: { n }",

        "identifier": "ID",
        "name": "Nazwa",
        "description": "Opis",
        "author": "Autor",
        "save": "Zapisz",
        "create": "Utwórż",
        "edit": "Edytuj",
        "delete": "Usuń",
        "cancel": "Anuluj",
        "back": "Wrócić się",
        "loading": "Ładowanie...",

        "create_new_collection": "Utwórz nową kolekcję",
        "edit_collection": "Edytuj kolekcję",
        "delete_collection": "Usuń kolekcję",
        "collection_name": "Nazwa kolekcji",
        "collection_description": "Opis collekcji",

        "no_collections": "Brak kolekcji.",
        "no_collection": "Brak kolekcii.",
        "items_count": "Ilość itemów",
        "warning_before_collection_deletion": "Czy na pewno chcesz usunąć tę kolekcję?"
    },
    [LOCALES.RUSSIAN]: {
        home_page: "Главная",
        collections_page: "Коллекции",

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
        
        largest_collections: "Самые большие коллекции",
        lastAddedItems: "Последние добавленные итемы",

        "created_with_date": "Создано: { d, date }",
        "edited_with_date": "Изменено: { d, date }",
        "author_with_name": "Автор: { n }",
        "likes_with_number": "{ n, number } лайков",
        "comments_with_number": "{ n, number } комментариев",
        "items_with_number": "{ n, number } элементов",
        "collection_with_name": "Коллекция: { n }",

        "identifier": "ID",
        "name": "Название",
        "description": "Описание",
        "author": "Автор",
        "save": "Сохранить",
        "create": "Создать",
        "edit": "Редактировать",
        "delete": "Удалить",
        "loading": "Загрузка...",

        "create_new_collection": "Создать новую коллекцию",
        "edit_collection": "Изменить коллекцию",
        "delete_collection": "Удалить коллекцию",
        "cancel": "Отмена",
        "back": "Вернуться",
        "collection_name": "Название коллекции",
        "collection_description": "Описание коллекции",

        "no_collections": "Коллекции отсутствуют.",
        "no_collection": "Коллекция отсутствует.",
        "items_count": "Количество элементов",
        "warning_before_collection_deletion": "Вы уверены, что хотите удалить эту коллекцию?"
    }
}