Домашнее задание 7

Методы:
Получение всех тикетов:
GET ?method=allTickets

Получение одного тикета:
GET ?method=ticketById&id=${id}

Создание тикета:
POST ?method=createTicket

Изменение тикета:
PATCH ?method=changeTicket&id=${id}

Удаление тикета:
DELETE ?method=deleteTicket&id=${id}