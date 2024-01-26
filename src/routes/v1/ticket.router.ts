import express from 'express';
import ticketController from '../../controllers/ticket.controller';
import { isLoggedIn } from '../../validators/auth.validators';

const ticketRouter = express.Router();

ticketRouter.post('/', isLoggedIn, ticketController.createTicket);

export default ticketRouter;