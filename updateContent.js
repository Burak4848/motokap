const fs = require('fs');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const footerSocialsRegex = /<div class="footer-socials">[\s\S]*?<\/div>/;
const newFooterSocials = `<div class="footer-socials">
    <a href="https://www.instagram.com/motokaptr/" target="_blank" aria-label="Instagram"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/></svg></a>
    <a href="https://www.facebook.com/profile.php?id=61582797016965" target="_blank" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M15 4h-2a4 4 0 00-4 4v3H7v4h2v6h4v-6h3l1-4h-4V8a1 1 0 011-1h3V4z"/></svg></a>
    <a href="https://www.tiktok.com/@motokapstore" target="_blank" aria-label="TikTok"><svg viewBox="0 0 24 24" style="fill:var(--white); stroke:none;"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 004 15.68a6.34 6.34 0 0012.67 1.44v-5.6a8.29 8.29 0 004.92 1.62V9.67a5 5 0 01-2-1.92 5 5 0 01-.73-2.32h-1z"/></svg></a>
  </div>`;

const floatingWa = `
<!-- Floating WhatsApp Button -->
<a href="https://wa.me/905332403888" target="_blank" class="floating-wa" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.299-.018-.461.13-.611.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.052 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
</a>
</body>`;

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace address
  content = content.replace(/Bursa,\s*Türkiye/g, 'Karaçulha mahallesi atatürk bulvarı no 124/1 Fethiye/Muğla');

  // Replace footer socials
  content = content.replace(footerSocialsRegex, newFooterSocials);

  // Add floating WhatsApp button before </body> if it's not already there
  if (!content.includes('class="floating-wa"')) {
    content = content.replace('</body>', floatingWa);
  }

  // Replace phone in iletisim.html to make it a clickable WA link with icon
  if (file === 'iletisim.html') {
    content = content.replace(
      '<span>0533 240 38 88</span>',
      '<a href="https://wa.me/905332403888" target="_blank" style="color:var(--white);font-weight:500;display:inline-flex;align-items:center;gap:6px;">0533 240 38 88 <svg style="width:16px;height:16px;fill:var(--white);stroke:none;" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.299-.018-.461.13-.611.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.052 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg></a>'
    );
  }

  fs.writeFileSync(file, content, 'utf8');
}
console.log('Update complete.');
