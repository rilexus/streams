const { createReadStream, createWriteStream } = require('fs');
const{ createGzip } = require('zlib');

const filePath = process.argv[2];

createReadStream(filePath)
  .pipe(createGzip())
  .pipe(createWriteStream(`${filePath}.gz`))
  .on('finish', () => {
    console.log("FINISH!");
  });
