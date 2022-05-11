import { IsNotEmpty } from "class-validator";

export class LoginDto {

    @IsNotEmpty({ message: 'email should not be empty' })
    email: string;

    @IsNotEmpty({ message: 'password should not be empty' })
    password: string;
}