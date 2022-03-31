import ErrnoException = NodeJS.ErrnoException;
import { deleteExistedFile } from './delete-existed-file';
const fs = require('fs');

export async function checkFileExistence(path: string) {
  fs.access(path, fs.F_OK, (err: ErrnoException | null) => {
    if (err) {
      console.error(err);
      return;
    }
    console.info(`🟠 File ${ path } EXISTS!`);

    //if file exists - delete it:
    // fs.unlink(path, (err: ErrnoException | null) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   //file removed
    //   console.info(`🟠 ${ path } 🎞️deleted 🔥`);
    //   console.error(`🔵 ${ new Date() } Creating a new video... ⚙️⚙️`);
    // });


    deleteExistedFile(path);

  });
}
