const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ reply: 'Test server works!' }));
});

server.listen(3333, () => {
  console.log('Test server listening on 3333');
});
