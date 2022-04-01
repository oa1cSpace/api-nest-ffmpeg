import ErrnoException = NodeJS.ErrnoException;
import { HttpException, HttpStatus } from '@nestjs/common';
const fs = require('fs');

export async function checkFileExistence(path: string) {
  fs.access(path, fs.F_OK, async (err: ErrnoException | null) => {
    if (err) {
      // DOES NOT EXIST
      console.info(`🟠 Can't find the file ${ path } could be already deleted or not exists`);
      console.error(err);
      throw new HttpException('Forbidden', HttpStatus.NOT_FOUND);
    }
    else {
      // EXISTS
      console.info(`🟠 File ${ path } EXISTS! 👌`);
    }
  });
}
