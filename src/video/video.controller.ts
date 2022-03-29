import { Controller, Get, HttpCode, StreamableFile, Response, Post, Body } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response as resp } from 'express';
import { createReadStream } from 'fs';
import { BlurMultiVideoSegmentsDto } from './dto/blur-multi-video-segments.dto';
import { VideoService } from './video.service';
import { join } from 'path';

@Controller('/video')
export class VideoController {

  constructor(private readonly videoService: VideoService) {
  }

  @ApiOperation({summary: 'Blur video pieces'})
  @HttpCode(201)
  @Post('/multi-blur')
  async multiBlur(@Body() blurMultiVideoSegmentsDto: BlurMultiVideoSegmentsDto) {
	const { blur_segments } = blurMultiVideoSegmentsDto;
	await this.videoService.multiBlur(blur_segments);
  }


  @ApiOperation({summary: 'Get result video with blurred pieces'})
  @HttpCode(200)
  @Get('/get-multi-blur')
  getMultiBlur(@Response({ passthrough: true }) res: resp): StreamableFile {
	const file = createReadStream(join(process.cwd(), 'video_result/cat-multi-blur.mp4'));
	res.set({
		'Content-Type': 'application/json',
		'Content-Disposition': 'attachment; filename="cat-multi-blur.mp4"'
	});

	return new StreamableFile(file);
  }


}
