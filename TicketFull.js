class TicketFull {
	constructor(id, name, description, status, created) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.status = status;
		this.created = created;
	}

	createTicketFullObj() {
		return {
			id: this.id,
			name: this.name,
			description: this.description,
			status: this.status,
			created: this.created
		}
	}
}

module.exports = TicketFull;