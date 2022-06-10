const uuid = require('uuid');
const Ticket = require('./Ticket');
const TicketFull = require('./TicketFull');
const tickets = require('./tickets');

class Controller {
	constructor() { }

	getTime() {
		const date = new Date();
		const dateString = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
		const timeString = `${date.getHours()}:${date.getMinutes()}`;

		return `${dateString} ${timeString}`;
	}

	getAllTickets() {
		return tickets[0];
	}

	getOneTickets(id) {
		for (let i of tickets[1]) {
			if (i.id === id) {
				return i;
			}
		}

		return false;
	}

	createTicket(name, description) {
		const created = this.getTime();
		const id = uuid.v1();
		const ticket = new Ticket(id, name, false, created);
		const ticketFull = new TicketFull(id, name, description, false, created);

		tickets[0].push(ticket.createTicketObj());
		tickets[1].push(ticketFull.createTicketFullObj());

		return true;
	}

	changeTicket(id, name, description) {
		for (let i in tickets[1]) {
			if (tickets[0][i].id === id) {
				tickets[0][i].name = name;
				tickets[1][i].name = name;
				tickets[1][i].description = description;

				return true;
			}
		}

		return false;
	}

	deleteTicket(id) {
		for (let i in tickets[1]) {
			if (tickets[1][i].id === id) {
				tickets[1].splice(i, 1);

				return true;
			}
		}

		return false;
	}
}

module.exports = Controller;