import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export default class CreateTicketDto {
    
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    assignee: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    assignedTo: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    createdBy: string;

    clientName: string;


    constructor(title: string, description: string, assignee: string, assignedTo: string, createdBy: string, clientName: string) {
        this.title = title;
        this.description = description;
        this.assignee = assignee;
        this.assignedTo = assignedTo;
        this.createdBy = createdBy;
        this.clientName = clientName;
    }
}