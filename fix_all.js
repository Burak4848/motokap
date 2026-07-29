const fs = require('fs');

// 1. Rename image files
const imgMap = {
  'motokap büyükboy .webp': 'buyuk.webp',
  'motokap orta boy.webp': 'orta.webp',
  'Motokap iki motorlukatv.webp': 'ikili.webp'
};
for (const [oldName, newName] of Object.entries(imgMap)) {
  if (fs.existsSync(oldName)) {
    fs.renameSync(oldName, newName);
  }
}

// 2. Rename HTML file
if (fs.existsSync('motokap-kucuk.html')) {
  fs.renameSync('motokap-kucuk.html', 'motokap-ikili.html');
}

// 3. Process all HTML files
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');

  // Update image references
  content = content.replace(/motokap büyükboy \.webp/g, 'buyuk.webp');
  content = content.replace(/motokap b\?y\?kboy \.webp/g, 'buyuk.webp'); // just in case
  content = content.replace(/motokap orta boy\.webp/g, 'orta.webp');
  content = content.replace(/Motokap iki motorlukatv\.webp/g, 'ikili.webp');

  // Update HTML links
  content = content.replace(/motokap-kucuk\.html/g, 'motokap-ikili.html');

  // Remove small references in text if any
  content = content.replace(/MotoKap Küçük/g, 'MotoKap İki Motosikletlik');

  // Fix product-stage inline heights to fix proportions across all pages
  content = content.replace(/class="product-stage"[^>]*>/g, 'class="product-stage">');

  fs.writeFileSync(file, content, 'utf8');
}

// 4. Update script.js for auto-play and image/link names
let js = fs.readFileSync('script.js', 'utf8');
js = js.replace(/motokap büyükboy \.webp/g, 'buyuk.webp');
js = js.replace(/motokap orta boy\.webp/g, 'orta.webp');
js = js.replace(/Motokap iki motorlukatv\.webp/g, 'ikili.webp');
js = js.replace(/motokap-kucuk\.html/g, 'motokap-ikili.html');

// Add auto-play logic
const autoPlayInjection = `
    var autoPlayTimer = setInterval(function(){ stepVariant(1); }, 4000);
    function resetTimer() {
      clearInterval(autoPlayTimer);
      autoPlayTimer = setInterval(function(){ stepVariant(1); }, 4000);
    }
`;
// find stepVariant(-1) / (1) bindings and add resetTimer()
if (!js.includes('resetTimer()')) {
  js = js.replace('var vIndex = 0;', 'var vIndex = 0;\n' + autoPlayInjection);
  js = js.replace(/stepVariant\(-1\);/g, 'stepVariant(-1); resetTimer();');
  js = js.replace(/stepVariant\(1\);/g, 'stepVariant(1); resetTimer();');
  js = js.replace(/vIndex=i; renderVariant\(\);/g, 'vIndex=i; renderVariant(); resetTimer();');
}

fs.writeFileSync('script.js', js, 'utf8');

console.log('Update complete.');
