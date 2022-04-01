import ErrnoException = NodeJS.ErrnoException;
const fs = require('fs');

export async function deleteExistedFile(path: string) {
  fs.unlink(path, (err: ErrnoException | null) => {
    if (err) {
      console.info(`🟠 Can't find the file ${ path } could be already deleted or not exists`);
      console.error(err);
      console.error(`🔵 ${ new Date() } Creating a new video... ⚙️⚙️`);
    }
    else {
      console.info(`🟠 ${ path } 🎞️deleted 🔥`);
      console.error(`🔵 ${ new Date() } Creating a new video... ⚙️⚙️`);
    }
  });
}
