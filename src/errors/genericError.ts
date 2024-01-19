export default class GenericError extends Error {
    public statusCode: number;
    public reason: string | object | null;
    public name: string;
    public errorMessage: string;
    constructor(statusCode: number, reason: string | object | null, errorMessage: string, name: string) {
        super(errorMessage);
        this.statusCode = statusCode;
        this.reason = reason;
        this.name = name;
        this.errorMessage = errorMessage;
    }
}
