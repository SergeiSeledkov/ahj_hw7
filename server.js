const http = require('http');
const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const Controller = require('./Controller.js');
const controller = new Controller();
const port = process.env.PORT || 7070;

app.use(koaBody({
	urlencoded: true,
}));

app.use(cors());

app.use(async ctx => {
	const { method, id, name, description } = ctx.request.query;

	switch (method) {
		case 'allTickets':
			if (ctx.request.method === 'GET') {
				ctx.response.body = controller.getAllTickets();
				ctx.response.status = 200;
			} else {
				ctx.response.body = 'Method Not Allowed (Allow: GET)';
				ctx.response.status = 405;
			}

			break;
		case 'ticketById':
			if (ctx.request.method === 'GET') {
				const oneTickets = controller.getOneTickets(id);

				if (oneTickets) {
					ctx.response.body = oneTickets;
					ctx.response.status = 200;
				} else {
					ctx.response.body = 404;
					ctx.response.status = 404;
				}
			} else {
				ctx.response.body = 'Method Not Allowed (Allow: GET)';
				ctx.response.status = 405;
			}

			break;
		case 'createTicket':
			if (ctx.request.method === 'POST') {
				controller.createTicket(name, description);
				ctx.response.body = 'Ticket Created';
				ctx.response.status = 200;
			} else {
				ctx.response.body = 'Method Not Allowed (Allow: POST)';
				ctx.response.status = 405;
			}

			break;
		case 'changeTicket':
			if (ctx.request.method === 'PATCH') {
				const changeTicket = controller.changeTicket(id, name, description);

				if (changeTicket) {
					ctx.response.body = `Ticked ${id} Changed`;
					ctx.response.status = 200;
				} else {
					ctx.response.body = 404;
					ctx.response.status = 404;
				}
			} else {
				ctx.response.body = 'Method Not Allowed (Allow: PATCH)';
				ctx.response.status = 405;
			}

			break;
		case 'deleteTicket':
			if (ctx.request.method === 'DELETE') {
				const deleteTicket = controller.deleteTicket(id);

				if (deleteTicket) {
					ctx.response.body = `Ticked ${id} Deleted`;
					ctx.response.status = 200;
				} else {
					ctx.response.body = 404;
					ctx.response.status = 404;
				}
			} else {
				ctx.response.body = 'Method Not Allowed (Allow: DELETE)';
				ctx.response.status = 405;
			}

			break;
		default:
			ctx.response.body = 'Method Does Not Exist';
			ctx.response.status = 404;

			break;
	}
});

const server = http.createServer(app.callback()).listen(port);