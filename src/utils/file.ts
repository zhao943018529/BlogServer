import { createWriteStream, unlink } from 'fs';
import Path from 'path';
import { FileUpload } from 'graphql-upload';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = '../../upload';

export default async function upload(file: FileUpload) {
  const { createReadStream, filename, mimetype } = file;
  let newFilename = uuidv4();
  if (filename.indexOf('.') !== -1) {
    newFilename = `${newFilename}.${filename.split('.').pop()}`;
  }
  const path = `${UPLOAD_DIR}/${newFilename}`;
  const readStream = createReadStream();
  await new Promise(function (resolve, reject) {
    const writeStream = createWriteStream(Path.resolve(__dirname, path));
    writeStream.on('finish', resolve);
    writeStream.on('error', (error) => {
      unlink(path, () => {
        reject(error);
      });
    });
    readStream.on('error', (error: any) => writeStream.destroy(error));
    readStream.pipe(writeStream);
  });

  return {
    mimetype,
    filename: newFilename,
    path: `/${newFilename}`,
  };
}
