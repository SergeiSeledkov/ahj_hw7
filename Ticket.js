class Ticket {
	constructor(id, name, status, created) {
		this.id = id;
		this.name = name;
		this.status = status;
		this.created = created;
	}

	createTicketObj() {
		return {
			id: this.id,
			name: this.name,
			status: this.status,
			created: this.created
		}
	}
}

module.exports = Ticket;