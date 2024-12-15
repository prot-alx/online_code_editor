node -v
v20.12.2

npm -v
10.7.0

---------

Предлагаю 2 варианта запуска приложения

---------

### Первый вариант
Локальный.

Установку и первый запуск можно выполнить командой

### npm run setup:dev

или

### npm run setup:prod

---------

Приложение запустится на 3000 порту.
### http://localhost:3000/

---------

Повторный запуск приложения выполняется командой
### npm run dev

или

### npm run prod

---------

### Второй вариант
Docker. 
Docker version 20.10.24, build 297e128
1. Запустить Docker.
2. Затем собрать контейнер командой. Потребуется 3-6 минут на установку и запуск.
В контейнере будут установлены python, go и дополнительные java, js, rust, c++ на случай расширения кода (см. далее)
### docker-compose up --build

---------

Приложение так же запустится на 3000 порту.
### http://localhost:3000/

---------

Если языки не установлены на сервере и устанавливать их не хочется, то можно просто запустить через Docker.


При необходимости добавить в компонент функционал редактора кода других языков:
1. Раскомментировать код в src\lib\types\editor-extensions.ts 
2. Раскомментировать код в src\lib\utils\supported-languages.ts

Можно изменить прокидывание пропсов напрямую с помощью любого state-менеджера, например, zustand или redux-toolkit.
Но в приложении такого масштаба это необязательно.