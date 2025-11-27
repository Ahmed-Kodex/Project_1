import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor } from './common/transform/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // swagger
  const config = new DocumentBuilder()
    .setTitle('Project No. 1')
    .setDescription('Creating and retrieving login/signup')
    .setVersion('1.0')
    .addTag('auth')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swag', app, document);
  // swagger
  // interceptor
  app.useGlobalInterceptors(new TransformInterceptor());
  // interceptor
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT || 3000);
  console.log(`Server running on http://localhost:3000`);
  console.log(`Swagger available at: ${await app.getUrl()}/swag`);
}
bootstrap();
