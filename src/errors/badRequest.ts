import { StatusCodes } from "http-status-codes";
import GenericError from "./genericError";

export default class BadRequestError extends GenericError {
    constructor(reason: string | object | null = null) {
        const errorMessage: string = 'There are some invalid or missing properties in the request';
        super(StatusCodes.BAD_REQUEST, reason, errorMessage, "BadRequestError");

    }
}