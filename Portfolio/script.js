/* ══════════════════════════════════════
   SHREYA MANDAVGADE PORTFOLIO
   script.js — Interactions & Animations
   ══════════════════════════════════════ */

'use strict';

/* ── 1. LOADING SCREEN ─────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('fade-out');
    loader.addEventListener('transitionend', () => loader.remove(), { once: true });
  }, 1200);
});


/* ── 2. CUSTOM CURSOR ──────────────── */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

if (window.innerWidth > 480) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document.querySelectorAll('a, button, .project-card, .cert-card, .stat-card, .chip').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}


/* ── 3. SCROLL PROGRESS BAR ─────────── */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrolled = (document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = scrolled + '%';
}, { passive: true });


/* ── 4. NAVBAR ──────────────────────── */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('back-to-top').classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});


/* ── 5. ACTIVE NAV LINK ON SCROLL ───── */
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      allNavLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));


/* ── 6. SPOTLIGHT EFFECT ────────────── */
const spotlight = document.getElementById('spotlight');
const hero = document.getElementById('home');
hero.addEventListener('mousemove', (e) => {
  const rect = hero.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  spotlight.style.setProperty('--mx', `${x}%`);
  spotlight.style.setProperty('--my', `${y}%`);
});


/* ── 7. TYPING ANIMATION ────────────── */
const typedEl = document.getElementById('typed-text');
const roles = [
  'Web Applications',
  'IoT Systems',
  'Smart Devices',
  'Clean Code',
  'Data Pipelines',
  'Cool Projects'
];
let roleIndex = 0, charIndex = 0, isDeleting = false;

function typeText() {
  const current = roles[roleIndex];
  if (!isDeleting) {
    typedEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeText, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeText, isDeleting ? 45 : 90);
}
setTimeout(typeText, 1400);


/* ── 8. PARTICLE CANVAS ─────────────── */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 0.5,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: (Math.random() - 0.5) * 0.4,
    opacity: Math.random() * 0.5 + 0.1,
    color: Math.random() > 0.5 ? '124,107,255' : '79,195,247'
  };
}

for (let i = 0; i < 120; i++) particles.push(createParticle());

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.x += p.speedX;
    p.y += p.speedY;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
    ctx.fill();

    // Connect nearby particles
    particles.slice(i + 1).forEach(p2 => {
      const dx = p.x - p2.x, dy = p.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${p.color},${0.08 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    });
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();


/* ── 9. SCROLL REVEAL ───────────────── */
const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));


/* ── 10. SKILL BARS ─────────────────── */
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target.getAttribute('data-width');
      setTimeout(() => { entry.target.style.width = target + '%'; }, 200);
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));


/* ── 11. COUNTER ANIMATION ─────────── */
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute('data-target'));
      let count = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        count += step;
        if (count >= target) { count = target; clearInterval(timer); }
        entry.target.textContent = count + (target > 10 ? '+' : '');
      }, 40);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));


/* ── 12. PROJECT FILTERS ────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const cat = card.getAttribute('data-category');
      const match = filter === 'all' || cat === filter;
      if (match) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});


/* ── 13. THEME TOGGLE ───────────────── */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('sm-portfolio-theme', theme);
}

const savedTheme = localStorage.getItem('sm-portfolio-theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});


/* ── 14. CONTACT FORM ───────────────── */
const contactForm = document.getElementById('contact-form');

function validateField(id, errorId, validationFn) {
  const input = document.getElementById(id);
  const group = input.parentElement;
  const isValid = validationFn(input.value.trim());
  group.classList.toggle('error', !isValid);
  return isValid;
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameValid = validateField('name', 'name-error', v => v.length >= 2);
  const emailValid = validateField('email', 'email-error', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
  const subjectValid = validateField('subject', 'subject-error', v => v.length >= 2);
  const messageValid = validateField('message', 'message-error', v => v.length >= 10);

  if (!nameValid || !emailValid || !subjectValid || !messageValid) return;

  const btnText = document.getElementById('btn-text');
  const btnLoading = document.getElementById('btn-loading');
  const successMsg = document.getElementById('form-success');

  btnText.style.display = 'none';
  btnLoading.style.display = 'inline-flex';

  // Simulate form submission
  setTimeout(() => {
    btnLoading.style.display = 'none';
    btnText.style.display = 'inline-flex';
    successMsg.classList.add('show');
    contactForm.reset();
    contactForm.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
    setTimeout(() => successMsg.classList.remove('show'), 5000);
  }, 1800);
});

// Live field validation
['name', 'email', 'subject', 'message'].forEach(id => {
  document.getElementById(id)?.addEventListener('blur', () => {
    const validations = {
      name: v => v.length >= 2,
      email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      subject: v => v.length >= 2,
      message: v => v.length >= 10,
    };
    validateField(id, `${id}-error`, validations[id]);
  });
});


/* ── 15. BACK TO TOP ────────────────── */
document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ── 16. RESUME DOWNLOAD ────────────── */
document.getElementById('download-resume')?.addEventListener('click', (e) => {
  e.preventDefault();
  // Creates a text content download as a simple placeholder
  // In production, replace with actual PDF file link
  const a = document.createElement('a');
  a.href = '#';
  alert('Resume download link will be connected to the actual file. Replace the href in index.html with the path to your resume PDF.');
});


/* ── 17. SMOOTH ANCHOR SCROLLING ────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});


/* ── 18. FADE-IN KEYFRAME (JS-injected) ─ */
const style = document.createElement('style');
style.textContent = `@keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`;
document.head.appendChild(style);


/* ── 19. TILT EFFECT ON PROJECT CARDS ── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `perspective(800px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


/* ── 20. CONSOLE EASTER EGG ─────────── */
console.log('%c👩‍💻 Shreya Mandavgade Portfolio', 'font-size:18px;font-weight:bold;color:#7c6bff;');
console.log('%cBuilt with HTML · CSS · JavaScript | Open for opportunities!', 'color:#4fc3f7;');
