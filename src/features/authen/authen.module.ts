import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthenController } from './authen.controller';
import { AuthenService } from './authen.service';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
  imports:[
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory:async (config: ConfigService) => ({
        secret: config.get<string>("jwt_serect"),
        signOptions: {expiresIn: '1d'}
      }),
      inject: [ConfigService],
    }),
    AuthenModule
  ],
  controllers: [AuthenController],
  providers: [AuthenService,JwtGuard, JwtStrategy],
  exports : [AuthenService]
})
export class AuthenModule {}
