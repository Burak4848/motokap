const sharp = require('sharp');
const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.png'));

(async () => {
  for (const file of files) {
    const out = file.replace(/\.png$/, '.webp');
    try {
      await sharp(file).webp({ quality: 80 }).toFile(out);
      console.log(`Converted ${file} to ${out}`);
    } catch (err) {
      console.error(`Error converting ${file}:`, err);
    }
  }
})();
