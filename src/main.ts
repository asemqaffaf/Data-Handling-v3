import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Tech Assignment')
    .setDescription(
      'Tech Assignment - Backend Data Handling v3 - please use this token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiU2VsZW5hLlBoYW1AaGF5cy5jby5qcCIsImV4cCI6MTczNjM0MjMxNn0.gaD3SyxT7UwVm5kUMUhtDhHEpxmQ4cCq7v5S3qXN-VQ',
    )
    .setVersion('1.0')
    .addTag('Tech Assignment')
    .addBearerAuth(
      {
        description: `Please enter your access token when you get the response from the login API, so that in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
        scheme: 'Bearer',
        type: 'http', // I`ve attempted type: 'https' too so it worked as well
        in: 'Header',
      },

      'access-token', // This name here is important for matching up with @ApiBearerAuth() in our controllers!
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
