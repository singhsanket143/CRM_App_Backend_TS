import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export default class CreateTicketDto {
    
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsString()
    @IsEmail()
    assignee: string;

    @IsString()
    @IsEmail()
    assignedTo: string;

    @IsString()
    @IsEmail()
    createdBy: string;

    clientName: string;


    constructor(title: string, description: string, clientName: string) {
        this.title = title;
        this.description = description
        this.assignee = "";
        this.assignedTo = "";
        this.createdBy = "";
        this.clientName = clientName;
    }
}