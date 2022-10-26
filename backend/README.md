[![Tests for sprint 13](https://github.com/ladykot/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/ladykot/express-mesto-gha/actions/workflows/tests-13-sprint.yml) 

[![Tests for sprint 14](https://github.com/$ladykot/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/ladykot/express-mesto-gha/actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд

Серверная часть для проекта Mesto написана на Express.
В качестве базы данных выбрана MongoDB с маппером Mongoose.
При каждом запросе на сервер все ошибки обрабатываются.
Роуты /users и /cards защищены авторизацией.

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки  
`/models` — папка с файлами описания схем пользователя и карточки  
`/utils` - папка c константами для кодов ошибок

## Запуск проекта

`npm run start` — запускает сервер
`npm run dev` — запускает сервер с hot-reload
