import { PrismaClient, User } from '@prisma/client'
import CreateUserDto from '../dtos/createUser.dto';
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

    async delete() {

    }

    async update() {

    }

}

export default UserRepository;