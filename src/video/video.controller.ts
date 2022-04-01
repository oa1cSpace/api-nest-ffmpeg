import { Controller, Get, HttpCode, StreamableFile, Response, Post, Body, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response as resp } from 'express';
import { createReadStream } from 'fs';
import { checkFileExistence } from '../helpers/check-file-existence';
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
	const { segments, original_filename, result_filename } = blurMultiVideoSegmentsDto;

    console.info('🔵 segments: ', segments);
    console.info('🔵 result_filename: ', result_filename);
    console.info('🔵 original_filename: ', original_filename);

    const ORIGINAL = `video_src/${ original_filename }`;
    await checkFileExistence(ORIGINAL);

	await this.videoService.multiBlur(segments,original_filename, result_filename);
  }


  @ApiOperation({summary: 'Get result video with blurred pieces'})
  @HttpCode(200)
  @Get(':filename')
  getMultiBlur(@Param('filename') filename: string, @Response({ passthrough: true }) res: resp): StreamableFile {
    const file = createReadStream(join(process.cwd(), `video_result/${ filename }`));
  res.set({
  	'Content-Type': 'application/json',
  	'Content-Disposition': `attachment; filename=${ filename }`
  });

  return new StreamableFile(file);
  }

}
