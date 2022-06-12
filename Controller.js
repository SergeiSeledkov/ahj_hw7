const uuid = require('uuid');
const Ticket = require('./Ticket');
const TicketFull = require('./TicketFull');
const tickets = require('./tickets');

class Controller {
	constructor() { }

	getTime() {
		const date = new Date();
		const year = date.getFullYear();
		let day = date.getDate();
		let month = date.getMonth();
		let hour = date.getHours();
		let minute = date.getMinutes();

		if (day < 10) {
			day = `0${day}`;
		}

		if (month < 10) {
			month = `0${month}`;
		}

		if (hour < 10) {
			hour = `0${hour}`;
		}

		if (minute < 10) {
			minute = `0${minute}`;
		}

		return `${day}.${month}.${year} ${hour}:${minute}`;
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
		let lastIndex = null;

		tickets[0].push(ticket.createTicketObj());
		tickets[1].push(ticketFull.createTicketFullObj());
		lastIndex = tickets[0].length - 1;

		return tickets[0][lastIndex];
	}

	changeTicket(id, name, description, status) {
		for (let i in tickets[1]) {
			if (tickets[0][i].id === id) {
				if (name) {
					tickets[0][i].name = name;
					tickets[1][i].name = name;
				}

				if (description) {
					tickets[1][i].description = description;
				}

				if (status === 'open') {
					tickets[0][i].status = 'open';
					tickets[1][i].status = 'open';
				}

				if (status === 'close') {
					tickets[0][i].status = 'close';
					tickets[1][i].status = 'close';
				}

				return true;
			}
		}

		return false;
	}

	deleteTicket(id) {
		for (let i in tickets[1]) {
			if (tickets[0][i].id === id) {
				tickets[0].splice(i, 1);
				tickets[1].splice(i, 1);

				return true;
			}
		}

		return false;
	}
}

module.exports = Controller;