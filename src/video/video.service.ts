import { Injectable } from '@nestjs/common';
import { exec, ExecException } from 'child_process';
import { getInputFileNameFromOutput } from 'ts-loader/dist/instances';
import { checkFileExistence } from '../helpers/check-file-existence';
import ErrnoException = NodeJS.ErrnoException;

const fs = require('fs');

@Injectable()
export class VideoService {

  async multiBlur(blurSegments: []) {
    console.info(`🔵 ${ new Date() } ========>  MULTI BLUR & SILENCE SEGMENTS  ========>`);
    // const BLURRED_VIDEO = 'video_result/cat-multi-blur.mp4';

    // fs.access(BLURRED_VIDEO, fs.F_OK, (err: ErrnoException | null) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   console.info(`🟠 File ${ BLURRED_VIDEO } EXISTS!`);
    //
    //   //if file exists - delete it:
    //   fs.unlink(BLURRED_VIDEO, (err: ErrnoException | null) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     //file removed
    //     console.info(`🟠 ${ BLURRED_VIDEO } 🎞️deleted 🔥`);
    //     console.error(`🔵 ${ new Date() } Creating a new video... ⚙️⚙️`);
    //   });
    // });

    // await checkFileExistence(BLURRED_VIDEO);

    let blurTemplates: string[] = [];
    let silenceTemplates: string[] = [];

    blurSegments.map(segment => {
      console.info('segment ==> ', segment);
      const { start, end } = segment;
      const template = `"boxblur = luma_radius = 7 : luma_power = 7 : enable = 'between(t,${ start }, ${ end })'"`;
      const silenceTemplate = `"volume=enable='between(t,${ start }, ${ end })':volume=0"`;
      blurTemplates = [...blurTemplates, template];
      silenceTemplates = [...silenceTemplates, silenceTemplate];
    });

    const ffmpeg_1 = 'ffmpeg -i video_src/cat.mp4 -vf ';
    const ffmpeg_2 = blurTemplates.join(',');
    const ffmpeg_3 = ' -codec:a copy video_result/cat-multi-blur.mp4';
    const ffmpeg_script = ffmpeg_1.concat(ffmpeg_2, ffmpeg_3);

    const silence_1 = '\nffmpeg -i video_result/cat-multi-blur.mp4 -vcodec copy -af ';
    const silence_2 = silenceTemplates.join(',');
    const silence_3 = ' video_result/cat-blur-silence.mp4';
    const set_silence_script = silence_1.concat(silence_2, silence_3);

    const script = ffmpeg_script.concat(set_silence_script);

    console.log('\n\n');
    console.info('script 1 ==>\n', script);
    console.log('\n\n');

    exec(script,
      (error: ExecException | null, stdout: string, stderr: string) => {

        if (error) {
          console.error(`🔴 error: ${ error.message }`);
          return;
        }

        if (stderr) {
          console.error(`🟠 stderr: ${ stderr }`);
          console.info(`🔵 ${ new Date() } ========  BLUR & SILENCE DONE  ========\n`);
          return;
        }

        console.info(`🔵 ${ new Date() } ========  BLUR & SILENCE DONE  ========\n${ stdout }`);
      });

    // const silence_1 = 'ffmpeg -i video_result/cat-multi-blur.mp4 -vcodec copy -af ';
    // const silence_2 = silenceTemplates.join(',');
    // const silence_3 = ' video_result/cat-blur-silence.mp4';
    // const set_silence_script = silence_1.concat(silence_2, silence_3);

    // console.log('\n\n');
    // console.info('script 2 ==>\n', set_silence_script);
    // console.log('\n\n');

    // exec(set_silence_script,
    //   (error: ExecException | null, stdout: string, stderr: string) => {
    //
    //     if (error) {
    //       console.error(`🔴 error: ${ error.message }`);
    //       return;
    //     }
    //
    //     if (stderr) {
    //       console.error(`🟠 stderr: ${ stderr }`);
    //       console.info(`🔵 ${ new Date() } ========  BLUR AND SILENCE DONE  ========\n`);
    //       return;
    //     }
    //
    //     console.info(`🔵 ${ new Date() } ========  BLUR AND SILENCE DONE  ========\n${ stdout }`);
    //   });

  }
}
