import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { basename, join } from 'node:path';

const cssPath = 'public/assets/css/font.css';
const fontsDir = 'public/assets/fonts';
const fontUrlPattern = /https:\/\/fonts\.gstatic\.com[^\s)"']+\.woff2/g;

await mkdir(fontsDir, { recursive: true });

let cssContent = await readFile(cssPath, 'utf8');
const urls = [...new Set(cssContent.match(fontUrlPattern) ?? [])];

for (const url of urls) {
  const filename = basename(new URL(url).pathname);
  const destination = join(fontsDir, filename);

  if (!existsSync(destination)) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download ${url} (status ${response.status})`);
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile(destination, buffer);
  }

  cssContent = cssContent.replaceAll(url, `/assets/fonts/${filename}`);
}

await writeFile(cssPath, cssContent, 'utf8');

console.log(`Downloaded/relinked ${urls.length} unique font files.`);
