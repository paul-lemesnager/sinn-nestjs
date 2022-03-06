import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('Sinn website redesign backend')
    .setDescription('RESTful API that implements following functions needed for the Sinn website redesign : - Fetch all Sinn watches from database /n - Add a new watch to the database')
    .setVersion('1.0')
    .addTag('watches')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();
