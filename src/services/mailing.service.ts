import sendgrid from '@sendgrid/mail';
import ServerConfig from '../config/server.config';
export default class MailerService {

    constructor() {
        sendgrid.setApiKey(ServerConfig.SENDGRID_API_KEY);
    }

    async sendEmail(to: string, subject: string, body: string) {
        const email = {
            to: to,
            from: ServerConfig.MAIL_FROM || '',
            subject: subject,
            text: body,
            html: body,
        }
        try {
            const response = await sendgrid.send(email);  
            console.log(email, response);
            return {
                message: 'MAIL SENT',
                success: true
            }  
        } catch(error) {
            console.log(error);
            return {
                success: false
            }
        }

    }
}