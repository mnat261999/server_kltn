import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthenModule } from './authen/authen.module';
import { FileModule } from './file/file.module';


@Module({
  imports: [UserModule, AuthenModule, FileModule]
})
export class FeaturesModule {}
