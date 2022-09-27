import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
//import { join } from 'path';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

const PORT = process.env.port || 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // static and view engines
  // app.useStaticAssets(join(__dirname, '..', 'public'));
  // // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.setViewEngine('hbs');

  // config swagger
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: { persistAuthorization: true },
  };

  const config = new DocumentBuilder()
    .setTitle('RMB APP')
    .setDescription('API de la ruta turística de la Mancomunidad Bosque Seco')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, customOptions);

  app.use(helmet());
  await app.listen(PORT);
}

bootstrap();
