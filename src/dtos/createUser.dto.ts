import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export default class CreateUserDto {
    

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Length(3, 50)
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    name: string;


    constructor(email: string, password: string, name: string) {
        this.email = email;
        this.password = password;
        this.name = name;
    }
}