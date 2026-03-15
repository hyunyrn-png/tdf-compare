import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const dir = '/Users/hyeon-yeongmin/Documents/TDF App';
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

createServer(async (req, res) => {
  let path = req.url === '/' ? '/index.html' : req.url;
  try {
    const data = await readFile(join(dir, path));
    res.writeHead(200, { 'Content-Type': mimeTypes[extname(path)] || 'text/plain' });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(8090, () => console.log('Serving on port 8090'));
