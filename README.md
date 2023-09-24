# react-mesto-api-full
Репозиторий для приложения проекта `Movies-explorer`, включающий фронтенд и бэкенд части приложения.

Адрес репозитория: https://github.com/danchikSlaziet/movies-explorer-app

### Технологии и функционал:
В проекте реализована авторизация/регистрация клиента (jwt-token в куках), cобственная API и mongoDB для полного функционала (поиск фильмов, фильтрация по короткометражкам, удаление/добавление фильмов в избранное, изменения профиля юзера и т.д.). Также когда-то был деплой на сервер на ос Ubuntu, настройка certbot, ngnix, создание домена. 

Полный стек технологий: HTML, CSS, ReactJS, NodeJS, Express.js, MongoDB.

### Как запустить проект:

##### Клонировать репозиторий:

```
git clone git@github.com:danchikSlaziet/movies-explorer-app.git
```

##### Настройка backend-части проекта.

В терминале перейти в директорию backend-приложения проекта.

```
cd ./movies-explorer-api/
```

проверить адрес фронта в app.js (для cors)

установить зависимости

```
npm install
```

запустить backend командой npm run dev или npm run start (в первом случае запуск nodemon)

```
npm run dev
```

##### Настройка frontend-части проекта.

В терминале перейти в директорию frontend-приложения проекта.

```
cd ./movies-explorer-frontend/
```

проверить адрес бэкенда в utils/MainApi.js

установить зависимости

```
npm install
```

запустить frontend командой:

```
npm run start
```
