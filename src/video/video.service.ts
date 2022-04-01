import { Injectable } from '@nestjs/common';
import { exec, ExecException } from 'child_process';
import { deleteExistedFile } from '../helpers/delete-existed-file';

@Injectable()
export class VideoService {

  async multiBlur(segments: [], original_filename: string, result_filename: string) {
    console.info(`🔵 ${ new Date() } ========>  MULTI VIDEO & AUDIO SEGMENTS EDITING  ========>`);
    // const ORIGINAL = `video_src/${ original_filename }`;
    const EDITED = `video_result/${ result_filename }`;
    // await checkFileExistence(ORIGINAL);
    await deleteExistedFile(EDITED);

    let blurTemplates: string[] = [];
    let silenceTemplates: string[] = [];

    segments.map(segment => {
      console.info('segment ==> ', segment);
      const { start, end } = segment;
      const template = `"boxblur = luma_radius = 7 : luma_power = 7 : enable = 'between(t,${ start }, ${ end })'"`;
      const silenceTemplate = `"volume=enable='between(t,${ start }, ${ end })':volume=0"`;
      blurTemplates = [...blurTemplates, template];
      silenceTemplates = [...silenceTemplates, silenceTemplate];
    });

    const ffmpeg_1 = `ffmpeg -i video_src/${ original_filename } -vf `;
    const ffmpeg_2 = blurTemplates.join(',');
    const ffmpeg_3 = ' -codec:a copy video_result/temp.mp4';
    const ffmpeg_script = ffmpeg_1.concat(ffmpeg_2, ffmpeg_3);

    const silence_1 = '\nffmpeg -i video_result/temp.mp4 -vcodec copy -af ';
    const silence_2 = silenceTemplates.join(',');
    const silence_3 = ` video_result/${ result_filename }`;
    const set_silence_script = silence_1.concat(silence_2, silence_3);

    const removeTempFile = '\nrm video_result/temp.mp4';

    const script = ffmpeg_script.concat(set_silence_script, removeTempFile);

    console.info('\n\n🔵script  ==>\n', script, '\n\n');

    exec(script,
      (error: ExecException | null, stdout: string, stderr: string) => {

        if (error) {
          console.error(`🔴 error: ${ error.message }`);
          return;
        }

        if (stderr) {
          console.error(`🟠 stderr: ${ stderr }`);
          console.info(`🔵 ${ new Date() } ======== EDITING DONE  ✨ 👌  ========\n`);
          return;
        }

        console.info(`🔵 ${ new Date() } ======== EDITING DONE  ✨ 👌  ========\n${ stdout }`);
      });

  }
}
