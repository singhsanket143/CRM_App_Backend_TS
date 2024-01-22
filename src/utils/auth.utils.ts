import jwt, { JwtPayload } from 'jsonwebtoken';
import serverConfig from '../config/server.config';
import JwtDecodedUser from '../types/JwtDecodedUser';
export function generateJWT(obj: any) : string {
    return jwt.sign(obj, serverConfig.JWT_SECRET, {expiresIn: '1h'});
}

export function verifyToken(token: string): JwtDecodedUser {
    const response = jwt.verify(token, serverConfig.JWT_SECRET);
    return (response as JwtDecodedUser);
}