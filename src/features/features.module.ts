import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthenModule } from './authen/authen.module';


@Module({
  imports: [UserModule, AuthenModule]
})
export class FeaturesModule {}
