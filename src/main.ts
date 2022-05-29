import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './shared/helpers/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());
    const configService = app.get(ConfigService);
    const port = configService.get<number>('port') || 3000;

    const swaggerConfig = new DocumentBuilder()
    .setTitle('MS-Talon.One Swagger Documentation')
    .setDescription('Project Information Management')
    .setVersion('3.1')
    .addBearerAuth()
    .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('swagger', app, document);

    await app.listen(port, () => {
        console.info(`Application started on port ${port} successfully`);
    });
}
bootstrap();
