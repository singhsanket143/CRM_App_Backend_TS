import { ReasonPhrases, StatusCodes } from "http-status-codes";
import GenericError from "./genericError";

export default class NotFoundError extends GenericError {
    constructor(resourceName: string, property: string, propertyValue: any) {
        const errorMessage: string = `The resource: ${resourceName} with property ${property} : ${propertyValue} not found`;
        super(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, errorMessage, "NotFoundError");

    }
}