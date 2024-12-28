import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Access the environment variable via ConfigService
  const configService = app.get(ConfigService);
  const environment = configService.get<string>('NODE_ENV') || 'development';

  // Enable Swagger only in development
  if (environment === 'development') {
    const config = new DocumentBuilder()
      .setTitle('French Learning API')
      .setDescription('API for learning French words and phrases')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    console.log('Swagger is enabled at /api');
  }

  await app.listen(3000);
  console.log(`Application is running in ${environment} mode.`);
}
bootstrap();
