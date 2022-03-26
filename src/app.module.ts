import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeaturesModule } from './features/features.module';
import { ConfigModule } from '@nestjs/config';
import { DataModule } from './data/data.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    FeaturesModule,
    DataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
