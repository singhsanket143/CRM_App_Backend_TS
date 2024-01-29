import { IsEmail, IsEnum, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { Status } from '@prisma/client';
export default class UpdateTicketDto {
    
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsOptional()
    ticketPriority: number;

    @IsEnum(Status)
    @IsOptional()
    status: string;

    @IsString()
    @IsEmail()
    @IsOptional()
    assignedTo: string;

    @IsString()
    @IsEmail()
    @IsOptional()
    createdBy: string;

    @IsString()
    @IsOptional()
    clientName: string;

}