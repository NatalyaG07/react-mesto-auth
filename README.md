# Проект: Место React с регистрацией и авторизацией

### Сохраните свои самые незабываемые воспоминания :smile::heavy_check_mark::sunglasses:
Ссылка на проект в gh-pages: **[Место React-auth (для получения доступа к основному контенту нужно будет зарегистрироваться)](https://natalyag07.github.io/react-mesto-auth/)**

## Описание проекта 
Сервис Mesto React-auth - проектная работа по профессии веб-разработчик в Я.Практикуме. Главная его задача - добавление новой функциональности в предыдущий проект **[Место React](https://natalyag07.github.io/mesto-react/)**. Теперь просмотр данных профиля и карточек с фотографиями доступен только после предварительной регистрации. 

## Технологиии, реализованные в проекте

* React
* Create React App
* React Router
* функциональные компоненты
* API

Cервис Mesto: SPA приложение, реализованное с помощью утилиты Create React App. Его основная логика опирается на функциональный подход, маршрутизация реализована при помощи библиотеки React Router. Приложение взаимодействует сразу с двумя API: авторизации и API редактирования пользователя и получения карточек. Реализована работа с локальным хранилищем и токеном, при повторном визите пользователи не должны вновь авторизовываться. Если при регистрации или авторизации произойдёт ошибка, пользователь будет уведомлём о возникшей ошибке с помощью всплывающего окна.

## Функционал приложения 

* регистрация
* осуществение входа и выхода из профиля пользователя
* аутентификация и авторизация уже зарегестрированного пользователя с помощью токена jwt
* редактирование данных пользователя (аватар, профиль)
* создание карточек
* удаление карточек (пользователь может удалять только свои карточки)
* постановка и удаление лайков (счетчик лайков)
* открытие картинки с карточки при клике 

## Начало работы с проектом:  
##### `npm start` – запускает приложение в режиме разработки на http://localhost:3000/
##### `npm run build` – запускает production сборку проекта
