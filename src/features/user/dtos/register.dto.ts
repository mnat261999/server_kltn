import { IsEmail, IsNotEmpty, Matches, MinLength, ValidateIf } from "class-validator";


export class RegisterDto {

    @IsNotEmpty({ message: 'email should not be empty' })
    @IsEmail({ message: 'email format is correct' })
    /*   @ValidateIf((register) => !validateEmail(register.accountMain))
      @Matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,{message: 'Email or phone format is correct'}) */
    email: string;

    @IsNotEmpty({ message: 'fullname should not be empty' })
    fullname: string;

    @IsNotEmpty({ message: 'username should not be empty' })
    username: string;

    @IsNotEmpty({ message: 'password should not be empty' })
    @MinLength(8,{ message: 'password must be at least 8 characters' })
    password: string;
}