import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
const directory = new URL('../public/team/', import.meta.url);
const portraits = [
  ['Shekh Asif.jpeg', 'asif.webp'],
  ['kavya .jpeg', 'kavya.webp'],
  ['Abhishek.jpeg', 'abhishek.webp'],
];
for (const [source, output] of portraits) {
  const result = await sharp(fileURLToPath(new URL(source, directory)))
    .rotate().resize({ width: 960, height: 1280, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 88, effort: 5 }).toFile(fileURLToPath(new URL(output, directory)));
  console.log(`${output}: ${result.width} × ${result.height}, ${Math.round(result.size / 1024)} KB`);
}
