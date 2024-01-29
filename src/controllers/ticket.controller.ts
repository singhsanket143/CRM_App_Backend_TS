import { Request, Response } from "express";
import GenericError from "../errors/genericError";
import { unknownErrorResponse } from "../utils/response.utils";
import { StatusCodes } from "http-status-codes";
import TicketService from "../services/ticket.service";
import TicketRepository from "../repositories/ticket.repository";
import { RequestWithUser } from "../types/RequestWithUser";
import UserRepository from "../repositories/user.repository";

const ticketService : TicketService = new TicketService(new TicketRepository(), new UserRepository());

const createTicket = async (req: Request, res: Response) => {
    try {
        const user = (req as RequestWithUser).user;
        const response = await ticketService.createTicket(req.body, user.id);
        return res.status(201).json({
            message: 'Successfully created the ticket',
            data: response,
            err: {},
            success: true
        })
    } catch(error) {
        if(error instanceof GenericError) {
            return res.status(error.statusCode).json({
                message: 'Something went wrong',
                data: {},
                err: error,
                success: true
            })
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(unknownErrorResponse);

    }
}

const updateTicket = async (req: Request, res: Response) => {
    try {
        const user = (req as RequestWithUser).user;
        const response = await ticketService.updateTicket(req.params.id , req.body, user.id, user.email);
        return res.status(201).json({
            message: 'Successfully updated the ticket',
            data: response,
            err: {},
            success: true
        })
    } catch(error) {
        if(error instanceof GenericError) {
            return res.status(error.statusCode).json({
                message: 'Something went wrong',
                data: {},
                err: error,
                success: true
            })
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(unknownErrorResponse);

    }
}


export default {
    createTicket,
    updateTicket
}