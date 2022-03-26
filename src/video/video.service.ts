import { Injectable } from '@nestjs/common';
import { exec, ExecException } from 'child_process';
import { BlurMultiVideoSegmentsDto } from './dto/blur-multi-video-segments.dto';
import ErrnoException = NodeJS.ErrnoException;

const fs = require('fs');

@Injectable()
export class VideoService {

  async blurOneSegment(start: number, end: number) {
    console.info(`🔵 ${ new Date() } ========>  BLUR ONE SEGMENT  ========>`);
    const BLURRED_VIDEO = 'video_result/cat-blurred-segment.mp4';
    fs.access(BLURRED_VIDEO, fs.F_OK, (err: ErrnoException | null) => {
      if (err) {
        console.error(err);
        return;
      }
      console.info(`🟠 File ${ BLURRED_VIDEO } EXISTS!`);

      //if file exists - delete it:
      fs.unlink(BLURRED_VIDEO, (err: ErrnoException | null) => {
        if (err) {
          console.error(err);
          return;
        }
        //file removed
        console.info(`🟠 ${ BLURRED_VIDEO } 🎞️deleted 🔥`);
        console.error(`🔵 ${ new Date() } Creating a new video... ⚙️⚙️`);
      });
    });

    exec(`ffmpeg -i video_src/cat.mp4 -vf "boxblur = luma_radius = 7 : luma_power = 7 : enable = 'between(t,${ start },${ end })'" -codec:a copy video_result/cat-blurred-segment.mp4`,
      (error: ExecException | null, stdout: string, stderr: string) => {

        if (error) {
          console.error(`🔴 error: ${ error.message }`);
          return;
        }

        if (stderr) {
          console.error(`🟠 stderr: ${ stderr }`);
          console.info(`🔵 ${ new Date() } ========  BLUR DONE  ========\n`);
          return;
        }

        console.info(`🔵 ${ new Date() } ========  BLUR DONE  ========\n${ stdout }`);
      });

  }

  async blurTwoSegments() {
    console.info(`🔵 ${ new Date() } ========>  BLUR  ========>`);
    const BLURRED_VIDEO = 'video_result/cat-blur.mp4';
    fs.access(BLURRED_VIDEO, fs.F_OK, (err: ErrnoException | null) => {
      if (err) {
        console.error(err);
        return;
      }
      console.info(`🟠 File ${ BLURRED_VIDEO } EXISTS!`);

      //if file exists - delete it:
      fs.unlink(BLURRED_VIDEO, (err: ErrnoException | null) => {
        if (err) {
          console.error(err);
          return;
        }
        //file removed
        console.info(`🟢 ${ BLURRED_VIDEO } 🎞️deleted 🔥`);
        console.error(`🔵 ${ new Date() } Creating a new video... ⚙️⚙️`);
      });
    });

    exec(`ffmpeg -i video_src/cat.mp4 -vf "boxblur = luma_radius = 7 : luma_power = 7 : enable = 'between(t,5,10)', boxblur=luma_radius=7:luma_power=7:enable='between(t,15,20)'" -codec:a copy video_result/cat-blur.mp4`,
      (error: ExecException | null, stdout: string, stderr: string) => {

        if (error) {
          console.error(`🔴 error: ${ error.message }`);
          return;
        }

        if (stderr) {
          console.error(`🟠 stderr: ${ stderr }`);
          console.info(`🔵 ${ new Date() } ========  BLUR DONE  ========\n`);
          return;
        }

        // console.info(`stdout:\n${ stdout }`);
        console.info(`🔵 ${ new Date() } ========  BLUR DONE  ========\n${ stdout }`);
      });

  }

  async mp4ToAvi() {
    console.info('========>  .mp4 to .avi  ========>');
    exec(`ffmpeg -i video_src/cat.mp4 -c:v libx264 -c:a libmp3lame -b:a 384K video_result/cat.avi`,
      (error: ExecException | null, stdout: string, stderr: string) => {
        if (error) {
          console.error(`error: ${ error.message }`);
          return;
        }

        if (stderr) {
          console.error(`stderr: ${ stderr }`);
          return;
        }

        console.log(`stdout:\n${ stdout }`);
      });
  }

  async multiBlur(blurSegments: []) {
    console.info(`🔵 ${ new Date() } ========>  MULTI BLUR SEGMENTS  ========>`);
    const BLURRED_VIDEO = 'video_result/cat-multi-blur.mp4';
    fs.access(BLURRED_VIDEO, fs.F_OK, (err: ErrnoException | null) => {
      if (err) {
        console.error(err);
        return;
      }
      console.info(`🟠 File ${ BLURRED_VIDEO } EXISTS!`);

      //if file exists - delete it:
      fs.unlink(BLURRED_VIDEO, (err: ErrnoException | null) => {
        if (err) {
          console.error(err);
          return;
        }
        //file removed
        console.info(`🟠 ${ BLURRED_VIDEO } 🎞️deleted 🔥`);
        console.error(`🔵 ${ new Date() } Creating a new video... ⚙️⚙️`);
      });
    });

    let blurTemplates: string[] = [];

    blurSegments.map(blurSegment => {
      console.info('blurSegment ==> ', blurSegment);
      const { start, end } = blurSegment;
      const template = `"boxblur = luma_radius = 7 : luma_power = 7 : enable = 'between(t,${ start }, ${ end })'"`;
      blurTemplates = [...blurTemplates, template];
    });

    const ffmpeg_1 = 'ffmpeg -i video_src/cat.mp4 -vf ';
    const ffmpeg_2 = blurTemplates.join(',');
    const ffmpeg_3 = ' -codec:a copy video_result/cat-multi-blur.mp4';
    const ffmpeg_script = ffmpeg_1.concat(ffmpeg_2, ffmpeg_3);

    exec(ffmpeg_script,
      (error: ExecException | null, stdout: string, stderr: string) => {

        if (error) {
          console.error(`🔴 error: ${ error.message }`);
          return;
        }

        if (stderr) {
          console.error(`🟠 stderr: ${ stderr }`);
          console.info(`🔵 ${ new Date() } ========  BLUR DONE  ========\n`);
          return;
        }

        console.info(`🔵 ${ new Date() } ========  BLUR DONE  ========\n${ stdout }`);
      });

  }
}
