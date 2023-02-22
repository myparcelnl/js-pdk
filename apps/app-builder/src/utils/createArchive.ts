import archiver, {Archiver} from 'archiver';
import {Debugger} from 'debug';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

const ZLIB_COMPRESSION_MAX = 9;

export function createArchive(zipFile: string, debug: Debugger): Archiver {
  const output = fs.createWriteStream(zipFile);

  const archive: Archiver = archiver('zip', {
    zlib: {
      level: ZLIB_COMPRESSION_MAX,
    },
  });

  archive.pipe(output);

  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
      debug(err);
    } else {
      throw err;
    }
  });

  archive.on('error', (err) => {
    throw err;
  });

  const defaultFinalize = archive.finalize;

  archive.finalize = finalize;

  /**
   * Override the finalize method because although it returns a promise, it's not actually finished when the promise
   * resolves.
   */
  async function finalize(): Promise<void> {
    return new Promise((resolve, reject) => {
      output.on('close', () => {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        const sizeInKb = (archive.pointer() / 1024).toFixed(2);
        const basename = path.basename(zipFile);

        debug('Finished creating %s %s', chalk.greenBright(basename), chalk.gray(`${sizeInKb} KB`));

        resolve();
      });

      archive.on('error', (err) => reject(err));

      void defaultFinalize.call(archive);
    });
  }

  return archive;
}
