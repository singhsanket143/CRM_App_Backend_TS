import { PrismaClient, User, Role } from '@prisma/client'
import CreateUserDto from '../dtos/createUser.dto';
import Engineer from '../types/engineer';
import NotFoundError from '../errors/notFound';
import { JsonObject } from '@prisma/client/runtime/library';
const prisma = new PrismaClient()

class UserRepository {

    async create(userDetails: CreateUserDto) : Promise<User> {
        const user = await prisma.user.create({
            data: {
                name: userDetails.name,
                email: userDetails.email,
                password: userDetails.password
            }
        });
        return user;
    }

    async get(userId: string) : Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        return user;
    }

    async getAll() : Promise<User[]> {
        const users = await prisma.user.findMany();
        return users;
    }

    async getEngineers() : Promise<User[]> {
        const users = await prisma.user.findMany({
            where: {
                roles: {
                    hasSome: [Role.ENGINEER]
                }
            }
        });
        return users;
    }

    async getAvailableEngineer() : Promise<Engineer> {
        const response = await prisma.user.aggregateRaw({
            pipeline: [
                {
                    $match: {
                        "roles": {
                            "$in": ["ENGINEER"]
                        }
                    }
                },
                {
                    $project: {
                        id: 1,
                        email: 1,
                        ticketsAssignedCount: { 
                            $cond: {
                                if: { $isArray: "$ticketsAssigned" },
                                then: { $size: "$ticketsAssigned" },
                                else: 0
                            }
                         } // include a new field in every doc
                    }
                },
                {
                    $sort: {
                        ticketsAssignedCount: 1 // sorting the documents
                    }
                },
                {
                    $limit: 1 // limit to the first doc
                }
            ]
        });
        console.log(response);

        console.log(typeof response[0] === 'object', (response[0] as JsonObject)._id, (response[0] as JsonObject).email, (response[0] as JsonObject).ticketsAssignedCount)
        if(typeof response[0] === 'object' && (response[0] as JsonObject)._id && (response[0] as JsonObject).email && (response[0] as JsonObject).ticketsAssignedCount) {
            const idObject = ((response[0] as JsonObject)._id as {'$oid': string});
            // _id: {'$oid' : 'asdfa' }
            const engineer: Engineer = {
                id: idObject['$oid'],
                email: (response[0] as JsonObject).email as string,
                ticketsAssignedCount: (response[0] as JsonObject).ticketsAssignedCount as number
            };
            console.log(engineer);
            return engineer;
        }
        throw new NotFoundError("User", "role", "Engineer");
    }

    async delete() {

    }

    async addCreatedTicket(id: string, ticketId: string) {
        const user = await prisma.user.update({
            where: {
                id
            },
            data: {
                ticketsCreated: {
                    push: ticketId
                }
            }
        });
        return user;
    }

    async addAssignedTicket(id: string, ticketId: string) {
        const user = await prisma.user.update({
            where: {
                id: id,
                roles: {
                    hasSome: ["ENGINEER"]
                }
            },
            data: {
                ticketsAssigned: {
                    push: ticketId
                }
            }
        });
        return user;
    }

    async getUserByEmail(userEmail: string) : Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email: userEmail
            }
        });
        return user;
    }

}

export default UserRepository;