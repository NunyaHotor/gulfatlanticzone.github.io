/* Gulf Atlantic Zone — Shared JS */

// Navbar scroll
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    if (backTop) backTop.classList.toggle('show', window.scrollY > 400);
  });
}

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Active nav link
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// Product filters
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      productCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Contact form — Web3Forms
// Get a free access key at https://web3forms.com (takes 30 seconds)
// Replace YOUR_ACCESS_KEY below with your key
const WEB3FORMS_KEY = 'YOUR_ACCESS_KEY';

async function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('.form-submit');
  const status = document.getElementById('formStatus');
  const data = new FormData(form);

  // Honeypot
  if (data.get('botcheck')) return;

  btn.disabled = true;
  btn.textContent = 'Sending…';
  status.className = 'form-status';
  status.style.display = 'none';

  // If no key configured, fall back to mailto
  if (!WEB3FORMS_KEY || WEB3FORMS_KEY === 'YOUR_ACCESS_KEY') {
    const name = data.get('name');
    const email = data.get('email');
    const company = data.get('company') || '—';
    const phone = data.get('phone') || '—';
    const interest = data.get('interest');
    const message = data.get('message');
    const subject = encodeURIComponent('GAZ Website Enquiry — ' + interest);
    const body = encodeURIComponent(
      'Name: ' + name + '\nCompany: ' + company + '\nEmail: ' + email +
      '\nPhone: ' + phone + '\nInterest: ' + interest + '\n\nMessage:\n' + message
    );
    window.location.href = 'mailto:gulfatlanticzone@yahoo.com?subject=' + subject + '&body=' + body;
    status.className = 'form-status success';
    status.textContent = 'Your email client should open with the message ready. If nothing happens, email us at gulfatlanticzone@yahoo.com';
    status.style.display = 'block';
    btn.disabled = false;
    btn.textContent = 'Send Enquiry';
    return;
  }

  data.append('access_key', WEB3FORMS_KEY);
  data.append('subject', 'GAZ Website Enquiry from ' + data.get('name'));
  data.append('from_name', 'GAZ Website');

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data
    });
    const json = await res.json();
    if (json.success) {
      status.className = 'form-status success';
      status.textContent = 'Thank you! Your message has been sent. We will respond shortly.';
      form.reset();
    } else {
      throw new Error(json.message || 'Submission failed');
    }
  } catch (err) {
    status.className = 'form-status error';
    status.textContent = 'Something went wrong. Please email us directly at gulfatlanticzone@yahoo.com';
  }
  status.style.display = 'block';
  btn.disabled = false;
  btn.textContent = 'Send Enquiry';
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', handleContactSubmit);
}
