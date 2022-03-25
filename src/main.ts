import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 7000;
const PID = process.pid;
const DATE = new Date();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  await app.listen(
	PORT, () => console.info(`[INFO] ${ DATE } 🟢 Server has been started on port: ${ PORT }, pid: ${ PID }`)
  );
}

bootstrap().then();
