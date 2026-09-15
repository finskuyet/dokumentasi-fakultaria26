const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir);

const imageFiles = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));
const codeFiles = files.filter(f => /\.(html|css|js)$/i.test(f) && f !== 'compress.js' && f !== 'cleanup.js');

const codeContents = codeFiles.map(f => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n');

const unusedImages = [];

imageFiles.forEach(img => {
    const regex = new RegExp(img.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    if (!regex.test(codeContents)) {
        unusedImages.push(img);
    }
});

console.log('Unused Images found:', unusedImages);

if (unusedImages.length > 0) {
    unusedImages.forEach(img => {
        fs.unlinkSync(path.join(dir, img));
        console.log('Deleted:', img);
    });
} else {
    console.log('No unused images found.');
}
