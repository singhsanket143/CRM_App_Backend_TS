import UserRepository from "../repositories/user.repository";
import { User } from '@prisma/client'


class UserService {

    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async get(id: string) : Promise<User> {
        try {
            const response : User | null = await this.userRepository.get(id);
            if(!response) {
                throw {error: "Not found"}
            }
            return response;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async getAll() : Promise<User[]> {
        try {
            const response : User[] = await this.userRepository.getAll();
            return response;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }
}

export default UserService;