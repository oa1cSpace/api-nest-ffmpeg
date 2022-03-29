import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const PORT = 7000;
const PID = process.pid;
const DATE = new Date();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Converting audio and video files with FFmpeg library')
    .setVersion('1.0.0')
    .addTag('NodeJS + FFmpeg')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(
    PORT, () => console.info(`[INFO] ${ DATE } 🟢 Server has been started on port: ${ PORT }, pid: ${ PID }`)
  );
}

bootstrap().then();
