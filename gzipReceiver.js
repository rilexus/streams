const { createServer } = require('http');
const { basename, join } = require('path');
const { createWriteStream } = require('fs');
const { createGunzip } = require('zlib');
const { userInfo } = require('os');


const port = process.argv[2] ?? 3000;
const destinationPath = process.argv[3] ?? `/Users/${userInfo().username}/Desktop`;

const server = createServer((req, res) => {
  const fileName = basename(req.headers['x-filename']);
  const destinationFileName = join(destinationPath, `received_${fileName}`);

  req
    .pipe(createGunzip())
    .pipe(createWriteStream(destinationFileName))
    .on('finish', () => {
      res.writeHead(201, { 'Content-Type': 'text/plain' });
      res.end('OK\n');
      console.log(`File saved to: ${destinationFileName}`);
    })

});

server.listen(parseInt(port, 10), () => {
  console.log(`Listening on port: ${port}`);
});
