import { Ticket } from "@prisma/client";
import TicketRepository from "../repositories/ticket.repository";
import CreateTicketDto from "../dtos/createTicket.dto";

export default class TicketService {
    private ticketRepository: TicketRepository;

    constructor(ticketRepository: TicketRepository) {
        this.ticketRepository = ticketRepository;
    }

    async createTicket(ticketDetails: CreateTicketDto) : Promise<Ticket> {
        try {
            const response = await this.ticketRepository.create(ticketDetails);
            return response;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }


}

