const { request } = require('http');
const { createGzip } = require('zlib');
const { createReadStream } = require('fs');
const { basename } = require('path');

const filename = process.argv[2];
const address = process.argv[3];

const [host, port] = address.split(':');

const httpRequestOptions = {
  hostname: host,
  port: port,
  path: '/',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/octet-stream',
    'Content-Encoding': 'gzip',
    'X-Filename': basename(filename)
  }
};

const req = request(httpRequestOptions, (res) => {
  console.log(`Server response: ${res.statusCode}`)
});

createReadStream(filename)
  .pipe(createGzip())
  .pipe(req)
  .on('finish', () => {
    console.log('File successfully sent')
  });
