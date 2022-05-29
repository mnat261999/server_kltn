import { IsNotEmpty } from "class-validator";

export class RefreshTokenDto {
    @IsNotEmpty({ message: 'email should not be empty' })
    email: string;
}