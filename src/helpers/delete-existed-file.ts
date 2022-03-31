import ErrnoException = NodeJS.ErrnoException;
const fs = require('fs');

export async function deleteExistedFile(path: string) {
  fs.unlink(path, (err: ErrnoException | null) => {
    if (err) {
      console.error(err);
      return;
    }
    console.info(`🟠 ${ path } 🎞️deleted 🔥`);
    console.error(`🔵 ${ new Date() } Creating a new video... ⚙️⚙️`);
  });
}
