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
        "add": "Add",
        "create": "Create",
        "edit": "Edit",
        "delete": "Delete",
        "save": "Save",
        "cancel": "Cancel",
        "back": "Back",
        "loading": "Loading...",

        "create_new_collection": "Create new collection",
        "edit_collection": "Edit collection",
        "delete_collection": "Delete collection",
        "collection": "Collection",
        "collection_name": "Collection name",
        "collection_description": "Collection description",
        "no_collections": "No collections.",
        "no_collection": "Collection not found.",
        "items_count": "Items count",
        "warning_before_collection_deletion": "Are you sure you want to delete this collection?",

        "add_new_item": "Add new item",
        "edit_item": "Edit item",
        "delete_item": "Delete item",
        "item_name": "Item name",
        "warning_before_item_deletion": "Are you sure you want to delete this item?",

        "user_management": "User management",
        "state": "State",
        "block": "Block",
        "unblock": "Unblock",
        "blocked_untill_with_date": "Blocked untill { d, date }",
        "active": "Active",

        "collections_count": "Collections count",
        "collections": "Collections",
        "total_items_count": "Total items count",
        "status": "Status",
        "admin": "Admin",
        "user": "User",

        "give_admin_rigths": "Give admin rigths",
        "remove_admin_rigths": "Remove admin rigths",


        "field_name": "Field name",
        "numeric_field_1": "Numeric field 1",
        "numeric_field_2": "Numeric field 2",
        "numeric_field_3": "Numeric field 3",
        "numeric_value": "Numeric value",
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
        "add": "Добавить",
        "create": "Utwórż",
        "edit": "Edytuj",
        "delete": "Usuń",
        "save": "Zapisz",
        "cancel": "Anuluj",
        "back": "Wrócić się",
        "loading": "Ładowanie...",

        "create_new_collection": "Utwórz nową kolekcję",
        "edit_collection": "Edytuj kolekcję",
        "delete_collection": "Usuń kolekcję",
        "collection": "Kolekcja",
        "collection_name": "Nazwa kolekcji",
        "collection_description": "Opis collekcji",
        "no_collections": "Brak kolekcji.",
        "no_collection": "Brak kolekcii.",
        "items_count": "Ilość itemów",
        "warning_before_collection_deletion": "Czy na pewno chcesz usunąć tę kolekcję?",

        "add_new_item": "Dodaj nowy item",
        "edit_item": "Edytuj item",
        "delete_item": "Usuń item",
        "item_name": "Nazwa itemu",
        "warning_before_item_deletion": "Czy na pewno chcesz usunąć ten item?",

        "user_management": "Zarządzanie użytkownikami",
        "state": "Stan",
        "block": "Zablokuj",
        "unblock": "Razblokuj",
        "blocked_untill_with_date": "Zablokowany do { d, date }",
        "active": "Aktywny",

        "collections_count": "Liczba kolekcji",
        "collections": "Kolekcje",
        "total_items_count": "Łączna liczba elementów",
        "status": "Status",
        "admin": "Administrator",
        "user": "Użytkownik",

        "give_admin_rigths": "Nadaj uprawnienia administratora",
        "remove_admin_rigths": "Zabierz uprawnienia administratora",

        "field_name": "Nazwa pola",
        "numeric_field_1": "Numeryczne pole 1",
        "numeric_field_2": "Numeryczne pole 2",
        "numeric_field_3": "Numeryczne pole 3",
        "numeric_value": "Wartość numeryczna",
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
        "add": "Добавить",
        "create": "Создать",
        "edit": "Изменить",
        "delete": "Удалить",
        "save": "Сохранить",
        "cancel": "Отмена",
        "back": "Вернуться",
        "loading": "Загрузка...",

        "create_new_collection": "Создать новую коллекцию",
        "edit_collection": "Изменить коллекцию",
        "delete_collection": "Удалить коллекцию",
        "collection": "Коллекция",
        "collection_name": "Название коллекции",
        "collection_description": "Описание коллекции",
        "no_collections": "Коллекции отсутствуют.",
        "no_collection": "Коллекция отсутствует.",
        "items_count": "Количество итемов",
        "warning_before_collection_deletion": "Вы уверены, что хотите удалить эту коллекцию?",

        "add_new_item": "Добавить новый итем",
        "edit_item": "Изменить итем",
        "delete_item": "Удалить итем",
        "item_name": "Название итема",
        "warning_before_item_deletion": "Вы уверены, что хотите удалить этот итем?",

        "user_management": "Управление пользователями",
        "state": "Состояние",
        "block": "Заблокировать",
        "unblock": "Разблокировать",
        "blocked_untill_with_date": "Заблокирован до { d, date }",
        "active": "Активен",

        "collections_count": "Количество коллекций",
        "collections": "Коллекции",
        "total_items_count": "Общее количество итемов",
        "status": "Статус",
        "admin": "Администратор",
        "user": "Пользователь",

        "give_admin_rigths": "Дать права администратора",
        "remove_admin_rigths": "Забрать права администратора",

        "field_name": "Название поля",
        "numeric_field_1": "Числовое поле 1",
        "numeric_field_2": "Числовое поле 2",
        "numeric_field_3": "Числовое поле 3",
        "numeric_value": "Числовое значение",
    }
}