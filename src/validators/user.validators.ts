import { Request, Response, NextFunction } from "express";
import CreateUserDto from "../dtos/createUser.dto";
import { validate } from "class-validator";
import SignInDto from "../dtos/signin.dto";

export async function createUserValidator(req: Request, res: Response, next: NextFunction) {

    const incomingRequestBody : CreateUserDto = new CreateUserDto(req.body.email, req.body.password, req.body.name);
    const errors = await validate(incomingRequestBody)
    if(errors.length > 0) {
        const errorResponse = errors.map(err => {
            return {
                property: err.property,
                constraints: err.constraints
            }
        })
        return res.status(400).json({
            err: errorResponse,
            data: {},
            success: false,
            message: 'Invalid parameters sent in the request'
        });
    }

    next();

}

export async function signInValidator(req: Request, res: Response, next: NextFunction) {

    const incomingRequestBody : SignInDto = new SignInDto(req.body.email, req.body.password);
    const errors = await validate(incomingRequestBody);
    if(errors.length > 0) {
        const errorResponse = errors.map(err => {
            return {
                property: err.property,
                constraints: err.constraints
            }
        })
        return res.status(400).json({
            err: errorResponse,
            data: {},
            success: false,
            message: 'Invalid parameters sent in the request'
        });
    }

    next();

}
