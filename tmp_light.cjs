const fs = require('fs');
const path = require('path');

const dirs = ['src/pages', 'src/components'];

const replaceInDir = (dir) => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) return;
  
  const files = fs.readdirSync(fullPath);
  for (const file of files) {
    if (file.endsWith('.jsx')) {
      const filePath = path.join(fullPath, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Update text-white to support light mode (slate-900)
      content = content.replace(/text-white/g, 'dark:text-white text-slate-900');
      // Fix duplicate if ran multiple times
      content = content.replace(/dark:dark:text-white text-slate-900 text-slate-900/g, 'dark:text-white text-slate-900');

      // Update bg-black to support light mode (white/slate-50)
      content = content.replace(/bg-black/g, 'dark:bg-black bg-white');
      
      // Update bg-black/60 to support light mode
      // Wait, let's do more specific replacements:
      content = content.replace(/bg-white\/\d+/g, (match) => `dark:${match} bg-slate-900/${match.split('/')[1]}`);
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
}

dirs.forEach(replaceInDir);
console.log('Replacement complete.');
