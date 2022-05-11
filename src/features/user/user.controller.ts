import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Post('register')
    async register(@Body() body:RegisterDto): Promise<any>{
        return await this.userService.register(body)
    }

    
    @Post('activation')
    async activationEmail(@Body('activation_token') activation_token:string){
        return await this.userService.activationEmail(activation_token)
    }

    @Post('login')
    async login(@Body() body:LoginDto){
        return await this.userService.login(body)
    }

}
