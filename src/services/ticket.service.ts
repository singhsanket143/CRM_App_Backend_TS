import { Prisma, Ticket } from "@prisma/client";
import TicketRepository from "../repositories/ticket.repository";
import CreateTicketDto from "../dtos/createTicket.dto";
import UserRepository from "../repositories/user.repository";
import NotFoundError from "../errors/notFound";
import UpdateTicketDto from "../dtos/updateTicket.dto";

export default class TicketService {
    private ticketRepository: TicketRepository;
    private userRepository: UserRepository;

    constructor(ticketRepository: TicketRepository, userRepository: UserRepository) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository; 
    }

    async updateTicket(ticketId: string, ticketDetails: UpdateTicketDto, userId: string, userEmail: string) {
        try {
            const areWeUpdatingAssignedTo = ticketDetails.assignedTo !== undefined;
            /**
             * We want to make sure assignedTo always has an email of an admin or an engineer
             */
            const updateObject = (areWeUpdatingAssignedTo) ? {...ticketDetails, updatedAt: new Date(), assignee: userEmail} : {...ticketDetails, updatedAt: new Date()};
            const ticket = await this.ticketRepository.update(ticketId, updateObject as Partial<Prisma.TicketUpdateInput>);
            return ticket;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async createTicket(ticketDetails: CreateTicketDto, userId: string) : Promise<Ticket> {
        try {
            let ticket = await this.ticketRepository.create(ticketDetails);
            const createdBy = await this.userRepository.get(userId);
            if(!createdBy) {
                throw new NotFoundError("User", "id", userId);
            }
            const engineer = await this.getEngineerToAllocateTicket();
            await this.userRepository.addAssignedTicket(engineer.id, ticket.id);
            await this.userRepository.addCreatedTicket(createdBy.id, ticket.id);
            ticket = await this.ticketRepository.update(ticket.id, {createdBy: createdBy.email, assignedTo: engineer.email});

            return ticket;
        } catch(error) {
            
            console.log(error);
            throw error;
        }
    }

    async getEngineerToAllocateTicket() {
        try {
            const engineer = await this.userRepository.getAvailableEngineer();
            console.log(engineer);
            // engineers.sort((engineer1, engineer2) => engineer1.ticketsAssigned.length - engineer2.ticketsAssigned.length);
            // return engineers[0];
            return engineer;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }
}

