import CreateUserDto from "../dtos/createUser.dto";
import UserRepository from "../repositories/user.repository";
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import serverConfig from "../config/server.config";
import SignInDto from "../dtos/signin.dto";
import { generateJWT } from "../utils/auth.utils";

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

    async create(userDetails: CreateUserDto) : Promise<User> {
        try {
            // encrypt password here
            const salt = bcrypt.genSaltSync(serverConfig.SALT_ROUNDS);
            userDetails.password = bcrypt.hashSync(userDetails.password, salt);
            
            const response : User = await this.userRepository.create(userDetails);
            return response;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

    async signIn(signInDetail: SignInDto) : Promise<string> {
        try {
            const user = await this.userRepository.getUserByEmail(signInDetail.email);
            if(!user) {
                throw {err: 'not found'};
            }
            const doesPasswordMatch = bcrypt.compareSync(signInDetail.password, user.password);
            if(!doesPasswordMatch) {
                throw {err: 'Wrong password'}
            }
            const jwt = generateJWT({id: user.id, email: user.email, role: user.roles});
            return jwt;
        } catch(error) {
            console.log(error);
            throw error;
        }
    }
}

export default UserService;