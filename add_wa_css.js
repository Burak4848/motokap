const fs = require('fs');

const path = 'style.css';
let content = fs.readFileSync(path, 'utf8');

const waCss = `
/* ===== FLOATING WHATSAPP ===== */
.floating-wa{position:fixed;bottom:2rem;right:2rem;width:60px;height:60px;background-color:#25d366;border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:900;box-shadow:0 10px 24px rgba(37,211,102,.4);transition:transform .3s var(--ease), box-shadow .3s var(--ease);color:var(--white);}
.floating-wa:hover{transform:translateY(-5px) scale(1.05);box-shadow:0 15px 32px rgba(37,211,102,.5);}
.floating-wa svg{width:32px;height:32px;fill:currentColor;}
@media (max-width: 768px) { .floating-wa{bottom:1.5rem;right:1.5rem;width:54px;height:54px;} .floating-wa svg{width:28px;height:28px;} }
`;

if (!content.includes('.floating-wa')) {
  content += waCss;
  fs.writeFileSync(path, content, 'utf8');
}
console.log('Added WA CSS');
