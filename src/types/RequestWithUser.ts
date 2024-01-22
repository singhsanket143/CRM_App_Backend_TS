import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import JwtDecodedUser from "./JwtDecodedUser";

export interface RequestWithUser extends Request {
    user: JwtDecodedUser;
}