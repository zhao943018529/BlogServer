import { createWriteStream, unlink } from 'fs';
import { uniqueId } from 'lodash';
import { FileUpload } from 'graphql-upload';
// import { FileUpload } from 'graphql-upload';

const UPLOAD_DIR = '../../upload';

export default async function upload(file: FileUpload) {
  const { createReadStream, filename, mimetype } = file;
  const newFilename = `${uniqueId('fff')}-${filename}`;
  const path = `${UPLOAD_DIR}/${newFilename}`;
  const readStream = createReadStream();

  await new Promise(function (resolve, reject) {
    const writeStream = createWriteStream(path);
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
    path: `/upload/${newFilename}`,
  };
}
