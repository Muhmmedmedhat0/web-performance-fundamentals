import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { glob } from 'glob';

const publicFiles = await glob('public/**/*.{html,js,sql,md,css}', {
  nodir: true,
});

const imagePathPattern = /\/assets\/img\/([^"'\s?]+)\.png/g;

for (const filePath of publicFiles) {
  const absolutePath = resolve(filePath);
  const originalContent = await readFile(absolutePath, 'utf8');
  const updatedContent = originalContent.replace(
    imagePathPattern,
    '/assets/webp/$1.webp',
  );

  if (updatedContent !== originalContent) {
    await writeFile(absolutePath, updatedContent, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}
