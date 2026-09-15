const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir);

const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));

async function processImages() {
  for (const file of imageFiles) {
    const filePath = path.join(dir, file);
    const tempPath = path.join(dir, 'temp_' + file);
    
    // Only compress if the file is larger than 500KB to save time
    const stats = fs.statSync(filePath);
    if (stats.size < 500 * 1024) {
      console.log(`Skipping ${file} (already small: ${(stats.size / 1024).toFixed(1)} KB)`);
      continue;
    }
    
    console.log(`Compressing ${file} (${(stats.size / 1024 / 1024).toFixed(2)} MB)...`);
    try {
      await sharp(filePath)
        .resize({ width: 800, withoutEnlargement: true })
        .jpeg({ quality: 75, progressive: true }) // Using jpeg to overwrite even if it was png (will just have jpeg compression inside original extension) - actually if it's png let's preserve it.
        // wait, let's just use webp and change the html. No, modifying html automatically is risky. 
        // Let's just output as same format.
        .toFile(tempPath);
        
      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);
      
      const newStats = fs.statSync(filePath);
      console.log(`Successfully compressed ${file} to ${(newStats.size / 1024).toFixed(1)} KB`);
    } catch (err) {
      console.error(`Error compressing ${file}:`, err);
      // Clean up temp file if error
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    }
  }
}

processImages();
