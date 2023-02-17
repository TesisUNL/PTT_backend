import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { config as configAWS } from 'aws-sdk';
import { ConfigService } from './api/config/config.service';

const PORT = process.env.port || 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  const configService = app.get(ConfigService);

  // static and view engines
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // config swagger
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: { persistAuthorization: true },
  };

  configAWS.update({
    accessKeyId: configService.AwsConfig.AWS_ACCESS_KEY_ID,
    secretAccessKey: configService.AwsConfig.AWS_SECRET_ACCESS_KEY,
    region: configService.AwsConfig.AWS_REGION,
  });

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
