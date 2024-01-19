import { ReasonPhrases, StatusCodes } from "http-status-codes";
import GenericError from "./genericError";

export default class InternalServerError extends GenericError {
    constructor() {
        const errorMessage: string = 'Something went wrong, please try again later !';
        super(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, errorMessage, "InternalServerError");
    }
}