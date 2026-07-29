(function(){
  /* ---------- loader (index only) ---------- */
  var loader = document.getElementById('loader');
  if(loader){
    window.addEventListener('load', function(){
      setTimeout(function(){ loader.classList.add('done'); }, 1400);
    });
  }

  /* ---------- nav scroll effect ---------- */
  var mainNav = document.getElementById('mainNav');
  if(mainNav){
    window.addEventListener('scroll', function(){
      if(window.scrollY > 60){ mainNav.classList.add('scrolled'); }
      else { mainNav.classList.remove('scrolled'); }
    }, {passive:true});
  }

  /* ---------- mobile menu ---------- */
  var hamburgerBtn = document.getElementById('hamburgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileMenuClose = document.getElementById('mobileMenuClose');
  if(hamburgerBtn && mobileMenu){
    hamburgerBtn.addEventListener('click', function(){ mobileMenu.classList.add('open'); });
    mobileMenuClose.addEventListener('click', function(){ mobileMenu.classList.remove('open'); });
    mobileMenu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ mobileMenu.classList.remove('open'); }); });
  }

  /* ---------- custom cursor + magnetic buttons ---------- */
  if(window.matchMedia('(hover:hover)').matches && typeof gsap !== 'undefined'){
    var cursor = document.getElementById('cursorDot');
    if(cursor){
      var cx = gsap.quickTo(cursor, "x", {duration:.5, ease:"power3"});
      var cy = gsap.quickTo(cursor, "y", {duration:.5, ease:"power3"});
      window.addEventListener('mousemove', function(e){ cx(e.clientX); cy(e.clientY); });
      document.querySelectorAll('a,button').forEach(function(el){
        el.addEventListener('mouseenter', function(){ cursor.classList.add('hover'); });
        el.addEventListener('mouseleave', function(){ cursor.classList.remove('hover'); });
      });
    }
    document.querySelectorAll('.btn-outline,.btn-solid').forEach(function(el){
      var xTo = gsap.quickTo(el, "x", {duration:.5, ease:"power3"});
      var yTo = gsap.quickTo(el, "y", {duration:.5, ease:"power3"});
      el.addEventListener('mousemove', function(e){
        var r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width/2)*0.25);
        yTo((e.clientY - r.top - r.height/2)*0.35);
      });
      el.addEventListener('mouseleave', function(){ xTo(0); yTo(0); });
    });
  }

  /* ---------- feature card tilt ---------- */
  if(typeof gsap !== 'undefined'){
    document.querySelectorAll('.feature-card').forEach(function(card){
      card.addEventListener('mousemove', function(e){
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left)/r.width - 0.5;
        var py = (e.clientY - r.top)/r.height - 0.5;
        gsap.to(card, {rotateY: px*6, rotateX: -py*6, duration:.4, ease:"power2.out", transformPerspective:600});
      });
      card.addEventListener('mouseleave', function(){ gsap.to(card, {rotateY:0, rotateX:0, duration:.6, ease:"power3.out"}); });
    });
  }

  /* ---------- variant carousel (index hero) ---------- */
  var modelNameEl = document.querySelector('.model-name');
  if(modelNameEl){
    var variants = [
      {name:"MOTOKAP ORTA BOY", tag:"Orta Sınıf Motosikletler İçin", price:"Bizi Arayın", img:"motokap orta boy.webp", link:"motokap-orta.html"},
      {name:"MOTOKAP BÜYÜK BOY", tag:"Büyük Hacimli Motosikletler İçin", price:"Bizi Arayın", img:"motokap büyükboy .webp", link:"motokap-buyuk.html"},
      {name:"MOTOKAP İKİ MOTOSİKLETLİK", tag:"İki Motosiklet veya ATV İçin", price:"Bizi Arayın", img:"Motokap iki motorlukatv.webp", link:"motokap-kucuk.html"}
    ];
    var vIndex = 0;
    var variantDots = document.querySelectorAll('#variantDots span');

    function renderVariant(){
      var v = variants[vIndex];
      var prev = variants[(vIndex-1+variants.length)%variants.length];
      var next = variants[(vIndex+1)%variants.length];
      document.querySelector('.model-tag').textContent = v.tag;
      modelNameEl.textContent = v.name;
      document.querySelector('.model-price').textContent = v.price;
      document.querySelector('.prev-variant-name').textContent = prev.name;
      document.querySelector('.next-variant-name').textContent = next.name;
      var imgEl = document.getElementById('productImage');
      if (imgEl) { imgEl.src = v.img; imgEl.alt = v.name; }
      variantDots.forEach(function(d,i){ d.classList.toggle('active', i===vIndex); });
    }
    function stepVariant(dir){
      vIndex = (vIndex + dir + variants.length) % variants.length;
      if(typeof gsap !== 'undefined'){ gsap.fromTo('.hero-copy', {opacity:0, y:8}, {opacity:1, y:0, duration:.4, ease:"power2.out"}); }
      renderVariant();
    }
    var arrowLeft = document.getElementById('arrowLeft');
    var arrowRight = document.getElementById('arrowRight');
    if(arrowLeft) arrowLeft.addEventListener('click', function(){ stepVariant(-1); });
    if(arrowRight) arrowRight.addEventListener('click', function(){ stepVariant(1); });
    var prevBtn = document.querySelector('.prev-variant');
    var nextBtn = document.querySelector('.next-variant');
    if(prevBtn) prevBtn.addEventListener('click', function(){ stepVariant(-1); });
    if(nextBtn) nextBtn.addEventListener('click', function(){ stepVariant(1); });
    variantDots.forEach(function(d,i){ d.addEventListener('click', function(){ vIndex=i; renderVariant(); }); });
    renderVariant();
  }

  /* ---------- stat counters ---------- */
  var statEls = document.querySelectorAll('.stat-num');
  if(statEls.length && typeof gsap !== 'undefined'){
    var statIO = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          var el = entry.target;
          var target = +el.dataset.target;
          var obj = {val:0};
          gsap.to(obj, {val:target, duration:2, ease:"power2.out", onUpdate:function(){
            el.textContent = Math.floor(obj.val).toLocaleString('tr-TR');
          }});
          statIO.unobserve(el);
        }
      });
    }, {threshold:.6});
    statEls.forEach(function(el){ statIO.observe(el); });
  }

  /* ---------- contact form (iletisim.html) ---------- */
  var contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      if(typeof fbq === 'function'){ fbq('track','Contact'); }
      document.getElementById('formSuccess').classList.add('show');
      contactForm.reset();
    });
  }

  /* ---------- Meta Pixel: Lead on quote clicks + page ViewContent ---------- */
  document.querySelectorAll('.btn-quote').forEach(function(el){
    el.addEventListener('click', function(){
      if(typeof fbq === 'function'){ fbq('track','Lead',{content_name:'Teklif Al'}); }
    });
  });
  var pageName = document.body.dataset.page;
  if(pageName && pageName !== 'home' && typeof fbq === 'function'){
    fbq('track','ViewContent',{content_name:pageName});
  }
  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-question').forEach(function(btn){
    btn.addEventListener('click', function(){
      var item = btn.parentElement;
      var isOpen = item.classList.contains('open');
      // close all
      document.querySelectorAll('.faq-item').forEach(function(fi){ fi.classList.remove('open'); });
      if(!isOpen) item.classList.add('open');
    });
  });
})();
