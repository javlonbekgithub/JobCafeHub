import { specializationsListApi } from "../api";

export const wordsRu = {
    workerTabs: {
        primary: 'Однадневная',
        secondary: 'Специалисты',
        dailyWorker: 'Разнорабочий',
        master: 'Мастер'
    },
    workerTexts: {
        age: 'лет',
        searchResult: 'Ничего не найдено :('
    },
    buttonTitles: {
        next: 'Далее',
        ok: 'ок',
        more: 'Подробнее',
        call: 'Позвонить',
        save: 'Сохранить',
        edit: 'Редактировать'
    },
    drawerMenu: {
        enter: 'Войти как...',
        profileType: {
            primary: 'Работник',
            secondary: 'Работодатель'
        },
        balance: 'Баланс',
        blankIsChecking: 'Анкета рассматривается оператором',
        currency: 'сум',
        profile: 'Профиль',
        info: 'Информация',
        support: 'Служба поддержки',
        exit: 'Выйти',
        languages: {
            ru: 'Русский',
            uz: 'O’zbekcha'
        }
    },
    inputPlaceHolder: {
        numberPhone: 'Номер телефона',
        passwordOrID: 'Пароль или  ID',
        name: 'Имя',
        surname: 'Фамилия',
        patronymic: 'Отчество',
        passport: 'Паспорт',
        birthYear: 'Год рождения',
        confirm: 'Подтвердить',
        email: 'Email',
        password: 'Пароль',
        passwordConfirm: 'Подтвердите пароль',
        aboutMyself: 'О себе',
        search: 'Поиск'
    },
    auth: {
        title: 'Авторизация',
        request: 'Пожалуйста введите ваш логин и пароль',
        helperBar: {
            primary: 'Забыли пароль?',
            secondary: 'Регистрация'
        },
        fillFields: 'Заполните поля',
        buttonTitle: 'Вход'
    },
    registration: {
        title: 'Регистрация',
        secondaryText: {
            title: 'Добро пожаловать!',
            text: 'Пожалуйста, заполните поля ниже для регистрации в приложении.'
        },
        genderText: {
            man: 'Мужчина',
            woman: 'Женшина'
        },
        photoText: {
            primary: 'Ваше фото',
            secondary: 'Фото паспорта',
            gallery: 'Галерея',
            camera: 'Камера'
        },
        locationTitle: 'Местоположение',
        signUp: 'Регистрация прошла успешно',
        edited: 'Изменено'
    },
    formWarnings: {
        min: 'минимум',
        symb: 'символов',
        sum: 'суммов',
        minSymbQuant3: 'четырех',
        minSymbQuant33: '1000',
        minSymbQuant6: 'шесть',
        minSymbQuant12: 'двенадцать',
        passwordDontMatches: 'Пароли не совпадают',
        onlyLetters: 'только буквы',
        onlyNumbers: 'только числа',
        reLogin: 'Войдите в аккаунт заново'
    },
    blank: {
        title: 'Анкета рабочего',
        specialization: 'Специальность',
        rate: 'Рейтинг',
        contact: 'Связаться'
    },
    profile: {
        title: 'Профиль',
        balance: {
            title: 'Пополнение баланса',
            pay: 'Оплатить',
            summary: 'Введите сумму',
            text: 'Для того что бы активировать ваше геолакация для работадателья вам не обходимо пополнить баланс. За каждый день будет списан 500 сум средство от вашей баланса'
        },
        myData: {
            title: 'Мои данные',
            text: 'Ваше анкета заполнена не полностью пожалуйста заполните формы'
        },
        whoAmI: {
            worker: "Я работник",
            jobGiver: 'Я работодатель',
        }
        
    },
    loading: 'Загрузка',
    distance: {
        km: 'км',
        m: 'метр'
    },
    information: {
        Headertitle: 'Информация',
        title: 'Инструкция по использованию приложения :',
        steps: [
            {
                jobGiver: 'Скачайте последнюю версия приложения в Play Market',
                worker: 'Скачайте последнюю версия приложения в Play Market'
            },
            {
                jobGiver: 'Зарегистрируйтесь используя номер телефона',
                worker: 'Зарегистрируйтесь используя номер телефона'
            },
            {
                jobGiver: 'Найдите специалистов или разнорабочих которые вам подходят',
                worker: 'Введите все необходимые данные о себе и выберите специализацию'
            },
            {
                jobGiver: 'Свяжитесь с ними по телефону и договоритесь о работе',
                worker: 'Загрузите фотографию паспорта и отьмете свою локацию'
            },
            {
                jobGiver: 'Оцените работника звёздами или оставьте коментарий',
                worker: 'В скором времени оператор подтвердит реальность вашего аккаунта'
            },
            {
                jobGiver: 'Поделитесь приложением с друзьями и близкими',
                worker: 'Загрузите фотографии выволненных вами работ и напишите о себе'
            },
            {
                jobGiver: '',
                worker: 'Поделитесь приложением с друзьями и близкими'
            }
        ],
    }
}