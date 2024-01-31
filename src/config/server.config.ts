import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT,
    MAIL_FROM: process.env.MAIL_FROM,
    SENDGRID_API_KEY: (process.env.SENDGRID_API_KEY === undefined) ? '' : process.env.SENDGRID_API_KEY,
    JWT_SECRET: (process.env.JWT_SECRET == undefined) ? 'DUMMY' : process.env.JWT_SECRET,
    SALT_ROUNDS: (process.env.SALT_ROUNDS == undefined) ? 10 : +process.env.SALT_ROUNDS
}