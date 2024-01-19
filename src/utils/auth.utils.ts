import jwt from 'jsonwebtoken';
import serverConfig from '../config/server.config';
export function generateJWT(obj: any) : string {
    return jwt.sign(obj, serverConfig.JWT_SECRET);
}

