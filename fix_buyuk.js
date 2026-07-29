const fs = require('fs');

const path = 'motokap-buyuk.html';
let content = fs.readFileSync(path, 'utf8');

const target = `    <h1>MotoKap Büyük</h1>
      <h2>Büyük Motorlara Büyük Koruma</h2>`;

const replacement = `    <h1>MotoKap Büyük</h1>
    <p>Büyük hacimli, yüksek ve çantalı motosikletler için tasarlanmış tam kapalı katlanabilir garaj sistemi.</p>
  </div>

  <section class="section" style="padding-bottom: 0;">
    <div class="product-stage" style="max-height:710px;height:71vh;">
      <div class="floor-glow"></div>
      <img src="motokap büyükboy .webp" class="moto-img" alt="MotoKap Büyük">
    </div>
  </section>

  <section class="section" style="padding-top: 3rem;">
    <div class="section-head">
      <span class="section-eyebrow">Özellikler</span>
      <h2>Büyük Motorlara Büyük Koruma</h2>`;

content = content.replace(target, replacement);

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed motokap-buyuk.html');
