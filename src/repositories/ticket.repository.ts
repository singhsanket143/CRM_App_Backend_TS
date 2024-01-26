import { PrismaClient, Ticket } from '@prisma/client';
import CreateTicketDto from '../dtos/createTicket.dto';
const prisma = new PrismaClient();

class TicketRepository {

    async create(ticketDetails: CreateTicketDto) : Promise<Ticket> {
        const ticket = await prisma.ticket.create({
            data: {
                ...ticketDetails
            }
        });
        return ticket;
    }

    async get(ticketId: string) : Promise<Ticket | null> {
        const ticket = await prisma.ticket.findUnique({
            where: {
                id: ticketId
            }
        });
        return ticket;
    }

    async getAll() : Promise<Ticket[]> {
        const tickets = await prisma.ticket.findMany();
        return tickets;
    }

    async delete() {

    }

    async update(id: string, updateDetails: {createdBy? : string, assignedTo? : string}) {
        console.log(updateDetails, id);
        const ticket = await prisma.ticket.update({
            where: {
                id: id
            },
            data: {
                createdBy: updateDetails.createdBy,
                assignedTo: updateDetails.assignedTo
            }
        });
        console.log(ticket);
        return ticket;
    }
}

export default TicketRepository;