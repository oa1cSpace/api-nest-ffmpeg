import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video/video.module';
import { AudioModule } from './audio/audio.module';

@Module({
  imports: [VideoModule, AudioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
