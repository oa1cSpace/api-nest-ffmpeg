import { Controller, Get, HttpCode, StreamableFile, Response, Post, Body } from '@nestjs/common';
import { Response as resp } from 'express';
import { createReadStream } from 'fs';
import { BlurOneVideoSegmentDto } from './dto/blur-one-video-segment.dto';
import { VideoService } from './video.service';
import { join } from 'path';

@Controller('/video')
export class VideoController {

  constructor(private readonly videoService: VideoService) {
  }


  @Post('/blur-segment')
  async blurOneSegment(@Body() blurOneVideoSegmentDto: BlurOneVideoSegmentDto) {
	const { start, end } = blurOneVideoSegmentDto;
	console.info(`🚩 start: ${ start } sec.`);
	console.info(`🏁 end: ${ end } sec`);
	await this.videoService.blurOneSegment(start, end);
  }


  @HttpCode(200)
  @Get('/blur2segments')
  async blurTwoSegments() {
	await this.videoService.blurTwoSegments();
  }


  @HttpCode(200)
  @Get('/cat-blurred-segment')
  getFileCatBlurredSegment(@Response({ passthrough: true }) res: resp): StreamableFile {
	// const file = createReadStream(join(process.cwd(), 'package.json'));
	const file = createReadStream(join(process.cwd(), 'video_result/cat-blurred-segment.mp4'));
	res.set({
		'Content-Type': 'application/json',
		// 'Content-Disposition': 'attachment; filename="package.json"',
		'Content-Disposition': 'attachment; filename="cat-blur.mp4"'
	});

	return new StreamableFile(file);
  }


  @HttpCode(200)
  @Get('/cat-blur')
  getFileCatBlur(@Response({ passthrough: true }) res: resp): StreamableFile {
	// const file = createReadStream(join(process.cwd(), 'package.json'));
	const file = createReadStream(join(process.cwd(), 'video_result/cat-blur.mp4'));
	res.set({
		'Content-Type': 'application/json',
		// 'Content-Disposition': 'attachment; filename="package.json"',
		'Content-Disposition': 'attachment; filename="cat-blur.mp4"'
	});

	return new StreamableFile(file);
  }


  @HttpCode(200)
  @Get('/mp4-to-avi')
  async mp4ToAvi() {
	await this.videoService.mp4ToAvi();
	return JSON.stringify('.mp4 to .avi');
  }


  @HttpCode(200)
  @Get('/cat-avi')
  getFileCatAvi(@Response({ passthrough: true }) res: resp): StreamableFile {
	const file = createReadStream(join(process.cwd(), 'video_result/cat.avi'));
	res.set({
		'Content-Type': 'application/json',
		'Content-Disposition': 'attachment; filename="cat.avi"'
	});

	return new StreamableFile(file);
  }

}
