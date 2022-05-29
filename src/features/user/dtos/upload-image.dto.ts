import { IsNotEmpty, IsOptional, IsPort } from "class-validator";

export class UploadImageDto {
    @IsNotEmpty({ message: 'key should not be empty' })
    key: string;

    @IsNotEmpty({ message: 'url should not be empty' })
    url: string;

    @IsOptional()
    description:string
}