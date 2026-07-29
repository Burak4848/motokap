const fs = require('fs');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const oldHtmlRegex = /<!-- Floating WhatsApp Button -->[\s\S]*?<\/a>/;
const newHtml = `<!-- Floating Socials -->
<div class="floating-socials">
  <a href="https://wa.me/905332403888" target="_blank" class="float-btn" aria-label="WhatsApp">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/><path d="M9.5 9.5c.3-.3.8-.3 1 0s.8 1.4 1 1.6c.1.2 0 .5-.1.7l-.5.7c-.2.2-.2.5-.1.8 1 1.7 2.1 2.8 3.8 3.8.3.1.6 0 .8-.1l.7-.5c.2-.1.5-.2.7-.1.2.2 1.6.8 1.6 1s.3.8 0 1c-.3.3-.8.6-1.4.6-.5 0-1.6-.3-3.4-1.3-2-1.1-3.4-2.8-4.5-4.3-1-1.8-1.3-2.9-1.3-3.4 0-.6.3-1.1.6-1.4z"/></svg>
  </a>
  <a href="https://www.instagram.com/motokaptr/" target="_blank" class="float-btn" aria-label="Instagram">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
  </a>
</div>`;

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(oldHtmlRegex, newHtml);
  fs.writeFileSync(file, content, 'utf8');
}

let cssContent = fs.readFileSync('style.css', 'utf8');
const oldCssRegex = /\/\* ===== FLOATING WHATSAPP ===== \*\/[\s\S]*?@media \(max-width: 768px\) \{ \.floating-wa[\s\S]*?\} \}/;
const newCss = `/* ===== FLOATING SOCIALS ===== */
.floating-socials { position: fixed; bottom: 2rem; right: 2rem; display: flex; flex-direction: column; gap: 1rem; z-index: 900; }
.float-btn { width: 56px; height: 56px; background-color: #d3a83b; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 20px rgba(211,168,59,.3); transition: transform .3s var(--ease), box-shadow .3s var(--ease), background .3s; color: var(--white); }
.float-btn:hover { transform: translateY(-4px) scale(1.05); box-shadow: 0 12px 28px rgba(211,168,59,.5); background-color: #e3b84b; color: var(--white); }
.float-btn svg { width: 26px; height: 26px; }
@media (max-width: 768px) { .floating-socials { bottom: 1.5rem; right: 1.5rem; gap: 0.8rem; } .float-btn { width: 50px; height: 50px; } .float-btn svg { width: 24px; height: 24px; } }`;

cssContent = cssContent.replace(oldCssRegex, newCss);
fs.writeFileSync('style.css', cssContent, 'utf8');
console.log('Update complete.');
