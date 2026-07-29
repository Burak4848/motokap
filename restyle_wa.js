const fs = require('fs');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const oldHtmlRegex = /<!-- Floating Socials -->[\s\S]*?<\/div>/;
const newHtml = `<!-- Floating WhatsApp Button -->
<a href="https://wa.me/905332403888" target="_blank" class="floating-wa" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/><path d="M9.5 9.5c.3-.3.8-.3 1 0s.8 1.4 1 1.6c.1.2 0 .5-.1.7l-.5.7c-.2.2-.2.5-.1.8 1 1.7 2.1 2.8 3.8 3.8.3.1.6 0 .8-.1l.7-.5c.2-.1.5-.2.7-.1.2.2 1.6.8 1.6 1s.3.8 0 1c-.3.3-.8.6-1.4.6-.5 0-1.6-.3-3.4-1.3-2-1.1-3.4-2.8-4.5-4.3-1-1.8-1.3-2.9-1.3-3.4 0-.6.3-1.1.6-1.4z"/></svg>
</a>`;

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(oldHtmlRegex, newHtml);
  fs.writeFileSync(file, content, 'utf8');
}

let cssContent = fs.readFileSync('style.css', 'utf8');
const oldCssRegex = /\/\* ===== FLOATING SOCIALS ===== \*\/[\s\S]*?@media \(max-width: 768px\) \{ \.floating-socials[\s\S]*?\} \}/;
const newCss = `/* ===== FLOATING WHATSAPP ===== */
.floating-wa { position: fixed; bottom: 2rem; right: 2rem; width: 62px; height: 62px; background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; z-index: 900; box-shadow: 0 10px 28px rgba(37,211,102,.25); transition: transform .4s var(--ease), box-shadow .4s var(--ease); color: var(--white); border: 1px solid rgba(255,255,255,.15); backdrop-filter: blur(10px); }
.floating-wa:hover { transform: translateY(-5px) scale(1.08); box-shadow: 0 14px 34px rgba(37,211,102,.4); }
.floating-wa svg { width: 32px; height: 32px; }
@media (max-width: 768px) { .floating-wa { bottom: 1.5rem; right: 1.5rem; width: 56px; height: 56px; } .floating-wa svg { width: 28px; height: 28px; } }`;

cssContent = cssContent.replace(oldCssRegex, newCss);
fs.writeFileSync('style.css', cssContent, 'utf8');
console.log('Update complete.');
