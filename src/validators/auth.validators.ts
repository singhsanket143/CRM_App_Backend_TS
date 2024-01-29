import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UnauthorisedError from "../errors/unauthorisedError";
import { verifyToken } from "../utils/auth.utils";
import { RequestWithUser } from "../types/RequestWithUser";
import JwtDecodedUser from "../types/JwtDecodedUser";

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    console.log(req.headers);
    if(!req.headers || !req.headers['x-access-token']) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            err: new UnauthorisedError(),
            data: {},
            success: false,
            message: 'You\'re not authorised to do this operation'
        });
    }
    const token: string = req.headers['x-access-token'].toString();
    let decodedToken: JwtDecodedUser;

    try {
        decodedToken = verifyToken(token);
    } catch(error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            err: new UnauthorisedError(),
            data: {},
            success: false,
            message: 'You\'re not authorised to do this operation'
        });
    }

    (req as RequestWithUser).user = decodedToken;
    console.log(decodedToken);
    next();
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const roles: string[] = (req as RequestWithUser).user.role;
        if(roles.find(role => role === 'ADMIN')) {
            next();
        } else {
            throw new UnauthorisedError();
        }
    } catch(error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            err: new UnauthorisedError(),
            data: {},
            success: false,
            message: 'You\'re not authorised to do this operation'
        });
    }
}

export function isEngineer(req: Request, res: Response, next: NextFunction) {
    try {
        const roles: string[] = (req as RequestWithUser).user.role;
        if(roles.find(role => role === 'Engineer')) {
            next();
        } else {
            throw new UnauthorisedError();
        }
    } catch(error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            err: new UnauthorisedError(),
            data: {},
            success: false,
            message: 'You\'re not authorised to do this operation'
        });
    }
}

export function isAdminOrEngineer(req: Request, res: Response, next: NextFunction) {
    try {
        const roles: string[] = (req as RequestWithUser).user.role;
        if(roles.find(role => (role === 'Engineer' || role === 'ADMIN'))) {
            next();
        } else {
            throw new UnauthorisedError();
        }
    } catch(error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            err: new UnauthorisedError(),
            data: {},
            success: false,
            message: 'You\'re not authorised to do this operation'
        });
    }
}