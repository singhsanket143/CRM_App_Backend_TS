import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export default class SignInDto {
    

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Length(3, 50)
    @IsString()
    password: string;


    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}