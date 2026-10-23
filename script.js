const products = [
  {name:'MKB Cooking Oil', icon:'🫗', desc:'Everyday cooking oil category for homes and food businesses.'},
  {name:'MKB Rice', icon:'🍚', desc:'Rice range positioned for quality, consistency and daily use.'},
  {name:'MKB Spices', icon:'🌶️', desc:'Aromatic spice products for rich flavour and convenient cooking.'},
  {name:'MKB Drinking Water', icon:'💧', desc:'Refreshing packaged drinking water for home and business supply.'},
  {name:'MKB Juices', icon:'🧃', desc:'Refreshing juice and fruit beverage category for future launches.'},
  {name:'MKB Soft Drinks', icon:'🥤', desc:'Chilled carbonated and flavoured beverage category.'}
];

const grid = document.querySelector('#productGrid');
products.forEach(p => {
  const card = document.createElement('article');
  card.className = 'product';
  card.innerHTML = `<div class="visual" aria-hidden="true">${p.icon}</div><h3>${p.name}</h3><p>${p.desc}</p><button class="btn btn-gold product-inquiry" data-product="${p.name}">Ask About Product →</button>`;
  grid.appendChild(card);
});

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '✕' : '☰';
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='☰';}));

function prepareInquiry(type, message='') {
  const form = document.querySelector('#inquiryForm');
  form.elements.type.value = type;
  if (message) form.elements.message.value = message;
}
document.querySelectorAll('[data-inquiry]').forEach(a => a.addEventListener('click', () => prepareInquiry(a.dataset.inquiry)));
document.querySelectorAll('.product-inquiry').forEach(btn => btn.addEventListener('click', () => {
  prepareInquiry('Product Inquiry', `I would like more information about ${btn.dataset.product}.`);
  document.querySelector('#contact').scrollIntoView({behavior:'smooth'});
}));

const form = document.querySelector('#inquiryForm');
const status = document.querySelector('#formStatus');
form.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.checkValidity()) {status.textContent='Please complete the required fields.'; form.reportValidity(); return;}
  const data = Object.fromEntries(new FormData(form).entries());
  const leads = JSON.parse(sessionStorage.getItem('mkb_demo_leads') || '[]');
  leads.push({...data, createdAt:new Date().toISOString()});
  sessionStorage.setItem('mkb_demo_leads', JSON.stringify(leads));
  status.textContent='Demo inquiry saved in this browser. Backend connection will be added in the next phase.';
  form.reset();
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav a')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, {rootMargin:'-35% 0px -55% 0px'});
sections.forEach(s => observer.observe(s));
