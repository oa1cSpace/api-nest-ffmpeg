import ErrnoException = NodeJS.ErrnoException;
const fs = require('fs');

export async function deleteExistedFile(path: string) {
  fs.unlink(path, (err: ErrnoException | null) => {
    if (err) {
      console.info(`๐  Can't find the file ${ path } could be already deleted or not exists`);
      console.error(err);
      console.error(`๐ต ${ new Date() } Creating a new video... โ๏ธโ๏ธ`);
    }
    else {
      console.info(`๐  ${ path } ๐๏ธdeleted ๐ฅ`);
      console.error(`๐ต ${ new Date() } Creating a new video... โ๏ธโ๏ธ`);
    }
  });
}
