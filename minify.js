import { minify } from 'terser';
import fs from 'fs';
import path from 'path';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const BUILD_DIR_NAME = 'build';

const __dirname = dirname(fileURLToPath(import.meta.url));

const dirContents = fs.readdirSync(`${__dirname}/${BUILD_DIR_NAME}`);

dirContents.forEach((name) => {
  if (path.extname(name) === '.js') {
    const fileContents = fs.readFileSync(`${__dirname}/${BUILD_DIR_NAME}/${name}`, 'utf8');
    minify(fileContents , { sourceMap: true, mangle: { toplevel: true } }).then((result) => {
      fs.writeFileSync(`${__dirname}/${BUILD_DIR_NAME}/${name}`, result.code);
      fs.writeFileSync(`${__dirname}/${BUILD_DIR_NAME}/${name}.map`, result.map);
    });
  }
});
