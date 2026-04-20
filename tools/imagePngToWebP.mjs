/**
 * WebP Converter
 * Web Performance Lab
 * by Muhmmad Medhat
 *
 * Build tool to optimize convert the optimized PNGs in the `min` directory
 * into WebP files, placed in the `public/assets/webp` directory.
 *
 * @see https://www.npmjs.com/package/imagemin
 */

import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

console.log('Converting to WebP Images');

await imagemin(['public/assets/img/min/**/*.png', 'public/assets/img/*.png'], {
  destination: 'public/assets/webp',
  plugins: [imageminWebp({ quality: 50 })],
});
