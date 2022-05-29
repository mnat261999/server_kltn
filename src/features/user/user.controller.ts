import { Body, Controller, HttpCode, Post, UseFilters, Request, UseGuards, Param, Query, UploadedFile } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/shared/helpers/http-exception.filter';
import { JwtGuard } from '../authen/guards/jwt.guard';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh_token.dto';
import { RegisterDto } from './dtos/register.dto';
import { UploadImageDto } from './dtos/upload-image.dto';
import { UserService } from './user.service';

@UseFilters(new HttpExceptionFilter())
@Controller('api/user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }


    @Post('register')
    async register(@Body() body: RegisterDto): Promise<any> {
        return await this.userService.register(body)
    }


    @Post('activation')
    async activationEmail(@Body('activation_token') activation_token: string): Promise<any> {
        return await this.userService.activationEmail(activation_token)
    }

    @HttpCode(200)
    @Post('login')
    async login(@Body() body: LoginDto): Promise<any> {
        return await this.userService.login(body)
    }


    @Post('refresh_token')
    async getAccessToken(@Body() body: RefreshTokenDto): Promise<any> {
        return await this.userService.getAccessToken(body)
    }
}
