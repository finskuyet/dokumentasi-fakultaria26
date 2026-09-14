const fs = require('fs');
const path = require('path');

// 1. Ambil token dari Environment Variable Vercel (atau fallback ke default)
const token = process.env.PANITIA_TOKEN || 'PANITIA-FKI-2026';
console.log('Menggunakan token:', token.substring(0, 3) + '***');

// 2. Baca file script.js
const scriptPath = path.join(__dirname, 'script.js');
let scriptContent = fs.readFileSync(scriptPath, 'utf8');

// 3. Ganti pengecekan token di script.js
// Regex mencari: if (token === 'APAPUN')
const regex = /if\s*\(\s*token\s*===\s*['"](.*?)['"]\s*\)/;
scriptContent = scriptContent.replace(regex, `if (token === '${token}')`);

// 4. Simpan kembali file script.js
fs.writeFileSync(scriptPath, scriptContent);
console.log('Berhasil menginjeksi PANITIA_TOKEN ke script.js untuk Vercel build.');
