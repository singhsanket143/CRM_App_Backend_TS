import express from 'express';
import userRouter from './user.router';
import ticketRouter from './ticket.router';

const v1Router = express.Router();

v1Router.use('/users', userRouter);

v1Router.use('/tickets', ticketRouter);

export default v1Router;