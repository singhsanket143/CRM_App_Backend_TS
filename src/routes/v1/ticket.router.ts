import express from 'express';
import ticketController from '../../controllers/ticket.controller';
import { isAdminOrEngineer, isLoggedIn } from '../../validators/auth.validators';
import { updateTicketValidator } from '../../validators/ticket.validator';

const ticketRouter = express.Router();

ticketRouter.post('/', isLoggedIn, ticketController.createTicket);

ticketRouter.patch('/:id', isLoggedIn, isAdminOrEngineer, updateTicketValidator, ticketController.updateTicket);

export default ticketRouter;