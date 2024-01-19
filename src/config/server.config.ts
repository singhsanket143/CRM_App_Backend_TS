import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT,
    JWT_SECRET: (process.env.JWT_SECRET == undefined) ? 'DUMMY' : process.env.JWT_SECRET,
    SALT_ROUNDS: (process.env.SALT_ROUNDS == undefined) ? 10 : +process.env.SALT_ROUNDS
}